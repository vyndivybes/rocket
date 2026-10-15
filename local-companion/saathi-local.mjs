// Optional local helper for a Windows 11 device. Node 22+, no npm packages.
// This is NOT unrestricted desktop control: only explicit browser opens, document
// notes and local status. Binds 127.0.0.1; no Cloudflare/GitHub credentials.
import {createServer} from 'node:http';
import {mkdir,writeFile} from 'node:fs/promises';
import {homedir,platform,freemem,totalmem,cpus} from 'node:os';
import {join,resolve} from 'node:path';
import {randomBytes} from 'node:crypto';
import {fileURLToPath} from 'node:url';
export function trustedBridgeOrigin(origin){
 if(typeof origin!=='string')return false;
 return /^https:\/\/(?:(?:[a-f0-9]{8,64})\.)?saathi-student-ai\.pages\.dev$/.test(origin);
}
const sources=['ncert.nic.in','cbseacademic.nic.in','www.ncert.nic.in','nasa.gov','wikipedia.org','khanacademy.org','developer.mozilla.org','openstax.org'];
export function normalizeBrowserUrl(value){
 if(typeof value!=='string'||value.length>1200||/[\x00-\x20\\]/.test(value))throw Error('Invalid browser URL');
 let url;try{url=new URL(value)}catch{throw Error('Invalid browser URL')}
 if(url.protocol!=='https:'||url.username||url.password||url.port||!/^[a-z0-9.-]+$/i.test(url.hostname))throw Error('Only clean HTTPS links are supported');
 const host=url.hostname.toLowerCase();
 if(!sources.some(allowed=>host===allowed||host.endsWith('.'+allowed)))throw Error('This browser action is limited to supported public educational sources');
 return url;
}
export function safeNoteName(title){
 if(typeof title!=='string'||title.length>110)throw Error('Invalid note title');
 const name=title.replace(/[^A-Za-z0-9 -]/g,'').trim().replace(/\s+/g,'-').slice(0,66);
 return (name||'Saathi-note')+'.md';
}
export function validateLocalAction(value){
 if(!value||typeof value!=='object')return {ok:false,reason:'Invalid action'};
 const {action}=value;
 if(action==='system-status')return {ok:true};
 if(action==='open-url'){try{normalizeBrowserUrl(value.url);return {ok:true}}catch(e){return{ok:false,reason:e.message}}}
 if(action==='search-web'&&typeof value.query==='string'&&value.query.trim().length>=3&&value.query.length<=120&&!/[\x00-\x1f]/.test(value.query))return {ok:true};
 if(action==='save-note'&&typeof value.content==='string'&&value.content.length>=4&&value.content.length<=20000){try{safeNoteName(value.title);return {ok:true}}catch(e){return {ok:false,reason:e.message}}}
 return {ok:false,reason:'Unsupported or oversized local action'};
}
const plain=(str)=>String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function ui(nonce,pairCode){
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Saathi Local Companion</title><style>body{margin:0;background:linear-gradient(135deg,#edf6f4,#fff8ea);font:16px/1.6 Segoe UI,Arial,sans-serif;color:#254c63;padding:30px}main{max-width:800px;margin:auto;background:#fffefa;padding:30px;border:1px solid #c7dfe0;border-radius:22px;box-shadow:0 19px 55px #63939b26}h1{font-size:32px}label{display:block;margin:15px 0}input,textarea{width:100%;padding:12px;border:1px solid #aac9cd;border-radius:10px;box-sizing:border-box;font:inherit}button{background:#2d838d;border:0;border-radius:10px;color:white;padding:11px 17px;font:inherit;cursor:pointer}button:focus-visible,a:focus-visible{outline:3px solid #b88a45}.open-link{display:inline-block;margin:12px 0;padding:11px 17px;border-radius:10px;background:#245d73;color:#fff;text-decoration:none;font-weight:700}p{color:#55727f}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#eaf4f3;padding:14px;border-radius:12px}</style></head><body><main><p>LOCAL · DEVICE CONTROLLED · FREE</p><h1>Saathi Local Companion</h1><p>This optional helper does not connect to Saathi automatically, monitor your computer or grant remote control. It opens selected educational websites and saves your notes locally only when you click an action.</p><section style="border:1px solid #b5d7d9;padding:14px 18px;border-radius:13px;background:#eaf5f6"><strong>Connect to Saathi Web AI (optional)</strong><p>On this same computer, open your Saathi Web AI. In AI Companion → Device tools enter this one-time code. Connection permits only supported local actions and expires after 20 minutes. Never share it with anyone else.</p><div data-pair-code="'+pairCode+'" style="font:800 28px/1.4 monospace;letter-spacing:.18em">'+pairCode+'</div><small>Close this program to disable all connected access immediately.</small></section><form id="open"><label>Educational URL<input name="url" placeholder="https://www1.grc.nasa.gov/"></label><button>Prepare educational link</button></form><form id="search"><label>Research topic<input name="query" placeholder="How aircraft wings generate lift"></label><button>Prepare web search</button></form><form id="note"><label>Note title<input name="title" value="My Saathi notes"></label><label>Your notes<textarea name="content" rows="6" placeholder="Copy a verified study explanation here"></textarea></label><button>Save into Documents / Saathi</button></form><button id="status">Show device status</button><pre id="result" role="status">Ready. No background actions are running.</pre><div id="link-result" role="status" aria-live="polite"></div></main><script>const nonce='+JSON.stringify(nonce)+';async function act(payload){const r=await fetch("/action",{method:"POST",headers:{"Content-Type":"application/json","X-Saathi-Nonce":nonce},body:JSON.stringify(payload)});const d=await r.json();const links=document.getElementById("link-result");links.replaceChildren();document.getElementById("result").textContent=d.error?"Error: "+d.error:d.operation==="link-ready"?"Link validated. Select Open page below to continue.":JSON.stringify(d,null,2);if(r.ok&&d.operation==="link-ready"){const a=document.createElement("a");a.href=d.url;a.rel="noopener noreferrer";a.target="_blank";a.className="open-link";a.textContent="Open page in browser →";links.appendChild(a)}}for(const [id,make] of [["open",d=>({action:"open-url",url:d.get("url")})],["search",d=>({action:"search-web",query:d.get("query")})],["note",d=>({action:"save-note",title:d.get("title"),content:d.get("content")})]])document.getElementById(id).addEventListener("submit",e=>{e.preventDefault();act(make(new FormData(e.target))).catch(err=>document.getElementById("result").textContent=err.message)});document.getElementById("status").onclick=()=>act({action:"system-status"});</script></body></html>';
}
export async function createLocalCompanion({port=31984}={}){
 const nonce=randomBytes(32).toString('hex');
 let code=String(randomBytes(4).readUInt32BE(0)%1000000).padStart(6,'0');
 let bridgeToken=null,bridgeExpiry=0,failedPairs=0;
 let recent=0,used=0;
 const server=createServer(async(req,res)=>{
  const siteOrigin='http://127.0.0.1:'+server.address().port;
  const incoming=req.headers.origin||'';
  const bridgeAllowed=trustedBridgeOrigin(incoming)&&req.url?.startsWith('/bridge/');
  const responseOrigin=bridgeAllowed?incoming:siteOrigin;
  const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','Access-Control-Allow-Origin':responseOrigin,'Vary':'Origin','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, X-Saathi-Bridge-Token','Access-Control-Allow-Private-Network':bridgeAllowed?'true':'false'};
  const send=(status,data,extra={})=>{res.writeHead(status,{...headers,...extra});res.end(JSON.stringify(data))};
  if(req.method==='GET'&&req.url==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; form-action 'none'; base-uri 'none'","Cache-Control":"no-store",'X-Content-Type-Options':'nosniff'});res.end(ui(nonce,code));return}
  if(req.method==='OPTIONS'&&bridgeAllowed){res.writeHead(204,headers);res.end();return}
  if(req.method!=='POST'||!['/action','/bridge/pair','/bridge/action'].includes(req.url)){send(404,{error:'Not found'});return}
  if(req.headers['content-type']?.split(';')[0]!=='application/json'){send(403,{error:'Local permission denied'});return}
  const isBridge=req.url.startsWith('/bridge/');
  if(isBridge?!bridgeAllowed:req.headers.origin!==siteOrigin||req.headers['x-saathi-nonce']!==nonce){send(403,{error:'Local permission denied'});return}
  if(req.url==='/bridge/action'&&(bridgeToken===null||Date.now()>bridgeExpiry||req.headers['x-saathi-bridge-token']!==bridgeToken)){send(403,{error:'Device pairing expired or missing'});return}
  const now=Date.now();if(now-recent>60000){used=0;recent=now}if(++used>24){send(429,{error:'Too many commands'});return}
  try{
   const chunks=[];let length=0;for await(const chunk of req){length+=chunk.length;if(length>23000){send(413,{error:'Request too large'});return}chunks.push(chunk)}
   const data=JSON.parse(Buffer.concat(chunks).toString('utf8'));
   if(req.url==='/bridge/pair'){
    if(failedPairs>=5||typeof data.code!=='string'||data.code!==code){failedPairs++;send(403,{error:'Invalid pairing code or pairing locked for this session'});return}
    bridgeToken=randomBytes(32).toString('hex');bridgeExpiry=Date.now()+20*60*1000;code='PAIRED';
    send(200,{token:bridgeToken,expiresInMinutes:20});return;
   }
   const check=validateLocalAction(data);if(!check.ok){send(400,{error:check.reason});return}
   if(data.action==='system-status'){send(200,{ok:true,platform:platform(),logicalProcessors:cpus().length,freeMemoryMiB:Math.round(freemem()/1048576),totalMemoryMiB:Math.round(totalmem()/1048576),scope:'Local read only'});return}
   if(data.action==='save-note'){
    const folder=resolve(homedir(),'Documents','Saathi');await mkdir(folder,{recursive:true});
    const path=join(folder,safeNoteName(data.title));await writeFile(path,data.content,'utf8');
    send(200,{ok:true,operation:'Saved note locally',file:safeNoteName(data.title)});return;
   }
   const url=data.action==='search-web'?'https://www.google.com/search?q='+encodeURIComponent(data.query):normalizeBrowserUrl(data.url).href;
   // Browser navigation is completed by the user's own click on a verified HTTPS link.
   // Avoid explorer.exe: its exit code does not reliably indicate successful navigation.
   send(200,{ok:true,operation:'link-ready',url,requiresClick:true});
  }catch{send(400,{error:'Invalid or failed local action'})}
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve)});
 return {server,port:server.address().port};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===resolve(process.argv[1])){
 const app=await createLocalCompanion();
 process.stdout.write('Saathi Local Companion ready at http://127.0.0.1:'+app.port+'\n');
 process.stdout.write('Open it in your browser. Only this computer can connect. Press Ctrl+C to stop.\n');
}
