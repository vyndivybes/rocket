// Curated source-controlled feature cards are separate from learner-generated sandbox tools.
export function validateCoreSkills(catalog){
 if(!catalog||catalog.version!==1||!Array.isArray(catalog.skills)||catalog.skills.length>40)return [];
 return catalog.skills.filter(x=>x&&typeof x.id==='string'&&/^[a-z0-9-]{3,45}$/.test(x.id)&&typeof x.title==='string'&&x.title.length<75&&typeof x.description==='string'&&x.description.length<200&&typeof x.prompt==='string'&&x.prompt.length<350).slice(0,40);
}
