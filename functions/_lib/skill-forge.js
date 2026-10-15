// Learner skills are restricted prompt blueprints, never executable code.
export const SKILL_MODES=['teacher','companion','planner','pilot','artist'];
export const SKILL_BLUEPRINTS=['quiz','coach','creative','project','explain'];
export function validateSkillInput(value){
 if(!value||typeof value!=='object'||Array.isArray(value))return 'Invalid skill';
 if(typeof value.name!=='string'||value.name.trim().length<3||value.name.length>48||!/^[\p{L}\p{N}][\p{L}\p{N} _'-]{2,47}$/u.test(value.name.trim()))return 'Use a short name containing letters and numbers';
 if(typeof value.purpose!=='string'||value.purpose.trim().length<12||value.purpose.length>260)return 'Describe the skill in 12–260 characters';
 if(!SKILL_MODES.includes(value.mode)||!SKILL_BLUEPRINTS.includes(value.blueprint))return 'Unsupported skill type';
 const p=value.purpose;
 if(/[\u0000-\u001f\u007f<>]/u.test(p))return 'Unsafe characters in skill description';
 if(/\b(?:ignore|override|bypass|disregard)\b.{0,60}\b(?:safety|instructions|system|restrictions|rules)\b/i.test(p))return 'Skill cannot change safety instructions';
 if(/\b(?:powershell|bash|shell|terminal|subprocess|os\.system|eval\(|exec\(|sudo|rm\s+-rf|remove-item)\b/i.test(p))return 'Skill Forge cannot execute computer commands';
 if(/\b(?:password|api\s*key|otp|credentials|steal|phishing)\b/i.test(p))return 'Do not include private credentials or unsafe actions';
 return null;
}
export function publicSkill(row){
 return {id:row.id,name:row.name,purpose:row.purpose,mode:row.mode,blueprint:row.blueprint,status:row.status,revision:Number(row.revision),createdAt:row.created_at,updatedAt:row.updated_at};
}
