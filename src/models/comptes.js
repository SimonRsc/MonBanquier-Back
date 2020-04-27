
const Sequelize = require('sequelize');

const db = require('./database.js');


const comptes = db.define('comptes', {
    compteId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    compteNom: {
        type: Sequelize.STRING,
        allowNull:false
    },
    compteDescription:{
      type:Sequelize.TEXT
    },
    compteCreateur:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'userId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
})


module.exports = comptes;
