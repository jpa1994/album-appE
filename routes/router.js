const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000

// Home Page => http://localhost:3000
router.get('/', (req,res)=> {
    res.render('pages/home', {
        title: 'album-app home',
        name: "John's Album App"
    })
})

// Artist-Form => http://localhost:3000/artist-form
router.get('/artist-form', (req, res)=> {
    res.render('pages/artist-form', {
        title: 'artist form',
        name: 'artist-form'
    })
})

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
    // .send('<h1>404 Error: This page does not exist.</h1>')
    .render('pages/error', {
        title: 'Error Page',
        name: 'Error'
    })
})

module.exports = router