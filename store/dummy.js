//CRUD debe ser async await

import {Model} from "mongoose";

/**
 * Se encarga de listar en base al modelo (es una promesa)
 * @param {Model} model 
 * @returns {Array}
 */
export const list = async (model) => await model.find();

/**
 * Se encarga de guardar informacion
 * @param {Model} model
 * @param {Array<any>} data
 * @returns
 */
export const store = async (model, data) => {
    //se crea un dato y retorna la lista completa
    // await db[table].push(data);
    // return await list(table);

    const object = new model(data);
    object.save();
};

/**
 * Funcion para buscar un usuario
 * @param {{model: Model, key: string, value: string}} parametros
 */
export const find = async ({model, key = "_id", value}) => {
    try {
        return await model.findOne({[`${key}`]: value});
    } catch (error) {
        return false;
    }
};

/**
 * Funcion para actualizar
 * @param {{model: Model, id: string, data: Array}} parametros
 * @returns {Array?}
 */
export const upsert = async ({model, id, data}) => {
    try {
        //data es un objeto que tiene las columnas del modelo
        await model.findByIdAndUpdate(id, data);
        return await list(model);

    } catch (error) {
        return false;
    }

};

/**
    * Funcion para eliminar datos
    * @param {Model} model
    * @param {String} id
    */
export const remove = async (model, id) => {
    try {
        await model.findByIdAndRemove(id);
        //retorna la lista del modelo
        return await list(model);
    } catch (err) {
        return false;
    }
};
