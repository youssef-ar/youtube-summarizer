
const CHUNK_SIZE = 4000;
export const getChunks = (subtitle) => {
    const chunks = [];
    while (subtitle.length >= CHUNK_SIZE) {
        let chunk = subtitle.slice(0, CHUNK_SIZE);
        subtitle = subtitle.slice(CHUNK_SIZE);
        chunks.push(chunk);
    }
    if (subtitle.length > 0) {
        chunks.push(subtitle);
    }
    return chunks;
};
