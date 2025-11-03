const queryAction =(obj, e, r, t)=> {

   const results = ()=> {
               if (!e) {
                if (r.length == 1) {
                    obj.json(...r)
                } else {
                    obj.json(r)
                }
               } else {
                console.log(`DAO Error: ${e}`)
                obj.json({
                        "message": 'error',
                        'table': `${t}`,
                        'error': e
                    })
               }
            }

    return results
}

module.exports = {
    queryAction
}