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
 if(!day||idx<0)return null; // Never silently convert a single reminder into a daily recurring schedule.
 const days=[idx];
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

export function needsReminderDetails(text){return typeof text==='string'&&/^(?:(?:hey )?saathi[, ]*)?(?:remind me to|schedule|set (?:a )?reminder|add (?:a )?reminder)/i.test(text)&&!parseScheduleIntent(text)&&!parseOneTimeReminder(text)}

export function parseOneTimeReminder(text,now=new Date()){
 if(typeof text!=='string'||text.length>500)return null;
 let t=text.trim().replace(/^(?:hey\s+)?(?:saathi[,! ]+)?(?:please\s+)?/i,'');
 if(!/^(?:remind me|set (?:a )?reminder|schedule)\b/i.test(t))return null;
 t=t.replace(/^(?:remind me(?: to)?|set (?:a )?reminder(?: to| for)?|schedule)\s+/i,'');
 const match=t.match(/^(.*?)\s*(?:for\s+)?tomorrow(?:\s+(?:morning|afternoon|evening|night))?\s+(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b[.!?]?$/i);
 if(!match)return null;
 const title=(match[1]||'Reminder').trim().replace(/^(?:to|for)\s+/i,'').trim()||'Reminder';
 const hour=Number(match[2]),minute=Number(match[3]||0),ampm=match[4].toLowerCase();
 if(title.length>90||hour<1||hour>12||minute>59)return null;
 const h=String(hour%12+(ampm==='pm'?12:0)).padStart(2,'0');
 const tomorrow=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,12,0,0);
 const date=tomorrow.getFullYear()+'-'+String(tomorrow.getMonth()+1).padStart(2,'0')+'-'+String(tomorrow.getDate()).padStart(2,'0');
 return {title,date,time:h+':'+String(minute).padStart(2,'0')};
}
