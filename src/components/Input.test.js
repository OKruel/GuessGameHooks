import React from 'react'

import { shallow, mount } from 'enzyme'
import { findByTestAttr, checkProps } from '../../test/testUtils'
import languageContext from '../contexts/languageContext'

import Input from './Input'

const defaultProps = { secretWord: 'party' }

const setup = ({language, secretWord}) => {
    language = language || 'en'
    secretWord = secretWord || 'party'
    return mount(
        <languageContext.Provider value={language}>
            <Input secretWord={secretWord}></Input>
        </languageContext.Provider>

    )
}

describe('Input functional component', () => {
    let wrapper;
    test('renders without errors', () => {
        wrapper = setup({})
        const component = findByTestAttr(wrapper, 'component-input')
        expect(component.length).toBe(1)
    })
    test('does not throw a warning with expected props', () => {
        checkProps(Input, defaultProps)
    })
});

describe('state controlled input field', () => {
    let wrapper;
    let mockSetCurrentGuess = jest.fn()
    beforeEach(() => {
        mockSetCurrentGuess.mockClear()
        React.useState = jest.fn(() => ['', mockSetCurrentGuess])
    });
    test('state updates when value of the input state changes', () => {
        const wrapper = setup({})
        const inputBox = findByTestAttr(wrapper, 'input-box')
        
        inputBox.simulate('change', {target: { value: 'train' }})
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
    });

    test('when the button is clicked the input box gets cleared', () => {
        wrapper = setup({})
        findByTestAttr(wrapper, 'input-box').simulate('click', mockSetCurrentGuess(''))

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
    });
});

describe('languagePicker', () => {
    test('correctly renders congrats string in english', () => {
        const wrapper = setup({success: true})
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        expect(submitButton.text()).toBe('Submit')
    });
    test('correctly renders congrats string in portuguese ', () => {
        const wrapper = setup({success: true, language: 'ptbr'})
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        expect(submitButton.text()).toBe('Submeter')
    });
    test('correctly renders congrats string in dutch', () => {
        const wrapper = setup({success: true, language: 'nl'})
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        expect(submitButton.text()).toBe('voorleggen')
    });
});
