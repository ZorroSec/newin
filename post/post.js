const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize.js");

const Post = sequelize.define('Posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fonte: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    }
})