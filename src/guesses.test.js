import React from 'react'
import { mount } from 'enzyme'

import { findByTestAttr } from '../test/testUtils'

import successContext from './contexts/successContext'
import Input from './components/Input'

function setup(sercretWord = 'party') {
    const wrapper = mount(
        <successContext.SuccessProvider>
            <Input secretWord={sercretWord} />
        </successContext.SuccessProvider>
    )
    const inputBox = findByTestAttr(wrapper, 'input-box')
    const submitButton = findByTestAttr(wrapper, 'submit-button')

    return [wrapper, inputBox, submitButton]
}

describe('test word guesses', () => {
    let wrapper;
    let inputBox;
    let submitButton;
    beforeEach(() => {
        [wrapper, inputBox, submitButton] = setup('party')
    });
    describe('correct guess', () => {
        beforeEach(() => {
            const mockEvent = { target: { value: 'party' } }
            inputBox.simulate('change', mockEvent)
            submitButton.simulate('click')
        });
        test('Input component contains no children', () => {
            const inputComponent = findByTestAttr(wrapper, 'component-input')
            expect(inputComponent.children().length).toBe(0)
        });
    });
    describe('incorrect guess', () => {
        beforeEach(() => {
            const mockEvent = { targe: { value: 'train' } }
            inputBox.simulate('change', mockEvent)
            submitButton.simulate('click')
        });
        test('Input box remais', () => {
            expect(inputBox.exists()).toBe(true)
        });
    });
});