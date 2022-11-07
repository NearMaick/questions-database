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
    correct,
    subject,
    teacher_id,
  }: ICreateQuestionRepositoryDTO): Promise<IQuestionsListDTO> {
    const question = new Question();
    question.typeQuestion = typeQuestion;
    question.description = description;
    question.answer = answer;
    question.correct = correct;
    question.subject = subject;
    question.teacher_id = teacher_id;

    this.questions.push(question);

    return question;
  }

  async listBySubject(subject: string): Promise<IQuestionsListDTO[]> {
    return this.questions.filter((question) => question.subject === subject);
  }

  async listByTypeQuestion(
    typeQuestion: "essay" | "multiple-choice"
  ): Promise<IQuestionsListDTO[]> {
    return this.questions.filter(
      (question) => question.typeQuestion === typeQuestion
    );
  }
}

