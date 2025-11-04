const con = require('../../config/dbconfig')

const bandDao = {
    table: 'band',

    // methods that are particular to the band table

    // findAlbumsByBand
    findAlbumsByBand: (res, table, id)=> {
        let bands = []

        let sql = `SELECT band_id, title, yr_released FROM album WHERE band_id = ${id}; `

        // .execute(query, callback function)
        // .exectute(query, array, callback function)
        con.execute(
            sql,
            (error, rows)=> {
                if (!error) {
                    Object.values(rows).forEach(obj => {
                        bands.push(obj)
                    })
                    // console.log(albums) // test here
                    con.execute(
                        `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> {
                            rows.forEach(row => {
                                row.bands = bands
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

module.exports = bandDao