const express = require('express')
const isAuthenticated = require('../middleware/isAuthenticated')
const Education = require('../models/education')
const Experience = require('../models/experience')

const router = express.Router()

router.get('/education', isAuthenticated, (req, res, next) => {
  const username = req.session.username
    Education.find({username}, (err, data) => {
      if (err) {
        next(new Error('Data not found'))
      } else {
        res.send(data)
      }
    })
})

router.post('/education/add', isAuthenticated, (req, res, next) => {
    const { name, date, location, description } = req.body
    const username = req.session.username
    Education.create({ username, name, date, location, description }, (err, data) => {
        if (err) {
            next(new Error('Data cant be added'))
        } else {
            res.send('education added successfully')
        }
    })
})

router.post('/experience/add', isAuthenticated, (req, res, next) => {
    const { name, date, location, description } = req.body
    const username = req.session.username
    Experience.create({ username, name, date, location, description }, (err, data) => {
        if (err) {
            next(new Error('Data cant be added'))
        } else {
            res.send('experience added successfully')
        }
    })
})

router.get('/experience', isAuthenticated, (req, res, next) => {
    const username = req.session.username
    Experience.find({username}, (err, data) => {
      if (err) {
        next(new Error('Data not found'))
      } else {
        res.send(data)
      }
    })
})

router.post('/experience/edit', isAuthenticated, (req, res, next) => {
    const { _id, name, date, location, description } = req.body
    Experience.findOneAndUpdate({ _id }, { name, date, location, description }, { useFindAndModify: false }, (err, data) => {
      if (err) {
        next(new Error('Could not update experience'))
      } else {
        res.send('experience is updated')
      }
    })
})

router.post('/education/edit', isAuthenticated, (req, res, next) => {
    const { _id, name, date, location, description } = req.body
    Education.findOneAndUpdate({ _id }, { name, date, location, description }, { useFindAndModify: false }, (err, data) => {
      if (err) {
        next(new Error('Could not update education'))
      } else {
        res.send('education is updated')
      }
    })
})

module.exports = router