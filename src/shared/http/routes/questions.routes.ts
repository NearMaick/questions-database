import { Router } from "express";
import { ListQuestionsByTypeQuestionController } from "../../../modules/Question/controllers/ListQuestionsByTypeQuestion.controller";

const listQuestionsByTypeQuestion = new ListQuestionsByTypeQuestionController();

export const questionRoutes = Router();

questionRoutes.get(
  "/list-by-type-question/:type",
  listQuestionsByTypeQuestion.handle
);

