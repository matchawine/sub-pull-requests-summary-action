module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts"],
  testMatch: ["**/*.test.ts"],
  preset: "ts-jest",
  verbose: true,
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.eslintrc.json",
    },
  },
}
