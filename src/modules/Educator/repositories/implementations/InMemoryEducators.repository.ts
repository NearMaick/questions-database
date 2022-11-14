import {
  ICreateEducatorRepositoryDTO,
  IEducatorsListDTO,
} from "../../DTOs/Educator.dto";
import { Educator } from "../../entities/Educator";
import { IEducatorsRepository } from "../Educators.repository";

export class InMemoryEducatorsRepository implements IEducatorsRepository {
  public educators: Educator[] = [];

  async create({
    name,
    course,
  }: ICreateEducatorRepositoryDTO): Promise<IEducatorsListDTO> {
    const educator = new Educator();
    educator.name = name;
    educator.course = course;

    this.educators.push(educator);

    return educator;
  }

  async listByName(
    name: string
  ): Promise<IEducatorsListDTO | null | undefined> {
    return this.educators.find((educator) => educator.name === name);
  }

  async update(
    id: string,
    { name, course }: ICreateEducatorRepositoryDTO
  ): Promise<IEducatorsListDTO> {
    const index = this.educators.findIndex((educator) => educator.id === id);

    const educator = this.educators.splice(index, 1, {
      name,
      course,
    } as Educator);

    return educator[0];
  }

  async delete(id: string): Promise<void> {
    const index = this.educators.findIndex((educator) => educator.id === id);

    this.educators.splice(index, 1);
  }
}

