const express = require('express')
const router = express.Router()
const { weightController } = require('../controllers/weight-controller')


//Create a new item
router.get('/add', async (req, res, next) => {
    await weightController.add(req, res, next)

})


//Saves notes
router.post('/save', async (req, res, next) =>{
    await weightController.save(req, res, next)

})

//View a specific item
router.get('/view', async (req, res, next) =>{
    await weightController.view(req, res, next)

})

// View all currently saved items
router.get('/viewAll', async function(req, res, next) {
    await weightController.viewAll(req, res, next)
})


//Edit a specific item
router.get('/edit', async (req, res, next) => {
    await weightController.edit(req, res, next)

})

router.get('/destroy', async (req, res, next) => {
    await weightController.destroy(req, res, next)
})

router.post('/destroy/confirm', async (req, res, next) => {
    await weightController.destroyConf(req, res, next)
})


module.exports = router;