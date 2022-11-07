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

  it("should be able a create a new essay question", async () => {
    await expect(
      createQuestion.execute({
        subject: "subject-test",
        teacher_id: "teacher-test-id",
        typeQuestion: "essay",
        description: "Example description",
        answer: "Description answer",
        correct: undefined,
      })
    ).resolves.not.toThrow();
    expect(inMemoryQuestionsRepository.questions[0].typeQuestion).toEqual(
      "essay"
    );
    expect(inMemoryQuestionsRepository.questions[0].teacher_id).toEqual(
      "teacher-test-id"
    );
    expect(inMemoryQuestionsRepository.questions[0].subject).toEqual(
      "subject-test"
    );
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

  it("should be able a create a new multiple-choice question", async () => {
    await expect(
      createQuestion.execute({
        typeQuestion: "multiple-choice",
        subject: "subject-test",
        teacher_id: "teacher-test-id",
        description: "Example description",
        answer: ["answer A", "answer B", "answer C", "answer D", "answer E"],
        correct: "answer A",
      })
    ).resolves.not.toThrow();
    expect(inMemoryQuestionsRepository.questions[0].typeQuestion).toEqual(
      "multiple-choice"
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
});

