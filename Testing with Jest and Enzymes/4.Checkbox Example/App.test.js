import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue'})

  // expect the background color to be red
    expect(colorButton).toHaveStyle({ backgroundColor: 'red'})

  // button Clicked
    fireEvent.click(colorButton);

  // expect the background color to blue
    expect(colorButton).toHaveStyle({ backgroundColor: 'blue'})
    
  // expect the button text to be 'Change to red'
    expect(colorButton.textContent).toBe('Change to red')
});


test('initial conditions', () => {
  render(<App />)

  // check that the button starts out enabled
    const colorButton = screen.getByRole('button', { name: 'Change to blue'})
    expect(colorButton).toBeEnabled();

  // checkbox starts out unchecked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
})

test('Checkbox disables button on first click and enables on second click', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
  const button = screen.getByRole('button', { name: 'Change to blue'});

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
})

test('Disabled button has gray background and reverts to red', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: grey');

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: red')
})


test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});

  // change button to blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: grey');

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: blue')

})