import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryEducatorsRepository } from "../../Educator/repositories/implementations/InMemoryEducators.repository";
import { EnrollEducatorUseCase } from "../../Educator/useCases/EnrollEducator.useCase";
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
let inMemoryEducatorsRepository: InMemoryEducatorsRepository;
let enrollEducator: EnrollEducatorUseCase;

beforeAll(async () => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
  inMemoryEducatorsRepository = new InMemoryEducatorsRepository();
  createQuestion = new CreateQuestionUseCase(
    inMemoryQuestionsRepository,
    inMemoryEducatorsRepository
  );
  listQuestionsBySubject = new ListQuestionsBySubject(
    inMemoryQuestionsRepository
  );
  listQuestionsByTypeQuestion = new ListQuestionsByTypeQuestion(
    inMemoryQuestionsRepository
  );
  listQuestionsByEducatorId = new ListQuestionsByEducatorId(
    inMemoryQuestionsRepository
  );
  enrollEducator = new EnrollEducatorUseCase(inMemoryEducatorsRepository);

  const { id } = await enrollEducator.execute({
    name: "Peter Parker",
    course: "Sistemas de Informação",
  });

  await createQuestion.execute({
    subject: "portuguese",
    educator_id: id,
    typeQuestion: "ESSAY",
    description: "Example description",
    answer: ["Description answer"],
    correct: "Description answer",
  });

  await createQuestion.execute({
    subject: "portuguese",
    educator_id: id,
    typeQuestion: "ESSAY",
    description: "Example description two",
    answer: ["Description answer two"],
    correct: "Description answer two",
  });

  await createQuestion.execute({
    typeQuestion: "MULTIPLE_CHOICE",
    subject: "portuguese",
    educator_id: id,
    description: "Example description",
    answer: ["answer A", "answer B", "answer C", "answer D", "answer E"],
    correct: "answer A",
  });

  await createQuestion.execute({
    typeQuestion: "MULTIPLE_CHOICE",
    subject: "mathematics",
    educator_id: id,
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
    const typeQuestionStub = "ESSAY";

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
    ).toEqual(0);
  });
});

