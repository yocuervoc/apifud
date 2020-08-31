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
        try {
            description = JSON.parse(description)
        } catch (error) {
            
        }
        const result = await WarehousesModel.create(warehouse)
        //const { id } = result //cambiar 
        const { warehouse_id } = result
        description.forEach(async element => {
            element['fk_warehouse_id']=warehouse_id //id cambiar
            await WarehouseDescriptionModel.create(element)
        });        
        return result.toJSON()
    }

    async function updateWarehouse(warehouse) { 
        //let {id} = warehouse //cambiar
        let {warehouse_id} = warehouse
        let toUpdate = await WarehousesModel.findByPk(warehouse_id) //id cambiar
        if(toUpdate != null){
            let updated = await toUpdate.update(warehouse)
            return updated
        }else{
            return 0
        }
        
    }

    async function deleteWarehouse(warehouse) { 
         //let {id} = warehouse //cambiar
        let {warehouse_id} = warehouse
        let toDelete = await WarehousesModel.findByPk(warehouse_id)
        if(toDelete != null){
            let deleted =await toDelete.destroy()
            return deleted
        }else{
            return 0
        }
        
        
    }

   

    return {
        findWarehouseById,
        createWarehouse,
        updateWarehouse,
        findAllWarehouses,
        deleteWarehouse
    }
}