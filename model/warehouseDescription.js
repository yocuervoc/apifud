
const Sequelize = require('sequelize')
const setupDatabase = require('../db')


module.exports = function setupwarehouseDescriptionModel (config){
    const sequelize = setupDatabase (config)

    return sequelize.define('Warehouse_description', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        fk_warehouse_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        address: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        city: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true
        },
        updated_at: {
            type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: true
        }
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'Warehouse_description'
      })
}