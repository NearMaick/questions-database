import { NextFunction, Request, Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { InMemoryEducatorsRepository } from "../../../modules/Educator/repositories/implementations/InMemoryEducators.repository";
import { AuthenticateEducatorUseCase } from "../../../modules/Educator/useCases/AuthenticateEducator.useCase";
import { EnrollEducatorUseCase } from "../../../modules/Educator/useCases/EnrollEducator.useCase";
import { ensureAuthenticated } from "./ensureAuthenticated";

interface IEducator {
  token: string;
}

let inMemoryEducatorsRepository: InMemoryEducatorsRepository;
let enrollEducator: EnrollEducatorUseCase;
let authenticateEducator: AuthenticateEducatorUseCase;
let educator: IEducator;

beforeEach(async () => {
  inMemoryEducatorsRepository = new InMemoryEducatorsRepository();
  enrollEducator = new EnrollEducatorUseCase(inMemoryEducatorsRepository);
  authenticateEducator = new AuthenticateEducatorUseCase(
    inMemoryEducatorsRepository
  );

  await enrollEducator.execute({
    name: "John Doe",
    course: "Course test",
    password: "password-test",
    email: "test@email.com",
  });

  educator = await authenticateEducator.execute({
    email: "test@email.com",
    password: "password-test",
  });
});

describe("Authorization", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: Partial<NextFunction> = vi.fn();

  test("with 'authorization' header", () => {
    mockRequest = {
      headers: {
        authorization: `Bearer ${educator.token}`,
      },
    };

    ensureAuthenticated(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction as NextFunction
    );

    expect(nextFunction).toBeCalled();
  });

  test("invalid 'authorization' header", () => {
    mockRequest = {
      headers: {
        authorization: "Bearer fake-token",
      },
    };

    expect(() => {
      ensureAuthenticated(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction as NextFunction
      );
    }).toThrowError("Invalid token");
  });

  test("No 'authorization' header", () => {
    mockRequest = {
      headers: {},
    };

    expect(() => {
      ensureAuthenticated(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction as NextFunction
      );
    }).toThrowError("Token missing");
  });
});

