import { IQuestionsRepository } from "../repositories/Questions.repository";

export class ListQuestionsByEducatorId {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(educatorId: string) {
    return this.questionsRepository.listByEducatorId(educatorId);
  }
}

