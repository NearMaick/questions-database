import {
  ICreateQuestionRepositoryDTO,
  IQuestionsListDTO,
} from "../DTOs/Question.dto";

export interface IQuestionsRepository {
  create({
    typeQuestion,
    answer,
    description,
    correct,
  }: ICreateQuestionRepositoryDTO): Promise<IQuestionsListDTO>;
}

