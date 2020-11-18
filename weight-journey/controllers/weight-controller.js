const moment = require('moment')
let Weight = require('../models/weight').Weight


//Create a new item
exports.weightController = {

    add: async (req, res, next) => {
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
    },

    save: async (req, res, next) => {
        try {
            let weight
            if (req.body.saveMethod === 'create')
                weight = await create(req.body.date, req.body.pounds, req.body.body)
            else
                weight = await update(req.body.weightId, req.body.date, req.body.pounds, req.body.body)
            res.redirect(`/weight/view?id=${weight.id}`)

        } catch (err) {
            next(err)
        }
    },

    view: async (req, res, next) => {
        try {
            const weight = await Weight.findOne({ _id: req.query.id.trim() })
            res.render('weight/view_weight', {
                title: 'View Entry',
                weightDate: moment.utc(weight.date).format("MMM Do YYYY"),
                weightId: req.query.id, //ID
                weightPounds: weight.pounds,
                weightBody: weight.body,
                styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
                tabName: 'Entry: ' + moment.utc(weight.date).format("MM/DD/YYYY")
            })
        } catch (err) {
            next(err)
        }
    },

    viewAll: async (req, res, next) => {
        try {
            const weights = await Weight.find({})
            let allWeight = weights.map(weight => {
                return {
                    id: weight.id, //ID
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
    },

    edit: async (req, res, next) => {
        try{
            const weight = await Weight.findOne({ _id: req.query.id.trim() })

            res.render('weight/edit_weight', {
                isCreate: false,
                title: 'Edit Entry',
                weightDate: moment.utc(weight.date).format("YYYY-MM-DD"),
                weightId: req.query.id, //ID
                weightPounds: weight.pounds,
                weightBody: weight.body,
                styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
                tabName: 'Edit Entry: ' + moment.utc(weight.date).format("MM/DD/YYYY")
            })
        } catch (err){
            next(err)
        }
    },

    destroy: async (req, res, next) => {
        try{
            let weight = await Weight.findOne({ _id: req.query.id.trim() })

            res.render('weight/delete_weight', {
                title: 'Delete Entry',
                weightId: req.query.id, //ID
                weightDate: moment.utc(weight.date).format("MMM Do YYYY"),
                styles: ['/stylesheets/style.css', '/stylesheets/style2.css'],
                tabName: 'Delete Entry: ' + moment.utc(weight.date).format("MM/DD/YYYY")
            })
        } catch (err){
            next(err)
        }
    },

    destroyConf: async (req, res, next) => {
        try{
            await Weight.findByIdAndDelete(req.body.weightId)

            req.flash('success', 'successfully deleted entry')
            res.redirect('/weight/viewAll')
        } catch (err){
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
    let weight = await Weight.findByIdAndUpdate({ _id: id }, {date: date, pounds: pounds, body: body },{new: true})
    return weight
}


