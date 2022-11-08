import { IEducatorsCreateDTO, IEducatorsListDTO } from "../DTOs/Educator.dto";
import { IEducatorsRepository } from "../repositories/Educators.repository";

export class EnrollEducatorUseCase {
  constructor(private educatorsRepository: IEducatorsRepository) {}

  async execute({
    name,
    course,
  }: IEducatorsCreateDTO): Promise<IEducatorsListDTO> {
    const question = await this.educatorsRepository.create({
      name,
      course,
    });

    return question;
  }
}

