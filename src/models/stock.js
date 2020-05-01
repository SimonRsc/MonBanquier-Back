const Sequelize = require('sequelize');

const db = require('./database.js');

const budgets = db.define('stocks', {
    stockId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    stockCode:{
        type: Sequelize.STRING,
        allowNull: false
    },
    stockPru:{
      type:Sequelize.FLOAT,
      allowNull:false
    },stockQte:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stockBuyingDate:{
        type: Sequelize.DATE,
        allowNull:false
    },
    stockUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'userId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
});


module.exports = budgets;
