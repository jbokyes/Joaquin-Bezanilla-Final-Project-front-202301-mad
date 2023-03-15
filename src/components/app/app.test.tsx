import { render } from "@testing-library/react";
import React from "react";
import { AppRouter } from "../app-router/app-router";
import { Header } from "../header/header";
import { App } from "./app";

jest.mock("../header/header");
jest.mock("../app-router/app-router");

describe("Given the App component", () => {
  describe("when it is rendered", () => {
    test("then it should call Header", () => {
      render(<App></App>);
      expect(Header).toHaveBeenCalled();
    });
    test("then it should call AppRouter", () => {
      render(<App></App>);
      expect(AppRouter).toHaveBeenCalled();
    });
  });
});
