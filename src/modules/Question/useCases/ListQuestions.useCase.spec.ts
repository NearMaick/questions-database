import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryEducatorsRepository } from "../../Educator/repositories/implementations/InMemoryEducators.repository";
import { EnrollEducatorUseCase } from "../../Educator/useCases/EnrollEducator.useCase";
import { ListEducatorByName } from "../../Educator/useCases/ListEducatorByName.useCase";
import { InMemoryQuestionsRepository } from "../repositories/implementations/InMemoryQuestions.repository";
import { CreateQuestionUseCase } from "./CreateQuestion.useCase";
import { FindQuestionById } from "./FindQuestionById.useCase";
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
let listEducatorByName: ListEducatorByName;
let findQuestionById: FindQuestionById;

let id: string;

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
  findQuestionById = new FindQuestionById(inMemoryQuestionsRepository);
  enrollEducator = new EnrollEducatorUseCase(inMemoryEducatorsRepository);
  listEducatorByName = new ListEducatorByName(inMemoryEducatorsRepository);

  const educator = await enrollEducator.execute({
    name: "Peter Parker",
    course: "Sistemas de Informa????o",
    password: "password-test",
    email: "peter@parker.test",
  });

  id = educator.id;

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

  await createQuestion.execute({
    typeQuestion: "ESSAY",
    subject: "mathematics",
    educator_id: id,
    description: "Example description",
    answer: ["answer E"],
    correct: "answer E",
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

    const questionsBySubject = await listQuestionsBySubject.execute(
      subjectStub
    );

    expect(questionsBySubject.length).toEqual(3);
  });

  it("should be able to list questions by question type", async () => {
    const typeQuestionStub = "ESSAY";
    const questionsQuantity = "0";

    const questionsByTypeQuestion = await listQuestionsByTypeQuestion.execute(
      typeQuestionStub,
      questionsQuantity
    );

    expect(questionsByTypeQuestion.length).toEqual(3);
  });

  it("should be able to not listing questions by educator id", async () => {
    const educatorIdStub = "fake-id";

    const questionsByEducatorId = await listQuestionsByEducatorId.execute(
      educatorIdStub
    );

    expect(questionsByEducatorId.length).toEqual(0);
  });

  it("should be able to list questions by educator id", async () => {
    const { id } = await enrollEducator.execute({
      name: "Mary Jane",
      course: "An??lise de Sistemas",
      password: "password-test",
      email: "mary-jane@test.com",
    });
    await createQuestion.execute({
      subject: "Diagrama de fluxo",
      educator_id: id,
      typeQuestion: "ESSAY",
      description: "Example description",
      answer: ["Description answer"],
      correct: "Description answer",
    });

    const questionsByEducatorId = await listQuestionsByEducatorId.execute(id);

    expect(questionsByEducatorId.length).toBe(1);
  });

  it("should be able to list questions by educator", async () => {
    const educator = await listEducatorByName.execute("Peter Parker");

    const questionsByName = await listQuestionsByEducatorId.execute(
      educator?.id!
    );

    expect(questionsByName.length).toBe(6);
  });

  it("should be able to list a limited questions defined by educator", async () => {
    const typeQuestionStub = "ESSAY";
    const questionsQuantity = "2";

    const questionsByTypeQuestion = await listQuestionsByTypeQuestion.execute(
      typeQuestionStub,
      questionsQuantity
    );

    expect(questionsByTypeQuestion.length).toEqual(2);
  });

  it("should be able to list a question by id", async () => {
    const { _id }: any = await createQuestion.execute({
      typeQuestion: "MULTIPLE_CHOICE",
      subject: "identification",
      educator_id: id,
      description: "Example descriptionID",
      answer: ["answer A", "answer B", "answer C", "answer D", "answer E"],
      correct: "answer C",
    });

    const question = await findQuestionById.execute(_id);

    expect(question?.id).toEqual(_id);
    expect(question?.subject).toEqual("identification");
    expect(question?.description).toEqual("Example descriptionID");
  });
});

