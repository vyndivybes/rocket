// Keep all reminders tied to the student's opted-in device and local civil time.
export const KNOWN_ZONES=new Set(['Asia/Kolkata','UTC','Europe/London','Europe/Berlin','America/New_York','America/Los_Angeles','Asia/Dubai','Asia/Singapore','Australia/Sydney']);
export function validDevice(b){
 if(!b||typeof b!=='object'||typeof b.endpoint!=='string'||b.endpoint.length>800)return 'Invalid subscription';
 let u;try{u=new URL(b.endpoint)}catch{return 'Invalid endpoint'}
 if(u.protocol!=='https:'||u.username||u.password||u.port||!['fcm.googleapis.com','updates.push.services.mozilla.com','web.push.apple.com','push.services.mozilla.com'].includes(u.hostname))return 'Unsupported push provider';
 if(typeof b.p256dh!=='string'||! /^[A-Za-z0-9_-]{40,160}$/.test(b.p256dh)||typeof b.auth!=='string'||! /^[A-Za-z0-9_-]{12,60}$/.test(b.auth))return 'Invalid subscription keys';
 if(!KNOWN_ZONES.has(b.timezone)||!Number.isInteger(b.quietFrom)||!Number.isInteger(b.quietTo)||b.quietFrom<0||b.quietFrom>23||b.quietTo<0||b.quietTo>23)return 'Invalid device settings';
 return null;
}
export function localParts(now,zone){
 const pieces=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23',weekday:'short'}).formatToParts(new Date(now));
 const get=k=>pieces.find(x=>x.type===k)?.value;
 const day=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(get('weekday'));
 return {date:get('year')+'-'+get('month')+'-'+get('day'),hour:Number(get('hour')),time:get('hour')+':'+get('minute'),day};
}
export function reminderDue(device,item,now){
 if(!item.enabled)return null;
 const local=localParts(now,device.timezone);
 const hour=local.hour;
 const quiet=device.quiet_from===device.quiet_to?false:device.quiet_from<device.quiet_to?hour>=device.quiet_from&&hour<device.quiet_to:hour>=device.quiet_from||hour<device.quiet_to;
 if(quiet||!item.days.includes(local.day)||item.time!==local.time)return null;
 return {date:local.date,deviceId:device.id,scheduleId:item.id};
}
