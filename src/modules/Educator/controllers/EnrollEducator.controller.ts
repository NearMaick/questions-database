import { Request, Response } from "express";
import { PrismaEducatorRepository } from "../repositories/implementations/PrismaEducators.repository";
import { EnrollEducatorUseCase } from "../useCases/EnrollEducator.useCase";

const prismaEducatorRepository = new PrismaEducatorRepository();
const enrollEducator = new EnrollEducatorUseCase(prismaEducatorRepository);

export class EnrollEducatorController {
  async handle(request: Request, response: Response) {
    const { name, course, email, password } = request.body;

    const educator = await enrollEducator.execute({
      name,
      course,
      email,
      password,
    });

    return response.status(201).json(educator);
  }
}

