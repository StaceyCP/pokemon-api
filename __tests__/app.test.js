const seed = require("../db/seeding/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const { app } = require("../app");
const request = require("supertest");
require("jest-sorted");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("Pokedex endpoints", () => {
  describe("Pokemon", () => {
    test("Responds with a status code of 200", () => {
      return request(app).get("/api/pokemon").expect(200);
    });
    test("Responds with an object cotaining a key of pokemon and an array containing all the pokemon", () => {
      return request(app)
        .get("/api/pokemon")
        .expect(200)
        .then((res) => {
          const pokemon = res._body.pokemon;
          expect(pokemon.length).toBe(8);
          pokemon.forEach((singlePokemon) => {
            expect(singlePokemon).toHaveProperty("id");
            expect(singlePokemon).toHaveProperty("name");
            expect(singlePokemon).toHaveProperty("spriteurl");
            expect(singlePokemon).toHaveProperty("generation");
          });
        });
    });
  });

  describe("Abilities", () => {
    test("Responds with a status code of 200", () => {
      return request(app).get("/api/abilities").expect(200);
    });
    test("Responds with an array containing pokemon abilities", () => {
      return request(app)
        .get("/api/abilities")
        .expect(200)
        .then((res) => {
          const abilities = res._body.abilities;
          expect(abilities.length).toBe(10);
          abilities.map((ability) => {
            expect(ability).toHaveProperty("name");
            expect(ability).toHaveProperty("id");
            expect(ability).toHaveProperty("description");
            expect(ability).toHaveProperty("generation");
          });
        });
    });
  });

  describe("Generations", () => {
    test("should return a 200 status code", () => {
      return request(app).get("/api/generations").expect(200);
    });
    test("should return an array containing the pokemon generations data", () => {
      return request(app)
        .get("/api/generations")
        .expect(200)
        .then((res) => {
          const generations = res._body.generations;
          expect(generations.length).toBe(9);
          generations.map((generation) => {
            expect(generation).toHaveProperty("generation");
            expect(generation).toHaveProperty("new_pokemon");
            expect(generation).toHaveProperty("total_pokemon");
          });
        });
    });
  });

  describe("Types", () => {
    test("should return a 200 status code", () => {
      return request(app).get("/api/types").expect(200);
    });
    test("should return an array containing all the pokemon types", () => {
      return request(app)
        .get("/api/types")
        .expect(200)
        .then((res) => {
          const types = res._body.types;
          expect(types.length).toBe(18);
          types.map((type) => {
            expect(type).toHaveProperty("type");
            expect(type).toHaveProperty("description");
            expect(type).toHaveProperty("generation");
          });
        });
    });
  });
});
