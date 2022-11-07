import { randomUUID } from "node:crypto";

export class Question {
  private _id?: string;
  private _typeQuestion: "essay" | "multiple-choice";
  private _educator_id: string;
  private _subject: string;
  private _description: string;
  private _answer: string | string[];
  private _createdAt?: Date;
  private _correct?: string;

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

  public get correct() {
    return this._correct;
  }

  public get educator_id() {
    return this._educator_id;
  }

  public get subject() {
    return this._subject;
  }

  public get createdAt() {
    return this._createdAt!;
  }

  public set typeQuestion(value: "essay" | "multiple-choice") {
    this._typeQuestion = value;
  }

  public set description(value: string) {
    this._description = value;
  }

  public set answer(value: string | string[]) {
    this._answer = value;
  }

  public set correct(value: string | undefined) {
    this._correct = value;
  }

  private set id(value: string) {
    this._id = value;
  }

  public set educator_id(value: string) {
    this._educator_id = value;
  }

  public set subject(value: string) {
    this._subject = value;
  }

  private set createdAt(value: Date) {
    this._createdAt = value;
  }

  constructor() {
    this._id = randomUUID();
    this._createdAt = new Date();
  }
}

