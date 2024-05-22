const jwt = require('jsonwebtoken')
const { User } = require('./db')

exports.authenticate = async (req, res, next) => {
  if (req.user) return next()
  try {
    const { _vnpaydemo_jwt: token } = req.cookies
    if (token && token != 'null') {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded) {
        const user = await User.findByPk(decoded.id)
        console.log('CHECK A', !!user)
        if (user) {
          req.user = user
        }
      }
    }
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.toString()
    })
  }
}
