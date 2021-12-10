import mongoose from "mongoose";

//scope global
mongoose.Promise = global.Promise;

/**
 * Funcion para conectarse a la BD
 * @param {string} url
 */
const connect = async (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true
    });

    console.log(">>MONGODB CONECTADO");
};

export default connect;
