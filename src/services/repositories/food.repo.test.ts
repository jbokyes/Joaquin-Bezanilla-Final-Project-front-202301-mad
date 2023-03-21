import { FoodStructure } from "../../models/food";
import { FoodRepo } from "./food.repo";

describe("Given the FoodRepo", () => {
  let foodMockRepo: FoodRepo;

  beforeAll(() => {
    foodMockRepo = new FoodRepo();
  });

  describe("When we call the loadFoods method", () => {
    test("Then it should make a GET request to the /foods endpoint", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          region: "CHILE",
        }),
      });
      const result = await foodMockRepo.loadFoods();
      expect(result).toEqual({ region: "CHILE" });
    });
    test("Then it should throw an error when the fetch fails to return data", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({
          region: "CHILE",
        }),
      });
      const result = foodMockRepo.loadFoods();
      await expect(result).rejects.toThrow();
    });
  });
  describe("When loadSingleFood is called", () => {
    test("Then it should fetch and return the food dish with the id we enter as parameter", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: "1",
          region: "test",
        }),
      });
      const result = await foodMockRepo.loadSingleFood("1");
      expect(result).toEqual({ id: "1", region: "test" });
    });
    test("Then it should throw an error if it returns no data", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = foodMockRepo.loadSingleFood("1");
      await expect(result).rejects.toThrow();
    });
  });
  describe("When we call the method createFood", () => {
    const mockFood = {
      name: "choripan",
      region: "chile",
    } as unknown as FoodStructure;
    test("Then it should return the value we pass to create", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest
          .fn()
          .mockResolvedValue({ name: "choripan", region: "chile" }),
      });
      await foodMockRepo.createFood(mockFood);
      expect(mockFood).toEqual({ name: "choripan", region: "chile" });
    });
    test("Then it should return an error when passing an invalid parameter", async () => {
      const mockCreatedFood = {
        id: "1",
        region: "chile lindo",
      } as unknown as FoodStructure;
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue(undefined),
      });
      await expect(foodMockRepo.createFood(mockCreatedFood)).rejects.toThrow();
      expect(fetch).toHaveBeenCalled();
    });
  });
  describe("When we call the edit method", () => {
    const foodToUpdate = {
      id: "10",
      name: "choripan",
      region: "chile",
    } as unknown as FoodStructure;
    test("Then it should return the new updated (edited) value", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest
          .fn()
          .mockResolvedValue({ id: "10", name: "choripan", region: "chile" }),
      });
      await foodMockRepo.patchFood(foodToUpdate);
      expect(foodToUpdate).toEqual({
        id: "10",
        name: "choripan",
        region: "chile",
      });
    });
    test("Then it should throw error when giving invalid values", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error");
      const update = foodMockRepo.patchFood({
        id: "10",
        name: "choripan",
        region: "chile",
      });
      await expect(update).rejects.toThrow();
    });
  });
  describe("When we call the delete method", () => {
    test("Then it should call fetch but return void", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn(),
      });
      const deleteFood = await foodMockRepo.deleteFood("10");
      expect(fetch).toHaveBeenCalled();
      expect(deleteFood).toBe(undefined);
    });
    test("Then it should throw an error", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue(undefined),
      });
      const deleteFestival = foodMockRepo.deleteFood("1");
      await expect(deleteFestival).rejects.toThrow();
    });
  });
});
