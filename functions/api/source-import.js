import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
import {classifyStudyUrl,extractReadableText} from '../_lib/link-lesson.js';
const MAX_FETCH_BYTES=256000;
async function readLimited(response,maxBytes=MAX_FETCH_BYTES){
 const header=Number(response.headers.get('content-length')||0);
 if(header>maxBytes)throw Error('too large');
 if(!response.body)return '';
 const reader=response.body.getReader(),buffers=[];let length=0;
 try{
  while(true){
   const {done,value}=await reader.read();
   if(done)break;
   length+=value.byteLength;
   if(length>maxBytes)throw Error('too large');
   buffers.push(value);
  }
 }finally{try{await reader.cancel()}catch{}}
 const bytes=new Uint8Array(length);let offset=0;
 for(const buf of buffers){bytes.set(buf,offset);offset+=buf.length}
 return new TextDecoder('utf-8',{fatal:false}).decode(bytes);
}
export async function onRequestPost({request,env,data}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let input;try{input=await safeBody(request,2200)}catch{return error('Invalid request')}
 const source=classifyStudyUrl(input.url);
 if(!source)return error('Automatic retrieval supports only listed trusted educational sites and YouTube video links. For other sources, use your own pasted study text.',422);
 const fetcher=data?.fetcher??fetch;
 if(source.kind==='youtube'){
  let title='YouTube video';
  try{
   const endpoint='https://www.youtube.com/oembed?url='+encodeURIComponent(source.url)+'&format=json';
   const r=await fetcher(endpoint,{redirect:'manual',headers:{Accept:'application/json'},signal:AbortSignal.timeout(8000)});
   if(r.ok&&Number(r.headers.get('content-length')||0)<12000){
    const raw=await readLimited(r,12000);
    const parsed=JSON.parse(raw);
    if(typeof parsed.title==='string')title=parsed.title.slice(0,140);
   }
  }catch{}
  return json({kind:'youtube',url:source.url,title,status:'transcript_required',text:'',notice:'Saathi can identify the video link but cannot read its spoken lesson or visuals from the URL alone. In YouTube choose Show transcript, copy available captions, and paste them below. Timestamped VTT or SRT captions are also supported. If no transcript is available, Saathi must not invent its content.'});
 }
 let response;
 try{response=await fetcher(source.url,{method:'GET',redirect:'manual',headers:{Accept:'text/html, text/plain;q=0.9'},signal:AbortSignal.timeout(10000)})}
 catch{return error('This page could not be retrieved. You can paste a short passage from the study material instead.',502)}
 if(response.status>=300&&response.status<400)return error('The webpage redirects to another address and was not followed. Open the final trusted page URL or paste an excerpt.',422);
 if(!response.ok)return error('This webpage refused direct reading. Paste an excerpt if you are permitted to use it.',422);
 const contentType=(response.headers.get('content-type')||'').toLowerCase();
 if(!/^text\/(?:html|plain)(?:;|$)/.test(contentType))return error('This source is not a readable HTML or text page. PDF and video file analysis are not supported here.',415);
 let body;
 try{body=await readLimited(response)}catch{return error('Page exceeded the safe reading limit or could not be decoded.',413)}
 const extracted=contentType.startsWith('text/plain')?{title:'Educational text page',text:body.trim().slice(0,12000)}:extractReadableText(body);
 if(extracted.text.length<60)return error('The page does not contain enough readable text. Paste a relevant excerpt into Saathi instead.',422);
 return json({kind:'webpage',url:source.url,title:extracted.title,status:'ready',text:extracted.text,excerptLength:extracted.text.length,notice:'Readable text was extracted only from this public webpage, not its images or hidden interactive material. Review the excerpt and ask a question. Content stays in this browser session unless you explicitly save a note.'});
}
