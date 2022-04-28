const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const db = require('../pets')

import { dbTestPet, dbNewPet } from '../../../__mockdata__/mockPetData'

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

describe('getPetById', () => {
  it('should get the pet given the id', () => {
    return db.getPetById(2, testDb)
      .then(pet => {
        expect(pet).toEqual({...dbTestPet, createdAt: expect.anything(), updatedAt: expect.anything()})
      })
  })
})

describe('addPet', () => {
  it('should add a pet', () => {
    return db.addPet(dbNewPet, testDb).then((pet) => {
      expect(pet).toEqual({...dbNewPet, createdAt: expect.anything(), updatedAt: expect.anything(), points: expect.any(Number), id: 6})
    })
  })
})