const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: {type: String, required: true},
    description: {type: String, required: true},
})

module.exports = model('User', userSchema)