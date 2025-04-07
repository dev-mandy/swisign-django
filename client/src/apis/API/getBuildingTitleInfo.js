import { defaultInstance } from '../apiDefault'

/**
 * 표제부조회
 * @param obj
 * @returns {Promise<*[]>}
 */
export const getBuildingTitleInfo = async (obj) => {
    try {
        const b_code = obj.b_code;
        const result = await defaultInstance.get('http://apis.data.go.kr/1613000/BldRgstHubService/getBrTitleInfo', {
            params: {
                serviceKey: process.env.REACT_APP_OPEN_API_KEY,
                sigunguCd: b_code.substring(0,5),
                bjdongCd: b_code.substring(5,10),
                platGbCd: 0,
                bun: obj.main_address_no.padStart(4, "0"),
                ji: obj.sub_address_no.padStart(4, "0"),
                hoNm: '',
                numOfRows: 100,
                pageNo: 1,
                _type: 'json'
            }
        })
        if(result && result.status === 200){
            //추후 필요한 정보만
            return result.data.response.body.items.item[0]
        }else{
            return {}
        }
    } catch (e) {
        console.log(e)
    }
}