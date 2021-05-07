import { render, screen, fireEvent } from '@testing-library/react';
import replaceCamelWithSpaces from './ReplaceCamelWithSpaces'
import App from './App';

test('button has correct inital color', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to blue'} )
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' })
});

test('button turns blue when clicked', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' })
  expect(colorButton.textContent).toBe('Change to red')
})


test('inital conditions', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue'})
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
})

test('clicked checkbox conditions', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled()
})

test('button grey when disaled', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue'})
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'})

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ backgroundColor: 'grey' })

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' })


})

test('click button and then click checkbox', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'})

  fireEvent.click(colorButton)
  fireEvent.click(checkbox)

  expect(colorButton).toHaveStyle({ backgroundColor: 'grey' })

  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' })
})

// Unit Testing a particular Function

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  });

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })

  test('Works for multiple capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })

} )