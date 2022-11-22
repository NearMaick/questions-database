import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryEducatorsRepository } from "../repositories/implementations/InMemoryEducators.repository";
import { AuthenticateEducatorUseCase } from "./AuthenticateEducator.useCase";
import { EnrollEducatorUseCase } from "./EnrollEducator.useCase";

let inMemoryEducatorsRepository: InMemoryEducatorsRepository;
let enrollEducator: EnrollEducatorUseCase;
let authenticateEducator: AuthenticateEducatorUseCase;

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
});

describe("Authenticate User", () => {
  it("should be able to authenticate an educator", async () => {
    // console.log(inMemoryEducatorsRepository.educators[0]);

    const educator = await authenticateEducator.execute(
      "test@email.com",
      "password-test"
    );

    expect(educator).toHaveProperty("token");
  });
});

