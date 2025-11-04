const con = require('../../config/dbconfig')

const artistDao = {
    table: 'artist',

    // methods that are particular to the artist table

    // findAlbumsByArtist
    findAlbumsByArtist: (res, table, id)=> {
        let albums = []

        let sql = `SELECT album_id, title, yr_released FROM album WHERE artist_id = ${id}; `

        // .execute(query, callback function)
        // .exectute(query, array, callback function)
        con.execute(
            sql,
            (error, rows)=> {
                if (!error) {
                    Object.values(rows).forEach(obj => {
                        albums.push(obj)
                    })
                    // console.log(albums) // test here
                    con.execute(
                        `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> {
                            rows.forEach(row => {
                                row.albums = albums
                            })
                            if (!error) {
                                res.json(...rows)
                            } else {
                                console.log('DAO Error:', error)
                            }
                        }
                    )
                } else {
                    res.json({
                        message: 'error',
                        table: `${table}`,
                        error: error
                    })
                }
            }
        )
    }
}

module.exports = artistDao