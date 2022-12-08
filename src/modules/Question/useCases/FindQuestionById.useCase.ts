import { IQuestionsRepository } from "../repositories/Questions.repository";

export class FindQuestionById {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(id: string) {
    return this.questionsRepository.findById(id);
  }
}

