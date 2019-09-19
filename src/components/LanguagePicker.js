import React from 'react'
import propTypes from 'prop-types'

const div = {
    margin: '0px',
    padding: '0%',
    display: 'flex'
}

const span = {
    margin: '1%',
    padding: '0.5%',
    backgroundColor: 'gray',
    color: 'white'

}


function LanguagePicker({ setLanguage }) {
    const languages = [
        { code: 'en', symbol: 'English' },
        { code: 'ptbr', symbol: 'Portuguese' },
        { code: 'nl', symbol: 'Dutch' }
    ]

    const LanguageIcons = languages.map(lang =>
        <span
            data-test='language-icon'
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            style={span}
        >
            {lang.symbol}
        </span>
    )
    return (
        <div data-test='component-language-picker' style={div} >
            {LanguageIcons}
        </div>

    )
}

LanguagePicker.propTypes = {
    setLanguage: propTypes.func.isRequired
}

export default LanguagePicker