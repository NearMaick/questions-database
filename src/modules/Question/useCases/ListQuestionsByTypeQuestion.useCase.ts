import { IQuestionsRepository } from "../repositories/Questions.repository";

export class ListQuestionsByTypeQuestion {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(typeQuestion: "ESSAY" | "MULTIPLE_CHOICE") {
    return this.questionsRepository.listByTypeQuestion(typeQuestion);
  }
}

