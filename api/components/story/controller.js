/*
- create story => userID, title, authon, text, dateTime
- update story => story_id, story_date
- delete => story_id
- read => story_id
*/

import {response} from "../../../network";
import {list, find, remove, store, upsert} from "../../../store/dummy";
import storyModel from "../story/model";

//POST
export const create = async (req, res) => {
    const story = req.body; //captura los datos del body

    //se crea la data de la nueva story con los datos recuperados
    const data = {
        title: story.title,
        content: story.content,
        user_id: story.user_id,
    };

    const story_c = await store(storyModel, data); //guarda el objeto creado

    return response({res, data: story_c, status: 201}); //devuelve la data creada
};

//GET 
export const show = async (req, res) => {
    const {id} = req.params; //captura el id por la url 

    const story = await find({value: id, model: storyModel}); //busca la story por el id obtenido

    console.log(story);

    if (!story) {
        response({
            ok: false,
            status: 404,
            res,
            data: "error, story not found"
        });
    }

    return response({res, data: story}); //devuelve la story encontrada
};

//PUT
export const update = async (req, res) => {
    const {id} = req.params; //captura el id por la url

    const story = await upsert({model: storyModel, id: id, data: req.body}); //busca la story a editar por id

    if (!story) {
        return response({
            ok: false,
            status: 404,
            res,
            data: "error, story not found"
        });
    }

    return response({res, data: story}); //devuelve la story actualizada
};

//DELETE
export const destroy = async (req, res) => {
    const {id} = req.params;

    const story = await remove(storyModel, id);

    if (!story) {
        return response({
            res,
            status: 404,
            ok: false,
            data: {error: "error, story not found"}
        });
    }

    return response({res, data: {success: "Story deleted!"}});
};

//LISTA DE HISTORIAS
export const showAll = async (req, res) => {
    console.log(await list(storyModel));

    return response({res, data: await list(storyModel)});
};
