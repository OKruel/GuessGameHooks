const languageStrings = {
    en: {
        congrats: 'Çongratulations! You guessed the word!',
        submit: 'Submit',
        guessPrompt: 'Try to guess the secret word!',
        guessInputPlaceholder: 'enter guess',
        guessColumnReader: 'Guessed Words!',
        guessedWords: 'Guesses',
        matchingLettersColumnHeader: 'Matching Letters'
    },
    ptbr: {
        congrats: 'Parabéns! Você acertou a palavra secreta!',
        submit: 'Submeter',
        guessPrompt: 'Tente acertar a palavra secreta!',
        guessInputPlaceholder: 'entre seu palpite',
        guessColumnReader: 'Palpites tentados!',
        guessedWords: 'Palpites',
        matchingLettersColumnHeader: 'Letras iguais'
    },
    nl: {
        congrats: 'Gefeliciteerd! Je hebt het geheime woord ontdekt!',
        submit: 'voorleggen',
        guessPrompt: 'Probeer het geheime woord te vinden!',
        guessInputPlaceholder: 'tussen je gok',
        guessColumnReader: 'Probeerde raadsels!',
        guessedWords: 'voorspellingen',
        matchingLettersColumnHeader: 'Gelijke letters'
    }
}

function getStringByLanguage(languageCode, stringKey, strings = languageStrings) {
    if(!strings[languageCode] || !strings[languageCode][stringKey]){
        console.warn(`Could't get string_ ${stringKey} to  ${languageCode}`)
        return strings.en[stringKey]
    }
    return strings[languageCode][stringKey]
}

export default { getStringByLanguage }