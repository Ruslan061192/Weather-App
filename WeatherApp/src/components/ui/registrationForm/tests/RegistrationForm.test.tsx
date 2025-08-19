import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationForm from "../RegistrationForm";
import { IUserAuth } from "../../../../core/types/userTypes";

describe("RegistrationForm Component", () => {
  const mockFormData: IUserAuth = {
    name: "",
    email: "",
    password: "",
  };

  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());

  beforeEach(() => {
    render(
      <RegistrationForm
        formData={mockFormData}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("displays the correct initial values", () => {
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;

    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });

  it("calls handleChange when input values change", () => {
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(nameInput, {
      target: { value: "John Doe", name: "name" },
    });
    expect(mockHandleChange).toHaveBeenCalledTimes(1);

    fireEvent.change(emailInput, {
      target: { value: "john@example.com", name: "email" },
    });
    expect(mockHandleChange).toHaveBeenCalledTimes(2);

    fireEvent.change(passwordInput, {
      target: { value: "password123", name: "password" },
    });
    expect(mockHandleChange).toHaveBeenCalledTimes(3);
  });

  it("calls handleSubmit when form is submitted", () => {
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("displays the passed form data", () => {
    const updatedFormData: IUserAuth = {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "secure123",
    };

    render(
      <RegistrationForm
        formData={updatedFormData}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue("Jane Doe");
    expect(screen.getByLabelText(/email/i)).toHaveValue("jane@example.com");
    expect(screen.getByLabelText(/password/i)).toHaveValue("secure123");
  });
});
