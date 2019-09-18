import stringsModule from './strings'
const { getStringByLanguage } = stringsModule

const strings = {
    en:{submit: 'submit'},
    ptbr:{submit: 'submeter'},
    nl: {submit: 'voorleggen'},
    unexists: {}
}

test('returns correct for english', () => {
    const string = getStringByLanguage('en', 'submit', strings)
    expect(string).toBe('submit')
});
test('returns correct for portuguese', () => {
    const string = getStringByLanguage('ptbr', 'submit', strings)
    expect(string).toBe('submeter')
});
test('returns correct for dutch', () => {
    const string = getStringByLanguage('nl', 'submit', strings)
    expect(string).toBe('voorleggen')
});
test('returns english submit string when language does not exists', () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings)
    expect(string).toBe('submit')
});
test('returns english submit string when stringKey does not exists for language', () => {
    const string = getStringByLanguage('unexists', 'submit', strings)
    expect(string).toBe('submit')
});