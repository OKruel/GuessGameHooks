import axios from 'axios'

export const getSecretWord = async (setSecretWord) => {
        console.log('Step 2 - Action before axios call')
        const response = await axios.get('http://localhost:3030')
        setSecretWord(response.data)
        console.log('Axios response', response.data)
        console.log('Step 4 - Action AFTER axios call')
}

export default {getSecretWord}