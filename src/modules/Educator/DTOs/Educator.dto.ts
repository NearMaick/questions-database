import { Educator } from "../entities/Educator";

export type ICreateEducatorRepositoryDTO = Omit<
  Educator,
  "id" | "createdAt" | "updatedAt"
>;
export type IEducatorsListDTO = Omit<Educator, "_name" | "_course">;
export type IEducatorsCreateDTO = Omit<
  Educator,
  "id" | "_name" | "_course" | "updatedAt" | "createdAt"
>;

