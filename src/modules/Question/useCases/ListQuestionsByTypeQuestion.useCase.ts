import { IQuestionsRepository } from "../repositories/Questions.repository";

export class ListQuestionsByTypeQuestion {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(typeQuestion: "essay" | "multiple-choice") {
    return this.questionsRepository.listByTypeQuestion(typeQuestion);
  }
}

