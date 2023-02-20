const seed = require("../db/seeding/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const request = require("supertest");
require("jest-sorted");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("App endpoints", () => {
  describe("Pokemon", () => {
    test("husky testing", () => {
      expect("husky").toBe("husky");
    });
  });
});
