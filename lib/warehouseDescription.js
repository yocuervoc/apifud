// const db = require('../db')
// const config = require('../config')
// const sequelize = db(config.db)
// const { QueryTypes } = require('sequelize')

module.exports = function setupWarehousesDescription (WarehouseDescriptionModel){

    async function findWarehouseDescriptionById(id){
        let warehouseDescription
        warehouseDescription = await WarehouseDescriptionModel.findByPk(id)
        return warehouseDescription
    }

    async function findAllWarehouseDescriptions() {
           let arrayWarehouseDescription = []
           arrayWarehouseDescription = await WarehouseDescriptionModel.findAll()
           console.log(arrayWarehouseDescription)
           return arrayWarehouseDescription
    }
    async function createWarehouseDescription(warehouseDescription) {
        const result = await WarehouseDescriptionModel.create(warehouseDescription)
        return result.toJSON()
    }

    async function updateWarehouseDescription(warehouseDescription) { 
        let {id} = warehouseDescription
        console.log(id)
        let toUpdate = await WarehouseDescriptionModel.findByPk(id)
        let updated = await toUpdate.update(warehouseDescription)
        return updated
    }

    async function deleteWarehouseDescription(warehouseDescription) { 
        let {id} = warehouseDescription
        let toDelete = await WarehouseDescriptionModel.findByPk(id)
        let deleted =await toDelete.destroy()
        return deleted
    }

   

    return {
        findAllWarehouseDescriptions,
        findWarehouseDescriptionById,
        createWarehouseDescription,
        updateWarehouseDescription,
        deleteWarehouseDescription
    }
}