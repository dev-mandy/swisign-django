import { defaultInstance } from '../apiDefault'

export const getJibun = async (address) => {
    try {
        const result = await defaultInstance.get('https://dapi.kakao.com/v2/local/search/address.json', {
            headers: {Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`},
            params: { query: address }
        })
        let array = [];
        if(result && result.request.status === 200){
            result.data.documents.map((document) => {
                array.push(document.address)
            })
        }

        return array;
    } catch (e) {
        console.log(e)
    }
}