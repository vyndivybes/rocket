import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
import {filterVideoResults,videoSearchQuery} from '../../public/youtube-discovery.js';
// Credentials are exclusively server-side Cloudflare secrets. No transcript claims.
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);
 if(!ensureRole(user,'student'))return error('Student only',403);
 let input;try{input=await safeBody(request,500)}catch{return error('Invalid search request')};
 const query=typeof input?.query==='string'?input.query.trim():'';
 if(query.length<4||query.length>150||/[<>\x00-\x1f]/.test(query))return error('Enter an educational search topic (4–150 characters)');
 if(typeof env.YOUTUBE_API_KEY!=='string'||env.YOUTUBE_API_KEY.length<20)return error('YouTube search has not been configured. Add the YouTube Data API v3 key as Cloudflare secret YOUTUBE_API_KEY.',503);
 const url=new URL('https://www.googleapis.com/youtube/v3/search');
 url.search=new URLSearchParams({part:'snippet',type:'video',safeSearch:'strict',videoEmbeddable:'true',maxResults:'5',order:'relevance',regionCode:'IN',relevanceLanguage:'en',q:videoSearchQuery(query),key:env.YOUTUBE_API_KEY}).toString();
 try{
  const cacheKey=new Request('https://saathi.youtube-cache.invalid/search?q='+encodeURIComponent(query.toLowerCase()),{method:'GET'});
  const cache=typeof caches!=='undefined'?caches.default:null;
  const hit=cache?await cache.match(cacheKey):null;
  if(hit){const cached=await hit.json();return json({...cached,cached:true})}
  const response=await fetch(url.toString(),{method:'GET',redirect:'error',signal:AbortSignal.timeout(8500)});
  if(response.status===403||response.status===429)return error('YouTube API quota or permissions unavailable; video search is temporarily disabled.',503);
  if(!response.ok)return error('YouTube video search failed; Saathi can still explain the topic.',502);
  const content=await response.text();
  if(content.length>300000)return error('YouTube returned an unexpectedly large response.',502);
  const data=JSON.parse(content);
  const result={status:'READY',topic:query,videos:filterVideoResults(data?.items),notice:'Recommendations based on YouTube search titles and descriptions only. Saathi has not watched or verified these videos. Playback is optional.'};
  if(cache){const cachedResponse=new Response(JSON.stringify(result),{headers:{'Cache-Control':'public,max-age=21600','Content-Type':'application/json'}});await cache.put(cacheKey,cachedResponse).catch(()=>{})}
  return json(result);
 }catch{return error('YouTube search is temporarily unavailable. You can continue learning without a video.',502)}
}
