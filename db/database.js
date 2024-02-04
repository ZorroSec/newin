const mysql = require("mysql2")

async function MySQlConnect(){
    const connection = mysql.createPool({
        uri: "mysql://root:4Bc2CG35D-HD564FAd3cDag2hEEec4Ag@monorail.proxy.rlwy.net:18114/railway"
    })
    const pool = connection.promise()
    return pool
}

module.exports = MySQlConnect