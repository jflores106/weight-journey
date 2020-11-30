const express = require('express')
const router = express.Router()
const { weightController } = require('../controllers/weight-controller')
const { addEntryValidations } = require('../controllers/weight-controller')

router.get('/add', async (req, res, next) => {
    await weightController.add(req, res, next)
})

router.post('/save', addEntryValidations, async (req, res, next) =>{
    await weightController.save(req, res, next)
})

router.get('/view', async (req, res, next) =>{
    await weightController.view(req, res, next)

})

router.get('/viewAll', async function(req, res, next) {
    await weightController.viewAll(req, res, next)
})

router.get('/edit', async (req, res, next) => {
    await weightController.edit(req, res, next)

})

router.get('/destroy', async (req, res, next) => {
    await weightController.destroy(req, res, next)
})

router.post('/destroy/confirm', async (req, res, next) => {
    await weightController.destroyConfirm(req, res, next)
})

module.exports = router;