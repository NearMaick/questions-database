import { Request, Response } from "express";
import { PrismaEducatorRepository } from "../repositories/implementations/PrismaEducators.repository";
import { DeleteEducatorUseCase } from "../useCases/DeleteEducator.useCase";

const prismaEducatorRepository = new PrismaEducatorRepository();
const deleteEducator = new DeleteEducatorUseCase(prismaEducatorRepository);

export class DeleteEducatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await deleteEducator.execute(id);

    return response.status(204).json({ ok: true });
  }
}

