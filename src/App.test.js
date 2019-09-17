import React from 'react';
import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import App from './App';

import hookActions from './actions/hookActions'

const mockGetSecretWord = jest.fn()

const setup = (secretWord = 'party') => {
  mockGetSecretWord.mockClear()
  hookActions.getSecretWord = mockGetSecretWord

  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { secretWord },
      jest.fn()
    ])

  React.useReducer = mockUseReducer  
  return mount(<App />)
}

test('app renders without errors', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'component-app')
  expect(component.length).toBe(1)
});

describe('getSecretWord gets called', () => {
  test('getSecretWord gets called on App mount', () => {
    setup()

    expect(mockGetSecretWord).toHaveBeenCalled()
  });
  test('secretWord does NOT update with App update', () => {
    const wrapper = setup()
    mockGetSecretWord.mockClear()

    wrapper.setProps()
    expect(mockGetSecretWord).not.toHaveBeenCalled()
  });
});

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('party')
  });
  test('renders APP when secretWord is NOT NULL', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.exists()).toBe(true)
  });
  test('renders SPINNER when secretWord IS NULL', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner')
    expect(spinnerComponent.exists()).toBe(false)
  });
})

describe('secretWord IS NULL', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null)
  });
  test('renders APP when secretWord ir NOT NULL', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.exists()).toBe(false)
  });
  test('renders SPINNER when secretWord IS NULL', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner')
    expect(spinnerComponent.exists()).toBe(true)
  });
})
