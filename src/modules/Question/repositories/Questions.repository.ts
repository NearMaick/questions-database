import {
  ICreateQuestionRepositoryDTO,
  IQuestionsListDTO,
} from "../DTOs/Question.dto";

export interface IQuestionsRepository {
  create({
    answer,
    description,
  }: ICreateQuestionRepositoryDTO): Promise<IQuestionsListDTO>;
}

