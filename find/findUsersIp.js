const { MySQlConnect } = require("../db/database.js")

async function findUsersWhereIp(ip){
    const pool = await MySQlConnect()
    const query = {
        sql: `SELECT * = railway.User WHERE ip = '${ip}'`,
        values: []
    }
    const result = await pool.query(`SELECT * = railway.User WHERE ip = '${ip}'`)
    return result
}

module.exports = findUsersWhereIp