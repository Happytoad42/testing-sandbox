import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { cleanup, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { initialState, reducer } from '../store/reducer';
import TestRedux from './TestRedux'

const renderWithRedux = (
    component,
    { initialState, store = createStore(reducer, initialState) } = {}
) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    }
}

afterEach(cleanup);

it('checks if initial stae is equal ot 0', () => {
    const { getByTestId } = renderWithRedux(<TestRedux />);
    expect(getByTestId('counter')).toHaveTextContent('0');
})



it('increments a counter with redux', () => {
    const { getByTestId} = renderWithRedux(<TestRedux />,
        { initialState: { count: 5 }});

    fireEvent.click(getByTestId('button-up'));

    expect(getByTestId('counter')).toHaveTextContent('6');
})

it('decrements a counter with redux', () => {
    const { getByTestId} = renderWithRedux(<TestRedux />,
        { initialState: { count: 100 }});

    fireEvent.click(getByTestId('button-down'));

    expect(getByTestId('counter')).toHaveTextContent('99')

})