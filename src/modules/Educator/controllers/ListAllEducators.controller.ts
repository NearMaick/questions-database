import { Request, Response } from "express";
import { PrismaEducatorRepository } from "../repositories/implementations/PrismaEducators.repository";
import { ListAllEducators } from "../useCases/ListAllEducators.useCase";

export class ListAllEducatorsController {
  async handle(_: Request, response: Response) {
    const prismaEducatorRepository = new PrismaEducatorRepository();
    const listAllEducators = new ListAllEducators(prismaEducatorRepository);

    const educators = await listAllEducators.execute();

    response.status(201).json(educators);
  }
}

