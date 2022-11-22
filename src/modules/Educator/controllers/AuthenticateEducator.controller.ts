import { Request, Response } from "express";
import { PrismaEducatorRepository } from "../repositories/implementations/PrismaEducators.repository";
import { AuthenticateEducatorUseCase } from "../useCases/AuthenticateEducator.useCase";

export class AuthenticateEducatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const prismaEducatorRepository = new PrismaEducatorRepository();
    const authenticateEducator = new AuthenticateEducatorUseCase(
      prismaEducatorRepository
    );
    const { password, email } = request.body;

    const token = await authenticateEducator.execute({
      password,
      email,
    });

    return response.json(token);
  }
}

