// middleware to check if user is logged in
const checkSession = (req, res, next) => {
  if (req.session.username !== '') {
    next()
  } else {
    next(new Error('User is not logged in!'))
  }
}

module.exports = checkSession
