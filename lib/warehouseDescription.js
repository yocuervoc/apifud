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
           
           return arrayWarehouseDescription
    }
    async function createWarehouseDescription(warehouseDescription) {
        const result = await WarehouseDescriptionModel.create(warehouseDescription)
        return result.toJSON()
    }

    async function updateWarehouseDescription(warehouseDescription) { 
        let {id} = warehouseDescription 
        
        let toUpdate = await WarehouseDescriptionModel.findByPk(id)
       
        if(toUpdate != null){
            let updated = await toUpdate.update(warehouseDescription)
            return updated
        }else{
            return 0
        }
    }

    async function deleteWarehouseDescription(warehouseDescription) { 
        let {description_id} = warehouseDescription  // cambiar
        console.log(warehouseDescription)
        let toDelete = await WarehouseDescriptionModel.findByPk(description_id)
        if(toDelete != null){
            let deleted =await toDelete.destroy()
            return deleted
        }else{
            return 0
        }
    }

    return {
        findAllWarehouseDescriptions,
        findWarehouseDescriptionById,
        createWarehouseDescription,
        updateWarehouseDescription,
        deleteWarehouseDescription
    }
}