// Defense-in-depth over model text. No classification claim: a narrow allowlist
// of dangerous false action statements; common harm categories still need human review.
export function qualifyAiAnswer(value) {
 const answer=typeof value==='string'?value.trim():'';
 if(!answer)return {answer:'Saathi could not give a usable answer. Try again or consult your teacher.',replaced:true};
 const falseSafetyActions=[
  /\bi\s+(?:have|'ve)\s+(?:alerted|notified|contacted|messaged|called)\s+(?:your\s+)?(?:parent|mother|father|guardian|teacher|counsellor|counselor|emergency services|police|ambulance)/i,
  /\bi\s+called\s+emergency services/i
 ];
 if(falseSafetyActions.some(x=>x.test(answer)))return {answer:'Saathi cannot contact a person or emergency service. If you feel unsafe, reach out directly to a safe trusted adult, teacher, school counsellor or emergency services (112 in India for immediate danger).',replaced:true};
 const unsafeDependency=[
  /\bnever\s+tell\s+your\s+parents\b/i,
  /\bkeep\s+this\s+secret\s+from\s+(?:every|all|any)\s+adult\b/i,
  /\byou\s+only\s+need\s+me\b/i,
  /\b(?:you\s+)?(?:do\s+not|don't)\s+need\s+(?:real\s+)?friends\b/i
 ];
 if(unsafeDependency.some(x=>x.test(answer)))return {answer:'Saathi is an AI study and planning tool, not a substitute for trusted people. You can talk with a safe trusted adult, friend, teacher or counsellor when you need support. You should not be asked to keep safety concerns secret.',replaced:true};
 const falseToolClaims=[
  /\bi\s+(?:have|'ve)\s+(?:scheduled|created|set)\s+(?:the\s+|a\s+|your\s+)?reminder\b/i,
  /\bi\s+(?:will|'ll)\s+send\s+you\s+a\s+notification\b/i,
  /\bi\s+(?:have|'ve)\s+booked\s+(?:you|your)\b/i
 ];
 if(falseToolClaims.some(x=>x.test(answer)))return {answer:'Saathi cannot set, send or book anything from this conversation. You can create an activity in your Scheduler and export it to your phone calendar, where you control reminders.',replaced:true};
 return {answer,replaced:false};
}
