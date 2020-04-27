const Sequelize = require('sequelize');

const db = require('./database.js');


const categories = db.define('categories', {
  catId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  catNom: {
    type: Sequelize.STRING,
    allowNull: false
  },
  catImage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  catProtected: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})


module.exports = categories;
