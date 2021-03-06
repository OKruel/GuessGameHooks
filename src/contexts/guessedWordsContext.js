import React from 'react'

const guessedWordContext = React.createContext()

function useGuessedWord(){
    const context = React.useContext(guessedWordContext)

    if(!context){
        throw new Error('useGuessedWord must be inside of GuessedWordProvider')
    }
    return context;
}

function GuessedWordProvider(props){
    const [guessedWords, setguessedWord] = React.useState([])

    const value = React.useMemo(() => [guessedWords, setguessedWord], [guessedWords])

    return <guessedWordContext.Provider value={value} {...props}/>
}

export default {useGuessedWord, GuessedWordProvider}