import { IEducatorsRepository } from "../../Educator/repositories/Educators.repository";
import { IQuestionsCreateDTO, IQuestionsListDTO } from "../DTOs/Question.dto";
import { IQuestionsRepository } from "../repositories/Questions.repository";

export class CreateQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private educatorsRepository: IEducatorsRepository
  ) {}

  async execute({
    typeQuestion,
    answer,
    description,
    correct,
    subject,
    educator_id,
  }: IQuestionsCreateDTO): Promise<IQuestionsListDTO> {
    const educatorExists = await this.educatorsRepository.listById(educator_id);

    if (!educatorExists) {
      throw new Error("This educator does not exists");
    }

    const question = await this.questionsRepository.create({
      typeQuestion,
      description,
      answer,
      correct,
      subject,
      educator_id,
    });

    return question;
  }
}

