import { hash } from "bcryptjs";
import { IEducatorsCreateDTO, IEducatorsListDTO } from "../DTOs/Educator.dto";
import { IEducatorsRepository } from "../repositories/Educators.repository";

export class EnrollEducatorUseCase {
  constructor(private educatorsRepository: IEducatorsRepository) {}

  async execute({
    name,
    course,
    email,
    password,
  }: IEducatorsCreateDTO): Promise<IEducatorsListDTO> {
    const educatorExists = await this.educatorsRepository.listByName(name);

    if (educatorExists) {
      throw new Error("This educator exists in the database!");
    }

    const passwordHash = await hash(password, 8);

    const question = await this.educatorsRepository.create({
      name,
      course,
      email,
      password: passwordHash,
    });

    return question;
  }
}

