const express = require('express')
const isAuthenticated = require('../middleware/isAuthenticated')
const Posts = require('../models/posts')
const Comments = require('../models/comments')

const router = express.Router()

router.get('/posts', isAuthenticated, (req, res, next) => {
  Posts.find({ }, (err, data) => {
    if (err) {
      next(new Error('Data not found'))
    } else {
      res.send(data)
    }
  })
})

router.post('/posts/add', isAuthenticated, (req, res, next) => {
  const {
    username, first_name, last_name, content, profile, date, likes,
  } = req.body
  Posts.create({
    username, first_name, last_name, content, profile, date, likes,
  }, (err, data) => {
    if (err) {
      console.log(err)
      next(new Error('Data cant be added'))
    } else {
      res.send('posts added successfully')
    }
  })
})

router.post('/posts/addlike', isAuthenticated, (req, res, next) => {
  const {
    _id, person,
  } = req.body
  Posts.updateOne({ _id },
    {
      $addToSet: {
        likes: person,
      },
    },
    (err, result) => {
      if (err) {
        console.log(err)
        next(new Error('Data not found'))
      } else {
        res.send(result)
      }
    })
})

router.post('/posts/deletelike', isAuthenticated, (req, res, next) => {
  const {
    _id, person,
  } = req.body
  Posts.updateOne({ _id },
    {
      $pull: {
        likes: person,
      },
    },
    (err, result) => {
      if (err) {
        console.log(err)
        next(new Error('Data not found'))
      } else {
        res.send(result)
      }
    })
})

router.get('/comments/:postid', isAuthenticated, (req, res, next) => {
  const { postid } = req.params
  Comments.find({ postid }, (err, data) => {
    if (err) {
      next(new Error('Data not found'))
    } else {
      res.send(data)
    }
  })
})

router.post('/comments/add', isAuthenticated, (req, res, next) => {
  const {
    postid, username, first_name, last_name, content, profile,
  } = req.body
  Comments.create({
    postid, username, first_name, last_name, content, profile,
  }, (err, data) => {
    if (err) {
      console.log(err)
      next(new Error('Data cant be added'))
    } else {
      res.send('comment added successfully')
    }
  })
})

module.exports = router
