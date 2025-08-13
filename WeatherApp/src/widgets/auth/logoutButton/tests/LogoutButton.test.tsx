import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useUsersStore } from "../../../../shared/store/useUsersStore";
import LogoutButton from "../LogoutButton";
import "@testing-library/jest-dom";

jest.mock("../../../../core/store/useUsersStore", () => ({
  __esModule: true,
  useUsersStore: jest.fn(),
}));

describe("LogoutButton Component", () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    (useUsersStore as unknown as jest.Mock).mockImplementation(() => ({
      logout: mockLogout,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("рендерится без ошибок", () => {
    render(<LogoutButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it('содержит текст "Logout"', () => {
    render(<LogoutButton />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("вызывает logout при клике", () => {
    render(<LogoutButton />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockLogout).toHaveBeenCalled();
  });

  it("отображает иконку выхода", () => {
    render(<LogoutButton />);
    const img = screen.getByAltText("logout");
    expect(img).toHaveAttribute("src", "/icons/Logout.svg");
  });
});
