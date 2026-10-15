import {buildDailyBrief} from './daily-brief.js';
export function describeWeather(weather){
 if(!weather||!Number.isFinite(weather.temperature))return 'Local weather information is not available until you allow location access.';
 const code=Number(weather.code);
 const sky=code===0?'clear skies':code<=3?'partly cloudy skies':code<=48?'mist or fog':code<=67?'rainy conditions':code<=77?'snowy conditions':code<=82?'rain showers':code<=86?'snow showers':'possible thunderstorms';
 return 'Outside it is '+Math.round(weather.temperature)+'°C with '+sky+'.';
}
export function buildLoginBriefing({username,schedule=[],tasks=[],weather=null},now=new Date()){
 const daily=buildDailyBrief({schedule,tasks},now);
 const hour=now.getHours(),greeting=hour<12?'Good morning':hour<17?'Good afternoon':'Good evening';
 const candidate=typeof username==='string'?username.trim():'';
 const name=candidate&&Array.from(candidate).length<=24&&!/[<>\\x00-\\x1f]/u.test(candidate)?candidate:'there';
 const events=daily.todayEvents.slice(0,3).map(e=>e.time+' — '+e.title);
 const open=tasks.filter(t=>t&&t.done!==true&&t.done!==1);
 const pending=open.slice(0,2).map(t=>t.title);
 const segments=[greeting+', '+name+'. I’m Saathi, your AI study assistant. Here is your '+daily.dateLabel+' briefing.',describeWeather(weather)];
 segments.push(events.length?'Today’s scheduled activities: '+events.join('; ')+'.':'You have no scheduled activities today.');
 segments.push(pending.length?'Pending tasks: '+pending.join('; ')+'.':'No pending tasks are recorded.');
 segments.push('What would you like to do first?');
 return {text:segments.join(' '),next:daily.nextEvent,events,pending,weatherAvailable:weather!==null};
}
