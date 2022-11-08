import {
  ICreateEducatorRepositoryDTO,
  IEducatorsListDTO,
} from "../DTOs/Educator.dto";
import { Educator } from "../entities/Educator";

export interface IEducatorsRepository {
  create({
    name,
    course,
  }: ICreateEducatorRepositoryDTO): Promise<IEducatorsListDTO>;
  listAll(): Promise<IEducatorsListDTO[]>;
  listByName(name: string): Promise<IEducatorsListDTO>;
  update(id: string, data: Educator): Promise<IEducatorsListDTO>;
  delete(id: string): Promise<void>;
}

