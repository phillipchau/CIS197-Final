const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  username: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  content: { type: String, required: true },
})

module.exports = model('Posts', postSchema)
