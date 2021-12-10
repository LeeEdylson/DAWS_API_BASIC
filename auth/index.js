import jwt from "jsonwebtoken";
import { secret } from "../config/config";
import { response } from "../network";

//existen 2 funciones principales
//?1) sign, se encarga de generar el token
//?   recibe 2 cosas (payload, secret)

//!2) verify, se encarga de validar el token
//!   recibe (token, secret)

//*payload es un dato, un json, texto, numero

export const sign = (payload) => {
    //genera el token
    return jwt.sign(payload, secret);
};

export const verify = (token) => {
    return jwt.verify(token, secret);
};


//funcion para recibir y validar el token
//*getToken => se encargara de separar el token del header
//*checkToken => se encargara de validar 

/**
 * @param {string} authorization
 * @param {Response} res
*/
const getToken = (authorization, res) => {
    if (authorization === null) {
        response({
            res,
            ok: false,
            status: 403,
            data: { message: "Token not found" },
        });
    }

    if (authorization.indexOf("Bearer") === -1) {
        response({
		  res,
		  ok: false,
		  status: 403,
		  data: { message: "Format token invalid" },
        });
    }

    //formato actual: Bearer <token>
    const token = authorization.split(" ")[1];
    //formato modificado: [Bearer, token]

    return token;
};

//valida si lo recibido y esta bien el token
/**
 * @param {*} req: Request
 * @param {*} res: Response
 * @param {*} next: Next
*/
export const checkToken = (req, res, next) => {
    //obtiene el valor del header con el key authorization
    const authorization = req.headers.authorization || null;
    //se obtiene el token
    const token = getToken(authorization, res);
    //valida el token
    const decoded = verify(token);

    //se valida si el decoded tiene algun error
    if (!decoded) {
        response({
            res,
            ok: false,
            status: 403,
            data: { message: "Invalid Token" },
        });
    }

    //guarda el decoded dentro del request
    req.decoded = decoded;

    //? si todo esta ok puede seguir
  	next();
};
