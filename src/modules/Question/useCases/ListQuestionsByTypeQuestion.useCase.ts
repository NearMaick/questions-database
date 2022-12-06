import { IQuestionType } from "../DTOs/Question.dto";
import { IQuestionsRepository } from "../repositories/Questions.repository";

export class ListQuestionsByTypeQuestion {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(typeQuestion: IQuestionType, quantity: string) {
    return this.questionsRepository.listByTypeQuestion(typeQuestion, quantity);
  }
}

