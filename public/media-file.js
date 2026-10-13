// Browser-side guard, independent of VAOS production integrations.
export function detectMediaFile(name,size){
 if(typeof name!=='string'||name.length>160||!Number.isSafeInteger(size)||size<1)return null;
 const ext=name.toLowerCase().split('.').pop();
 if(['txt','md','csv','vtt','srt','json'].includes(ext))return size<=120000?'text':null;
 if(['jpeg','jpg','png','webp'].includes(ext))return size<=12000000?'image':null; // resized locally before transmission
 if(['mp4','webm'].includes(ext))return size<=18000000?'video-frame-only':null;
 if(['pdf','docx','pptx'].includes(ext))return size<=1000000?'document':null;
 if(['doc','ppt','odt'].includes(ext))return 'unsupported';
 return null;
}
export function frameTimeLabel(seconds){
 if(!Number.isFinite(seconds)||seconds<0)return 'time unavailable';
 const s=Math.floor(seconds),pad=n=>String(n).padStart(2,'0');
 return pad(Math.floor(s/3600))+':'+pad(Math.floor(s/60)%60)+':'+pad(s%60);
}
