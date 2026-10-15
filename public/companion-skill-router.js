// Saathi's conversational skill selector is deterministic, local, and bounded.
// It proposes actions only; the authenticated student must review each write.
const DAY_NAMES=['sun','mon','tue','wed','thu','fri','sat'];
function localDate(date){
  return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
}
function taskDate(text,now){
  if(/\btomorrow\b/i.test(text)){const day=new Date(now);day.setDate(day.getDate()+1);return localDate(day)}
  if(/\btoday\b/i.test(text))return localDate(now);
  const d=text.match(/\bon\s+(\d{4}-\d{2}-\d{2})\b/);
  if(d){const date=new Date(d[1]+'T12:00:00');if(!Number.isNaN(+date)&&localDate(date)===d[1])return d[1]}
  return null;
}
function extractTime(value){
  const m=value.match(/\bat\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i);
  if(!m)return null;
  let hour=Number(m[1]),min=Number(m[2]||'0');
  if(min>59||hour>23)return null;
  if(m[3]){if(hour<1||hour>12)return null;hour=(hour%12)+(m[3].toLowerCase()==='pm'?12:0)}
  else if(!m[2]||hour<13)return null; // do not guess AM/PM for bare 5
  return String(hour).padStart(2,'0')+':'+String(min).padStart(2,'0');
}
function extractDays(value){
 if(/\b(?:every\s+weekday|weekdays|monday\s+to\s+friday)\b/i.test(value))return [1,2,3,4,5];
 if(/\b(?:every\s+day|daily)\b/i.test(value))return [0,1,2,3,4,5,6];
 const found=DAY_NAMES.flatMap((d,i)=>new RegExp('\\b'+d+'(?:day)?s?\\b','i').test(value)?[i]:[]);
 return found.length?found:null;
}
function scheduleKind(text){
 if(/\b(?:drawing|sketch|art|painting)\b/i.test(text))return 'art';
 if(/\b(?:walk|stretch|exercise|movement)\b/i.test(text))return 'movement';
 if(/\b(?:football|cycling|cricket|sport|play)\b/i.test(text))return 'sport';
 if(/\b(?:rest|relax|break)\b/i.test(text))return 'rest';
 if(/\b(?:flying|aviation|pilot)\b/i.test(text))return 'aviation';
 return 'study';
}
function academicMode(text){
 if(/\b(?:aircraft|airplane|aeroplane|aviation|pilot|flying|aerodynamics|airplane?s?|lift\s+force)\b/i.test(text))return 'pilot';
 if(/\b(?:sketching|sketch|painting|abstract art|artwork|colour|color)\b/i.test(text))return 'artist';
 if(/\b(?:teach|explain|solve|study|practice|revise|revision|physics|chemistry|mathematics|maths|biology|equation|newton|induction|calculus|exam|homework)\b/i.test(text))return 'teacher';
 if(/\b(?:plan my week|organise my day|organize my day|help me plan|study plan)\b/i.test(text))return 'planner';
 return null;
}
export function routeCompanionSkill(utterance,now=new Date()){
 if(typeof utterance!=='string'||utterance.length>1600)return null;
 const q=utterance.trim().replace(/[.!?]+$/,'');
 if(q.length<4)return null;
 if(/^(?:show|list|read) my (?:study )?tasks?(?: please)?$/i.test(q))return {kind:'read-tasks'};
 if(/^(?:show|list|read) my (?:private )?notes?(?: please)?$/i.test(q))return {kind:'read-notes'};
 if(/^(?:show|list|read) my (?:study )?(?:schedule|routine)(?: please)?$/i.test(q))return {kind:'read-schedule'};
 // Only direct, affirmative requests to the learner's own data may become write proposals.
 let match=q.match(/^(?:remember(?:\s+that)?|save\s+(?:this\s+)?(?:as\s+)?(?:a\s+)?memory\s*:?)[\s:]+(.+)$/i);
 if(match){
  const text=match[1].trim();
  if(text.length<10||text.length>240)return {kind:'memory-needs-details',answer:'Tell me one short learning preference, interest or goal to remember (10–240 characters).'};
  const category=/\b(?:learn|learning|study|explain|diagram|revision|practice)\b/i.test(text)?'learning':/\b(?:goal|want to become|hope to|aspire)\b/i.test(text)?'goal':/\b(?:prefer|please|rather)\b/i.test(text)?'preference':'interest';
  return {kind:'create-memory',payload:{action:'create',category,text,useInChat:false},confirmation:'Remember this privately: “'+text+'”?',notice:'AI recall remains off until you separately approve it.'};
 }
 match=q.match(/^(?:save|create|add|write)(?:\s+(?:a|new))?\s+note(?:\s+(?:that|saying|about))?\s*:?\s+(.+)$/i);
 if(match){
  const body=match[1].trim();
  if(!body||body.length>3000)return {kind:'note-needs-details',answer:'Please give me a short note to save.'};
  return {kind:'create-note',payload:{title:body.slice(0,100),body},confirmation:'Save this private note: “'+body.slice(0,120)+'”?',notice:'Saved only to your private notes, not AI memory.'};
 }
 match=q.match(/^(?:(?:add|create|make)(?:\s+(?:a|new))?\s+(?:study\s+)?task(?:\s+(?:to|for|about))?|remind\s+me\s+to)\s*:?\s+(.+)$/i);
 if(match){
  const raw=match[1].trim();
  if(/\b(?:at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?|every\s+day|weekdays?)\b/i.test(raw))return {kind:'task-needs-details',answer:'I can create a study task, but that does not send timed reminders. For a routine, say “Schedule 30 minutes of Physics at 5:30 pm every weekday.”'};
  const title=raw.replace(/\s+(?:tomorrow|today|on\s+\d{4}-\d{2}-\d{2})\s*$/i,'').trim();
  if(!title||title.length>150)return {kind:'task-needs-details',answer:'What short task should I add to your study list?'};
  const subject=/\bphysics\b/i.test(title)?'Physics':/\b(?:maths|mathematics)\b/i.test(title)?'Mathematics':/\bchemistry\b/i.test(title)?'Chemistry':/\bbiology\b/i.test(title)?'Biology':'General';
  return {kind:'create-task',payload:{title,subject,due_date:taskDate(raw,now)},confirmation:'Add “'+title+'” to your study tasks?',notice:'This saves a task; it does not send a notification.'};
 }
 match=q.match(/^(?:schedule|plan|add\s+to\s+(?:my\s+)?schedule|set\s+a\s+routine\s+for)\s+(.+)$/i);
 if(match){
  const text=match[1].trim(),time=extractTime(text),days=extractDays(text),duration=text.match(/\b(\d{1,3})\s*(?:minutes|mins|min)\b/i);
  const minutes=duration?Number(duration[1]):null;
  if(!time||!days||!minutes||minutes<5||minutes>120)return {kind:'schedule-needs-details',answer:'Tell me the activity, duration, clock time with AM/PM, and days. Example: “Schedule 30 minutes of maths at 5:30 pm every weekday.”'};
  let title=text.replace(/\b\d{1,3}\s*(?:minutes|mins|min)(?:\s+of)?\b/i,'').replace(/\bat\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?\b/i,'').replace(/\b(?:every\s+weekday|weekdays|monday\s+to\s+friday|every\s+day|daily)\b/ig,'').replace(/\b(?:on\s+)?(?:sundays?|mondays?|tuesdays?|wednesdays?|thursdays?|fridays?|saturdays?)\b/ig,'').trim().replace(/^of\s+/i,'').replace(/\s+/g,' ');
  if(title.length<2||title.length>100)return {kind:'schedule-needs-details',answer:'What activity would you like in that time slot?'};
  return {kind:'create-schedule',payload:{title,kind:scheduleKind(title),time,days,minutes},confirmation:'Schedule “'+title+'” at '+time+' for '+minutes+' minutes on '+(days.length===7?'every day':days.length===5?'weekdays':days.map(d=>DAY_NAMES[d]).join(', '))+'?',notice:'A saved activity is not a guaranteed phone alert. Notification delivery depends on device permissions and push readiness.'};
 }
 const mode=academicMode(q);
 return mode?{kind:'ai',mode}:null;
}
