let Weight = require('./weight').Weight
let AbstractWeightStore = require('./weight').AbstractWeightStore

const moment = require('moment')

const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (err) {
        console.log(err)
    }
}

exports.MongooseWeightStore = class MongooseWeightStore extends AbstractWeightStore {

    async update(key, date, pounds, body) {
        await connectDB()
        let weight = await Weight.findOneAndUpdate({ key: key }, {
            date: date,
            pounds: pounds,
            body: body
        })
        await mongoose.disconnect()
        return weight
    }

    async create(key, date, pounds, body){
        await connectDB()

        let weight = new Weight({
            // key: max,
            key: key,
            date: date,
            pounds: pounds,
            body: body
        })
        await weight.save()
        await mongoose.disconnect()
        return weight
    }


    async read(key) {
        await connectDB()
        const weight = await Weight.findOne({ key: key})
        await mongoose.disconnect()
        return weight
    }

    async destroy(key){
        await connectDB()
        const weight = await Weight.findOneAndDelete({ key: key} )
        await mongoose.disconnect()
        return weight

    }


    async findAllWeight() {
        await connectDB()
        const entries = await Weight.find({})
        await mongoose.disconnect()
        return entries.map(weight => {
            return {
                key: weight.key,
                date: moment(weight.date).format("MM/DD/YYYY"),
                pounds: weight.pounds
            }
        })
    }

    async count() {
        await connectDB()
        let documents = await Weight.find({})

        let arr =  documents.map(weight => { return weight.key })
        let count = Math.max(...arr) + 1

        await mongoose.disconnect()
        return count
    }
}
