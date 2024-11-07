const briefPause = require('./briefPause.js')


// Mock the axios function:
let axios = jest.fn(async (axiosArgument) => {

  const requestMethod = axiosArgument.method.toUpperCase()
  
  // Handles axios({method, url, data}) usage:
  if (requestMethod === 'POST') {
    const { numOne, numTwo, operator } = axiosArgument.data
    return mockedPost(axiosArgument.url, axiosArgument.data)
  } else if (requestMethod === 'GET') {
    return mockedGet(axiosArgument.url)
  }
})


async function mockedPost(url, reqBody) {
  const requestTimestamp = Date.now()
  // 1. Obtain req.body data numOne, numTwo, operator
  const { numOne, numTwo, operator } = reqBody

  // 2. Create calculation object
  const calculation = {
    numOne: Number(numOne),
    numTwo: Number(numTwo),
    operator
  }
  
  // 3. Do the math and assign result to calculation.result
  const result = obtainResult(calculation)
  calculation.result = result

  // 4. Push the solved calculation into the test array of calculations:
  axios.testData.push(calculation)

  await briefPause(150)

  const postResult = {
    reqBody: reqBody,
    status: 201,
    requestMethod: 'POST',
    requestTimestamp,
    responseTimestamp: Date.now()
  }
  
  axios.calls.push(postResult)
  return Promise.resolve(postResult)
}

async function mockedGet(url) {
  const requestTimestamp = Date.now()

  
  await briefPause(10)
  
  const getResult = {
    status: 200,
    data: axios.testData,
    requestMethod: 'GET',
    requestTimestamp,
    responseTimestamp: Date.now()
  }

  axios.calls.push(getResult)
  return Promise.resolve(getResult)
}

function obtainResult(calculation) {
  switch (calculation.operator) {
    case '+':
      return calculation.numOne + calculation.numTwo;
    case '-':
      return calculation.numOne - calculation.numTwo;
    case '*':
      return calculation.numOne * calculation.numTwo;
    case '/':
      return calculation.numOne / calculation.numTwo;
    default:
      break
  }
}

// Handles axios.get('/calculations'):
axios.get = (url) => mockedGet(url)

// Handles axios.post('/calculations', {numOne, numTwo, operator}):
axios.post = (url, data) => mockedPost(url, data)

axios.calls = []

axios.testData = []

module.exports = axios
