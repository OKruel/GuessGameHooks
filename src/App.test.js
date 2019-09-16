import React from 'react';
import { shallow } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import App from './App';

const setup = () => {
  return shallow(<App/>)
}

test('app renders without errors', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'component-app')
  expect(component.length).toBe(1)
});
