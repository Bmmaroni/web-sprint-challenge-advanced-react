import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);

  const header = screen.getByText(/checkout form/i);
  expect(header).toBeInTheDocument;
});

test("form shows success message on submit with form details", async () => {
  render(<CheckoutForm />);

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const addressInput = screen.getByLabelText(/address/i);
  const cityInput = screen.getByLabelText(/city/i);
  const stateInput = screen.getByLabelText(/state/i);
  const zipInput = screen.getByLabelText(/zip/i);

  userEvent.type(firstNameInput, "John");
  userEvent.type(lastNameInput, "Doe");
  userEvent.type(addressInput, "123 Madeup Lane");
  userEvent.type(cityInput, "Gotham");
  userEvent.type(stateInput, "New York");
  userEvent.type(zipInput, "12345");

  expect(firstNameInput).toHaveValue("John");
  expect(lastNameInput).toHaveValue("Doe");
  expect(addressInput).toHaveValue("123 Madeup Lane");
  expect(cityInput).toHaveValue("Gotham");
  expect(stateInput).toHaveValue("New York");
  expect(zipInput).toHaveValue("12345");

  const button = screen.getByRole("button", {name: 'Checkout'});
  userEvent.click(button);

  const message = screen.getByTestId('successMessage');
  expect(message.textContent).toBe('You have ordered some plants! Woo-hoo! 🎉Your new green friends will be shipped to:John Doe123 Madeup LaneGotham, New York 12345');

});
