//archivo encargado de las rutas
import express from "express";
import { show, update, destroy, showAll } from "./controller";

const userRouter = express.Router();

//rutas protegidas
//*para proteger la ruta se debe usar all()
userRouter.route("/show/:id").get(show);
userRouter.route("/update/:id").put(update);
userRouter.route("/destroy/:id").delete(destroy);
userRouter.route("/users").get(showAll);

export default userRouter;