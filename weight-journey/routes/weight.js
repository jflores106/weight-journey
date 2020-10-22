const express = require('express')
const router = express.Router()
let weightStore = require('../app').weightStore

//Create a new item
router.get('/add', async (req, res, next) => {
    try {
        res.render('add_weight', {
            isCreate: true,
            title: 'Add an Entry',
            weightKey: await weightStore.count(),
            styles: ['/stylesheets/style.css', '/stylesheets/style2.css']
        })
    } catch (err) {
        next(err)
    }
})

//Saves notes
router.post('/save', async (req, res, next) =>{
    try {
        let weight;
        if (req.body.saveMethod === 'create')
            weight = await weightStore.create(req.body.weightKey, req.body.date, req.body.body)
        else
            weight = await weightStore.update(req.body.weightKey, req.body.date, req.body.body)
        res.redirect('/weight/view?key=' + req.body.weightKey)
    } catch (err){
        next(err)
    }
})

//View a specific item
router.get('/view', async (req, res, next) =>{
    try{
        let weight = await weightStore.read(req.query.key)
        res.render('view_weight', {
            title: 'View Entry', //View Weight
            weightDate: weight.date,
            weightKey: weight.key,
            weightBody: weight.body,
            styles: ['/stylesheets/style.css', '/stylesheets/style2.css']
        })
    } catch (err) {
        next(err)
    }
})

// View all currently saved items
router.get('/viewAll', async function(req, res, next) {
    try {
        let keyList = await weightStore.keyList()
        let keyPromises = keyList.map(key => {
            return weightStore.read(key)
        })
        let allWeight = await Promise.all(keyPromises)
        res.render('view_list', {
            weightList: extractWeightToLiteral(allWeight),
            title: 'View Entries',
            styles: ['/stylesheets/style.css', '/stylesheets/style2.css']
        });
    } catch (err) {
        next(err)
    }
});

function extractWeightToLiteral(allWeight){
    return allWeight.map(weight => {
            return {
                key: weight.key,
                date: weight.date
            }
        })
}


//Edit a specific item
router.get('/edit', async (req, res, next) => {
    try{
        let weight = await weightStore.read(req.query.key)
        res.render('edit_weight', {
            isCreate: false,
            title: 'Edit Entry', //Edit Weight
            weightDate: weight.date,
            weightKey: weight.key,
            weightBody: weight.body,
            styles: ['/stylesheets/style.css', '/stylesheets/style2.css']
        })
    } catch (err){
        next(err)
    }
})

router.get('/destroy', async (req, res, next) => {
    try{
        let weight = await weightStore.read(req.query.key)
        res.render('delete_weight', {
            title: 'Delete Entry', //weight ? weight.date : "",
            weightKey: weight.key,
            weightDate: weight.date,
            styles: ['/stylesheets/style.css', '/stylesheets/style2.css']
        })
    } catch (err){
        next(err)
    }
})

router.post('/destroy/confirm', async (req, res, next) => {
    try{
        await weightStore.destroy(req.body.weightKey)
        res.redirect('/weight/viewAll')
    } catch (err){
        next(err)
    }
})


module.exports = router;