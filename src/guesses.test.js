import React from 'react'
import { mount } from 'enzyme'

import { findByTestAttr } from '../test/testUtils'

import successContext from './contexts/successContext'
import guessedWordsContext from './contexts/guessedWordsContext'

import Input from './components/Input'
import GuessedWords from './components/GuessedWords'

function setup(guessedWords = [], secretWord = 'party') {
    const wrapper = mount(
        <guessedWordsContext.GuessedWordProvider>
            <successContext.SuccessProvider>
                <Input secretWord={secretWord} />
                <GuessedWords />
            </successContext.SuccessProvider>
        </guessedWordsContext.GuessedWordProvider>
    )
    const inputBox = findByTestAttr(wrapper, 'input-box')
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    //*Prepopulating the guessedWords array to simulate previous guesses
    guessedWords.map(word => {
        const mockEvent = { target: { value: word } }
        inputBox.simulate('change', mockEvent)
        submitButton.simulate('click')
    })
    return [wrapper, inputBox, submitButton, guessedWords]
}

describe('test word guesses', () => {
    let wrapper;
    let inputBox;
    let submitButton;
    let guessedWords;
    describe('Non empty guessed words', () => {
        beforeEach(() => {
            [wrapper, inputBox, submitButton, guessedWords] = setup(['agile'], 'party')
        });
        describe('correct guess', () => {
            beforeEach(() => {
                const mockEvent = { target: { value: 'party' } }
                inputBox.simulate('change', mockEvent)
                submitButton.simulate('click', )
            });
            test('Input component contains no children', () => {
                const inputComponent = findByTestAttr(wrapper, 'component-input')
                expect(inputComponent.length).toBe(0)
            });
            test('Guessed Words table rows count reflects updated guess', () => {
                const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word')
                expect(guessedWordsTableRows.length).toBe(2)
            });
        });
        describe('incorrect guess', () => {
            beforeEach(() => {
                const mockEvent = { target: { value: 'train' } }
                inputBox.simulate('change', mockEvent)
                submitButton.simulate('click')
            });
            test('Input box remains', () => {
                expect(inputBox.exists()).toBe(true)
            });
            test('Guessed Words table rows count reflects updated guess', () => {
                const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word')
                expect(guessedWordsTableRows.length).toBe(2)
            });
        });
    });

    describe('Empty guessed word', () => {
        beforeEach(() => {
            [wrapper, inputBox, submitButton] = setup([], 'party')
        });
        test('guessedWords shows correctly the guesses after an incorrect guess', () => {
            const mockEvent = { target: { value: 'train' } }
            inputBox.simulate('change', mockEvent)
            submitButton.simulate('click')
            const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word')
            expect(guessedWordsTableRows.length).toBe(1)
        });
    });
});