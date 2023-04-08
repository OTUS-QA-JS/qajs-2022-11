import config from "../config.js";
import supertest from "supertest";

let trello = supertest(config.url);

export const getBoards = async (credentials) => {
  const res = await trello.get('/1/members/me/boards').send(credentials);
  return res;
}