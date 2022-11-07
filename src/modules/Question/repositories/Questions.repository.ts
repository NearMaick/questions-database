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
    subject,
    teacher_id,
  }: ICreateQuestionRepositoryDTO): Promise<IQuestionsListDTO>;
  listBySubject(subject: string): Promise<IQuestionsListDTO[]>;
  listByTypeQuestion(
    typeQuestion: "essay" | "multiple-choice"
  ): Promise<IQuestionsListDTO[]>;
}

