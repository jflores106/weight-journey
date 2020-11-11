const express = require('express')
const router = express.Router()
let weightStore = require('../app').weightStore
const moment = require('moment')

//Create a new item
router.get('/add', async (req, res, next) => {
    try {
        res.render('add_weight', {
            isCreate: true,
            title: 'Add an Entry',
            weightKey: await weightStore.count(),
            // weightKey: (Date.now() + Math.random()),
            styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
            isAddWeightActive: 'active',
            tabName: 'New Entry'
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
            weight = await weightStore.create(req.body.weightKey, req.body.date, req.body.pounds, req.body.body)
        else
            weight = await weightStore.update(req.body.weightKey, req.body.date, req.body.pounds, req.body.body)
        res.redirect('/weight/view?key=' + req.body.weightKey)
        // res.redirect('/weight/view?key=' + req.body.weightKey)
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
            weightDate: moment(weight.date).format("MMM Do YYYY"),
            weightKey: weight.key,
            // weightKey: (Date.now() + Math.random()),
            weightPounds: weight.pounds,
            weightBody: weight.body,
            styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
            tabName: 'Entry: ' + moment(weight.date).format("MM/DD/YYYY")
        })
    } catch (err) {
        next(err)
    }
})

// View all currently saved items
router.get('/viewAll', async function(req, res, next) {
    try {
        let allWeight = await weightStore.findAllWeight()

        res.render('view_list', {
            weightList: allWeight,
            title: 'Entries',
            styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
            isViewWeightActive: 'active',
            tabName: 'View Entries'
        });
    } catch (err) {
        next(err)
    }
});




//Edit a specific item
router.get('/edit', async (req, res, next) => {
    try{
        let weight = await weightStore.read(req.query.key)
        res.render('edit_weight', {
            isCreate: false,
            title: 'Edit Entry',
            weightDate: moment(weight.date).format("YYYY-MM-DD"),
            weightKey: weight.key,
            weightPounds: weight.pounds,
            weightBody: weight.body,
            styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
            tabName: 'Edit Entry: ' + moment(weight.date).format("MM/DD/YYYY")
        })
    } catch (err){
        next(err)
    }
})

router.get('/destroy', async (req, res, next) => {
    try{
        let weight = await weightStore.read(req.query.key)
        res.render('delete_weight', {
            title: 'Delete Entry',
            weightKey: weight.key,
            weightDate: moment(weight.date).format("MMM Do YYYY"),
            styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
            // tabName: 'Delete Entry: ' + weight.date
            tabName: 'Delete Entry: ' + moment(weight.date).format("MM/DD/YYYY")
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