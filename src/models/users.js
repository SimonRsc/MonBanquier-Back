
const Sequelize = require('sequelize');

const db = require('./database.js');


const users = db.define('users', {
    userId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    userNom: {
        type: Sequelize.STRING,
        allowNull:false
    },
    userPrenom:{
      type:Sequelize.STRING,
      allowNull:false
    },
    userEmail: {
        type: Sequelize.STRING,
        allowNull:false
    },
    userPassword:{
      type:Sequelize.STRING,
      allowNull:false
    },
    userImage:{
      type:Sequelize.STRING
    }
})


module.exports = users;
