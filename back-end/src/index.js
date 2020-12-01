const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use('/about', require('../routes/about'))
app.use('/contact', require('../routes/contact'))
app.use('/experience', require('../routes/experience'))
app.use('/home', require('../routes/home'))
app.use('/project', require('../routes/project'))
app.use('/skill', require('../routes/skill'))
app.use('/user', require('../routes/user'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server listening on port ${PORT}`))