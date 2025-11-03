const daoCommon = require('./common/daoCommon')

const albumDao = {
    ...daoCommon,
    ...require('./api/albumDao')
}

module.exports = {
    albumDao
}