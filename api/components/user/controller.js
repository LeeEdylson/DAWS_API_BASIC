/*
- ShowUser => show
- Reset password => email
- Update User => id, userData
- Delete user => id
*/

import { response } from "../../../network";
import { list, find, remove, upsert } from "../../../store/dummy";
import userModel from "./model";

//GET
export const show = async (req, res) => {
    const { id } = req.params;

    //find siempre va a recibir 3 cosas, (el modelo, el key y el value)
    //por mas que el key x default sea _id, igual se debe poner
    //para ahcer eso, se debe usar la destructuracion
    const comment = await find({model: userModel,key: "id",value: id});

    if (!user) {
        response({
            ok: false,
            status: 500,
            res,
            data: "error data nor found"
        });
    }

    return response({ res, data: user });
};

//PUT
export const update = async (req, res) => {
    const { id } = req.params;

    const users = await upsert({ model: userModel, id, data: req.body });

    if (!users) {
        return response({
            ok: false,
            status: 500,
            res,
            data: "error data not found",
        });
    }

    return response({
        res,
        data: users
    });
};

//DELETE 
export const destroy = async (req, res) => {
    const { id } = req.params;

    const users = await remove(userModel, id);

    if (!users) {
        return response({
            res,
            status: 500,
            ok: false,
            data: { error: "User not found" }
        });
    }

    return response({ res, data: users }); //retorna el usuario eliminados
};

//LISTA DE USUARIOS
export const showAll = async (req, res) => response({ res, data: await list(userModel) });

