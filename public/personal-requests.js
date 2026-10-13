import {buildDailyBrief} from './daily-brief.js';

// Local, read-only answers to an explicitly requested student briefing.
// This never sends note bodies or task titles to Workers AI.
export function answerPersonalRequest(utterance,context,now=new Date()){
 const query=typeof utterance==='string'?utterance.toLowerCase().trim().replace(/[.!?]+$/,''):'';
 const showPlan=/^(?:what(?:'s| is) (?:on )?my (?:plan|schedule|routine)(?: for today)?|what do i have (?:planned|to do) today|tell me (?:my|about my) (?:day|plan|schedule)|give me (?:my )?daily briefing)$/i.test(query);
 const showNext=/^(?:what should i do next|what can i do next|what(?:'s| is) next(?: for me)?|what should i do now)$/i.test(query);
 if(!showPlan&&!showNext)return null;
 const brief=buildDailyBrief(context,now);
 if(showNext)return {kind:'daily-brief',answer:brief.nextStep+' You have '+brief.openTasks+' unfinished study task'+(brief.openTasks===1?'':'s')+'. You decide what fits.'};
 const schedule=brief.todayEvents.slice(0,6).map(x=>x.time+' — '+x.title).join('; ');
 const intro='For '+brief.dateLabel+', ';
 const answer=schedule?intro+'your scheduled activities are: '+schedule+'. ':'You have no scheduled activities today. ';
 return {kind:'daily-brief',answer:answer+'You have '+brief.openTasks+' unfinished study task'+(brief.openTasks===1?'':'s')+'. '+brief.nextStep};
}
