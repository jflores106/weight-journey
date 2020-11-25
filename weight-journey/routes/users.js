const express = require('express')
const router = express.Router()
const { registerValidations, userController } = require('../controllers/user-controller')

router.get('/register', async (req, res, next) => {
    res.render('users/register', {
        tabName: 'Sign-up',
        styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
        isRegisterActive: 'active',
    })
})


router.post('/register', registerValidations, async (req, res, next) => {
    await userController.create(req, res, next)
})

router.get('/login', async (req, res, next) => {
    res.render('users/login', {
        tabName: 'Login',
        styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
        isLoginActive: 'active',
    })
})

router.post('/login', async (req, res, next) => {
    await userController.authenticate(req, res)
})

router.get('/logout', async (req, res, next ) => {
    await userController.loggingOut(req, res, next)
})

router.get('/myaccount', async (req, res, next) => {
    await userController.profile(req, res, next)

})

router.post('/myaccount', async (req, res, next) => {
    await userController.passwordChange(req, res, next)
})

module.exports = router


