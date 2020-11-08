const express = require('express')
const cors = require('cors')
const mongo = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
// const fs = require('fs')

// config .env file
dotenv.config()

// inti express app
let server = express()

const _PORT = process.env.PORT || 80 // for development it may be 3001/2/--etc


// middlewares
server.use( express.json() )
server.use( '/api', cors() ) // CORS enabled for APIs
server.use( '/api', require('./API.routes') ) // API routes


// test
let currentNodeENV = process.env.NODE_ENV
console.log('NODE_ENV=' + currentNodeENV)

// // get ready for production route/url test in development
// if (currentNodeENV === 'development') {
//     server.use('*', (req, res) => {
//         res.send('development mode!')
//     })
// } 

// get ready for production
if (currentNodeENV === 'production') {
    console.log('Check : ' + 'PROD')
    // make static folder supports
    server.use(express.static( path.join(__dirname, 'frontend', 'build') ))

    // handle frontend in HTML + JS from React build
    server.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
    })    
}



// Database connection initial
const _DB_URL = process.env.DB_URL
mongo.connect(_DB_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

mongo.connection.on('open', () => console.log('MongoDB is connected!')) // connect mongoDB


// HttpServer listen
if (currentNodeENV === 'production') {
    server.listen(_PORT, () => console.log('MERN app is online'))
} else {
    server.listen(_PORT, () => console.log(`Server is running http://localhost:${_PORT}`))
}
