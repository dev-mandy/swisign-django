import { defaultInstance } from '../apiDefault'

export const getYoutubeList = async (playlistId) => {
    try {
        const result = await defaultInstance.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=25&playlistId=${playlistId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        if(result.status === 200){
            let results = [];
            const items = result.data.items;
            items.forEach((item) => {
                const snippet = item.snippet;
                console.log(snippet.title)
                results.push({
                    "id": snippet.resourceId.videoId,
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

export const getYoutube = async (videoId) => {
    try {
        const result = await defaultInstance.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        if(result.data.items.length > 0){
            let results = [];
            const item = result.data.items[0];
            const snippet = item.snippet;
            results.push({
                "id": videoId,
                "title": snippet.title,
                "date": snippet.publishedAt,
                "views": 3456,
                "videoId": videoId,
                "content": snippet.description
              });
            return results;
        }else{
            return [];
        }
    } catch (e) {
        console.log(e)
    }
}