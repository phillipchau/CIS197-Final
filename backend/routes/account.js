const express = require('express')

const User = require('../models/user')

const router = express.Router()

router.post('/signup', (req, res) => {
    const { username, password, first_name, last_name, description } = req.body
    User.create({ username, password, first_name, last_name, description }, (err, data) => {
        if (err) {
            console.log(err)
            console.log('need to handle error')
        } else {
            req.session.username = username
            req.session.password = password
            res.send(`user ${username} is created`)
        }
    })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    User.findOne({ username, password }, (err, user) => {
        if (err) {
            console.log('handle error')
        } else if (user){
            req.session.username = username
            req.session.password = password
            res.send('logged in')
        } else {
            console.log('handle failure to login')
        }
    })
})

router.post('/logout', (req, res) => {
    req.session.username = ''
    req.session.password = ''
    res.send('user logged out')
})

module.exports = router