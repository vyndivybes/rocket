// Saathi Browser Helper, Manifest V3. All actions require a click in the popup.
// Runs on active tab only; no broad site permission, browsing history or remote upload.
export function safePublicLink(value){
 if(typeof value!=='string'||value.length>1800)return null;
 try{
  const url=new URL(value);
  if(url.protocol!=='https:'||url.username||url.password||url.port||!url.hostname.includes('.')||/^(?:\d{1,3}\.){3}\d{1,3}$|^\[|\b(?:localhost|local|internal)\b/i.test(url.hostname))return null;
  return url.href;
 }catch{return null}
}
export function chooseLink(links,phrase){
 const q=String(phrase||'').toLowerCase().trim();
 if(q.length<3||q.length>80||!Array.isArray(links))return null;
 const found=links.find(a=>a&&typeof a.label==='string'&&a.label.toLowerCase().includes(q)&&safePublicLink(a.href));
 return found?{label:found.label.slice(0,120),href:safePublicLink(found.href)}:null;
}
export function collectVisiblePage(){
 const body=document.body,links=Array.from(document.querySelectorAll('a[href]')).filter(x=>x.offsetWidth||x.offsetHeight||x.getClientRects().length).slice(0,70);
 return {title:String(document.title||'Untitled').slice(0,180),url:location.href,text:String(body?.innerText||'').slice(0,14000),links:links.map(a=>({label:String(a.innerText||a.textContent||'').trim().slice(0,120),href:a.href})).filter(x=>x.label)};
}
export function highlightPhrase(phrase){
 if(typeof phrase!=='string'||phrase.trim().length<3||phrase.length>80)return 0;
 const escaped=phrase.trim().toLowerCase();
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 let n,count=0;
 while((n=walker.nextNode())&&count<16){
  if(!n.parentElement||n.parentElement.closest('script,style,textarea,code,pre,mark,input,button'))continue;
  const text=n.nodeValue||'',idx=text.toLowerCase().indexOf(escaped);
  if(idx<0)continue;
  const mark=document.createElement('mark');mark.textContent=text.slice(idx,idx+escaped.length);mark.style.background='#ffe7a5';mark.style.color='#173b54';
  const before=document.createTextNode(text.slice(0,idx)),after=document.createTextNode(text.slice(idx+escaped.length));
  n.replaceWith(before,mark,after);count++;
 }
 return count;
}
