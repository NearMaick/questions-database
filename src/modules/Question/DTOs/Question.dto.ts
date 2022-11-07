import { Question } from "../entities/Question";

export type ICreateQuestionRepositoryDTO = Omit<Question, "id" | "createdAt">;
export type IQuestionsListDTO = Omit<Question, "_description" | "_answer">;
export type IQuestionsCreateDTO = Omit<
  Question,
  "_description" | "_answer" | "_educator_id" | "_subject" | "id" | "createdAt"
>;

