import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryEducatorsRepository } from "../repositories/implementations/InMemoryEducators.repository";
import { EnrollEducatorUseCase } from "./EnrollEducator.useCase";

let inMemoryEducatorsRepository: InMemoryEducatorsRepository;
let enrollEducator: EnrollEducatorUseCase;

beforeEach(() => {
  inMemoryEducatorsRepository = new InMemoryEducatorsRepository();
  enrollEducator = new EnrollEducatorUseCase(inMemoryEducatorsRepository);
});

describe("Enroll educator", () => {
  it("should be able to Enroll a educator", async () => {
    await expect(
      enrollEducator.execute({
        name: "John Doe",
        course: "Course test",
        password: "password-test",
      })
    ).resolves.not.toThrow();

    expect(inMemoryEducatorsRepository.educators[0].name).toEqual("John Doe");
    expect(inMemoryEducatorsRepository.educators[0].course).toEqual(
      "Course test"
    );
  });

  it("should not be able to Enroll a same educator", async () => {
    await enrollEducator.execute({
      name: "John Doe",
      course: "Course test",
      password: "password-test",
    });

    await expect(
      enrollEducator.execute({
        name: "John Doe",
        course: "Course test",
        password: "password-test",
      })
    ).rejects.toEqual(new Error("This educator exists in the database!"));
  });

  it("should be able to create a encrypted password when enrolling a educator", async () => {
    const educator = {
      name: "John Doe",
      course: "Course test",
      password: "password-test",
    };

    await enrollEducator.execute(educator);

    const passwordMatch = await compare(
      educator.password,
      inMemoryEducatorsRepository.educators[0].password
    );

    expect(passwordMatch).toBe(true);
  });
});

