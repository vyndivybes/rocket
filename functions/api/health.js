import {json} from '../_lib/core.js';
export async function onRequestGet({env}){return json({status:'ready-for-configuration',db:!!env.DB,ai:!!env.AI,release:'academic-mvp-0.1',authentication:'required-for-all-student-endpoints'});}
