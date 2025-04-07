import { defaultInstance } from '../default'

export const getApiKey = async (keyName) => {
    try {
        const result = await defaultInstance.get('/api/key', {data: {keyName: keyName}})
        return result.data.data.key;
    } catch (e) {
        console.log(e)
    }
}