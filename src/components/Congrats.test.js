import React from 'react'
import { shallow, mount } from 'enzyme'

import { findByTestAttr, checkProps } from '../../test/testUtils'

import languageContext from '../contexts/languageContext'
import Congrats from './Congrats'


const defaultProps = {success: false}

const setup = ({success, language}) => {
    language = language || 'en'
    success = success || false

    return mount(
        <languageContext.Provider value={language}>
            <Congrats success={success}></Congrats>
        </languageContext.Provider>
    )
}

describe('languagePicker', () => {
    test('correctly renders congrats string in english', () => {
        const wrapper = setup({success: true})
        expect(wrapper.text()).toBe('Congratulations! You guessed the word!')
        
    });
    test('correctly renders congrats string in portuguese ', () => {
        const wrapper = setup({success: true, language: 'ptbr'})
        expect(wrapper.text()).toBe('Parabéns! Você acertou a palavra secreta!')
    });
    test('correctly renders congrats string in dutch', () => {
        const wrapper = setup({success: true, language: 'nl'})
        expect(wrapper.text()).toBe('Gefeliciteerd! Je hebt het geheime woord ontdekt!')
    });
});

test('render without errors', () => {
    const wrapper = setup({})
    const component = findByTestAttr(wrapper, 'component-congrats')
    expect(component.length).toBe(1)
})

test('renders no text when success prop is false', () => {
    const wrapper = setup({success: false})
    const component = findByTestAttr(wrapper, 'component-congrats')
    expect(component.text()).toBe('')
})

test('renders non-empty congrats message when success prop is true', () => {
    const wrapper = setup({success: true})
    const component = findByTestAttr(wrapper, 'congrats-message')
    expect(component.text().lenght).not.toBe(0)

})

test('does not throw a warning with expected props', () => {
    const expectedProps = {success: false}
    checkProps(Congrats, expectedProps)
}) 