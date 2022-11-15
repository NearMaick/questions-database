import { IEducatorsCreateDTO } from "../DTOs/Educator.dto";
import { IEducatorsRepository } from "../repositories/Educators.repository";

export class UpdateEducatorUseCase {
  constructor(private educatorsRepository: IEducatorsRepository) {}

  async execute(id: string, { name, course }: IEducatorsCreateDTO) {
    return this.educatorsRepository.update(id, {
      name,
      course,
    });
  }
}

