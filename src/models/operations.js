const Sequelize = require('sequelize');

const db = require('./database.js');


const operations = db.define('operations', {
  opId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  opDate: {
    type: Sequelize.DATE,
    allowNull: false
  },opDescription:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  opUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'userId'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  opBudgetId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'budgets',
      key: 'budgetId'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  opMontant: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})


module.exports = operations;
