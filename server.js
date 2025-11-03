// Build server
const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000

server.listen(PORT, ()=> console.log`The Dodgers have won the 2025 Series!!!`)