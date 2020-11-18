const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaTypes = mongoose.SchemaTypes
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    weight: [
        {
            type: SchemaTypes.ObjectID,
            ref: 'Weight'
        }
    ]
})


UserSchema.virtual('fullName').get(function () {
    return `${this.name.first} ${this.name.last}`
})

UserSchema.pre('save', async function (next) {
    let user = this
    try {
        // user.email = await bcrypt.hash(user.email, 10)
        user.password = await bcrypt.hash(user.password, 10)
    } catch (err) {
        console.log(`Error in hashing password: ${err.message}`)
    }
})

UserSchema.methods.passwordComparison = async function(inputPassword) {
    let user = this
    return await bcrypt.compare(inputPassword, user.password)
}

exports.User = mongoose.model('users', UserSchema)