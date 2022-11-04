import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepository } from "../repositories/implementations/InMemoryQuestions.repository";
import { CreateQuestionUseCase } from "./CreateQuestion.useCase";

describe("Questions Use Case", () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
  let createQuestion: CreateQuestionUseCase;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    createQuestion = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("Should be able a create a new question", async () => {
    await expect(
      createQuestion.execute({
        description: "Example description",
        answer: "Description answer",
      })
    ).resolves.not.toThrow();
    expect(inMemoryQuestionsRepository.questions[0].description).toEqual(
      "Example description"
    );
    expect(inMemoryQuestionsRepository.questions[0].answer).toEqual(
      "Description answer"
    );
    expect(inMemoryQuestionsRepository.questions[0]).toHaveProperty("id");
    expect(inMemoryQuestionsRepository.questions[0]).toHaveProperty(
      "createdAt"
    );
  });
});

