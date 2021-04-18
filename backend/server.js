const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')

const AccountRouter = require('./routes/account')
const InfoRouter = require('./routes/api')
const FeedRouter = require('./routes/feed')

const app = express()
const MONGO_URI = 'mongodb://localhost:27017/Final'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const errorHandle = (err, req, res, next) => {
  res.status(200).send(`ERROR: ${err}`)
}

app.use(cookieSession({
  name: 'session',
  keys: ['key1'],
}))
// INTEGRATION
app.use(express.static('dist'))
app.use(express.json())

app.use('/api', InfoRouter)
app.use('/account', AccountRouter)
app.use('/feed', FeedRouter)
app.use(errorHandle)

// INTEGRATION
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
