// Route URLs to evidence-backed study flow, not unsupported chat guesses.
export function detectStudyLinkQuestion(value){
 if(typeof value!=='string'||value.length>1800)return null;
 const match=value.match(/https:\/\/[^\s<>"']+/i);
 if(!match)return null;
 const url=match[0].replace(/[),.;!?]+$/,'');
 let valid;
 try{valid=new URL(url);if(valid.protocol!=='https:'||valid.username||valid.password)return null}catch{return null}
 const remaining=(value.slice(0,match.index)+' '+value.slice(match.index+match[0].length)).replace(/\s+/g,' ').trim();
 return {url:valid.toString(),question:remaining.length>=4?remaining:'Explain the main concepts from this study material using one simple example.'};
}
