import { beforeEach, expect, it } from "vitest";
import { InMemoryEducatorsRepository } from "../repositories/implementations/InMemoryEducators.repository";
import { EnrollEducatorUseCase } from "./EnrollEducator.useCase";
import { UpdateEducator } from "./UpdateEducator.useCase";

let inMemoryEducatorsRepository: InMemoryEducatorsRepository;
let enrollEducator: EnrollEducatorUseCase;
let updateEducator: UpdateEducator;

beforeEach(() => {
  inMemoryEducatorsRepository = new InMemoryEducatorsRepository();
  enrollEducator = new EnrollEducatorUseCase(inMemoryEducatorsRepository);
  updateEducator = new UpdateEducator(inMemoryEducatorsRepository);
});

it("should be able to edit a educator", async () => {
  const { name } = await enrollEducator.execute({
    name: "John Doe",
    course: "Course test",
  });

  const educator = await inMemoryEducatorsRepository.listByName(name);

  await updateEducator.execute(educator?.id!, {
    name: "Mary Jane",
    course: "Course test",
  });

  expect(inMemoryEducatorsRepository.educators[0].name).toEqual("Mary Jane");
});
