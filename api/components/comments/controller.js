import {store, list, find, remove, upsert} from "../../../store/dummy";
import {response} from "../../../network";
import commentModel from "../comments/model";

export const getComments = async (req, res) => {
    return response({res, data: await list(commentModel)});
};

export const save = async (body) => {
    const comment = await store(commentModel, body);

    return {
        ok: true,
        message: comment,
    };
};

export const show = async (req, res) => {
    const {id} = req.params;

    const comment = await find({model: commentModel,key: "id",value: id});

    return response({res, data: comment});
};

export const destroy = async (req, res) => {
    const {id} = req.params;

    const comment = await remove(commentModel, id);

    if (!comment) {
        return response({
            res,
            status: 404,
            ok: false,
            data: {error: "error, comment not found"}
        });
    }

    return response({res, data: {success: "Comment deleted!"}});
};


export const update = async (req, res) => {
    const {id} = req.params;

    const comment = await upsert({model: commentModel, id: id, data: req.body});

    if (!comment) {
        return response({
            ok: false,
            status: 404,
            res,
            data: "error, comment not found"
        });
    }

    return response({res, data: comment});
};
