import { Router } from "express";
import { questionRoutes } from "./questions.routes";

export const router = Router();

router.use("/questions", questionRoutes);

