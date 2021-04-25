const express = require('express')
const AWS = require('aws-sdk')
const multer = require('multer')
const config = require('./config')
const User = require('../models/user')

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '');
  }
})

const upload = multer({storage: storage}).single('file')

const router = express.Router()

router.post('/upload', upload, async (req, res, next) => {
  const image = req.file
  const filename = image.originalname
  const { username } = req.session
  const s3 = new AWS.S3(config)
  const params = {
    Bucket: 'cis197final',
    Key: `${username}/${filename}`,
    Body: image.buffer,
  }
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const profile = `https://cis197final.s3-us-west-1.amazonaws.com/${username}/${filename}`
      console.log('success')
      User.updateOne({ username }, { $set: { profile } }, (error, info) => {
        if (error) {
          next(new Error('Could not update experience'))
        } else {
          res.send('profile is updated')
        }
      })
    }
  })
})

module.exports = router
