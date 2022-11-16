import { expect, test } from "vitest";
import { Question } from "./Question";

let question = new Question();

test("create a question", () => {
  question.typeQuestion = "MULTIPLE_CHOICE";
  question.subject = "Mathematics";
  question.description = "Question description";
  question.answer = ["Desc A", "Desc B", "Desc C", "Desc D"];
  question.correct = "Desc A";

  expect(question).toBeInstanceOf(Question);
  expect(question.typeQuestion).toEqual("MULTIPLE_CHOICE");
  expect(question.createdAt).toBeInstanceOf(Date);
});

