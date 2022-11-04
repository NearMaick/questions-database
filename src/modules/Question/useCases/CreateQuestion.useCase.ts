import { IQuestionsCreateDTO, IQuestionsListDTO } from "../DTOs/Question.dto";
import { IQuestionsRepository } from "../repositories/Questions.repository";

export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    typeQuestion,
    answer,
    description,
  }: IQuestionsCreateDTO): Promise<IQuestionsListDTO> {
    const question = await this.questionsRepository.create({
      typeQuestion,
      description,
      answer,
    });

    return question;
  }
}

