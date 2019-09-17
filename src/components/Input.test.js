import React from 'react'

import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../../test/testUtils'

import Input from './Input'

const defaultProps = { secretWord: 'party' }

const setup = (props = defaultProps) => {
    return shallow(<Input {...props} />)
}

describe('Input functional component', () => {
    let wrapper;
    test('renders without errors', () => {
        wrapper = setup()
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
    test('state updates when value of the input state chenges', () => {
        const wrapper = setup()
        const inputBox = findByTestAttr(wrapper, 'input-box')
        
        inputBox.simulate('change', {target: { value: 'train' }})
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
    });

    test('when the button is clicked the input box gets cleared', () => {
        wrapper = setup()
        findByTestAttr(wrapper, 'input-box').simulate('click', mockSetCurrentGuess(''))

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
    });
});
