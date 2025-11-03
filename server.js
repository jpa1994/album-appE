// Build server
const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000

// Handle security
const helmet = require('helmet')
const cors = require('cors')

// configuring helmet
//server.use(helmet())
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbeddedPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data"],
        "scriptSrc": ["'self", "cdn.jsdeliver.net"]
    }
}))


server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true}))

server.listen(PORT, ()=> console.log`The Dodgers have won the 2025 World Series!!!`)