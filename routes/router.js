const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000

// Root Route => http://localhost:3000/api
router.get('/api', (req, res)=> {
    // res.send('album api')
    res.json({
        'All Albums': `http://localhost:${PORT}/api/album`,
        'All Artists': `http://localhost:${PORT}/api/artist`,
        'All Bands': `http://localhost:${PORT}/api/band`,
        'All Labels': `http://localhost:${PORT}/api/label`
    })
})

const endpoints = [
    'album',
    'artist',
    'band',
    'label'
]

// router.use('/api/album', require('./api/albumRoutes'))
// router.use('/api/artist', require('./api/artistRoutes'))
endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})


// Error handling
router.use((req, res, next)=> {
    res.status(404)
    .send('<h1>404 Error: This page does not exist.</h1>')
})

module.exports = router