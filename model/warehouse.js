
const Sequelize = require('sequelize')
const setupDatabase = require('../db')


module.exports = function setupWarehouseModel (config){
    const sequelize = setupDatabase (config)

    return sequelize.define('warehouse', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        headquarters_number: {
            type: Sequelize.INTEGER,
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
        tableName: 'warehouse'
      })
}