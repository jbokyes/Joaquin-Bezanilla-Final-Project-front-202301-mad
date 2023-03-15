import { MemoryRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { MenuOption } from "../app/app";
import { AppRouter } from "./app-router";
import "@testing-library/jest-dom";
import React from "react";

describe("Given AppRouter component", () => {
  const mockOptions: MenuOption[] = [
    { label: "Home", path: "/home" },
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Favourites", path: "/favourites" },
  ];
  describe("When rendering and the path is '/'", () => {
    test("Then, the title 'Welcome to the Rick and Morty' from Home should be in the screen", async () => {
      render(
        <Router
          initialEntries={["/", "/about", "/login", "/register", "/favourites"]}
          initialIndex={0}
        >
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("heading", {
        name: "Home",
      });
      expect(element).toBeInTheDocument();
    });
  });
  describe("When rendering and the path is '/about'", () => {
    test("Then, the title 'What is this site for?' from Home should be in the screen", async () => {
      render(
        <Router
          initialEntries={["/", "/about", "/login", "/register", "/favourites"]}
          initialIndex={1}
        >
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("heading", {
        name: "About",
      });
      expect(element).toBeInTheDocument();
    });
  });
  describe("When rendering and the path is '/login'", () => {
    test("Then, the title 'Login' from Home should be in the screen", async () => {
      render(
        <Router
          initialEntries={["/", "/about", "/login", "/register", "/favourites"]}
          initialIndex={2}
        >
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("heading", {
        name: "Login",
      });
      expect(element).toBeInTheDocument();
    });
  });
  describe("When rendering and the path is '/register'", () => {
    test("Then, the title 'register' from Home should be in the screen", async () => {
      render(
        <Router
          initialEntries={["/", "/about", "/login", "/register", "/favourites"]}
          initialIndex={3}
        >
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("heading", {
        name: "Register",
      });
      expect(element).toBeInTheDocument();
    });
  });
  describe("When rendering and the path is '/favourites'", () => {
    test("Then, the title 'Favourites' from Home should be in the screen", async () => {
      render(
        <Router
          initialEntries={["/", "/about", "/login", "/register", "/favourites"]}
          initialIndex={4}
        >
          <AppRouter menuOptions={mockOptions}></AppRouter>
        </Router>
      );

      const element = await screen.findByRole("heading", {
        name: "Favourites",
      });
      expect(element).toBeInTheDocument();
    });
  });
});
