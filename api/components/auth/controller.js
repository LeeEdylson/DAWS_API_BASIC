import {sign} from "../../../auth";
import {find, store} from "../../../store/dummy";
import {response} from "../../../network";
import userModel from "../user/model";
import {hash, compare} from "../../../helper/encrypt";

export const login = async (req, res) => {
    //destructuracion
    const user = req.body;

    //este payload (dato) se envia a sign para ser parte de la creacion del token
    const payload = {
        email: user.email,
        password: user.password,
    };

    const token = sign(payload);

    //primero se debe buscar al usuario
    const userData = await find(userModel, "email", user.email);
    //luego se debe ver si exsite
    if (!userData) return;
    //luego se compara la contraseña y si es ok, retorna al usuario con su token
    const validate = compare(user.password, userData.password);

    if (!validate) {
        return response({
            res,
            ok: false,
            status: 500,
            data: {
                message: "User invalid",
            },
        });
    }
    return response({
        res,
        data: {
            user,
            token,
        },
        status: 200
    });
};

export const signUp = async (req, res) => {
    const user = req.body;

    //se crea la data del usuario nuevo
    //se borra el id pq mongodb ya pone uno automaticamente
    const data = {
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        password: hash(user.password),
    };

    const users = await store(userModel, data);

    return response({res, data: users, status: 201});
};
