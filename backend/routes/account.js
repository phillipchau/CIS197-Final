const express = require('express')
const User = require('../models/user')
const isAuthenticated = require('../middleware/isAuthenticated')

const router = express.Router()

router.get('/users/:username', isAuthenticated, (req, res, next) => {
  const { username } = req.params
  User.findOne({ username }, (err, user) => {
    if (err) {
      next(new Error('Failed to login'))
    } else if (user) {
      res.send(user)
    } else {
      console.log('handle failure to getting users')
    }
  })
})
router.post('/signup', (req, res, next) => {
  const {
    username, password, first_name, last_name, description,
  } = req.body
  User.create({
    username, password, first_name, last_name, description,
  }, (err, data) => {
    if (err) {
      next(new Error('Failed to signup'))
    } else {
      req.session.username = username
      req.session.password = password
      res.send(`user ${username} is created`)
    }
  })
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  User.findOne({ username, password }, (err, user) => {
    if (err) {
      next(new Error('Failed to login'))
    } else if (user) {
      req.session.username = username
      req.session.password = password
      res.send('logged in')
    } else {
      console.log('handle failure to login')
    }
  })
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = ''
  req.session.password = ''
  res.send('user logged out')
})

router.get('/logstatus', (req, res) => {
  res.send({ user: req.session.username })
})

module.exports = router
