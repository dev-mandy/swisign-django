import { defaultInstance } from '../apiDefault'

export const getYoutubeList = async (playlistId) => {
    try {
        const result = await defaultInstance.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=25&playlistId=${playlistId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        console.log(result)
        if(result.status === 200){
            let results = [];
            const items = result.data.items;
            items.forEach((item) => {
                const snippet = item.snippet;
                console.log(item)
                results.push({
                    "id": 1,
                    "title": snippet.title,
                    "date": snippet.publishedAt,
                    "views": 3456,
                    "videoId": snippet.resourceId.videoId,
                    "content": snippet.description
                  });
            })
            return results;
        }else{
            return [];
        }
    } catch (e) {
        console.log(e)
    }
}