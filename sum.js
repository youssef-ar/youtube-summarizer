// node sum --video https://www.youtube.com/watch?v=3825h6K_WLg

import yargs from 'yargs';
import { getSubtitleFromVideo } from './src/getSubtitleFromVideo.js';
import { getChunks } from './src/getChunks.js';
import { summarize } from './src/summarize.js';
const { argv } = yargs(process.argv.slice(1));

if (!argv.video) {
  throw new Error('Video not found');
}



const main = async (video) => {
  const subtitle = await getSubtitleFromVideo(video);
  const chunks = getChunks(subtitle);
  const summary = await summarize(chunks);
  console.log('Summary:', summary);
}

await main(argv.video);

process.exit(0)