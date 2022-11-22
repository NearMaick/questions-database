import { Router } from "express";
import { CreateQuestionController } from "../../../modules/Question/controllers/CreateQuestion.controller";
import { ListQuestionsByTypeQuestionController } from "../../../modules/Question/controllers/ListQuestionsByTypeQuestion.controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const listQuestionsByTypeQuestion = new ListQuestionsByTypeQuestionController();
const createQuestionController = new CreateQuestionController();

export const questionRoutes = Router();

questionRoutes.get(
  "/list-by-type-question/:type",
  ensureAuthenticated,
  listQuestionsByTypeQuestion.handle
);
questionRoutes.post(
  "/create",
  ensureAuthenticated,
  createQuestionController.handle
);

