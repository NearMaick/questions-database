import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepository } from "../repositories/implementations/InMemoryQuestions.repository";
import { CreateQuestionUseCase } from "./CreateQuestion.useCase";
import { ListQuestionsByEducatorId } from "./ListQuestionsByEducatorId.useCase";
import { ListQuestionsBySubject } from "./ListQuestionsBySubject.useCase";
import { ListQuestionsByTypeQuestion } from "./ListQuestionsByTypeQuestion.useCase";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let createQuestion: CreateQuestionUseCase;
let listQuestionsBySubject: ListQuestionsBySubject;
let listQuestionsByTypeQuestion: ListQuestionsByTypeQuestion;
let listQuestionsByEducatorId: ListQuestionsByEducatorId;
beforeAll(async () => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
  createQuestion = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  listQuestionsBySubject = new ListQuestionsBySubject(
    inMemoryQuestionsRepository
  );
  listQuestionsByTypeQuestion = new ListQuestionsByTypeQuestion(
    inMemoryQuestionsRepository
  );
  listQuestionsByEducatorId = new ListQuestionsByEducatorId(
    inMemoryQuestionsRepository
  );

  await createQuestion.execute({
    subject: "portuguese",
    educator_id: "01-test-id",
    typeQuestion: "essay",
    description: "Example description",
    answer: "Description answer",
    correct: undefined,
  });

  await createQuestion.execute({
    subject: "portuguese",
    educator_id: "02-educator-id",
    typeQuestion: "essay",
    description: "Example description two",
    answer: "Description answer two",
    correct: undefined,
  });

  await createQuestion.execute({
    typeQuestion: "multiple-choice",
    subject: "portuguese",
    educator_id: "02-educator-id",
    description: "Example description",
    answer: ["answer A", "answer B", "answer C", "answer D", "answer E"],
    correct: "answer A",
  });

  await createQuestion.execute({
    typeQuestion: "multiple-choice",
    subject: "mathematics",
    educator_id: "01-educator-id",
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

  it("should be able to list questions by question type", async () => {
    const typeQuestionStub = "essay";

    const QuestionsByTypeQuestion = await listQuestionsByTypeQuestion.execute(
      typeQuestionStub
    );

    expect(
      QuestionsByTypeQuestion.filter(
        (question) => question.typeQuestion === typeQuestionStub
      ).length
    ).toEqual(2);
  });

  it("should be able to list questions by educator id", async () => {
    const educatorIdStub = "02-educator-id";

    const QuestionsByEducatorId = await listQuestionsByEducatorId.execute(
      educatorIdStub
    );

    expect(
      QuestionsByEducatorId.filter(
        (question) => question.educator_id === educatorIdStub
      ).length
    ).toEqual(2);
  });
});

