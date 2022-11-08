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
  listAll(): Promise<IEducatorsListDTO[]> {
    throw new Error("Method not implemented.");
  }
  listByName(name: string): Promise<IEducatorsListDTO> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: Educator): Promise<IEducatorsListDTO> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

