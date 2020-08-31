
const Sequelize = require('sequelize')
const setupDatabase = require('../db')


module.exports = function setupWarehouseModel (config){
    const sequelize = setupDatabase (config)

    return sequelize.define('Warehouse', {
        warehouse_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        headquarters_number: {
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
        tableName: 'Warehouse'
      })
}