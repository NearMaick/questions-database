import { Request, Response } from "express";
import { PrismaEducatorRepository } from "../../Educator/repositories/implementations/PrismaEducators.repository";
import { PrismaQuestionsRepository } from "../repositories/implementations/PrismaQuestions.repository";
import { CreateQuestionUseCase } from "../useCases/CreateQuestion.useCase";

const prismaQuestionsRepository = new PrismaQuestionsRepository();
const prismaEducatorRepository = new PrismaEducatorRepository();
const createQuestion = new CreateQuestionUseCase(
  prismaQuestionsRepository,
  prismaEducatorRepository
);

export class CreateQuestionController {
  async handle(request: Request, response: Response) {
    const educatorId = "710df79f-87cc-4ec1-8af5-f69f7402f33a";
    // const {educatorId} = request.params
    const {
      type_question,
      subject,
      description,
      essay_answer,
      choice_01,
      choice_02,
      choice_03,
      choice_04,
      choice_05,
      correct,
    } = request.body;

    if (essay_answer === undefined) {
      console.log("choice");
      // console.log({
      //   educator_id: educatorId,
      //   type_question,
      //   subject,
      //   description,
      //   choice_01,
      //   choice_02,
      //   choice_03,
      //   choice_04,
      //   choice_05,
      //   correct,
      // });
    } else {
      console.log("essay");
      // console.log({
      //   educator_id: educatorId,
      //   type_question,
      //   subject,
      //   description,
      //   essay_answer,
      // });
    }

    response.status(200).json({
      type_question,
      subject,
      description,
      essay_answer,
      choice_01,
      choice_02,
      choice_03,
      choice_04,
      choice_05,
      correct,
    });
  }
}

