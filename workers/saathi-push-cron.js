// Optional deployment: independent Cloudflare Worker with cron schedule.
// This Worker has no D1 permissions. It may call only the private staging endpoint.
export default {
 async scheduled(controller,env){
  if(env.PUSH_DISPATCH_CONFIGURED!=='true'||!env.PUSH_DISPATCH_SECRET||env.SAATHI_PUSH_URL!=='https://feat-saathi-academic-mvp.saathi-student-ai.pages.dev/api/push-dispatch')return;
  await fetch(env.SAATHI_PUSH_URL,{method:'POST',headers:{Authorization:'Bearer '+env.PUSH_DISPATCH_SECRET},signal:AbortSignal.timeout(15000)});
 }
};
