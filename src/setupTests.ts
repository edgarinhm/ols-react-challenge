import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { configure } from "@testing-library/dom";
import "common/extensions/dayjs-extensions";
import "vitest-canvas-mock";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case
afterEach(() => {
  cleanup();
});

configure({ testIdAttribute: "data-qa" });
