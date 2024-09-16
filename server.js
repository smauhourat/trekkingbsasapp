const environment = require('./environment')
global.env = environment

const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())
// Connect DB
connectDB()

// Init Middleware
app.use(express.json({ extended: false, limit: '50mb' }))
// app.use(morgan('tiny'));

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  return next()
})

app.get('/api/test', (req, res) => {
  res.send('test')
})

// Define Routes
app.use('/api/users', require('./routes/api/users'));
//app.use('/api/users/:id/verify-email/:token', require('./routes/api/users'));
app.use('/api/customers', require('./routes/api/customers'));
app.use('/api/trips', require('./routes/api/trips'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/image-upload', require('./routes/api/image-upload'));
app.use('/api/trips/:id/images', require('./routes/api/images'));
app.use('/api/contact', require('./routes/api/contact'));
app.use('/api/appconf', require('./routes/api/appconf'));
app.use('/api/books', require('./routes/api/books'));
app.use('/api/accounts', require('./routes/api/accounts'));
app.use('/api/tests', require('./routes/api/tests'));

console.log('SERVER ENVIRONMENT: ', process.env.NODE_ENV)

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
// Set static folder
// app.use(express.static('client/build'));
app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, './client/build/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err)
      }
    }
  )
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
