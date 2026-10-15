export function matchVoiceCommand(value){
 const s=typeof value==='string'?value.toLowerCase().trim().replace(/[.!?]+$/,''):'';if(s.length>100)return null;
 if(/^(?:open|show|take me to) (?:my )?(?:notes|notebook)$/.test(s))return 'notes';
 if(/^(?:open|show|take me to) (?:my )?(?:schedule|scheduler|calendar|routine)$/.test(s))return 'schedule';
 if(/^(?:open|show|take me to) (?:the )?(?:art studio|sketchbook|painting studio)$/.test(s))return 'art';
 if(/^(?:open|show|take me to) (?:the )?(?:pilot academy|pilot path|aviation)$/.test(s))return 'pilot';
 if(/^(?:open|show|take me to) (?:mission home|home)$/.test(s))return 'home';
 if(/^(?:talk to saathi|open (?:the )?(?:companion|assistant))$/.test(s))return 'companion';
 return null;
}
