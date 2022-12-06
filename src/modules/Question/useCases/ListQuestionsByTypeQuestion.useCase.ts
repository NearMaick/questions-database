import { IQuestionType } from "../DTOs/Question.dto";
import { IQuestionsRepository } from "../repositories/Questions.repository";

export class ListQuestionsByTypeQuestion {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(typeQuestion: IQuestionType, quantity: number) {
    return this.questionsRepository.listByTypeQuestion(typeQuestion, quantity);
  }
}

