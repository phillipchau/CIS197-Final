const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
  postid: { type: String, required: true },
  username: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  content: { type: String, required: true },
})

module.exports = model('Comments', commentSchema)
