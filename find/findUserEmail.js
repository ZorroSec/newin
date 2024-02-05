const MySQlConnect = require("../db/database.js")


async function findUsersWhereEmail({ email, senha }){
    const pool = await MySQlConnect()
    const user = await pool.query(`SELECT * FROM User WHERE email = '${email}' AND senha = '${senha}'`)
    return user
}

module.exports = findUsersWhereEmail