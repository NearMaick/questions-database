import { IQuestionsCreateDTO, IQuestionsListDTO } from "../DTOs/Question.dto";
import { IQuestionsRepository } from "../repositories/Questions.repository";

export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    answer,
    description,
  }: IQuestionsCreateDTO): Promise<IQuestionsListDTO> {
    const question = await this.questionsRepository.create({
      description,
      answer,
    });

    return question;
  }
}
