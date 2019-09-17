import React from 'react'
import Proptypes from 'prop-types'


const Input = props => {
    const [currentGuess, setCurrentGuess] = React.useState('')

    const handleSubmit = event => {
        event.preventDefault()
        setCurrentGuess('')
    }
    
    const handleChanges = event => {
        const value = event.target.value
        setCurrentGuess(value)
    }

    return (
        <div data-test='component-input'>
            <form className='form-inline'>
                <input
                    data-test='input-box'
                    className='mb-2 mx-sm-3'
                    type='text'
                    placeholder='Enter your guess'
                    value={currentGuess}
                    onChange={event => handleChanges(event)}
                />
                <button
                    data-test='submit-button'
                    className='btn btn-primary mb-2'
                    onClick={event => handleSubmit(event)}
                >Submit</button>
            </form>
            {console.log(currentGuess)}
        </div>
    )
}

Input.propTypes = {
    secretWord: Proptypes.string.isRequired
}


export default Input