let Weight = require('../models/weight').Weight
const moment = require('moment')
let {User} = require('../models/user')
const {body, validationResult} = require('express-validator')

exports.weightController = {
    add: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                res.render('weight/add_weight', {
                    isCreate: true,
                    title: 'Add an Entry',
                    styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
                    isAddWeightActive: 'active',
                    tabName: 'New Entry'
                })
            } catch (err) {
                next(err)
            }
        } else {
            req.flash('error', 'Please log in to access entries')
            res.redirect('/users/login')
        }
    },

    save: async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('back')
        } else {
            try {
                let weight
                if (req.body.saveMethod === 'create') {
                    weight = await create(req.body.date, req.body.pounds, req.body.body)
                    req.user.weight.push(weight.id.trim())
                    req.user = await User.findByIdAndUpdate({_id: req.user.id.trim()}, {weight: req.user.weight}, {new: true})
                    req.flash('success', 'Successfully added an entry')
                } else {
                    weight = await update(req.body.weightId, req.body.date, req.body.pounds, req.body.body)
                    req.flash('success', 'Successfully edited entry')
                }
                res.redirect(`/weight/view?id=${weight.id}`)
            } catch (err) {
                next(err)
            }
        }
    },

    view: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                const weight = await Weight.findOne({_id: req.query.id.trim()})
                res.render('weight/view_weight', {
                    title: 'View Entry', //View Weight
                    weightId: weight._id,
                    weightDate: moment.utc(weight.date).format("MMM Do YYYY"),
                    weightPounds: weight.pounds,
                    weightBody: weight.body,
                    styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
                    tabName: 'Entry: ' + moment.utc(weight.date).format("MM/DD/YYYY")
                })
            } catch (err) {
                next(err)
            }
        } else {
            req.flash('error', 'Please log in to access the entry')
            res.redirect('/users/login')
        }
    },

    viewAll: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                let weightIds = req.user.weight
                let weightPromises = weightIds.map(id => Weight.findOne({_id: id}))
                let weights = await Promise.all(weightPromises)
                let allWeight = weights.map(weight => {
                    return {
                        id: weight.id,
                        date: moment.utc(weight.date).format("MM/DD/YYYY"),
                        pounds: weight.pounds,
                    }
                })
                res.render('weight/view_list', {
                    weightList: allWeight,
                    title: 'Entries',
                    styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
                    isViewWeightActive: 'active',
                    tabName: 'View Entries'
                })
            } catch (err) {
                next(err)
            }
        } else {
            req.flash('error', 'Please log in to access entries')
            res.redirect('/users/login')
        }
    },

    edit: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                const weight = await Weight.findOne({_id: req.query.id.trim()})
                res.render('weight/edit_weight', {
                    isCreate: false,
                    title: 'Edit Entry',
                    weightId: weight._id,
                    weightDate: moment.utc(weight.date).format("YYYY-MM-DD"),
                    weightPounds: weight.pounds,
                    weightBody: weight.body,
                    styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
                    tabName: 'Edit Entry: ' + moment.utc(weight.date).format("MM/DD/YYYY")
                })
            } catch (err) {
                next(err)
            }
        } else {
            req.flash('error', 'Please log in to access entries')
            res.redirect('/users/login')
        }
    },

    destroy: async (req, res, next) => {
        try {
            let weight = await Weight.findOne({_id: req.query.id.trim()})
            res.render('weight/delete_weight', {
                title: 'Delete Entry',
                weightId: weight._id,
                weightDate: moment.utc(weight.date).format("MMM Do YYYY"),
                styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
                tabName: 'Delete Entry: ' + moment.utc(weight.date).format("MM/DD/YYYY")
            })
        } catch (err) {
            next(err)
        }
    },

    destroyConfirm: async (req, res, next) => {
        try {
            let IdIndex = req.user.weight.indexOf(req.body.weightId)
            req.user.weight.splice(IdIndex, 1)
            req.user = await User.findByIdAndUpdate({_id: req.user.id.trim()}, {weight: req.user.weight}, {new: true})
            await Weight.findByIdAndDelete(req.body.weightId)
            req.flash('success', 'Successfully deleted an entry')
            res.redirect('/weight/viewAll')
        } catch (err) {
            next(err)
        }
    }
}


create = async (date, pounds, body) => {
    let weight = new Weight({
        date: date,
        pounds: pounds,
        body: body
    })
    weight = await weight.save()
    return weight
}


update = async (id, date, pounds, body) => {
    id = id.trim()
    let weight = await Weight.findByIdAndUpdate({_id: id}, {date: date, pounds: pounds, body: body}, {new: true})
    return weight
}

exports.addEntryValidations = [
    body('date')
        .notEmpty().withMessage('Date is required'),
    body('pounds')
        .notEmpty().withMessage('Weight is required')
]