const Sequelize = require('sequelize');

const db = require('./database.js');


const usersComptes = db.define('users_comptes', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'userId'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    primaryKey: true
  },
  compteId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'comptes',
      key: 'compteId'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    primaryKey: true

  }
});


module.exports = usersComptes;
