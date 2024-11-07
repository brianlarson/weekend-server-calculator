const request = require('supertest')
const app = require('../server/server.js')
const testCalculations = require('./__utils__/testCalculations.js')


describe(`Server-Side Tests:`, () => {
  beforeAll(() => {
    console.log = () => {}
  })

  beforeEach(() => {
    app.setCalculations([...testCalculations])
  })

  afterAll(() => {
    app.closeServer()
  })
  
  test(`GET /calculations sends back the array of calculation objects`, (done) => {
    request(app)
      .get('/calculations')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(testCalculations, done)
  })

  test(`Addition: POST /calculations pushes a calculation object into the calculations array and responds with 201`, (done) => {
    const testAdditionCalculation = {
      numOne: 100,
      numTwo: 150,
      operator: '+'
    }

    const testAdditionResult = {
      ...testAdditionCalculation,
      result: 250
    }

    request(app)
      .post('/calculations')
      .send(testAdditionCalculation)
      .expect(201)
      .then(() => {
        testCalculations.push(testAdditionResult)
        request(app)
          .get('/calculations')
          .expect(testCalculations, done)
      })
  })

  // Commenting this out for now. If a student's client-side code guarantees that only numbers will be sent
  // to the server, there's no need for the POST route to be able to handle incoming strings. Would make
  // more sense to test that the client-side code sends numOne and numTwo as numbers.
  // test(`Addition: POST /calculations : Make Sure you aren't accidentally concatenating or sending strings!`, (done) => {
  //   const testAdditionCalculation = {
  //     numOne: '100',
  //     numTwo: '150',
  //     operator: '+'
  //   }

  //   const testAdditionResult = {
  //     ...testAdditionCalculation,
  //     result: 250
  //   }

  //   request(app)
  //     .post('/calculations')
  //     .send(testAdditionCalculation)
  //     .expect(201)
  //     .then(() => {
  //       testCalculations.push(testAdditionResult)
  //       request(app)
  //         .get('/calculations')
  //         .expect(testCalculations, done)
  //     })
  // })

  test(`Subtraction: POST /calculations handles pushes a calculation object into the calculations array and responds with status 201`, (done) => {
    const testSubtractionCalculation = {
      numOne: 100,
      numTwo: 150,
      operator: '-'
    }

    const testSubtractionResult = {
      ...testSubtractionCalculation,
      result: -50
    }

    request(app)
      .post('/calculations')
      .send(testSubtractionCalculation)
      .expect(201)
      .then(() => {
        testCalculations.push(testSubtractionResult)
        request(app)
          .get('/calculations')
          .expect(testCalculations, done)
      })
  })

  test(`Multiplication: POST /calculations pushes a calculation object into the calculations array and responds with status 201`, (done) => {
    const testMultiplicationCalculation = {
      numOne: 10,
      numTwo: 7,
      operator: '*'
    }

    const testMultiplicationResult = {
      ...testMultiplicationCalculation,
      result: 70
    }

    request(app)
      .post('/calculations')
      .send(testMultiplicationCalculation)
      .expect(201)
      .then(() => {
        testCalculations.push(testMultiplicationResult)
        request(app)
          .get('/calculations')
          .expect(testCalculations, done)
      })
  })

  test(`Division: POST /calculations pushes a calculation object into the calculations array and responds with status 201`, (done) => {
    const testDivisionCalculation = {
      numOne: 100,
      numTwo: 25,
      operator: '/'
    }

    const testDivisionResult = {
      ...testDivisionCalculation,
      result: 4
    }
    request(app)
      .post('/calculations')
      .send(testDivisionCalculation)
      .expect(201)
      .then(() => {
        testCalculations.push(testDivisionResult)
        request(app)
          .get('/calculations')
          .expect(testCalculations, done)
      })
  })

})
