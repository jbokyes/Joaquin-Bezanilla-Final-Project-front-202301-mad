import { PayloadAction } from "@reduxjs/toolkit";
import { UserStructure } from "../models/user";
import { State, userReducer } from "./user.slice";

describe("Given the userSlice with payload and initial state mocked", () => {
  let mockInitialState: State;
  let mockPayload: UserStructure;
  let mockUser: UserStructure;

  beforeEach(() => {
    mockInitialState = {
      userLogged: {} as UserStructure,
      user: {} as UserStructure,
      allUsers: [],
    };

    mockPayload = {
      username: "joaquin1",
      email: "joaquin1@latinofoods.cl",
      role: "user",
      addFoods: [],
      id: "100",
    };
    mockUser = {
      username: "testing-update",
      email: "testing-update",
      lastName: "testing-update",
      addFoods: [],
      id: "99",
    };
  });

  describe("When the register action is called", () => {
    test("Then, if the initial state users is an empty array, it should return the array with the payload", () => {
      const mockRegisterAction: PayloadAction<UserStructure> = {
        type: "user/register",
        payload: mockPayload,
      };
      const result = userReducer(mockInitialState, mockRegisterAction);
      expect(result).toEqual({
        userLogged: {} as UserStructure,
        allUsers: [mockPayload],
        user: {},
      });
    });
  });

  describe("When the login action is called", () => {
    test("Then, if the initial state userLogged is empty, it should return the payload in the userLogged property of the state", () => {
      const mockLoginAction: PayloadAction<UserStructure> = {
        type: "user/login",
        payload: mockPayload,
      };
      const result = userReducer(mockInitialState, mockLoginAction);
      expect(result).toEqual({
        userLogged: mockPayload,
        allUsers: [],
        user: {},
      });
    });
  });
  describe("When the readId action is called", () => {
    test("Then, the function should return whatever payload we give", () => {
      const mockReadIdAction: PayloadAction<UserStructure> = {
        type: "user/readId",
        payload: mockPayload,
      };
      const result = userReducer(mockInitialState, mockReadIdAction);
      expect(result).toEqual({
        userLogged: {},
        allUsers: [],
        user: mockPayload,
      });
    });
  });
  describe("When we call the update action", () => {
    test("Then, with our initial state, it should return allUsers containing the payload", () => {
      mockInitialState = {
        userLogged: {} as UserStructure,
        allUsers: [mockUser, mockPayload],
        user: {} as UserStructure,
      };
      const mockUpdate: PayloadAction<UserStructure> = {
        type: "user/update",
        payload: {
          username: "testing-update",
          email: "testing-update",
          lastName: "testing-update",
          addFoods: [],
          id: "100",
        },
      };
      const result = userReducer(mockInitialState, mockUpdate);
      expect(result).toEqual({
        userLogged: {
          username: "testing-update",
          email: "testing-update",
          lastName: "testing-update",
          addFoods: [],
          id: "100",
        },
        allUsers: [
          mockUser,
          {
            username: "testing-update",
            email: "testing-update",
            lastName: "testing-update",
            addFoods: [],
            id: "100",
            role: "user",
          },
        ],
        user: {},
      });
    });
  });
  describe("When the logout method is called", () => {
    test("Then it should return the mock", () => {
      const logoutAction = {
        type: "user/logout",
        payload: "",
      };
      const mockReducer = userReducer(mockInitialState, logoutAction);
      expect(mockReducer.user).toEqual({});
    });
  });
});
