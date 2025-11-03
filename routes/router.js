const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000

// Root Route => http://localhost:3000/api
router.get('/api', (req, res)=> {
    // res.send('album api')
    res.json({
        'All Albums': `http://localhost:${PORT}/api/album`
    })
})

// Error handling
router.use((req, res, next)=> {
    res.status(404)
    .send('<h1>404 Error: This page does not exist.</h1>')
})

module.exports = router