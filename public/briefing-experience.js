import {buildDailyBrief} from './daily-brief.js';
const kindText={study:'study',art:'creative time',aviation:'aviation',sport:'sport',movement:'movement',rest:'rest'};
export function voicePhaseLabel(phase){
 return ({idle:'Ready',ready:'Ready',listening:'Listening',heard:'Heard you',thinking:'Thinking',speaking:'Speaking',answered:'Response ready',error:'Voice unavailable'})[phase]||'Ready';
}
export function composeWelcomeReport(data,assistant='Saathi',now=new Date()){
 const b=buildDailyBrief(data,now);
 const h=now.getHours();
 const greeting=h<12?'Good morning':h<17?'Good afternoon':h<21?'Good evening':'Hello tonight';
 const agenda=b.todayEvents.slice(0,8).map(item=>({...item,category:kindText[item.kind]||'activity'}));
 const timeOf=x=>x.time.slice(0,2)+':'+x.time.slice(3);
 const introduction=greeting+'! I’m '+assistant+', your AI co-pilot.';
 let spoken=introduction+' Welcome aboard! ';
 if(agenda.length){
  spoken+='You have '+agenda.length+' scheduled '+(agenda.length===1?'activity':'activities')+' today. ';
  spoken+=agenda.slice(0,4).map((item,i)=>(i?'Then ':'First ')+item.title+' at '+timeOf(item)+'. ').join('');
  if(agenda.length>4)spoken+='The rest are in your agenda. ';
  if(b.nextEvent)spoken+='Up next: '+b.nextEvent.title+'. ';
 }else spoken+='Your schedule is clear today. Explore a new idea, learn something interesting or create something— you choose! ';
 if(b.dueToday)spoken+='You have '+b.dueToday+' '+(b.dueToday===1?'task':'tasks')+' due today. ';
 if(b.overdue)spoken+='There are '+b.overdue+' unfinished past-due '+(b.overdue===1?'task':'tasks')+'. You can reorganise them at your pace. ';
 spoken+='What would you like to start with?';
 return {greeting,introduction,spoken,dateLabel:b.dateLabel,agenda,next:b.nextEvent,dueToday:b.dueToday,overdue:b.overdue,openTasks:b.openTasks,summary:b.nextStep};
}
