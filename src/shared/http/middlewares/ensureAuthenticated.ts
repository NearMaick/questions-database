import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "define-secret-token-here"
    ) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new Error("Invalid token");
  }
}

// escrever um teste para testar o middleware
// https://plainenglish.io/blog/how-to-unit-test-express-middleware-typescript-jest-c6a7ad166e74
// https://vitest.dev/guide/mocking.html

