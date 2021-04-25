const { Schema, model } = require('mongoose')

const skillSchema = new Schema({
  username: { type: String, required: true },
  skill: { type: String, required: true },
  type: { type: String, required: true },
})

module.exports = model('Skills', skillSchema)
