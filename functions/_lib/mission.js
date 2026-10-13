export const AI_MODES = ['teacher','companion','planner','pilot','artist'];
export const COACH_PROMPTS = {
 teacher:'You are a patient Class 12 tutor. The learner finds Physics, Mathematics, Chemistry and Biology hard. Encourage without labeling them weak. Start from basics, ask one check question, show steps and verify units. Correct possible sign vs magnitude confusion. Do not invent references.',
 companion:'You are a supportive AI assistant, clearly an AI and not a human best friend. Listen respectfully and offer a practical small next step. Never encourage secrecy, exclusivity, dependency, isolation or replacing real relationships. Do not shame or claim to monitor wellbeing.',
 planner:'Help the student choose manageable daily learning, art and physical activity blocks. Propose options, never claim to set a reminder, change a calendar or send a message unless a separate tool confirms it. Prefer rest, breaks and autonomy.',
 pilot:'Help an aspiring pilot learn aerodynamics, navigation, weather, physics and maths using safe conceptual examples. Aviation is inspirational education only, NEVER flight-operational direction, certification, current weather, manoeuvring advice or a flight plan. DGCA flight-crew FAQ notes Physics and Mathematics at 10+2 for exams other than PPL. Verify actual licensing with DGCA.',
 artist:'Encourage sketching, painting, contemporary art, color experiments and creativity. Offer brief doable art prompts, critique respectfully, emphasize original ideas. No claiming to see art not provided.'
};
export const SCHEDULE_KINDS=['study','art','movement','sport','rest','aviation','other'];
export function validNote(title,body){
 if(typeof title!=='string'||title.trim().length<1||title.length>120)return 'Note title must be 1–120 characters';
 if(typeof body!=='string'||body.length>3000)return 'Note is limited to 3000 characters';
 return null;
}
export function validSchedule(b){
 if(!b||typeof b!=='object')return 'Invalid event';
 if(typeof b.title!=='string'||b.title.trim().length<2||b.title.length>100)return 'Event title must be 2–100 characters';
 if(!SCHEDULE_KINDS.includes(b.kind))return 'Invalid activity type';
 if(typeof b.time!=='string'||!/^([01]\d|2[0-3]):[0-5]\d$/.test(b.time))return 'Invalid time';
 if(!Array.isArray(b.days)||b.days.length<1||b.days.length>7||new Set(b.days).size!==b.days.length||!b.days.every(d=>Number.isInteger(d)&&d>=0&&d<=6))return 'Select valid weekdays';
 if(!Number.isInteger(b.minutes)||b.minutes<5||b.minutes>120)return 'Duration must be 5–120 minutes';
 return null;
}
export const PILOT_LINKS=[
 {title:'DGCA flight-crew exam FAQ',url:'https://pariksha.dgca.gov.in/Form/PLT_FAQs',note:'Official eligibility information; check revisions'},
 {title:'DGCA Pariksha',url:'https://pariksha.dgca.gov.in/',note:'Official flight-crew examination portal'}
];
export const IDEA_CARDS=[
 {kind:'pilot',title:'Flight forces',body:'Sketch an airplane and label lift, weight, thrust and drag. Ask Saathi how changes affect balance.'},
 {kind:'pilot',title:'Navigation & maths',body:'Draw a compass rose. Practise angles, headings and simple distance/time relationships without real flight planning.'},
 {kind:'art',title:'Modern art study',body:'Make an abstract painting with only three shapes and two contrasting colors. Give the work a name.'},
 {kind:'art',title:'Five-minute sketch',body:'Sketch an object from three viewpoints, using light and shadow; then compare your versions.'},
 {kind:'movement',title:'Move for enjoyment',body:'Choose walking, cycling, dancing or your favorite sport. Start comfortably and include breaks.'},
 {kind:'study',title:'Confidence builder',body:'Try one Physics or Maths problem step by step. Record what you understood, not a grade.'}
];
