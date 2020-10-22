let Weight = require('./weight').Weight
let AbstractWeightStore = require('./weight').AbstractWeightStore

let weight = [];
exports.InMemoryWeightStore = class InMemoryWeightStore extends AbstractWeightStore {

    async close() { }

    async update(key, date, body) {
        weight[key].date = date
        weight[key].body = body
        return weight[key]
    }

    async create(key, date, body){
        weight[key] = new Weight(key, date, body)
        return weight[key]
    }

    async read(key) {
        if (weight[key])
            return weight[key]
        else
            throw new Error(`Weight ${key} does not exist`)
    }

    async destroy(key){
        if (weight[key])
            delete weight[key]
        else
            throw new Error(`Weight ${key} does not exist`)
    }

    async keyList() {
        return Object.keys(weight)
    }

    async count() {
        return weight.length
    }
}