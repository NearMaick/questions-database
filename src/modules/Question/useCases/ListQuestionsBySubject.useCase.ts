import { IQuestionsRepository } from "../repositories/Questions.repository";

export class ListQuestionsBySubject {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute(subject: string) {
    return this.questionsRepository.listBySubject(subject);
  }
}

