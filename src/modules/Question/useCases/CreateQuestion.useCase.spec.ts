import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryEducatorsRepository } from "../../Educator/repositories/implementations/InMemoryEducators.repository";
import { EnrollEducatorUseCase } from "../../Educator/useCases/EnrollEducator.useCase";
import { InMemoryQuestionsRepository } from "../repositories/implementations/InMemoryQuestions.repository";
import { CreateQuestionUseCase } from "./CreateQuestion.useCase";

describe("Questions Use Case", () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
  let inMemoryEducatorsRepository: InMemoryEducatorsRepository;
  let createQuestion: CreateQuestionUseCase;
  let enrollEducator: EnrollEducatorUseCase;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryEducatorsRepository = new InMemoryEducatorsRepository();
    enrollEducator = new EnrollEducatorUseCase(inMemoryEducatorsRepository);
    createQuestion = new CreateQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryEducatorsRepository
    );
  });

  it("should be able a create a new essay question", async () => {
    const { id } = await enrollEducator.execute({
      name: "Peter Parker",
      course: "Sistemas de Informação",
      password: "password-test",
      email: "email@test",
    });

    await expect(
      createQuestion.execute({
        subject: "subject-test",
        educator_id: id,
        typeQuestion: "ESSAY",
        description: "Example description",
        answer: ["Description answer"],
        correct: "Description answer",
      })
    ).resolves.not.toThrow();
    expect(inMemoryQuestionsRepository.questions[0].typeQuestion).toEqual(
      "ESSAY"
    );
    expect(inMemoryQuestionsRepository.questions[0].educator_id).toEqual(id);
    expect(inMemoryQuestionsRepository.questions[0].subject).toEqual(
      "subject-test"
    );
    expect(inMemoryQuestionsRepository.questions[0].description).toEqual(
      "Example description"
    );
    expect(inMemoryQuestionsRepository.questions[0].answer).toEqual([
      "Description answer",
    ]);
    expect(inMemoryQuestionsRepository.questions[0]).toHaveProperty("id");
    expect(inMemoryQuestionsRepository.questions[0]).toHaveProperty(
      "createdAt"
    );
  });

  it("should be able a create a new multiple-choice question", async () => {
    const { id } = await enrollEducator.execute({
      name: "Peter Parker",
      course: "Sistemas de Informação",
      password: "password-test",
      email: "email@test",
    });

    await expect(
      createQuestion.execute({
        typeQuestion: "MULTIPLE_CHOICE",
        subject: "subject-test",
        educator_id: id,
        description: "Example description",
        answer: ["answer A", "answer B", "answer C", "answer D", "answer E"],
        correct: "answer A",
      })
    ).resolves.not.toThrow();
    expect(inMemoryQuestionsRepository.questions[0].typeQuestion).toEqual(
      "MULTIPLE_CHOICE"
    );
    expect(inMemoryQuestionsRepository.questions[0].description).toEqual(
      "Example description"
    );
    expect(inMemoryQuestionsRepository.questions[0].answer).toEqual([
      "answer A",
      "answer B",
      "answer C",
      "answer D",
      "answer E",
    ]);
    expect(inMemoryQuestionsRepository.questions[0].correct).toEqual(
      "answer A"
    );

    expect(inMemoryQuestionsRepository.questions[0]).toHaveProperty("id");
    expect(inMemoryQuestionsRepository.questions[0]).toHaveProperty(
      "createdAt"
    );
  });

  it("should not be able to create a question if educator id is not valid", async () => {
    await expect(
      createQuestion.execute({
        typeQuestion: "MULTIPLE_CHOICE",
        subject: "subject-test",
        educator_id: "fake-educator-id",
        description: "Example description",
        answer: ["answer A", "answer B", "answer C", "answer D", "answer E"],
        correct: "answer A",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});

