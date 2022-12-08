import { Router } from "express";
import { CreateQuestionController } from "../../../modules/Question/controllers/CreateQuestion.controller";
import { FindQuestionsByIdController } from "../../../modules/Question/controllers/FindQuestionById.controller";
import { ListQuestionsBySubjectController } from "../../../modules/Question/controllers/ListQuestionsBySubject.controller";
import { ListQuestionsByTypeQuestionController } from "../../../modules/Question/controllers/ListQuestionsByTypeQuestion.controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const listQuestionsByTypeQuestion = new ListQuestionsByTypeQuestionController();
const listQuestionsBySubject = new ListQuestionsBySubjectController();
const createQuestion = new CreateQuestionController();
const findQuestionById = new FindQuestionsByIdController();

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
questionRoutes.get(
  "/list-by-id/:id",
  ensureAuthenticated,
  findQuestionById.handle
);
questionRoutes.post("/create", ensureAuthenticated, createQuestion.handle);

