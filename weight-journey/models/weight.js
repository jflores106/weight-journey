/*const _weight_key = Symbol('key')
const _weight_date = Symbol('date')
const _weight_pounds = Symbol('pounds')
const _weight_body = Symbol('body')

exports.Weight = class Weight{
    constructor(key, date, pounds, body) {
        this[_weight_key] = key
        this[_weight_date] = date
        this[_weight_pounds] = pounds
        this[_weight_body] = body
    }

    get key() { return this[_weight_key] }
    get date() { return this[_weight_date] }
    set date(newDate) { this[_weight_date] = newDate }
    get pounds() { return this[_weight_pounds] }
    set pounds(newPounds) { this[_weight_pounds] = newPounds }
    get body() { return this[_weight_body] }
    set body(newBody) { this[_weight_body] = newBody }
}*/

exports.AbstractWeightStore = class AbstractWeightStore{
    async close() { }
    async update(key, date, pounds, body) { }
    async create(key, date, pounds, body) { }
    async read(key) { }
    async destroy(key) { }
    async keyList() { }
    async count() { }
}

const mongoose = require('mongoose')
const WeightSchema = new mongoose.Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    pounds: {
        type: Number,
        required: [true, 'Number is required'],
        minLength: 1
    },
    body: {
        type: String,
        require: false
        // required: [true, 'Diary entry is required']
    }
})

exports.Weight = mongoose.model('weight', WeightSchema)