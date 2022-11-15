import { IEducatorsRepository } from "../repositories/Educators.repository";

export class DeleteEducatorUseCase {
  constructor(private educatorsRepository: IEducatorsRepository) {}

  async execute(id: string) {
    return this.educatorsRepository.delete(id);
  }
}

