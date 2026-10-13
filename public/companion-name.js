export const DEFAULT_COMPANION_NAME='Your AI';
export function validateCompanionName(value){
 if(typeof value!=='string')return 'Choose a short name';
 const name=value.trim().normalize('NFC');
 if(name.length<2||[...name].length>24)return 'Use 2–24 characters for the AI name';
 if(!/^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N} .'-]*$/u.test(name))return 'Use letters, numbers, spaces, apostrophes, periods or hyphens';
 if(/\s{2,}/.test(name))return 'Use only single spaces';
 return null;
}
export function displayCompanionName(value){return validateCompanionName(value)===null?value.trim().normalize('NFC'):DEFAULT_COMPANION_NAME;}
export function stripCompanionCall(spoken,name){
 const phrase=String(spoken??'').trim();
 if(typeof name!=='string'||validateCompanionName(name))return phrase;
 const escaped=name.trim().replace(/[\\^$.*+?()[\]{}|]/g,'\\$&');
 const pattern=new RegExp('^(?:(?:hey|hi|hello|ok|okay)\\s+)?'+escaped+'(?:\\s*[,!:]\\s*|\\s+|$)','iu');
 return phrase.replace(pattern,'').trim();
}
