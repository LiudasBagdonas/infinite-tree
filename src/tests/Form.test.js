import { render, fireEvent } from '@testing-library/react';
import Home from '../app/pages/Home'

test('Modal Form Submition', () => {
  const { container, getByText, getByLabelText } = render(<Home />);

  const createButton = getByText("+ Category");

  fireEvent.click(createButton)
  expect(container.querySelector("form")).toBeInTheDocument();
  const formNameInput = getByLabelText("Name:");
  const priceInputButton = getByText("Add Price?")
  const submitButton = container.querySelector("button")
  expect(formNameInput).toBeInTheDocument();
  expect(priceInputButton).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();


  fireEvent.change(formNameInput, { target: { value: 'This line is longer than 30 symbols.' } })
  fireEvent.click(submitButton)
  expect(getByText("Field can not be longer than 30 symbols!"))

  fireEvent.change(formNameInput, { target: { value: '' } })
  fireEvent.click(submitButton)
  expect(getByText("Field must be filled!"))

  fireEvent.change(formNameInput, { target: { value: "Less than 30 symbols." } })
  fireEvent.click(priceInputButton)
  expect(getByLabelText("Price:"))
  const formPriceInput = getByLabelText("Price:") 
  
  fireEvent.change(formPriceInput, { target: { value: 12345678910 } })
  fireEvent.click(submitButton)
  expect(getByText("Input must be maximum 10 symbols long!"))


  fireEvent.change(formNameInput, { target: { value: 'Item' } })
  fireEvent.change(formPriceInput, { target: { value: '' } })
  fireEvent.click(submitButton)
  expect(getByText("Item"))
  expect(getByText("+"))
  expect(getByText("-"))

  fireEvent.click(getByText("+"))
  expect(container.querySelector("form")).toBeInTheDocument();

  fireEvent.change(getByLabelText("Name:"), { target: { value: 'Item 2' } })
  fireEvent.change(getByLabelText("Price:"), { target: { value: 1.95 } })
  fireEvent.click(container.querySelector("button"))
  expect(getByText("Item 2"))
  expect(getByText("Total: 1.95€"))
  expect(getByText("Price: 1.95€"))

});
