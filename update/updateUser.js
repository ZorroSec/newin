const MySQlConnect = require("../db/database.js");
const queryIpFunction = require("../models/ip.js");

async function updateUserIpWhereEmail({ email, senha }){
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const query = {
        sql: `
        UPDATE User
        SET ip = '${ip.ip}'
        WHERE email = '${email}' AND senha = '${senha}'
        `,
        values: [email, senha]
    }
    const [rows, results] = pool.query(query.sql)
    return {
        status: {
            message: "User ip Updated",
        },
        rows
    }
}

module.exports = updateUserIpWhereEmail