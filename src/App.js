import React from 'react';
import './App.css';

import hookActions from './actions/hookActions';
import languageContext from './contexts/languageContext'
import successContext from './contexts/successContext'
import guessedWordContext from './contexts/guessedWordsContext'

import LanguagePicker from './components/LanguagePicker'
import Input from './components/Input'
import Congrats from './components/Congrats'
import GuessedWords from './components/GuessedWords'

export function reducer(state, action) {
  switch (action.type) {
    case 'setSecretWord':
      return {
        ...state,
        secretWord: action.payload
      }
    case 'setLanguage':
      return {
        ...state,
        language: action.payload
      }
    default: return new Error(`Invalid action type: ${action.type}`)
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null, language: 'en' }
  )

  const setLanguage = (language) => dispatch({ type: 'setLanguage', payload: language })

  const setSecretWord = (secretWord) => dispatch({ type: 'setSecretWord', payload: secretWord })

  React.useEffect(() => { hookActions.getSecretWord(setSecretWord) }, [])

  if (!state.secretWord) {
    return (
      <div className='container' data-test='spinner'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
        <p>Loading secret word!</p>
      </div>
    )
  }
  return (
    <div className="container" data-test='component-app' >
      <h1>Guess Word Game</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage}></LanguagePicker>
        <guessedWordContext.GuessedWordProvider>
          <successContext.SuccessProvider>
            <Congrats ></Congrats>
            <Input secretWord={state.secretWord} />
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordContext.GuessedWordProvider>
      </languageContext.Provider>

    </div>
  );
}

export default App;
