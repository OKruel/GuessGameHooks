import stringsModule from './strings'
const { getStringByLanguage } = stringsModule

const strings = {
    en:{submit: 'submit'},
    ptbr:{submit: 'submeter'},
    nl: {submit: 'voorleggen'},
    unexists: {}
}

describe('language string testing', () => {
    const mockWarn = jest.fn();
    let originalWarn;
    beforeEach(() => {
        originalWarn = console.warn 
        console.warn = mockWarn
    });
    afterEach(() => {
        console.warn = originalWarn
    })

    test('returns correct for english', () => {
        const string = getStringByLanguage('en', 'submit', strings)
        expect(string).toBe('submit')
        expect(mockWarn).not.toHaveBeenCalled()
    });
    test('returns correct for portuguese', () => {
        const string = getStringByLanguage('ptbr', 'submit', strings)
        expect(string).toBe('submeter')
        expect(mockWarn).not.toHaveBeenCalled()
    });
    test('returns correct for dutch', () => {
        const string = getStringByLanguage('nl', 'submit', strings)
        expect(string).toBe('voorleggen')
        expect(mockWarn).not.toHaveBeenCalled()
    });
    test('returns english submit string when language does not exists', () => {
        const string = getStringByLanguage('notALanguage', 'submit', strings)
        expect(string).toBe('submit')
        expect(mockWarn).toHaveBeenCalledWith("Could't get string_ submit to  notALanguage")
    });
    test('returns english submit string when stringKey does not exists for language', () => {
        const string = getStringByLanguage('unexists', 'submit', strings)
        expect(string).toBe('submit')
        expect(mockWarn).toHaveBeenCalledWith("Could't get string_ submit to  unexists")
    });
});

