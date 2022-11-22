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
    const educator = await authenticateEducator.execute({
      email: "test@email.com",
      password: "password-test",
    });

    expect(educator).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent educator", () => {
    expect(async () => {
      await authenticateEducator.execute({
        email: "false@email.com",
        password: "1234",
      });
    }).rejects.toEqual(new Error("Email or password incorrect!"));
  });

  it("should not be able to authenticate an educator with incorrect password", () => {
    expect(async () => {
      await authenticateEducator.execute({
        email: inMemoryEducatorsRepository.educators[0].email,
        password: "incorrectPassword",
      });
    }).rejects.toEqual(new Error("Email or password incorrect!"));
  });
});

