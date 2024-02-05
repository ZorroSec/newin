const MySQlConnect = require("../db/database.js");

async function createUser({ 
    ip,
    nome,
    email,
    senha
}){
    const pool = await MySQlConnect()
    const [user, results] = await pool.query(`
    INSERT INTO User (nome, email, senha, descricao, ip)
    VALUES ('${nome}', '${email}', '${senha}', '', '${ip}')
    `)
    return user
}

module.exports = createUser