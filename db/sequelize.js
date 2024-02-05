const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('railway', 'root', '4Bc2CG35D-HD564FAd3cDag2hEEec4Ag', {
    dialect: 'mysql',
    host:'monorail.proxy.rlwy.net',
    port: 18114
})

module.exports = sequelize