import { defaultInstance } from '../apiDefault'
import {getBuildingTitleInfo} from "./getBuildingTitleInfo";

/**
 * 전유공용면적조회
 * @param obj
 * @returns {Promise<*[]>}
 */
export const getBuildingInfo = async (obj) => {
    try {
        const b_code = obj.b_code;
        const result = await defaultInstance.get('http://apis.data.go.kr/1613000/BldRgstHubService/getBrExposPubuseAreaInfo', {
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
        const titleInfo = await getBuildingTitleInfo(obj);
        let array = [];
        let temp = {};
        if(result && result.status === 200){
            result.data.response.body.items.item.map((item) => {
                //전용
                if(item.exposPubuseGbCd == '1') array.push(item)
                //공용
                if(item.exposPubuseGbCd == '2') {
                    let obj = temp[item.hoNm] || [];
                    temp[item.hoNm] =  [...obj, {name: item.etcPurps, area: item.area}]
                }
            })
            array.forEach((item,index) => {
                const otherArea = temp[item.hoNm];
                let totalCommonArea = otherArea.reduce((prev, cur) => {
                    const prevArea = typeof prev === "object" ? prev.area : prev;
                    return Number(prevArea) + Number(cur.area)
                })
                if(typeof totalCommonArea === "object") totalCommonArea = Number(totalCommonArea.area);

                array[index] = {...item, ...titleInfo, commonArea: otherArea, totalCommonArea, totalArea: Number(item.area) + Number(totalCommonArea)}
            })
            //호별로 정렬
            array.sort((a, b) => {
                return a.hoNm-b.hoNm;
            })
        }
        return array;
    } catch (e) {
        console.log(e)
    }
}