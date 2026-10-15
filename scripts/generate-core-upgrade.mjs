// Founder-run repository code generator. It writes version-controlled Saathi
// learning modules; no arbitrary AI-generated code or shell commands are executed.
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const here=dirname(fileURLToPath(import.meta.url));
const target=resolve(here,'../public/core-skills/catalog.json');
export const approvedSkills=Object.freeze({
 'aviation-instruments':{id:'aviation-instruments',title:'Cockpit Instruments Studio',description:'Practice the meaning of altimeter, airspeed and attitude displays.',prompt:'Teach me cockpit instrument fundamentals one instrument at a time, then quiz me on examples.',category:'aviation'},
 'physics-lab':{id:'physics-lab',title:'Physics Concept Lab',description:'Work through physics concepts with examples, units and short checkpoints.',prompt:'Teach this physics concept with units, reasoning, and a worked calculation; then check what I understood.',category:'academic'},
 'coding-coach':{id:'coding-coach',title:'Code Maker',description:'Learn to prototype, test and debug small creative programs.',prompt:'Help me create a small program, explain every part and provide an experiment to test.',category:'coding'},
 'art-composition':{id:'art-composition',title:'Composition Atelier',description:'Experiment with perspective, modern art and colour palettes.',prompt:'Give me an original drawing challenge about composition, shading or modern art, with suggested variations.',category:'art'},
 'revision-pilot':{id:'revision-pilot',title:'Revision Navigator',description:'Organise study tasks into short realistic sessions.',prompt:'Help me break a study objective into short achievable sessions; do not claim it was added to my calendar.',category:'planning'}
});
export function addApprovedFeature(catalog,feature){
 if(!Object.hasOwn(approvedSkills,feature))throw Error('Unknown feature template');
 if(!catalog||!Array.isArray(catalog.skills))throw Error('Invalid catalog');
 if(catalog.skills.some(x=>x.id===feature))return {catalog,added:false};
 if(catalog.skills.length>=40)throw Error('Catalog full');
 return {catalog:{...catalog,skills:[...catalog.skills,approvedSkills[feature]]},added:true};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const arg=process.argv.slice(2).find(x=>x.startsWith('--feature='));
 const feature=arg?.slice(10);
 if(!feature)throw Error('Supply --feature=<approved-template>');
 const original=JSON.parse(await readFile(target,'utf8'));
 const result=addApprovedFeature(original,feature);
 if(!result.added)throw Error('Feature already exists');
 await writeFile(target,JSON.stringify(result.catalog,null,2)+'\n');
 process.stdout.write('Created repository catalog revision for '+feature+'\n');
}
