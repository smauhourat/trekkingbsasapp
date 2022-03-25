const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({extended: false}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return next();
})

app.get('/', (req, res) => res.send('API running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/trips', require('./routes/api/trips'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/image-upload', require('./routes/api/image-upload'));

app.use('/api/trips/:id/images', require('./routes/api/images'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));