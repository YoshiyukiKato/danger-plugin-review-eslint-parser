import parseEslint from "../src";
import * as path from "path";

declare const global: any
beforeEach(() => {
  global.warn = jest.fn()
  global.message = jest.fn()
  global.fail = jest.fn()
  global.markdown = jest.fn()
  global.danger = { utils: { sentence: jest.fn() } }
})

afterEach(() => {
  global.warn = undefined
  global.message = undefined
  global.fail = undefined
  global.markdown = undefined
})

describe("aggregate", () => {
  it("is empty test. TBD", async () => {
    const eslintPath = path.resolve(__dirname, "./fixture/eslint-result.json");
    const parsed = await parseEslint(eslintPath);
    console.log(parsed);
  });
})