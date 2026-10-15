const pad=n=>String(n).padStart(2,'0');
export function buildDailyBrief(input,now=new Date()){
 const schedule=Array.isArray(input?.schedule)?input.schedule:[];
 const tasks=Array.isArray(input?.tasks)?input.tasks:[];
 const dateKey=now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate());
 const current=pad(now.getHours())+':'+pad(now.getMinutes());
 const todayEvents=schedule.filter(s=>s&&s.enabled===true&&Array.isArray(s.days)&&s.days.includes(now.getDay())&&/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(s.time))
 .sort((a,b)=>a.time.localeCompare(b.time)).map(({id,title,time,kind,minutes})=>({id,title,time,kind,minutes}));
 const active=tasks.filter(t=>t&&t.done!==true&&t.done!==1);
 const dueToday=active.filter(t=>t.due_date===dateKey).length;
 const overdue=active.filter(t=>typeof t.due_date==='string'&&t.due_date<dateKey).length;
 const nextEvent=todayEvents.find(event=>event.time>=current)||null;
 const nextStep=nextEvent?'Your next activity is '+nextEvent.title+'. Adjust it if needed.':active.length?'Choose one small step from your study tasks.':'Try one short lesson, a sketch, or a few minutes of movement. You choose.';
 return {dateLabel:new Intl.DateTimeFormat('en-IN',{weekday:'long',day:'numeric',month:'long'}).format(now),todayEvents,nextEvent,openTasks:active.length,dueToday,overdue,nextStep};
}
