// const db = require('../db')
// const config = require('../config')
// const sequelize = db(config.db)
// const { QueryTypes } = require('sequelize')

module.exports = function setupWarehouses (WarehousesModel, WarehouseDescriptionModel){

    async function findWarehouseById(id){
        let warehouse
        warehouse = await WarehousesModel.findByPk(id)
        return warehouse
    }

    async function findAllWarehouses() {
           let arrayWarehouse = []
           arrayWarehouse = await WarehousesModel.findAll()
           
           return arrayWarehouse
    }
    async function createWarehouse(warehouse) {

        let {description} = warehouse
        description = JSON.parse(description)
        const result = await WarehousesModel.create(warehouse)
        const { id } = result
        description.forEach(async element => {
            element['warehouse_id']=id
            await WarehouseDescriptionModel.create(element)
        });        
        return result.toJSON()
    }

    async function updateWarehouse(warehouse) { 
        let {id} = warehouse
        
        let toUpdate = await WarehousesModel.findByPk(id)
        let updated = await toUpdate.update(warehouse)
        return updated
    }

    async function deleteWarehouse(warehouse) { 
        let {id} = warehouse
        let toDelete = await WarehousesModel.findByPk(id)
        let deleted =await toDelete.destroy()
        return deleted
    }

   

    return {
        findWarehouseById,
        createWarehouse,
        updateWarehouse,
        findAllWarehouses,
        deleteWarehouse
    }
}