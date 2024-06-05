import { getSummarization } from "./getSummarization.js";
import { getChunks } from "./getChunks.js";

const summarizeChunks = async(chunks)=>{
    let summary ="";
    for(let index in chunks){
        let chunkSummary = await getSummarization(chunks[index]);
        summary +=chunkSummary.slice(chunkSummary.indexOf(":")+1);
    }
    return summary;
}

const finalSummary = async (summary) => {
    const chunks = await getChunks(summary); 
    if (chunks.length === 1) {
        return summary;
    } else {
        summary = await summarizeChunks(chunks);
        return await finalSummary(summary); 
    }
};


export const summarize = async(chunks)=>{
    let summary = await summarizeChunks(chunks);
    summary = await finalSummary(summary);
    return summary;
}