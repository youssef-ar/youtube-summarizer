
const CHUNK_SIZE = 4000;
const getChunks = (subtitle)=>{
    chunks=[];
    let chunk = "";
    while(subtitle.length>0){
        if(chunk.length===CHUNK_SIZE){
            chunks.push(chunk);
        }else{
            
        }
    }
}