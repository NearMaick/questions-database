import { beforeEach, expect, it } from "vitest";
import { InMemoryEducatorsRepository } from "../repositories/implementations/InMemoryEducators.repository";
import { DeleteEducatorUseCase } from "./DeleteEducator.useCase";
import { EnrollEducatorUseCase } from "./EnrollEducator.useCase";

let inMemoryEducatorsRepository: InMemoryEducatorsRepository;
let enrollEducator: EnrollEducatorUseCase;
let deleteEducator: DeleteEducatorUseCase;

beforeEach(() => {
  inMemoryEducatorsRepository = new InMemoryEducatorsRepository();
  enrollEducator = new EnrollEducatorUseCase(inMemoryEducatorsRepository);
  deleteEducator = new DeleteEducatorUseCase(inMemoryEducatorsRepository);
});

it("should be able to edit a educator", async () => {
  const { name } = await enrollEducator.execute({
    name: "John Doe",
    course: "Course test",
  });

  const educator = await inMemoryEducatorsRepository.listByName(name);

  await deleteEducator.execute(educator?.id!);

  expect(inMemoryEducatorsRepository.educators).toEqual([]);
});
