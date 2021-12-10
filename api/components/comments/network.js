import express from "express";
import {getComments, show, update, destroy} from "./controller";

const commentRouter = express.Router();

commentRouter.route("/view").get(getComments);
commentRouter.route("/:id").get(show);
commentRouter.route("/update/:id").put(update);
commentRouter.route("/destroy/:id").delete(destroy);

export default commentRouter;
