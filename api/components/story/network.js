import express from "express";
import { create, update, destroy, show, showAll } from "./controller";

const storyRouter = express.Router();

storyRouter.route("/create").post(create);
storyRouter.route("/update/:id").put(update);
storyRouter.route("/destroy/:id").delete(destroy);
storyRouter.route("/story/:id").get(show);
storyRouter.route("/stories").get(showAll);

export default storyRouter;
