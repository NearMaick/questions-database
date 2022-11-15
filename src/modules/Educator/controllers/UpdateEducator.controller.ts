import { Request, Response } from "express";
import { PrismaEducatorRepository } from "../repositories/implementations/PrismaEducators.repository";
import { UpdateEducatorUseCase } from "../useCases/UpdateEducator.useCase";

const prismaEducatorRepository = new PrismaEducatorRepository();
const updateEducator = new UpdateEducatorUseCase(prismaEducatorRepository);

export class UpdateEducatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, course } = request.body;
    const { id } = request.params;

    const educator = await updateEducator.execute(id, {
      name,
      course,
    });

    return response.status(201).json(educator);
  }
}

