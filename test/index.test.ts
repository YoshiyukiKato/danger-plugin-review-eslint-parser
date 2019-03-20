import {initEslintParser} from "../src";
import {readFileSync} from "fs";
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
  it("parse eslint result json", async () => {
    const eslintPath = path.resolve(__dirname, "./fixture/eslint-result.json");
    const parsed = await initEslintParser("/var/lib/jenkins/workspace/Releases/eslint Release")(readFileSync(eslintPath).toString());
    expect(parsed[0].file).toBe("eslint/fullOfProblems.js");
  });
})