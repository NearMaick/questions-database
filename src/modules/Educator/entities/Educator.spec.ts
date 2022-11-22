import { expect, test } from "vitest";
import { Educator } from "./Educator";

let educator = new Educator();

test("Enroll a educator", () => {
  educator.name = "John Doe";
  educator.course = "Mathematics";
  educator.password = "test-password";
  educator.email = "test@email.com";

  expect(educator).toBeInstanceOf(Educator);
  expect(educator.name).toEqual("John Doe");
  expect(educator.email).toEqual("test@email.com");
  expect(educator.password).toEqual("test-password");
  expect(educator.createdAt).toBeInstanceOf(Date);
});

test("update date to an existent educator", () => {
  educator.name = "Mary Jane";
  educator.course = "Science";
  educator.updatedAt = new Date();

  expect(educator.name).toEqual("Mary Jane");
  expect(educator.course).toEqual("Science");
  expect(educator.updatedAt).toBeInstanceOf(Date);
});

