//en esta funcion se "envuelve" los parametros en {} para poder hacer la 
//funcion mas escalable, porque ahora el orden de los parametros no importan
export const response = ({ res, ok = true, status = 200, data }) => {
    res.status(status).json({
        ok,
        data
    });
};