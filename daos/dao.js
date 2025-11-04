const daoCommon = require('./common/daoCommon')

const albumDao = {
    ...daoCommon,
    ...require('./api/albumDao')
}

const artistDao = {
    ...daoCommon,
    ...require('./api/artistDao')
}

const bandDao = {
    ...daoCommon,
    ...require('./api/bandDao')
}

const labelDao = {
    ...daoCommon,
    ...require('./api/labelDao')
}

module.exports = {
    albumDao,
    artistDao,
    bandDao,
    labelDao
}