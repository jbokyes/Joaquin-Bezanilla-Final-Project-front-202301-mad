/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { useFood } from "../../hooks/use.food";
import { store } from "../../store/store";
import Details from "./details";

jest.mock("../../hooks/use.food");

describe("Given the Details page component", () => {
  beforeEach(async () => {
    (useFood as jest.Mock).mockReturnValue({
      foods: [
        {
          id: "1",
          name: "foodtest1",
        },
        {
          id: "2",
          name: "foodtest2",
        },
      ],
      loadOneFestival: jest.fn(),
      deleteFood: jest.fn(),
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Details></Details>
          </MemoryRouter>
        </Provider>
      );
    });
  });

  describe("When we render the component", () => {
    test('Then, the title "Details" should be in the document', async () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
