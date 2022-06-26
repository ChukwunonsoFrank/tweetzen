const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const PORT = process.env.PORT || 1337

const app = express()
const routesConfig = require('./config/routes')

/** Middleware */

// EJS Layout and Templating
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')

// Static Assets
app.use(express.static('assets'))

// Morgan - Logging Middleware
app.use(morgan('dev'))

// Routes
app.use('/', routesConfig)

app.listen(PORT, console.log(`Server started on port: ${PORT}`))



