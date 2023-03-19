import { UsersApiRepo } from "./users.repo";

describe("Given UsersApiRepo class being instanced", () => {
  let mockRepoUsers: UsersApiRepo;

  beforeEach(() => {
    mockRepoUsers = new UsersApiRepo();
  });

  describe("When we call the create method", () => {
    test("If the response from fetch is ok, we should get the mock value", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          username: "joaquin-test",
        }),
      });
      const result = await mockRepoUsers.create(
        { username: "joaquin-test" },
        "register"
      );
      expect(result).toEqual({ username: "joaquin-test" });
    });
    test("If the response from fetch is not ok, we should get an error", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: "test status",
        statusText: "test statusText",
      });
      const result = mockRepoUsers.create(
        { username: "joaquin-test" },
        "register"
      );
      await expect(result).rejects.toThrow();
    });
  });
  describe("When the readId method is called", () => {
    test("Then if the fetch response is ok, the result should be equal to the mock value", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          username: "joaquín",
        }),
      });
      const result = await mockRepoUsers.readId("testId", "tokenTest");
      await expect(result).toEqual({ username: "joaquín" });
    });
    test("Then if the fetch response is not ok, it should throw us an error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error");
      const result = mockRepoUsers.readId("testId", "testToken");
      await expect(result).rejects.toThrow();
    });
  });
  describe("When we call the update method", () => {
    test("Then if the fetch response is ok, the result should equal the mock value", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          username: "joaquín",
        }),
      });
      const result = await mockRepoUsers.update(
        "testId",
        "testToken",
        "testAction"
      );
      expect(result).toEqual({ username: "joaquín" });
    });
    test("Then if the fetch response is not ok, it should throw us an error", async () => {
      global.fetch = jest.fn().mockResolvedValue("test error");
      const result = mockRepoUsers.update("test", "test", "test");
      await expect(result).rejects.toThrowError();
    });
  });
});
