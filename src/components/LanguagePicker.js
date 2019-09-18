import React from 'react'
import propTypes from 'prop-types'

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
        >
            {lang.symbol}
        </span>
    )
    return (
        <div data-test='component-language-picker'>
            {LanguageIcons}
        </div>

    )
}

LanguagePicker.propTypes = {
    setLanguage: propTypes.func.isRequired
}

export default LanguagePicker