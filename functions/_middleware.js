import {error} from './_lib/core.js';
import {commissioningStatus} from './_lib/commissioning.js';

// Environment binding firewall. Reject all API operations when a Pages preview
// accidentally inherits the production DB or a deployment is misconfigured.
// Static assets may remain accessible; they contain no student account data.
export async function onRequest(context){
  if(!new URL(context.request.url).pathname.startsWith('/api/'))return context.next();
  const env=context.env;
  if(!env?.DB || !['preview','production'].includes(env.SAATHI_STAGE))return error('Application unavailable: environment not configured',503);
  if(env.SAATHI_STAGE==='production'&&!commissioningStatus(env).productionEligible)return error('Production restricted: mandatory commissioning gates remain on HOLD',503);
  try{
    const marker=await env.DB.prepare('SELECT environment FROM environment_guard LIMIT 1').first();
    if(!marker || marker.environment!==env.SAATHI_STAGE)return error('Application unavailable: environment mismatch',503);
  }catch{return error('Application unavailable: environment validation failed',503)}
  return context.next();
}
