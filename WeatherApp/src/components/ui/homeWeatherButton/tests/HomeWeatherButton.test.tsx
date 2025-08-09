import { render, screen, fireEvent } from "@testing-library/react";
import HomeWeatherButton from "../HomeWeatherButton";
import { useWeatherStore } from "../../../../core/store/useWeatherStore";

// Мокируем хранилище
jest.mock("../../../../core/store/useWeatherStore", () => ({
  __esModule: true,
  default: jest.fn(),
  useWeatherStore: jest.fn(),
}));

describe("HomeWeatherButton", () => {
  const mockGetCurrentCoords = jest.fn();
  const mockUseWeatherStore = useWeatherStore as unknown as jest.Mock;

  beforeEach(() => {
    // Правильная установка моковых значений
    mockUseWeatherStore.mockImplementation(() => ({
      coords: null,
      getCurrentCoords: mockGetCurrentCoords,
      error: null,
      loading: false,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("корректно отображает кнопку", () => {
    render(<HomeWeatherButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("вызывает getCurrentCoords при клике", () => {
    render(<HomeWeatherButton />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockGetCurrentCoords).toHaveBeenCalledTimes(1);
  });
});
