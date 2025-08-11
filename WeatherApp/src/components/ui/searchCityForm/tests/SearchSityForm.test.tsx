// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchCiityForm from "../SearchCityForm";
import "@testing-library/jest-dom";

jest.mock("./styles/index.module.css", () => ({
  __esModule: true,
  default: {
    searchForm: "searchForm_mocked",
  },
}));

describe("SearchCiityForm", () => {
  const mockProps = {
    value: "",
    handleSubmit: jest.fn((e) => e.preventDefault()),
    handleChange: jest.fn(),
    setIsOpen: jest.fn(),
    handleKeyDown: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Корректно отображается", () => {
    const { container } = render(<SearchCiityForm {...mockProps} />);
    expect(container.querySelector("form")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search Location...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<SearchCiityForm {...mockProps} />);
    const form = container.querySelector("form");

    expect(form).toHaveClass("searchForm_mocked");
  });

  it("calls handleChange when input value changes", () => {
    render(<SearchCiityForm {...mockProps} />);
    const input = screen.getByPlaceholderText("Search Location...");

    fireEvent.change(input, { target: { value: "London" } });
    expect(mockProps.handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls setIsOpen when input is focused", () => {
    render(<SearchCiityForm {...mockProps} />);
    const input = screen.getByPlaceholderText("Search Location...");

    fireEvent.focus(input);
    expect(mockProps.setIsOpen).toHaveBeenCalledWith(true);
  });

  it("calls handleSubmit when submit button is clicked", () => {
    render(<SearchCiityForm {...mockProps} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockProps.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls handleKeyDown when a key is pressed in input", () => {
    render(<SearchCiityForm {...mockProps} />);
    const input = screen.getByPlaceholderText("Search Location...");

    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockProps.handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it("displays the correct value in input", () => {
    const testValue = "Berlin";
    render(<SearchCiityForm {...mockProps} value={testValue} />);

    const input = screen.getByPlaceholderText("Search Location...");
    expect(input).toHaveValue(testValue);
  });

  it("has the correct search icon", () => {
    render(<SearchCiityForm {...mockProps} />);
    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", "/icons/searchIcon.svg");
    expect(img).toHaveAttribute("alt", "search icon");
  });
});
