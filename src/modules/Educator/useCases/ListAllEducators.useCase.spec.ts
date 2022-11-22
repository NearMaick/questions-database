import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryEducatorsRepository } from "../repositories/implementations/InMemoryEducators.repository";
import { EnrollEducatorUseCase } from "./EnrollEducator.useCase";
import { ListAllEducators } from "./ListAllEducators.useCase";

describe("List all educators", async () => {
  const inMemoryEducatorsRepository = new InMemoryEducatorsRepository();
  const enrollEducator = new EnrollEducatorUseCase(inMemoryEducatorsRepository);
  const listAllEducators = new ListAllEducators(inMemoryEducatorsRepository);

  beforeAll(async () => {
    await enrollEducator.execute({
      name: "Mary Jane",
      course: "Sistemas Operacionais",
      password: "password-test",
    });

    await enrollEducator.execute({
      name: "Peter Parker",
      course: "Empreendedorismo",
      password: "password-test",
    });
  });

  it("should be able to list educators", async () => {
    const educator = await enrollEducator.execute({
      name: "John Doe",
      course: "Inteligência artificial",
      password: "password-test",
    });

    const educators = await listAllEducators.execute();
    expect(educators[2]).toEqual(educator);
  });
});

