import { Router } from "express";
import { educatorsRoutes } from "./educators.routes";
import { questionRoutes } from "./questions.routes";

export const router = Router();

router.use("/questions", questionRoutes);
router.use("/educators", educatorsRoutes);

