const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const daoCommon = {
    // create methods that will query the database
    findAll: (req, res, table)=> {

        // .query(sql query, callback func)
        connect.query(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
                //     if (!error) {
                //         if (rows.length === 1) {
                //             res.json(...rows)
                //         } else {
                //             res.json(rows)
                //         }
                //     } else {
                //         console.log(`Dao Error: ${error}`)
                //         res.json({
                //             "message": 'error',
                //             'table': `${table}`,
                //             'error': error
                //         })
                //     }
            }
        )
    },

    findById: (res, table, id)=> {

        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    sort: (res, table, sorter)=> {

        connect.query(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,

            (error, rows)=> {
               queryAction(res, error, rows, table)
            }
        )
    },

    create: (req, res, table)=> {

        // req.body => {}

        if(Object.keys(req.body).length === 0) {
            // Ojbect.keys(obj) => array of keys
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            /**
             * 
             * req.body = {
             *      name: 'Satch',
             *      age: 46,
             *      occupation: 'software',
             *      favTeam: 'Dodgers'
             * }
             * 
             * fields = [name, age, occupation, favTeam]
             * values = ['Satch', 46, 'sofwatre engineeer', 'Dodgers']
             * 
             * fields[0} == name
             * values [0] == 'Satch'
             * 
             * INSERT INTO table SET name = 'Satch', age = 46, ...
             */

            connect.execute(
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
                values,
                (error, dbres)=> {
                    if (!error) {
                        res.json({
                            Last_id: dbres.insertId
                        })
                    } else {
                        console.log(`${table}Dao error: `, error)
                    }
                }
            )
        }
        
    },

    update: (req, res, table)=> {

        // check if id == number
        if (isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": "Id must be a number"
            })
        } else if (Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `UPDATE ${table}
                    SET ${fields.join(' = ?, ')} = ? WHERE ${table}_id = ?;`,
                [...values, req.params.id],
                (error, dbres)=> {
                    if (!error) {
                        // res.send(`Changed ${dbres.changedRows} row(s)`)
                        res.json({
                            "status": "updated",
                            "changed": dbres.changedRows
                        })
                    } else {
                        res.json({
                            "status": true,
                            "message": error
                        })
                    }
                }
            )
        }
    }
}

module.exports = daoCommon