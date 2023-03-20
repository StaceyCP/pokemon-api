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
          expect(res._body.total).toBe(8);
          pokemon.forEach((singlePokemon) => {
            expect(singlePokemon).toHaveProperty("id");
            expect(singlePokemon).toHaveProperty("name");
            expect(singlePokemon).toHaveProperty("spriteurl");
            expect(singlePokemon).toHaveProperty("generation");
            expect(singlePokemon).toHaveProperty("type");
            expect(singlePokemon).toHaveProperty("abilities");
            expect(Array.isArray(singlePokemon.type)).toBe(true);
            expect(Array.isArray(singlePokemon.abilities)).toBe(true);
          });
        });
    });
    test("Pokemon should be ordered by id in ascending order", () => {
      return request(app)
        .get("/api/pokemon")
        .expect(200)
        .then((response) => {
          const pokemon = response._body.pokemon;
          expect(pokemon).toBeSortedBy("id");
        });
    });
    test("Get request accepts a pokemon name as a query and returns the correct pokemon", () => {
      return request(app)
        .get("/api/pokemon/bulbasaur")
        .expect(200)
        .then((response) => {
          const returnedPokemon = response._body.pokemon;
          expect(returnedPokemon.name).toBe("bulbasaur");
          expect(returnedPokemon.id).toBe(1);
          expect(returnedPokemon.spriteurl).toBe(
            "https://img.pokemondb.net/sprites/black-white/normal/bulbasaur.png"
          );
          expect(returnedPokemon.generation).toBe("I");
          expect(returnedPokemon.type).toEqual(["grass", "poison"]);
          expect(returnedPokemon.abilities).toEqual(["chlorophyll"]);
        });
    });
    test('Responds with a 404 error "Pokemon not found" when sent a name that does not currently exist within the database', () => {
      return request(app)
        .get("/api/pokemon/ekans")
        .expect(404)
        .then((response) => {
          expect(response._body.message).toBe("Pokemon not found :(");
        });
    });
    test("Get request accepts a pokemon id as a query and returns the correct pokemon", () => {
      return request(app)
        .get("/api/pokemon/1")
        .expect(200)
        .then((response) => {
          const returnedPokemon = response._body.pokemon;
          expect(returnedPokemon.name).toBe("bulbasaur");
          expect(returnedPokemon.id).toBe(1);
          expect(returnedPokemon.spriteurl).toBe(
            "https://img.pokemondb.net/sprites/black-white/normal/bulbasaur.png"
          );
          expect(returnedPokemon.generation).toBe("I");
          expect(returnedPokemon.type).toEqual(["grass", "poison"]);
          expect(returnedPokemon.abilities).toEqual(["chlorophyll"]);
        });
    });
    test('Responds with a 404 error "Pokemon not found" when sent an id that does not currently exist within the database', () => {
      return request(app)
        .get("/api/pokemon/100")
        .expect(404)
        .then((response) => {
          expect(response._body.message).toBe("Pokemon not found :(");
        });
    });
    test("Accepts a generation query that responds with an array of the pokemon from the given generation", () => {
      return request(app)
        .get("/api/pokemon?generation=II")
        .expect(200)
        .then((response) => {
          const pokemon = response._body.pokemon;
          expect(pokemon.length).toBe(3);
          pokemon.forEach((poke) => {
            expect(poke.generation).toBe("II");
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
          expect(res._body.total).toBe(10);
          abilities.map((ability) => {
            expect(ability).toHaveProperty("name");
            expect(ability).toHaveProperty("id");
            expect(ability).toHaveProperty("description");
            expect(ability).toHaveProperty("generation");
            expect(ability).toHaveProperty("pokemon");
          });
        });
    });
    test("GET /api/abilities/:id responds with the correct ability", () => {
      return request(app)
        .get("/api/abilities/6")
        .expect(200)
        .then((response) => {
          const ability = response._body.ability;
          expect(ability.id).toBe(6);
          expect(ability.name).toBe("chlorophyll");
          expect(ability.description).toBe(
            "Boosts the Pokémon's Speed stat in harsh sunlight."
          );
          expect(ability.generation).toBe("III");
          expect(ability.pokemon).toEqual(["bulbasaur", "ivysaur"]);
        });
    });
    test("should respond with a 404 - not found when passed an id that is not in the database", () => {
      return request(app)
        .get("/api/abilities/999")
        .expect(404)
        .then((response) => {
          expect(response._body.message).toBe("Ability not found :(");
        });
    });
    test("should respond with a 400 - not found when passed an id that is not the correct datatype", () => {
      return request(app)
        .get("/api/abilities/abc")
        .expect(400)
        .then((response) => {
          expect(response._body.message).toBe("Bad Request :(");
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
          expect(res._body.total).toBe(18);
          types.map((type) => {
            expect(type).toHaveProperty("type");
            expect(type).toHaveProperty("description");
            expect(type).toHaveProperty("generation");
            expect(type).toHaveProperty("pokemon");
          });
        });
    });
    test("GET api/types/grass should return the correct type", () => {
      return request(app)
        .get("/api/types/grass")
        .expect(200)
        .then((response) => {
          const type = response._body.type;
          expect(type.type).toBe("grass");
          expect(type.description).toBe(
            "The Grass type is one of the eighteen types, originating in generation 1"
          );
          expect(type.generation).toBe("I");
          expect(type.pokemon).toEqual(["bulbasaur", "ivysaur"]);
        });
    });
    test("returns a 404 type not found error when passed a type that does not exist in the database", () => {
      return request(app)
        .get("/api/types/fighter")
        .expect(404)
        .then((response) => {
          expect(response._body.message).toBe("Type not found :(");
        });
    });
  });
});
