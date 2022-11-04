import {
  ICreateQuestionRepositoryDTO,
  IQuestionsListDTO,
} from "../../DTOs/Question.dto";
import { Question } from "../../entities/Question";
import { IQuestionsRepository } from "../Questions.repository";

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public questions: Question[] = [];
  create({
    answer,
    description,
  }: ICreateQuestionRepositoryDTO): Promise<IQuestionsListDTO> {
    throw new Error("Method not implemented.");
  }
}

