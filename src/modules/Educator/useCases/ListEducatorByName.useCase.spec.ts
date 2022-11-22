import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryEducatorsRepository } from "../repositories/implementations/InMemoryEducators.repository";
import { EnrollEducatorUseCase } from "./EnrollEducator.useCase";
import { ListEducatorByName } from "./ListEducatorByName.useCase";

describe("List educator by name", async () => {
  const inMemoryEducatorsRepository = new InMemoryEducatorsRepository();
  const enrollEducator = new EnrollEducatorUseCase(inMemoryEducatorsRepository);
  const listEducatorByName = new ListEducatorByName(
    inMemoryEducatorsRepository
  );

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

    await enrollEducator.execute({
      name: "John Doe",
      course: "Empreendedorismo",
      password: "password-test",
    });
  });

  it("should br able to list an educator by name", async () => {
    const educator = await listEducatorByName.execute("Peter Parker");

    expect(educator?.name).toBe("Peter Parker");
  });
});

