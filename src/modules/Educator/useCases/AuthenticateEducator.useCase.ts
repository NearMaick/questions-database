import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IEducatorsRepository } from "../repositories/Educators.repository";

interface IAuthenticateRequest {
  email: string;
  password: string;
}
interface IAuthenticateResponse {
  educator: {
    name?: string;
    email?: string;
  };
  token: string;
}

export class AuthenticateEducatorUseCase {
  constructor(private educatorsRepository: IEducatorsRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    const educator = await this.educatorsRepository.listByEmail(email);

    const passwordHash = educator ? educator.password : "";

    const passwordMatch = await compare(password, passwordHash);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect!");
    }

    const token = sign({}, "define-secret-token-here", {
      subject: educator!.id,
      expiresIn: "2h",
    });

    return {
      token,
      educator: {
        email: educator?.email,
        name: educator?.name,
      },
    };
  }
}

