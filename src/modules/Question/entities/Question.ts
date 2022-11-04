import { randomUUID } from "node:crypto";

export class Question {
  private _id?: string;
  private _typeQuestion: "essay" | "multiple-choice";
  private _description: string;
  private _answer: string;
  private _createdAt?: Date;

  public get id() {
    return this._id!;
  }

  public get typeQuestion() {
    return this._typeQuestion;
  }

  public get description() {
    return this._description;
  }

  public get answer() {
    return this._answer;
  }

  public get createdAt() {
    return this._createdAt!;
  }

  public set description(value: string) {
    this._description = value;
  }

  public set typeQuestion(value: "essay" | "multiple-choice") {
    this._typeQuestion = value;
  }

  public set answer(value: string) {
    this._answer = value;
  }

  private set id(value: string) {
    this._id = value;
  }

  private set createdAt(value: Date) {
    this._createdAt = value;
  }

  constructor() {
    this._id = randomUUID();
    this._createdAt = new Date();
  }
}

