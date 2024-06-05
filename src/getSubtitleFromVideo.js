
import axios from 'axios';
import he from "he";
import striptags from "striptags";


export const getSubtitleFromVideo =async (video)=>{
    const video_id = getVideoId(video);
    const html = await getHtml(video_id);
    const subtitle = await getSubtitle(html);
    return subtitle;
}


const getHtml = async(video_id)=>{
    const {data : html} =await axios.get(`https://youtube.com/watch?v=${video_id}`);
    return html;
}

const getSubtitle = async(html)=>{
    if(!html.includes('captionTracks')){
        throw new Error('Could not find captions for video');
    }
    const regex = /https:\/\/www\.youtube\.com\/api\/timedtext[^"]+/;
    const [url] = html.match(regex);
    if(!url){
        throw new Error('Could not find captions for video');
    }
    const obj = JSON.parse(`{"url": "${url}"}`)

    const subtitle_url = obj.url
    const transcriptResponse = await axios.get(subtitle_url);
    const transcript = transcriptResponse.data;

    const decodedText = he.decode(transcript);
    const plainText = striptags(decodedText);
    return plainText;

}
const getVideoId = (video)=>{
    if(video.includes('www.youtube.com/watch?v=')){
        const video_id = video.slice(video.indexOf('v=')+2);
        return video_id;
    }else{
        return video;
    }
}
