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
    });

    await expect(
      enrollEducator.execute({
        name: "John Doe",
        course: "Course test",
      })
    ).rejects.toEqual(new Error("This educator exists in the database!"));
  });

  it.todo("should be able to edit a educator");
  it.todo("should be able to delete a educator");
});

