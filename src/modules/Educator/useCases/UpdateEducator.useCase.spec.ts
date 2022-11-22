import { beforeEach, expect, it } from "vitest";
import { InMemoryEducatorsRepository } from "../repositories/implementations/InMemoryEducators.repository";
import { EnrollEducatorUseCase } from "./EnrollEducator.useCase";
import { UpdateEducatorUseCase } from "./UpdateEducator.useCase";

let inMemoryEducatorsRepository: InMemoryEducatorsRepository;
let enrollEducator: EnrollEducatorUseCase;
let updateEducator: UpdateEducatorUseCase;

beforeEach(() => {
  inMemoryEducatorsRepository = new InMemoryEducatorsRepository();
  enrollEducator = new EnrollEducatorUseCase(inMemoryEducatorsRepository);
  updateEducator = new UpdateEducatorUseCase(inMemoryEducatorsRepository);
});

it("should be able to edit a educator", async () => {
  const { name } = await enrollEducator.execute({
    name: "John Doe",
    course: "Course test",
    password: "password-test",
  });

  const educator = await inMemoryEducatorsRepository.listByName(name);

  await updateEducator.execute(educator?.id!, {
    name: "Mary Jane",
    course: "Course test",
    password: "password-test",
  });

  expect(inMemoryEducatorsRepository.educators[0].name).toEqual("Mary Jane");
});

