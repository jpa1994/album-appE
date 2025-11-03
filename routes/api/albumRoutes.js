const express = require('express')
const router = express.Router()

const { albumDao: dao } = require('../../daos/dao')

// http://localhost:3000/api/album
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)
})

router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)
})

// http://localhost:3000/api/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router