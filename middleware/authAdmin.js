const jwt = require('jsonwebtoken')

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1MTFmN2ExNmQwZTA2NjgxMjgxYzI4IiwiYWRtaW4iOnRydWV9LCJpYXQiOjE3MjUyODk5MzksImV4cCI6MTcyNTI5NzEzOX0.tFWP3vN8EGgH3ZVf0kXnrrMo9Yyaa4ekmnTs_PHSJI4

 const authAdmin = function (req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
      return res.status(401).json({ msg: 'Token not found' })
    }
  
    // Verify token from header
    try {
      const decodedToken = jwt.verify(token, global.env.jwtSecret)
      req.user = decodedToken.user
      if (!req?.user?.admin) return res.status(401).json({ msg: 'No tiene permisos' })
      return next()
    } catch (err) {
      return res.status(401).json({ msg: 'Token not valid' })
    }

    //if (!req?.user?.admin) return res.status(401).json({ msg: 'No tiene permisos' })
    //return next();
  }


module.exports = authAdmin