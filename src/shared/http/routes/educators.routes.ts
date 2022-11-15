import { Router } from "express";
import { EnrollEducatorController } from "../../../modules/Educator/controllers/EnrollEducator.controller";
import { ListAllEducatorsController } from "../../../modules/Educator/controllers/ListAllEducators.controller";
import { UpdateEducatorController } from "../../../modules/Educator/controllers/UpdateEducator.controller";

const enrollEducatorController = new EnrollEducatorController();
const listAllEducatorsController = new ListAllEducatorsController();
const updateEducatorController = new UpdateEducatorController();

export const educatorsRoutes = Router();

educatorsRoutes.post("/enroll", enrollEducatorController.handle);
educatorsRoutes.get("/", listAllEducatorsController.handle);
educatorsRoutes.put("/update/:id", updateEducatorController.handle);

