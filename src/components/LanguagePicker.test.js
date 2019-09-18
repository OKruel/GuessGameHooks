import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../../test/testUtils'
import LanguagePicker from './LanguagePicker'

const mockSetLanguage = jest.fn()
const setup = () => {
    return shallow(<LanguagePicker setLanguage={mockSetLanguage}/>)
}

test('renders without erros', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-language-picker')
    expect(component.exists()).toBe(true)
});
test('does not throw a warning with expected props', () => {
    checkProps(LanguagePicker, {setLanguage: jest.fn()})
});
test('renders non-zero language icons', () => {
    const wrapper = setup()
    const languagesIcon = findByTestAttr(wrapper, 'language-icon')
    expect(languagesIcon.length).toBeGreaterThan(0)
    
});
test('calls setLanguage prop upon click', () => {
    const wrapper = setup()
    const languagesIcon = findByTestAttr(wrapper, 'language-icon')

    languagesIcon.first().simulate('click', mockSetLanguage)

    expect(mockSetLanguage).toHaveBeenCalled();

});