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

  async listById(id: string): Promise<IEducatorsListDTO | null | undefined> {
    return prismaClient.educator.findFirst({
      where: {
        id,
      },
    });
  }

  async listAll(): Promise<IEducatorsListDTO[]> {
    return prismaClient.educator.findMany();
  }

  async update(
    id: string,
    { name, course }: IEducatorsCreateDTO
  ): Promise<IEducatorsListDTO> {
    return prismaClient.educator.update({
      where: {
        id,
      },
      data: {
        name,
        course,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.educator.delete({
      where: {
        id,
      },
    });
  }
}

