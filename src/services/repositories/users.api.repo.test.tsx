import { UsersApiRepo } from "./users.api.repo";

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
        "joaquin-test"
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
        "joaquin-test"
      );
      await expect(result).rejects.toThrow();
    });
  });
});