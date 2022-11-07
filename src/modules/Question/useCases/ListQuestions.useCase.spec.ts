import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepository } from "../repositories/implementations/InMemoryQuestions.repository";
import { CreateQuestionUseCase } from "./CreateQuestion.useCase";
import { ListQuestionsBySubject } from "./ListQuestionsBySubject.useCase";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let createQuestion: CreateQuestionUseCase;
let listQuestionsBySubject: ListQuestionsBySubject;

beforeAll(async () => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
  createQuestion = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  listQuestionsBySubject = new ListQuestionsBySubject(
    inMemoryQuestionsRepository
  );

  await createQuestion.execute({
    subject: "portuguese",
    teacher_id: "01-test-id",
    typeQuestion: "essay",
    description: "Example description",
    answer: "Description answer",
    correct: undefined,
  });

  await createQuestion.execute({
    subject: "portuguese",
    teacher_id: "02-teacher-id",
    typeQuestion: "essay",
    description: "Example description two",
    answer: "Description answer two",
    correct: undefined,
  });

  await createQuestion.execute({
    typeQuestion: "multiple-choice",
    subject: "portuguese",
    teacher_id: "02-teacher-id",
    description: "Example description",
    answer: ["answer A", "answer B", "answer C", "answer D", "answer E"],
    correct: "answer A",
  });

  await createQuestion.execute({
    typeQuestion: "multiple-choice",
    subject: "mathematics",
    teacher_id: "01-teacher-id",
    description: "Example description",
    answer: ["answer A", "answer B", "answer C", "answer D", "answer E"],
    correct: "answer C",
  });
});

describe("Questions Use Case", () => {
  it("should be able to list questions by subject", async () => {
    const subjectStub = "portuguese";

    const QuestionsBySubject = await listQuestionsBySubject.execute(
      subjectStub
    );

    expect(
      QuestionsBySubject.filter((question) => question.subject === subjectStub)
        .length
    ).toEqual(3);
  });

  it.todo("should be able to list questions by question type");
  it.todo("should be able to list questions by teacher id");
});

