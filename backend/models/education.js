const { Schema, model } = require('mongoose')

const educationSchema = new Schema({
    username: {type: String, required: true},
    name: { type: String, required: true },
    date: {type: String, required: true},
    location: { type: String, required: true },
    description: {type: String, required: true},
    media: {type: String},
})

module.exports = model('Education', educationSchema)