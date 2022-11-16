import { IEducatorsListDTO } from "../DTOs/Educator.dto";
import { IEducatorsRepository } from "../repositories/Educators.repository";

export class ListEducatorByName {
  constructor(private educatorsRepository: IEducatorsRepository) {}

  async execute(name: string): Promise<IEducatorsListDTO | null | undefined> {
    return this.educatorsRepository.listByName(name);
  }
}
