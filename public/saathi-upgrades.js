// An explicit learner request to upgrade Saathi itself becomes a scoped extension.
// Generated code still only runs in the existing opaque-origin Builder Lab sandbox.
const unsafe=/(?:password|credential|private account|all student|every student|other student|read my (?:email|files)|send (?:emails?|messages?)|email (?:my|other)|payment|purchase|bank|filesystem|file system|terminal|shell|external api|internet access|javascript injection|malware|spyware|steal|hack|root access|admin access|bypass|override|secret|disable (?:safety|privacy))/i;
export function detectSaathiUpgradeIntent(input){
 if(typeof input!=='string'||input.length>600)return null;
 const q=input.trim().replace(/^(?:hey )?saathi[,!:\s]+/i,'');
 const found=q.match(/^(?:upgrade (?:yourself|saathi)|add (?:a |an )?(?:new )?(?:feature|tool|module) (?:to|inside) saathi|improve yourself) (?:with|by adding|to include|that adds|using|so you can) (.+)$/i);
 if(!found)return null;
 const description=found[1].trim();
 if(description.length<12||description.length>450||unsafe.test(description))return null;
 return 'Build '+(/^(?:a|an|the)\s/i.test(description)?'':'an interactive ')+description;
}
