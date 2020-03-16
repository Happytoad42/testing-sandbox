import React from 'react'
import { render, fireEvent, cleanup, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CounterProvider, { CounterContext, Counter } from './TestContext'

const renderWithContext = (
    component) => {
    return {
      ...render(
          <CounterProvider value={CounterContext}>
              {component}
          </CounterProvider>)
    }
  }

afterEach(cleanup);

it('checks if initial state is equal to 0', () => {
    const { getByTestId } = renderWithContext(<Counter/>);

    expect(getByTestId('counter')).toHaveTextContent('0')
})

it('increments counter with context', () => {
    const { getByTestId } = renderWithContext(<Counter />);

    fireEvent.click(getByTestId('button-up'));

    expect(getByTestId('counter')).toHaveTextContent('1');
})

it('decrements counter with context', () => {
    const { getByTestId } = renderWithContext(<Counter />);

    fireEvent.click(getByTestId('button-down'))
    expect(getByTestId('counter')).toHaveTextContent('-1');
})