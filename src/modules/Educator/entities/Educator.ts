import { randomUUID } from "node:crypto";

export class Educator {
  private _id!: string;
  private _name!: string;
  private _course!: string;
  private _createdAt!: Date;
  private _updatedAt!: Date;

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get course() {
    return this._course;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set course(value: string) {
    this._course = value;
  }

  private set id(value: string) {
    this._id = value;
  }

  private set createdAt(value: Date) {
    this._createdAt = value;
  }

  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  constructor() {
    if (this._id || this._createdAt) {
      this._updatedAt = new Date();
    } else {
      this._id = randomUUID();
      this._createdAt = new Date();
    }
  }
}

