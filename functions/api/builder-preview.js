import {auth,ensureRole,error} from '../_lib/core.js';
import {parseGeneratedBuild} from '../_lib/builder-lab.js';
import {buildSandboxDocument} from '../../public/builder-lab.js';
export async function onRequestGet({request,env}){
 const u=await auth(request,env);if(!ensureRole(u,'student'))return error('Student only',403);
 const id=new URL(request.url).searchParams.get('id');
 if(typeof id!=='string'||id.length<1||id.length>100)return error('Invalid project ID');
 let row;
 try{row=await env.DB.prepare('SELECT title,html,css,js FROM learner_builds WHERE student_id=? AND id=?').bind(u.id,id).first()}catch{return error('Builder storage unavailable',503)}
 if(!row)return error('Project not found',404);
 if(!parseGeneratedBuild(JSON.stringify(row)))return error('Project code cannot be safely previewed',422);
 return new Response(buildSandboxDocument(row),{
  status:200,
  headers:{
   'Content-Type':'text/html; charset=utf-8',
   'Content-Security-Policy':"sandbox allow-scripts; default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; frame-src 'none'; object-src 'none'; font-src 'none'; media-src 'none'; form-action 'none'; base-uri 'none'; frame-ancestors 'self'",
   'Cache-Control':'no-store, private',
   'Referrer-Policy':'no-referrer',
   'X-Content-Type-Options':'nosniff'
  }
 });
}
