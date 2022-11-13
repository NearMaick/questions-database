import {
  ICreateEducatorRepositoryDTO,
  IEducatorsCreateDTO,
  IEducatorsListDTO,
} from "../DTOs/Educator.dto";

export interface IEducatorsRepository {
  create({
    name,
    course,
  }: ICreateEducatorRepositoryDTO): Promise<IEducatorsListDTO>;

  listByName(name: string): Promise<IEducatorsListDTO | undefined>;
  update(id: string, data: IEducatorsCreateDTO): Promise<IEducatorsListDTO>;
  delete(id: string): Promise<void>;
}

