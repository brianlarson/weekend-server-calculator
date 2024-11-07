// Jest, annoyingly, has no built-in way to fail early if a
// single test fails. This results in super verbose console
// output that buries the "first next test" that needs to
// satisfied.
// Using this environment as a "for now" fix, although it
// seems that the Jest team doesn't have interest in
// enabling this behavior.
// Refer to:
// => https://github.com/jestjs/jest/issues/8387#issuecomment-983675423
// => https://github.com/jestjs/jest/pull/9944
// 

const config = {
  testPathIgnorePatterns: ['/__utils__/'],
  setupFilesAfterEnv: ["jest-expect-message"],
};

module.exports = config;
