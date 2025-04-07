import { defaultInstance } from '../default'

export const getNewsList = async () => {
    try {
        /*const result = await defaultInstance.get('/news/list')
        let array;
          try{
              let results = [];
              const items = result.data.data.items
              console.log(items)
              items.forEach((item) => {
                  console.log(item)
                  results.push({
                      "id": 1,
                      "title": item.title,
                      "date": item.pubDate,
                      "views": 3456,
                      "source": '네이버뉴스',
                      "content": item.description,
                      "originalLink": item.originallink
                    });
              })
              array = results
          }catch(e){
              array = [result.data]
          }
        return array*/
        return [];
    } catch (e) {
        console.log(e)
    }
}