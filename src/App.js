import React from 'react';
import './App.css';
import Input from './components/Input'
import hookActions from './actions/hookActions';

function reducer(state, action) {
  switch (action.type) {
    case 'setSecretWord':
      console.log('Step 4 - Reducer function')
      return {
        ...state,
        secretWord: action.payload
      }
    default: return new Error(`Invalid action type: ${action.type}`)
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null },
    console.log('Step 0 - Creating and Chaging state with useReducer')
  )

  const setSecretWord = (secretWord) => {
    console.log('Step 3 - dispatching')
    dispatch({
      type: 'setSecretWord',
      payload: secretWord
    })
  }

  React.useEffect(
      () => { 
        console.log('Step 1 - Use Effect once')
        hookActions.getSecretWord(setSecretWord)
      },
      []
    )

    if(!state.secretWord) {
      return(
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
      <Input secretWord={state.secretWord}/>
      {state.secretWord}
      
    </div>
  );
}

export default App;
