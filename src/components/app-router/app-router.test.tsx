import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { AppRouter } from "./app-router";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../../store/store";

describe("Given AppRouter component", () => {
  const prepareTestFunction = (number: number) => {
    render(
      <Provider store={store}>
        <Router
          initialEntries={["/", "/about", "/login", "/register", "/favourites"]}
          initialIndex={number}
        >
          <AppRouter></AppRouter>
        </Router>
      </Provider>
    );
  };
  describe("When rendering and the path is '/'", () => {
    test("Then, the image from Welcome from Home should be in the screen", async () => {
      await waitFor(async () => prepareTestFunction(0));
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
  describe("When rendering and the path is '/about'", () => {
    test("Then, the title 'What is this site for?' from Home should be in the screen", async () => {
      await waitFor(async () => prepareTestFunction(1));
      const element = await screen.findByRole("heading", {
        name: "About this Page",
      });
      expect(element).toBeInTheDocument();
    });
  });
  describe("When rendering and the path is '/login'", () => {
    test("Then, the title 'Login' from Home should be in the screen", async () => {
      await waitFor(async () => prepareTestFunction(2));
      const element = await screen.findByRole("heading", {
        name: "Login",
      });
      expect(element).toBeInTheDocument();
    });
  });
  describe("When rendering and the path is '/register'", () => {
    test("Then, the title 'register' from Home should be in the screen", async () => {
      await waitFor(async () => prepareTestFunction(3));
      const element = await screen.findByRole("heading", {
        name: "Register",
      });
      expect(element).toBeInTheDocument();
    });
  });
  describe("When rendering and the path is '/favourites'", () => {
    test("Then, the title 'Favourites' from Home should be in the screen", async () => {
      await waitFor(async () => prepareTestFunction(4));
      const element = await screen.findByRole("heading", {
        name: "Favourites",
      });
      expect(element).toBeInTheDocument();
    });
  });
});
