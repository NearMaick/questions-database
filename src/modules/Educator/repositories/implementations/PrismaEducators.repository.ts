import { prismaClient } from "../../../../shared/prisma";
import {
  ICreateEducatorRepositoryDTO,
  IEducatorsCreateDTO,
  IEducatorsListDTO,
} from "../../DTOs/Educator.dto";
import { IEducatorsRepository } from "../Educators.repository";

export class PrismaEducatorRepository implements IEducatorsRepository {
  async create({
    name,
    course,
  }: ICreateEducatorRepositoryDTO): Promise<IEducatorsListDTO> {
    const educator = prismaClient.educator.create({
      data: {
        name,
        course,
      },
    });

    return educator;
  }

  async listByName(name: string): Promise<IEducatorsListDTO | null> {
    const educator = await prismaClient.educator.findFirst({
      where: {
        name,
      },
    });

    return educator;
  }

  update(id: string, data: IEducatorsCreateDTO): Promise<IEducatorsListDTO> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

