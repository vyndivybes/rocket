// Student-focused VAOS-style allowlist and size gates. Never take a file path,
// upload URL, business artifact reference or provider secret from VAOS.
const TEXT_EXT=new Set(['txt','md','csv','json','vtt','srt']);
const IMAGE_EXT=new Set(['png','jpg','jpeg','webp']);
const VIDEO_EXT=new Set(['mp4','webm']);
const TEXT_MAX=120000;
const IMAGE_MAX=560000;
const VIDEO_MAX=18000000;
export const VISION_MODEL='@cf/google/gemma-4-26b-a4b-it';
export function classifyLocalStudyFile(name,mime,bytes){
 if(typeof name!=='string'||name.length>160||!Number.isSafeInteger(bytes)||bytes<1)return null;
 const ext=name.split('.').pop().toLowerCase();
 if(TEXT_EXT.has(ext)&&bytes<=TEXT_MAX)return {kind:'text',maxBytes:TEXT_MAX};
 if(IMAGE_EXT.has(ext)&&bytes<=IMAGE_MAX)return {kind:'image',maxBytes:IMAGE_MAX};
 if(VIDEO_EXT.has(ext)&&bytes<=VIDEO_MAX)return {kind:'video-frame-only',maxBytes:VIDEO_MAX};
 if(['pdf','docx','pptx'].includes(ext))return bytes<=1000000?{kind:'document',maxBytes:1000000}:null;
 if(['doc','ppt','odt'].includes(ext))return {kind:'unsupported',notice:'Legacy office documents are not supported; convert to PDF/DOCX/PPTX first.'};
 return null;
}
export function validateImageData(value){
 if(typeof value!=='string'||value.length>760000)return 'Image too large; select a small screenshot.';
 const match=value.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/]+={0,2})$/);
 if(!match)return 'Use a JPEG, PNG or WebP image.';
 const encoded=match[2];
 if(encoded.length<36||encoded.length>750000||encoded.length%4!==0)return 'Invalid image data.';
 let decoded;try{decoded=atob(encoded.slice(0,48))}catch{return 'Invalid image encoding.'}
 const codes=[...decoded].map(s=>s.charCodeAt(0));
 const type=match[1];
 if(type==='png'&&!(codes[0]===137&&codes[1]===80&&codes[2]===78&&codes[3]===71&&codes[4]===13&&codes[5]===10))return 'Invalid PNG header.';
 if(type==='jpeg'&&!(codes[0]===255&&codes[1]===216&&codes[2]===255))return 'Invalid JPEG header.';
 if(type==='webp'&&!(decoded.slice(0,4)==='RIFF'&&decoded.slice(8,12)==='WEBP'))return 'Invalid WebP header.';
 return null;
}
