// Projects are run ONLY in <iframe sandbox="allow-scripts"> with no same-origin,
// downloads, popups, forms, navigation or external network permission.
export function detectBuildRequest(value){
 if(typeof value!=='string'||value.length>600)return null;
 const q=value.trim();
 if(/^(?:build|create|make|design|prototype)\s+(?!.*\bskill\s+(?:called|named)\b)(?:(?:me\s+)?(?:an?\s+)?)(?:interactive|small|simple|mini|virtual|web|drawing|quiz|game|simulation|calculator|app|prototype|tool)\b/i.test(q)&&q.length>=12)return q;
 return null;
}
export function buildSandboxDocument(project,{trustedProbe=''}={}){
 const html=typeof project?.html==='string'?project.html:'',css=typeof project?.css==='string'?project.css:'',js=typeof project?.js==='string'?project.js:'';
 // A browser-enforced opaque-origin sandbox is the primary boundary.
 // CSP denies network, popups, forms, external assets, and navigation targets.
 const csp="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; font-src 'none'; media-src 'none'; frame-src 'none'; object-src 'none'; form-action 'none'; base-uri 'none'; navigate-to 'none'";
 return '<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="'+csp+'"><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+css+'</style></head><body>'+html+trustedProbe+'<script>'+js+'</script></body></html>';
}
