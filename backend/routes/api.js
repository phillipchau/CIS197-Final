const express = require('express')
const Education = require('../models/education')
const Experience = require('../models/experience')

const router = express.Router() 

router.post('/education/add', (req, res) => {
    const { educationInfo } = req.body
    const user = req.session.username
    Education.create({ user, educationInfo }, (err, data) => {
        if (err) {
            console.log('error in creating data')
        } else {
            res.send('education added successfully')
        }
    })
})

router.post('/experience/add', (req, res) => {
    const { experienceInfo } = req.body
    const user = req.session.username
    Experience.create({ user, experienceInfo }, (err, data) => {
        if (err) {
            console.log('error in creating data')
        } else {
            res.send('education added successfully')
        }
    })
})

module.exports = router