
const Sequelize = require('sequelize')
const setupDatabase = require('../db')


module.exports = function setupwarehouseDescriptionModel (config){
    const sequelize = setupDatabase (config)

    return sequelize.define('warehouse_description', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        warehouse_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        phone: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        city: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE(6),
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
            allowNull: true
        },
        updated_at: {
            type: Sequelize.DATE(6),
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
          allowNull: true
        }
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'warehouse_description'
      })
}