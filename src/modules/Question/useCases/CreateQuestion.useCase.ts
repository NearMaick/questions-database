import { IQuestionsCreateDTO, IQuestionsListDTO } from "../DTOs/Question.dto";
import { IQuestionsRepository } from "../repositories/Questions.repository";

export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    typeQuestion,
    answer,
    description,
    correct,
    subject,
    teacher_id,
  }: IQuestionsCreateDTO): Promise<IQuestionsListDTO> {
    const question = await this.questionsRepository.create({
      typeQuestion,
      description,
      answer,
      correct,
      subject,
      teacher_id,
    });

    return question;
  }
}

