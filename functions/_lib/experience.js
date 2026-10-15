// Learner-controlled presentation, not authority over safeguards or deployments.
export const CARDS=Object.freeze(['learn','plan','create','explore']);
export const DEFAULT_EXPERIENCE=Object.freeze({
 theme:'sky',assistStyle:'balanced',textSize:'normal',studentNickname:'',
 quietMode:true,remindersEnabled:false,visibleCards:[...CARDS]
});
const THEMES=['sky','forest','violet'],STYLES=['quick','balanced','guide'],SIZES=['normal','large'];
const validNickname=value=>typeof value==='string'&&Array.from(value).length<=24&&!/[<>\\u0000-\\u001f]/u.test(value);
export function validateExperience(x){
 if(!x||typeof x!=='object'||Array.isArray(x))return 'Invalid experience settings';
 const keys=Object.keys(DEFAULT_EXPERIENCE);
 if(Object.keys(x).length!==keys.length||Object.keys(x).some(k=>!keys.includes(k)))return 'Unsupported experience setting';
 if(!THEMES.includes(x.theme)||!STYLES.includes(x.assistStyle)||!SIZES.includes(x.textSize))return 'Invalid appearance or assistance style';
 if(!validNickname(x.studentNickname))return 'Nickname must be 24 characters or fewer and use plain text';
 if(typeof x.quietMode!=='boolean'||typeof x.remindersEnabled!=='boolean')return 'Invalid notification settings';
 if(!Array.isArray(x.visibleCards)||x.visibleCards.length<1||x.visibleCards.length>CARDS.length||
   new Set(x.visibleCards).size!==x.visibleCards.length||!x.visibleCards.every(id=>CARDS.includes(id)))
   return 'Choose one or more distinct activity cards';
 return null;
}
export function readExperience(row){
 if(!row)return {...DEFAULT_EXPERIENCE,visibleCards:[...CARDS]};
 try{const parsed=JSON.parse(row.preferences_json);const v={...DEFAULT_EXPERIENCE,...parsed,visibleCards:Array.isArray(parsed.visibleCards)?parsed.visibleCards:[...CARDS]};return validateExperience(v)?readExperience(null):v}
 catch{return readExperience(null)}
}
export function styleInstruction(style){
 switch(style){
  case 'quick':return 'Student response preference: be brief and practical. Default to a short answer; offer more detail on request. Do not omit mandatory safety help or urgent warnings.';
  case 'guide':return 'Student response preference: teach with patient step-by-step explanations. Ask one useful question or give a hint before providing an answer when appropriate. Never withhold urgent safety guidance.';
  default:return 'Student response preference: balance clarity with concision; give one useful example and an optional next step. Never weaken safety policies.';
 }
}
export function validateUpgradeIdea(idea){
 if(typeof idea!=='string'||idea.trim().length<12||idea.trim().length>300)return 'Describe your improvement idea in 12–300 characters';
 if(/[<>\u0000-\u001f]/.test(idea))return 'Please enter plain text without markup or control characters';
 return null;
}
