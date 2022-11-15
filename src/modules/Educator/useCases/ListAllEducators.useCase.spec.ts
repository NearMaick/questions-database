import { describe, expect, it } from "vitest";
import { InMemoryEducatorsRepository } from "../repositories/implementations/InMemoryEducators.repository";
import { EnrollEducatorUseCase } from "./EnrollEducator.useCase";
import { ListAllEducators } from "./ListAllEducators.useCase";

describe("List all educators", async () => {
  const inMemoryEducatorsRepository = new InMemoryEducatorsRepository();
  const enrollEducator = new EnrollEducatorUseCase(inMemoryEducatorsRepository);
  const listAllEducators = new ListAllEducators(inMemoryEducatorsRepository);

  it("should be able to list students", async () => {
    const educator = await enrollEducator.execute({
      name: "John Doe",
      course: "Inteligência artificial",
    });

    const educators = await listAllEducators.execute();
    expect(educators).toEqual([educator]);
  });
});

