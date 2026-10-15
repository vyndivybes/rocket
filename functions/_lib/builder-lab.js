// Restricted in-Saathi educational prototypes; never code executing in Saathi's origin.
const unsafe=/(?:fetch\s*\(|XMLHttpRequest|WebSocket|EventSource|Worker\s*\(|serviceWorker|importScripts|eval\s*\(|new\s+Function|localStorage|sessionStorage|indexedDB|document\.cookie|postMessage|parent\s*\.|top\s*\.|opener\s*\.|location\s*[.=]|navigator\s*\.|setInterval\s*\(|requestAnimationFrame\s*\(|while\s*\(|for\s*\(\s*;\s*;|https?:\/\/|data:text\/html|javascript:|<\s*\/\s*script)/i;
const forbiddenHtml=/<\s*(?:script|iframe|frame|object|embed|form|link|meta|base|style)\b|\bon\w+\s*=|\b(?:src|href|action|formaction)\s*=/i;
const unsafePrompt=/(?:password|credentials|api\s*key|secret\s*token|phish|spy(?:ing|ware)?|steal|hack|malware|ransomware|bypass.*safety|purchase|payment|send\s+(?:a\s+)?message|email\s+(?:my|someone|others)|terminal|shell\s+command|powershell)/i;
export function validateBuildRequest(input){
 if(typeof input!=='string'||input.trim().length<12||input.length>600)return 'Describe a small interactive project in 12–600 characters';
 if(/[\u0000-\u001f\u007f]/.test(input)||unsafePrompt.test(input))return 'This project requests unsupported access or contains restricted details';
 return null;
}
export function parseGeneratedBuild(raw){
 if(typeof raw!=='string'||raw.length>19000)return null;
 let value;try{const source=raw.trim();const fenced=source.match(/^\x60{3}(?:json)?\s*([\s\S]*?)\s*\x60{3}$/i);value=JSON.parse(fenced?fenced[1]:source)}catch{return null}
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).sort().join(',')!=='css,html,js,title')return null;
 const {title,html,css,js}=value;
 if(typeof title!=='string'||title.trim().length<3||title.length>60||/[<>]/.test(title))return null;
 for(const [s,max] of [[html,4200],[css,3000],[js,4500]]){
  if(typeof s!=='string'||s.length>max||unsafe.test(s))return null;
 }
 if(!html.trim()||!js.trim()||forbiddenHtml.test(html)||/<\s*\/\s*style/i.test(css)||/<\s*\/\s*script/i.test(js))return null;
 return {title:title.trim(),html,css,js};
}
export const publicBuilder=row=>({id:row.id,title:row.title,description:row.description,revision:Number(row.revision),createdAt:row.created_at,updatedAt:row.updated_at});
