import {auth,ensureRole,json,error} from '../_lib/core.js';
import {VISION_MODEL} from '../_lib/media-intake.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 const enabled=env.SAATHI_VISION_ENABLED==='true'&&typeof env.AI?.run==='function';
 return json({enabled,model:enabled?VISION_MODEL:null,notice:enabled?'Single-image/frame analysis is enabled but may be inaccurate.':'Image understanding is on hold until the model licence is accepted and an administrator deliberately enables it. Text files still work. No legal agreement was accepted automatically.'});
}
