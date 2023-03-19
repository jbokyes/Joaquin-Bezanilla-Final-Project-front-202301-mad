/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { UserServerResponse, UserStructure } from "../models/user";
import { UsersApiRepo } from "../services/repositories/users.repo";
import { store } from "../store/store";
import { useUsers } from "./use.users";

describe("Given the useUsers Custom Hook, an ApiRepo and a given component", () => {
  let mockPayload: UserStructure;
  let mockRepo: UsersApiRepo;

  beforeEach(async () => {
    mockPayload = {
      username: "joaquin-test",
      email: "test@joaquin.cl",
    } as unknown as UserStructure;

    mockRepo = {
      create: jest.fn(),
      update: jest.fn(),
      readId: jest.fn(),
    } as unknown as UsersApiRepo;

    const TestComponent = function () {
      const { registerUser, loginUser, userFavourites } = useUsers(mockRepo);

      return (
        <>
          <button onClick={() => registerUser(mockPayload)}>register</button>
          <button onClick={() => loginUser(mockPayload)}>login</button>
          <button onClick={() => userFavourites("testId", "testaction")}>
            Add to Favourites
          </button>
        </>
      );
    };
    await act(async () =>
      render(
        <Provider store={store}>
          <TestComponent></TestComponent>
        </Provider>
      )
    );
  });
  describe("When the TestComponent is rendered", () => {
    test("Then, the button should be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements[0]).toBeInTheDocument();
    });
  });
  describe("When the TestComponent is rendered and the register button is clicked", () => {
    test("Then, the registerUser function should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[0]));
      expect(mockRepo.create).toHaveBeenCalled();
    });
  });
  describe("When the TestComponent is rendered and the login button is clicked", () => {
    test("Then, the loginUser function should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[1]));
      expect(mockRepo.create).toHaveBeenCalled();
    });
  });
  describe("When the TestComponent is rendered and the addFavourite button is clicked", () => {
    test("Then the addFavourite function in the hook should be called if there is an available token", async () => {
      const mockSuccesfulResponse: UserServerResponse = {
        results: [mockPayload],
      } as unknown as UserServerResponse;
      (mockRepo.update as jest.Mock).mockResolvedValue(mockSuccesfulResponse);
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[1]));
      await act(async () => userEvent.click(elements[2]));
      expect(mockRepo.create).toHaveBeenCalled();
    });
    test("Then the addFavourite function in the hook should throw an error if there is no available token", async () => {
      const mockUnsuccesfulResponse: UserServerResponse = {
        results: { username: "test", email: "test", id: "1" },
      } as unknown as UserServerResponse;
      const elements = await screen.findAllByRole("button");
      (mockRepo.create as jest.Mock).mockResolvedValueOnce(
        mockUnsuccesfulResponse
      );
      await act(async () => userEvent.click(elements[1]));
      await act(async () => userEvent.click(elements[2]));
      expect(mockRepo.update).not.toBeCalled();
    });
  });
});
