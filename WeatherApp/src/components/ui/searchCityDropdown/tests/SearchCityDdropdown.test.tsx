import { render, screen, fireEvent } from "@testing-library/react";
import SearchCityDropdown from "../SearchCityDdropdown";
import { useWeatherStore } from "../../../../core/store/useWeatherStore";
import "@testing-library/jest-dom";

jest.mock("../styles/index.module.css", () => ({
  __esModule: true,

  default: {
    dropdawnContainer: "dropdawnContainer_mocked",
    dropdawnItem: "dropdawnItem_mocked",
    activeItem: "activeItem_mocked",
  },
}));

jest.mock("../../../../core/store/useWeatherStore");

describe("SearchCityDropdown", () => {
  const mockHandleItemClick = jest.fn();
  const mockSetActiveIndex = jest.fn();
  const mockSetIsKeyboardNavigation = jest.fn();

  const mockCities = [
    { id: 1, name: "London" },
    { id: 2, name: "Paris" },
    { id: 3, name: "Berlin" },
  ];

  beforeEach(() => {
    (useWeatherStore as unknown as jest.Mock).mockReturnValue({
      city: mockCities,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (activeIndex = -1) => {
    return render(
      <SearchCityDropdown
        activeIndex={activeIndex}
        handleItemClick={mockHandleItemClick}
        setActiveIndex={mockSetActiveIndex}
        setIsKeyboardNavigation={mockSetIsKeyboardNavigation}
      />
    );
  };

  it("renders correct number of city items", () => {
    const { container } = renderComponent();
    const items = container.querySelectorAll(".dropdawnItem_mocked");
    expect(items).toHaveLength(mockCities.length);
  });

  it("applies active class to correct item", () => {
    const activeIndex = 1;
    const { container } = renderComponent(activeIndex);
    const items = container.querySelectorAll(".dropdawnItem_mocked");

    expect(items[activeIndex]).toHaveClass("activeItem_mocked");

    items.forEach((item, index) => {
      if (index !== activeIndex) {
        expect(item).not.toHaveClass("activeItem_mocked");
      }
    });
  });

  it("calls handleItemClick with correct id when item clicked", () => {
    renderComponent();
    const items = screen
      .getAllByText(/London|Paris|Berlin/)
      .map((el) => el.parentElement!);
    const clickIndex = 1;

    fireEvent.click(items[clickIndex]);
    expect(mockHandleItemClick).toHaveBeenCalledWith(mockCities[clickIndex].id);
  });

  it("calls setActiveIndex and setIsKeyboardNavigation on mouse enter", () => {
    renderComponent();
    const items = screen
      .getAllByText(/London|Paris|Berlin/)
      .map((el) => el.parentElement!);
    const hoverIndex = 2;

    fireEvent.mouseEnter(items[hoverIndex]);
    expect(mockSetActiveIndex).toHaveBeenCalledWith(hoverIndex);
    expect(mockSetIsKeyboardNavigation).toHaveBeenCalledWith(true);
  });
});
