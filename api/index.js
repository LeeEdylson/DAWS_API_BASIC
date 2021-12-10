import { port } from "../config/config";
import { app, server } from "./app";

//expone las rutas
server.listen(port, () =>
    console.log(`Escuchando en http://localhost:${port}`)
);

