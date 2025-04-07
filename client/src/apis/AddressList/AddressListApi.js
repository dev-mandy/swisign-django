import { defaultInstance } from '../default'

export const getTestData = async () => {
    try {
        const result = await defaultInstance.get('/testdata/list')
        let array;
        const data = result.data.data.testData;
          try{
              array = JSON.parse(data)
          }catch(e){
              array = [data]
          }
        return array
    } catch (e) {
        console.log(e)
    }
}