import { Router } from "express";
import { CreateQuestionController } from "../../../modules/Question/controllers/CreateQuestion.controller";
import { ListQuestionsBySubjectController } from "../../../modules/Question/controllers/ListQuestionsBySubject.controller";
import { ListQuestionsByTypeQuestionController } from "../../../modules/Question/controllers/ListQuestionsByTypeQuestion.controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const listQuestionsByTypeQuestion = new ListQuestionsByTypeQuestionController();
const listQuestionsBySubject = new ListQuestionsBySubjectController();
const createQuestionController = new CreateQuestionController();

export const questionRoutes = Router();

questionRoutes.get(
  "/list-by-type-question/:type",
  ensureAuthenticated,
  listQuestionsByTypeQuestion.handle
);
questionRoutes.get(
  "/list-by-subject/:subject",
  ensureAuthenticated,
  listQuestionsBySubject.handle
);
questionRoutes.post(
  "/create",
  ensureAuthenticated,
  createQuestionController.handle
);

