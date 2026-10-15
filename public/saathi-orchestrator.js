// Intent suggestions and bounded multi-step confirmation, always learner-controlled.
const dayNames=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
export function parseScheduleIntent(text){
 if(typeof text!=='string'||text.length>600)return null;
 const match=text.match(/^(?:saathi[, ]+)?(?:please\s+)?(?:remind me to|schedule|add (?:a )?(?:reminder|schedule) (?:for|to)|set (?:a )?reminder (?:to|for))\s+(.+?)\s+(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b(?:\s+(?:on|every)\s+(\w+))?[.!?]?$/i);
 if(!match)return null;
 const hour=Number(match[2]),minute=Number(match[3]||0),meridian=match[4].toLowerCase();
 if(hour<1||hour>12||minute>59||match[1].length<3||match[1].length>90)return null;
 const time=String((hour%12)+(meridian==='pm'?12:0)).padStart(2,'0')+':'+String(minute).padStart(2,'0');
 const day=match[5]?.toLowerCase(),idx=dayNames.indexOf(day);
 if(day&&idx<0)return null;
 const days=idx>=0?[idx]:[0,1,2,3,4,5,6];
 return {title:match[1].trim(),kind:'study',time,minutes:30,days};
}
export function proactiveSearchHint(q,answer){
 if(typeof q!=='string'||typeof answer!=='string')return null;
 const topic=q.trim().slice(0,130);
 if(topic.length<8)return null;
 if(/\b(?:explain|understand|how does|show me|why|tutorial|demonstrate)\b/i.test(q)&&/\b(?:physics|aircraft|wing|force|chemistry|biology|math|engine|science|lift|electric)\b/i.test(q)){
  return {topic,label:'Would a visual lesson help? I can search YouTube or Google for related explanations.'};
 }
 return null;
}
export function skillUpgradeIntent(text){
 if(typeof text!=='string')return null;
 const match=text.trim().match(/^(?:(?:saathi[, ]+)?(?:please )?)?(?:upgrade your skills|build (?:me )?a new (?:skill|capability)|learn to teach me|create (?:a )?skill)\s*(?:to|for|about|on)?\s*(.{7,220})$/i);
 return match?match[1].trim():null;
}
