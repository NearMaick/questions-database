import { IEducatorsCreateDTO } from "../DTOs/Educator.dto";
import { IEducatorsRepository } from "../repositories/Educators.repository";

export class UpdateEducator {
  constructor(private educatorsRepository: IEducatorsRepository) {}

  async execute(id: string, { name, course }: IEducatorsCreateDTO) {
    this.educatorsRepository.update(id, {
      name,
      course,
    });
  }
}

