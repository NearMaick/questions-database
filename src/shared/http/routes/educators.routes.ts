import { Router } from "express";
import { EnrollEducatorController } from "../../../modules/Educator/controllers/EnrollEducator.controller";
import { ListAllEducatorsController } from "../../../modules/Educator/controllers/ListAllEducators.controller";

const enrollEducatorController = new EnrollEducatorController();
const listAllEducatorsController = new ListAllEducatorsController();

export const educatorsRoutes = Router();

educatorsRoutes.post("/enroll", enrollEducatorController.handle);
educatorsRoutes.get("/", listAllEducatorsController.handle);

