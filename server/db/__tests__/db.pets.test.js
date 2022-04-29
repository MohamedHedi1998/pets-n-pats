const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const db = require('../pets')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getAllPets', () => {
  it('should return all pets', () => {
    return db.getAllPets(testDb).then((pets) => {
      expect(pets).toHaveLength(5)
    })
  })
})

describe('addPoints', () => {
  it('should add 2 points', () => {
    return db
      .addPoints(4, testDb)
      .then(() => db.getWinnerById(4, testDb))
      .then((pet) => {
        expect(pet.points).toEqual(83 + 2)
      })
  })
})
