const router = require('express').Router()

const { artistDao: dao } = require('../../daos/dao')

// http://localhost:3000/api/artist
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)
})

// http://localhost:3000/api/album/get_albums/:id
router.get('/get_albums/:id', (req, res)=> {
    dao.findAlbumsByArtist(res, dao.table, req.params.id)
})

// http://localhost:3000/api/artist/sort/:sort
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

// localhost:3000/api/artist/:id // list id GET requests last
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

// POST

// http://localhost:3000/api/artist/create
router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table)
})

// PATCH
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router