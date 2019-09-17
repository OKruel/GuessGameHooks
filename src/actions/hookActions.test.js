import React from 'react'

import moxios from 'moxios'

import { getSecretWord } from './hookActions'

describe('moxios test', () => {
    beforeEach(() => {
        moxios.install()
    });
    afterEach(() => {
        moxios.uninstall()
    })

    test('calls getSecretWord callback when axios responde', async () => {
        const secretWord = 'party'
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: secretWord
            })
        })
        const mockGetSecretWord = jest.fn()

        await getSecretWord(mockGetSecretWord)

        expect(mockGetSecretWord).toHaveBeenCalledWith(secretWord)

    });
});