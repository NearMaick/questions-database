import { Router } from "express";
import { EnrollEducatorController } from "../../../modules/Educator/controllers/EnrollEducator.controller";

const enrollEducatorController = new EnrollEducatorController();

export const educatorsRoutes = Router();

educatorsRoutes.post("/enroll", enrollEducatorController.handle);

