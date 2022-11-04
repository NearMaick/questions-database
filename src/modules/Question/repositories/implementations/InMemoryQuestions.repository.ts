import {
  ICreateQuestionRepositoryDTO,
  IQuestionsListDTO,
} from "../../DTOs/Question.dto";
import { Question } from "../../entities/Question";
import { IQuestionsRepository } from "../Questions.repository";

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public questions: Question[] = [];
  async create({
    typeQuestion,
    answer,
    description,
  }: ICreateQuestionRepositoryDTO): Promise<IQuestionsListDTO> {
    const question = new Question();
    question.typeQuestion = typeQuestion;

    question.description = description;
    question.answer = answer;

    this.questions.push(question);

    return question;
  }
}

