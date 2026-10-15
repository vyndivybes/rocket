export const SPECIALISTS=Object.freeze({
 academic:{title:'Academic tutor',mode:'teacher',mission:'Show checked steps, units and one practice question. Never invent textbook citations.'},
 coding:{title:'Coding mentor',mode:'teacher',mission:'Explain a small code prototype, debug conceptually, and suggest how to test it. Never pretend code was executed.'},
 aviation:{title:'Aviation mentor',mode:'pilot',mission:'Teach flight science with examples, diagrams described in words and no real flight-operation instructions.'},
 art:{title:'Art coach',mode:'artist',mission:'Offer creative composition and drawing ideas constructively.'},
 planner:{title:'Study planner',mode:'planner',mission:'Propose a realistic sequence; do not claim a schedule was saved or reminders were created.'}
});
export function selectSpecialistTeam(question){
 if(typeof question!=='string'||question.length<8||question.length>1600)return [];
 const q=question.toLowerCase(),matches=[];
 for(const [key,re] of Object.entries({academic:/\b(physics|maths|mathematics|chemistry|biology|exam|revision|equation|school)\b/,coding:/\b(code|coding|program|python|javascript|app|bug|website|game)\b/,aviation:/\b(pilot|aviation|flight|aircraft|cockpit|aerodynamic|wing)\b/,art:/\b(art|sketch|paint|draw|design|colour|color|creative)\b/,planner:/\b(plan|schedule|organize|organise|routine|deadline)\b/})){if(re.test(q))matches.push(key)}
 return (matches.length?matches:['academic']).slice(0,3);
}
export function teamRequestIntent(question){
 if(typeof question!=='string')return null;
 const m=question.trim().match(/^(?:(?:saathi[,!]?\s*)?(?:ask|use|bring)\s+(?:your\s+)?(?:specialist\s+)?(?:team|agents)\s+(?:to|for|on)\s+|(?:team study|team help)\s*:\s*)(.+)$/i);
 return m&&m[1].trim().length>=8?m[1].trim():null;
}
export function safeSpecialistReply(s){return typeof s==='string'?s.trim().slice(0,2300):''}
