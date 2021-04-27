const express = require('express')
const AWS = require('aws-sdk')
const isAuthenticated = require('../middleware/isAuthenticated')
const Education = require('../models/education')
const Experience = require('../models/experience')
const Skill = require('../models/skills')

const router = express.Router()

// router for skills
router.post('/skills/add', isAuthenticated, (req, res, next) => {
  const { username } = req.session
  console.log(username)
  const {
    skill, type,
  } = req.body
  Skill.create({
    username, skill, type,
  }, (err, data) => {
    if (err) {
      console.log(err)
      next(new Error('Data cant be added'))
    } else {
      res.send('skill added successfully')
    }
  })
})

router.get('/skills/:username', isAuthenticated, (req, res, next) => {
  const { username } = req.params
  const { type } = req.query
  Skill.find({ username, type }, (err, data) => {
    if (err) {
      next(new Error('Data not found'))
    } else {
      res.send(data)
    }
  })
})

router.post('/skills/delete/:skill', isAuthenticated, (req, res, next) => {
  const { username } = req.session
  const { skill } = req.params
  Skill.deleteOne({ username, skill }, (err, data) => {
    if (err) {
      next(new Error('Failed to remove'))
    } else {
      res.send(data)
    }
  })
})

router.get('/education/:username', isAuthenticated, (req, res, next) => {
  const { username } = req.params
  Education.find({ username }, (err, data) => {
    if (err) {
      next(new Error('Data not found'))
    } else {
      res.send(data)
    }
  })
})

router.post('/education/add', isAuthenticated, (req, res, next) => {
  const {
    name, startdate, enddate, location, description,
  } = req.body
  let { media } = req.body
  const { username } = req.session
  if (media === '') {
    media = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  }
  Education.create({
    username, name, startdate, enddate, location, description, media,
  }, (err, data) => {
    if (err) {
      console.log(err)
      next(new Error('Data cant be added'))
    } else {
      res.send('education added successfully')
    }
  })
})

router.post('/experience/add', isAuthenticated, (req, res, next) => {
  const {
    name, startdate, enddate, location, description,
  } = req.body
  let {
    media,
  } = req.body
  const { username } = req.session
  if (media === '') {
    media = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  }
  Experience.create({
    username, name, startdate, enddate, location, description, media,
  }, (err, data) => {
    if (err) {
      console.log(err)
      next(new Error('Data cant be added'))
    } else {
      res.send('experience added successfully')
    }
  })
})

router.get('/experience/:username', isAuthenticated, (req, res, next) => {
  const { username } = req.params
  Experience.find({ username }, (err, data) => {
    if (err) {
      next(new Error('Data not found'))
    } else {
      res.send(data)
    }
  })
})

router.post('/experience/edit', isAuthenticated, (req, res, next) => {
  const {
    _id, name, startdate, enddate, location, description, media,
  } = req.body
  Experience.findOneAndUpdate({ _id }, {
    name, startdate, enddate, location, description, media,
  }, { useFindAndModify: false }, (err, data) => {
    if (err) {
      next(new Error('Could not update experience'))
    } else {
      res.send('experience is updated')
    }
  })
})

router.post('/experience/delete', isAuthenticated, (req, res, next) => {
  const {
    _id,
  } = req.body
  Experience.findOneAndDelete({ _id }, (err, data) => {
    if (err) {
      console.log(err)
      next(new Error('Could not update experience'))
    } else {
      res.send('experience is deleted')
    }
  })
})

router.post('/education/delete', isAuthenticated, (req, res, next) => {
  const {
    _id,
  } = req.body
  Education.findOneAndDelete({ _id }, (err, data) => {
    if (err) {
      console.log(err)
      next(new Error('Could not update experience'))
    } else {
      res.send('experience is deleted')
    }
  })
})

router.post('/education/edit', isAuthenticated, (req, res, next) => {
  const {
    _id, name, startdate, enddate, location, description, media,
  } = req.body
  Education.findOneAndUpdate({ _id }, {
    name, startdate, enddate, location, description, media,
  }, { useFindAndModify: false }, (err, data) => {
    if (err) {
      next(new Error('Could not update education'))
    } else {
      res.send('education is updated')
    }
  })
})

module.exports = router
