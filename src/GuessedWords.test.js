import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../test/testUtils'
import GuessedWords from './GuessedWords'

//!Setup of the tests
const defaultProps = {
    guessedWords: [
        { guessedWord: 'train', letterMatchCount: 3 }
    ]
}
const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<GuessedWords {...setupProps} />)
}
//!Tests Begining
test('does not throw a warning with expected props', () => {
    checkProps(GuessedWords, defaultProps)
})

describe('if there are no words guessed', () => {
    let wrapper
    beforeEach(() => {
        wrapper = setup({ guessedWords: [] })
    })

    test('renders without errors', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words')
        expect(component.length).toBe(1)
    })
    test('render instructions to guess a word', () => {
        const instructions = findByTestAttr(wrapper, 'guess-instructions')
        expect(instructions.text()).not.toBe(0)
    })
})

describe('if there are words guessed', () => {
    let wrapper
    const guessedWords = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
        { guessedWord: 'party', letterMatchCount: 5 }
    ]
    beforeEach(() => {
        wrapper = setup({guessedWords})
    })

    test('renders without errors', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words')
        expect(component.length).toBe(1)
    })

    test('renders guessed words section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words')
        expect(guessedWordsNode.length).toBe(1)
    })
    
    test('correct number of guessed words', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-word')
        expect(guessedWordsNode.length).toBe(guessedWords.length)
    })
})
