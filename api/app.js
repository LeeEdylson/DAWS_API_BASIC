import express from "express";
var cors = require('cors');
import userRouter from "./components/user";
import storyRouter from "./components/story";
import commentRouter from "./components/comments";
import authRouter from "./components/auth";
import { save } from "./components/comments/controller";
import { checkToken } from "../auth";
import { base_url, db_url } from "../config/config";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import connect from "../db";

//se encarga de cargar las dependencias, rutas, todo el app
export const app = express();
export const server = http.createServer(app);
export const io = new WebSocketServer(server);

connect(db_url);

//*cargar la carpeta public
app.use(express.static(__dirname + "/public")); //static es todo lo que esta en public

app.use(cors());
//*connection, es la palabra reservada la cual se encarga de 
//encender la conexion entre mi cliente y mi servidor
//al momento de crear esta conexion, el servidor es comunicado que
//empiece a escuchar los eventos del cliente
// socket => Es la informacion que viene de mi navegador web(client)
io.on("connection", (socket) => {
    console.log("new connection");

    //como la conexion con el cliente ya esta lista, entonces ya se puede
    //escuchar y emitir eventos
    //message es la ingo que se recib del cliente
    /**
	 * @param {string} : keyword
	 * @param {function} : Info from client
	 */
    //on => es el encargado de recibir eventos
    socket.on("hello:petter", (message) => {
        console.log(`El doctor optopus ${message}`);

        //que el servidor emita un evento
        socket.emit(
            "bye:petter",
            "Un gran poder conlleva una gran responsabilidad"
        );
    });

    //? Evento para guardar comentarios para
    // * Recibe el comentario desde el cliente y ademas lo guarda
    socket.on("new:comment", async (body) => {
        const res = await save(body);
		
        //* Una vez que se guardo el comentario le response al cliente que todo ok
        socket.emit("save:comment", res);
    });
});

//para poder leer el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cargar componentes
app.use(`${base_url}/auth`, authRouter); //rutas publicas
app.use(`${base_url}/user`, checkToken, userRouter); //rutas privadas
app.use(`${base_url}/story`, checkToken, storyRouter); //rutas privadas
app.use(`${base_url}/comments`, commentRouter);
