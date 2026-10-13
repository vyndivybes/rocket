// A standard iCalendar export: saved by the student and imported into their own calendar.
// Events use floating (device-local) times. The app does not install or deliver notifications.
const dayCodes=['SU','MO','TU','WE','TH','FR','SA'];
const pad=x=>String(x).padStart(2,'0');
function formatLocal(date){return ''+date.getFullYear()+pad(date.getMonth()+1)+pad(date.getDate())+'T'+pad(date.getHours())+pad(date.getMinutes())+pad(date.getSeconds())}
function escapeICS(s){return String(s??'').replaceAll('\\','\\\\').replace(/\r\n|\r|\n/g,'\\n').replaceAll(';','\\;').replaceAll(',','\\,').slice(0,250)}
function firstDate(item,now){const [hours,minutes]=item.time.split(':').map(Number);const d=new Date(now);d.setHours(hours,minutes,0,0);for(let n=0;n<8;n++){if(item.days.includes(d.getDay())&&d>=now)return d;d.setDate(d.getDate()+1);d.setHours(hours,minutes,0,0)}return d}
export function buildCalendar(items,now=new Date()){
 const stamp=now.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Saathi Mission Control//Student Routine//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:My Saathi routine'];
 for(const item of items){
  if(!item.enabled||!Array.isArray(item.days)||!item.days.length||!/^\d\d:\d\d$/.test(item.time)||!Number.isInteger(item.minutes))continue;
  const start=firstDate(item,now),end=new Date(start.getTime()+item.minutes*60000);
  lines.push('BEGIN:VEVENT','UID:'+escapeICS(item.id)+'@saathi.local','DTSTAMP:'+stamp,'SUMMARY:'+escapeICS(item.title),
   'DESCRIPTION:Personal activity planned in Saathi. Your own calendar controls notifications.',
   'DTSTART:'+formatLocal(start),'DTEND:'+formatLocal(end),
   'RRULE:FREQ=WEEKLY;BYDAY='+item.days.map(d=>dayCodes[d]).filter(Boolean).join(','),
   'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+escapeICS(item.title),'TRIGGER:-PT10M','END:VALARM','END:VEVENT');
 }
 lines.push('END:VCALENDAR');
 return lines.join('\r\n')+'\r\n';
}
