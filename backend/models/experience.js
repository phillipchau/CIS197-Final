const { Schema, model } = require('mongoose')

const experienceSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  startdate: { type: String, required: true },
  enddate: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  media: { type: String },
})

module.exports = model('Experience', experienceSchema)
