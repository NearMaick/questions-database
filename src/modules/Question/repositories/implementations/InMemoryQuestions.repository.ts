import {
  ICreateQuestionRepositoryDTO,
  IQuestionsListDTO,
  IQuestionType,
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
    educator_id,
  }: ICreateQuestionRepositoryDTO): Promise<IQuestionsListDTO> {
    const question = new Question();
    question.typeQuestion = typeQuestion;
    question.description = description;
    question.answer = answer;
    question.correct = correct;
    question.subject = subject;
    question.educator_id = educator_id;

    this.questions.push(question);

    return question;
  }

  async listBySubject(subject: string): Promise<IQuestionsListDTO[]> {
    return this.questions.filter((question) => question.subject === subject);
  }

  async listByTypeQuestion(
    typeQuestion: IQuestionType,
    quantity: number
  ): Promise<IQuestionsListDTO[]> {
    const questions = this.questions.filter(
      (question) => question.typeQuestion === typeQuestion
    );

    const listLimitedQuestions = questions.slice(quantity);

    return listLimitedQuestions;
  }

  async listByEducatorId(educatorId: string): Promise<IQuestionsListDTO[]> {
    return this.questions.filter(
      (question) => question.educator_id === educatorId
    );
  }
}

