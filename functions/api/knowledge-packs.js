import {json,error,auth,ensureRole} from '../_lib/core.js';
import {publicKnowledgePacks} from '../_lib/knowledge-packs.js';
export async function onRequestGet({request,env}){
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 return json({version:'FOUNDATION_PACKS_2026_10_13_V1',packs:publicKnowledgePacks(),notice:'These are editorial foundation explanations with official reference links, not a certified board-specific course. Sources are provided for independent textbook checking.'});
}
