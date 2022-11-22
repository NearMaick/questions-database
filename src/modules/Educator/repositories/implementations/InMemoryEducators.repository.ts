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
    password,
    email,
  }: ICreateEducatorRepositoryDTO): Promise<IEducatorsListDTO> {
    const educator = new Educator();
    educator.name = name;
    educator.course = course;
    educator.email = email;
    educator.password = password;

    this.educators.push(educator);

    return educator;
  }

  async listByName(
    name: string
  ): Promise<IEducatorsListDTO | null | undefined> {
    return this.educators.find((educator) => educator.name === name);
  }

  async listById(id: string): Promise<IEducatorsListDTO | null | undefined> {
    return this.educators.find((educator) => educator.id === id);
  }

  async listByEmail(
    email: string
  ): Promise<IEducatorsListDTO | null | undefined> {
    return this.educators.find((educator) => educator.email === email);
  }

  async listAll(): Promise<IEducatorsListDTO[]> {
    return this.educators;
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

