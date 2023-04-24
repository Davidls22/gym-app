import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  test("renders class dashboard page", () => {
    render(<Dashboard />);
    const headerElement = screen.getByText("Class Dashboard");
    expect(headerElement).toBeInTheDocument();
  });

  test("adds a class", async () => {
    render(<Dashboard />);
    const titleInput = screen.getByLabelText(/Title/i);
    userEvent.type(titleInput, "Test Class");

    const instructorInput = screen.getByLabelText(/Instructor/i);
    userEvent.type(instructorInput, "Test Instructor");

    const dateInput = screen.getByLabelText(/Date/i);
    userEvent.type(dateInput, "2023-04-30");

    const timeInput = screen.getByLabelText(/Time/i);
    userEvent.type(timeInput, "10:00 AM");

    const capacityInput = screen.getByLabelText(/Max Capacity/i);
    userEvent.type(capacityInput, "10");

    const addButton = screen.getByRole("button", { name: /Add Class/i });
    userEvent.click(addButton);

    const addedClass = await screen.findByText(/Test Class/i);
    expect(addedClass).toBeInTheDocument();
  });
});
