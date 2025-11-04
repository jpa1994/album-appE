const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const albumDao = {

    table: 'album',

    findAlbumInfo: (res, table)=> {

        const sql = `SELECT al.album_id, al.title, al.artist_id, al.band_id, al.label_id, al.yr_released,
        CASE 
            WHEN ar.fName IS NULL THEN ''
            ELSE ar.fName
            END fName,
        CASE
            WHEN ar.lName IS NULL THEN ''
            ELSE ar.lName
            END lName,
        CASE
            WHEN b.band IS NULL THEN ''
            ELSE b.band
            END band,
        l.label
        FROM album al
        LEFT OUTER JOIN artist ar USING (artist_id)
        LEFT OUTER JOIN band b USING (band_id)
        JOIN label l USING (label_id)
        ORDER BY al.album_id;`
        
        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = albumDao