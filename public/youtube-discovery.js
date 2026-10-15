// Zero-key client-side YouTube intent classifier. Server searches only after learner asks.
// The AI tutor may suggest a video without falsely asserting that it viewed its contents.
export function youtubeIntent(input){
 if(typeof input!=='string'||input.length>700)return null;
 const q=input.trim().replace(/^(?:(?:hey|hi)\s+)?saathi[,!:\s]+/i,'');
 const patterns=[
  /^(?:please\s+)?(?:find|show|search|recommend|play|suggest)\s+(?:me\s+)?(?:(?:a|some|related|good|educational|best)\s+)?(?:(?:youtube|yt)\s+)?videos?\s+(?:about|on|explaining|for|of)\s+(.+)$/i,
  /^(?:please\s+)?(?:search|find)\s+(?:on\s+)?youtube\s+(?:for\s+)?(.+)$/i,
  /^(?:please\s+)?(?:show|play|recommend|find)\s+(?:me\s+)?(?:a\s+)?youtube\s+videos?\s+(?:on|about|for)?\s*(.+)$/i
 ];
 for(const re of patterns){const m=q.match(re);if(m){const topic=m[1].trim().replace(/[.!?]+$/,'');if(topic.length>=4&&topic.length<=150&&!/[<>\x00-\x1f]/.test(topic))return {topic};}}
 return null;
}
export function videoSearchQuery(topic){return String(topic).trim().slice(0,150)+' Class 12 educational explanation';}
export function filterVideoResults(items){
 if(!Array.isArray(items))return [];
 const videos=[];const seen=new Set();
 for(const item of items){
  const id=item?.id?.videoId;
  const title=item?.snippet?.title;
  if(typeof id!=='string'||!/^[a-zA-Z0-9_-]{11}$/.test(id)||typeof title!=='string'||title.length<3||seen.has(id))continue;
  if(/(?:\bshorts?\b|\bprank\b|\bclickbait\b)/i.test(title))continue;
  seen.add(id);
  videos.push({id,title:title.slice(0,160),channel:String(item.snippet.channelTitle||'').slice(0,100),description:String(item.snippet.description||'').slice(0,250),thumbnail:'https://i.ytimg.com/vi/'+id+'/mqdefault.jpg',url:'https://www.youtube.com/watch?v='+id,embedUrl:'https://www.youtube-nocookie.com/embed/'+id});
  if(videos.length===5)break;
 }
 return videos;
}
