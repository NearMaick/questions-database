import {
  ICreateEducatorRepositoryDTO,
  IEducatorsCreateDTO,
  IEducatorsListDTO,
} from "../DTOs/Educator.dto";

export interface IEducatorsRepository {
  create({
    name,
    course,
    password,
  }: ICreateEducatorRepositoryDTO): Promise<IEducatorsListDTO>;

  listByName(name: string): Promise<IEducatorsListDTO | null | undefined>;

  listByEmail(email: string): Promise<IEducatorsListDTO | null | undefined>;

  listById(id: string): Promise<IEducatorsListDTO | null | undefined>;

  listAll(): Promise<IEducatorsListDTO[]>;

  update(id: string, data: IEducatorsCreateDTO): Promise<IEducatorsListDTO>;

  delete(id: string): Promise<void>;
}

