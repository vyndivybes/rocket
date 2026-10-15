import test from 'node:test';import assert from 'node:assert/strict';
import {youtubeIntent,videoSearchQuery,filterVideoResults} from '../public/youtube-discovery.js';
import {onRequestPost} from '../functions/api/youtube-search.js';
test('explicit and learning-context requests generate safe precise search queries',()=>{
 assert.equal(youtubeIntent('Find a video explaining electromagnetic induction').topic,'electromagnetic induction');
 assert.equal(youtubeIntent('show me YouTube videos about aircraft lift').topic,'aircraft lift');
 assert.equal(youtubeIntent('Explain algebra'),null);
 assert.match(videoSearchQuery('electromagnetic induction'),/Class 12/);
});
test('only qualified and embeddable video IDs and public metadata are returned',()=>{
 const items=[{id:{videoId:'abc_DEF1234'},snippet:{title:'Physics basics',description:'Simple lesson',channelTitle:'Education Lab',thumbnails:{medium:{url:'https://i.ytimg.com/vi/abc_DEF1234/mqdefault.jpg'}}}},{id:{videoId:'javascript:'},snippet:{title:'fake'}},{id:{videoId:'AAAAAAAAAAA'},snippet:{title:'Shorts prank'}}];
 const v=filterVideoResults(items);assert.equal(v.length,1);assert.equal(v[0].id,'abc_DEF1234');assert.equal(v[0].embedUrl,'https://www.youtube-nocookie.com/embed/abc_DEF1234');
});
test('YouTube API key must remain server-side; missing configuration fails safely',async()=>{
 const request=new Request('https://saathi-student-ai.pages.dev/api/youtube-search',{method:'POST',headers:{'content-type':'application/json','origin':'https://saathi-student-ai.pages.dev'},body:JSON.stringify({query:'aircraft wings'})});
 const response=await onRequestPost({request,env:{}});assert.equal(response.status===503||response.status===403,true);
});
