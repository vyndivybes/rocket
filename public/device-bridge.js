// Optional one-tab, one-device handshake to the user's own localhost Saathi helper.
// Never persisted to cloud storage, localStorage, cookies or a remote service.
const DEFAULT_BASE='http://127.0.0.1:31984';
export async function pairLocalCompanion(code,{fetcher=fetch,base=DEFAULT_BASE}={}){
 if(typeof code!=='string'||!/^\d{6}$/.test(code))throw Error('Enter the six-digit code displayed on your own local Saathi helper.');
 if(base!==DEFAULT_BASE)throw Error('Only the local Saathi helper on this laptop may be paired.');
 let response;
 try{response=await fetcher(base+'/bridge/pair',{method:'POST',mode:'cors',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({code})})}catch{throw Error('Local helper is unavailable or your browser has not permitted local-network access. Start the helper on this laptop first.')}
 const data=await response.json().catch(()=>({}));
 if(!response.ok||!/^[a-f0-9]{64}$/i.test(data.token||''))throw Error(data.error||'Pairing failed; check the local code and device.');
 return data.token;
}
export async function callLocalCompanion(token,payload,{fetcher=fetch,base=DEFAULT_BASE}={}){
 if(base!==DEFAULT_BASE||typeof token!=='string'||!/^[a-f0-9]{64}$/i.test(token))throw Error('Pair the local Saathi helper before using device tools.');
 if(!payload||!['system-status','save-note','open-url','search-web'].includes(payload.action))throw Error('Unsupported device action.');
 let r;
 try{r=await fetcher(base+'/bridge/action',{method:'POST',mode:'cors',credentials:'omit',headers:{'Content-Type':'application/json','X-Saathi-Bridge-Token':token},body:JSON.stringify(payload)})}catch{throw Error('Local connection failed. Check that the helper is running on this laptop.')}
 const data=await r.json().catch(()=>({}));
 if(!r.ok)throw Error(data.error||'Device action was not accepted');
 return data;
}
