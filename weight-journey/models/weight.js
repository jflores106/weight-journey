const _weight_key = Symbol('key')
const _weight_date = Symbol('date')
const _weight_body = Symbol('body')

exports.Weight = class Weight{
    constructor(key, date, body) {
        this[_weight_key] = key
        this[_weight_date] = date
        this[_weight_body] = body
    }

    get key() { return this[_weight_key] }
    get date() { return this[_weight_date] }
    set date(newDate) { this[_weight_date] = newDate }
    get body() { return this[_weight_body] }
    set body(newBody) { this[_weight_body] = newBody }
}

exports.AbstractWeightStore = class AbstractWeightStore{
    async close() { }
    async update(key, date, body) { }
    async create(key, date, body) { }
    async read(key) { }
    async destroy(key) { }
    async keyList() { }
    async count() { }
}