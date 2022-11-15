import { IEducatorsListDTO } from "../DTOs/Educator.dto";
import { IEducatorsRepository } from "../repositories/Educators.repository";

export class ListAllEducators {
  constructor(private educatorsRepository: IEducatorsRepository) {}

  async execute(): Promise<IEducatorsListDTO[]> {
    return this.educatorsRepository.listAll();
  }
}

