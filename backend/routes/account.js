const express = require('express')
const User = require('../models/user')
const isAuthenticated = require('../middleware/isAuthenticated')

const router = express.Router()

router.get('/users/:username', isAuthenticated, (req, res, next) => {
  const { username } = req.params
  User.findOne({ username }, (err, user) => {
    if (err) {
      next(new Error('Failed to user'))
    } else if (user) {
      res.send(user)
    } else {
      console.log('handle failure to getting users')
    }
  })
})

router.get('/allusers', isAuthenticated, (req, res, next) => {
  User.find({}, (err, user) => {
    if (err) {
      next(new Error('Failed to get user'))
    } else if (user) {
      res.send(user)
    } else {
      console.log('no user found')
    }
  })
})

router.post('/signup', (req, res, next) => {
  const {
    username, password, first_name, last_name, description, friends, profile,
  } = req.body
  User.create({
    username, password, first_name, last_name, description, friends, profile,
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
      next(new Error('Failed to login'))
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
