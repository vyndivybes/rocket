export const VOICE_LANGUAGES=Object.freeze([['en-IN','English (India)'],['ta-IN','Tamil'],['ml-IN','Malayalam'],['hi-IN','Hindi'],['en-US','English (US)']]);
export function normalizeSpeechLocale(value){return VOICE_LANGUAGES.some(x=>x[0]===value)?value:'en-IN'}
export function voiceSwitchAllowed(state){return state==='ready'||state==='idle'||state==='answered'||state==='error'}
