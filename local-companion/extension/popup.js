import {collectVisiblePage,highlightPhrase,chooseLink} from './browser-tools.js';
const result=document.getElementById('result');let current=null;
async function activeTab(){
 const tabs=await chrome.tabs.query({active:true,currentWindow:true});
 const tab=tabs?.[0];if(!tab?.id||!/^https:\/\//.test(tab.url||''))throw Error('Open an HTTPS educational page first.');
 return tab;
}
async function execute(func,args=[]){
 const tab=await activeTab();
 const result=await chrome.scripting.executeScript({target:{tabId:tab.id},func,args});
 return result?.[0]?.result;
}
const show=text=>{result.textContent=String(text).slice(0,8500)};
async function perform(action){
 try{
  if(action==='read'){
   current=await execute(collectVisiblePage);
   show((current.title||'Page')+'\n'+(current.url||'')+'\n\n'+current.text.slice(0,6000)+'\n\nVisible links: '+current.links.length);return;
  }
  if(action==='copy'){
   if(!current)throw Error('Read a page first.');
   await navigator.clipboard.writeText(current.title+'\n'+current.url+'\n\n'+current.text);
   show('Excerpt copied. Paste it into Saathi and ask a question.');return;
  }
  const phrase=document.getElementById('topic').value.trim();
  if(phrase.length<3)throw Error('Enter at least three characters.');
  if(action==='highlight'){
   const n=await execute(highlightPhrase,[phrase]);
   show(n+' passages highlighted on your current page.');return;
  }
  if(action==='open'){
   if(!current)current=await execute(collectVisiblePage);
   const link=chooseLink(current.links,phrase);
   if(!link)throw Error('No matching safe HTTPS link found. Try reading the page first.');
   if(!confirm('Open the page “'+link.label+'” in your current tab?'))return;
   const tab=await activeTab();await chrome.tabs.update(tab.id,{url:link.href});show('Opened '+link.label);
  }
 }catch(e){show('Action unavailable: '+e.message)}
}
for(const type of ['read','copy','highlight','open'])document.getElementById(type).addEventListener('click',()=>perform(type));
