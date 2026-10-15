import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderStudioScenes,studioDestinations} from '../public/studio-scenes.js';
const read=f=>readFileSync(new URL('../'+f,import.meta.url),'utf8');
test('Noth-inspired sculptural creative lab reel has four distinct working SaaS sections',()=>{
 const html=renderStudioScenes('mission');
 for(const route of ['pilot','art','companion','schedule'])assert.ok(html.includes('data-tab="'+route+'"'),route);
 assert.equal((html.match(/class="saathi-studio-slide /g)||[]).length,4);
 assert.match(html,/data-studio-next="1"/);
 assert.match(html,/data-studio-prev="1"/);
 assert.match(html,/role="region"/);
});
test('Student reel links to valid current student routes and existing Mission Control',()=>{
 const html=renderStudioScenes('student');
 for(const route of ['library','planner'])assert.match(html,new RegExp('data-go="'+route+'"'));
 assert.match(html,/href="\/mission\.html"/);
 assert.deepEqual(studioDestinations('mission').aviation,['tab','pilot']);
 assert.throws(()=>renderStudioScenes('admin'));
});
test('Full website includes editorial reel on both student and companion pages',()=>{
 assert.match(read('public/mission.js'),/renderStudioScenes\('mission'\)/);
 assert.match(read('public/experience-ui.js'),/renderStudioScenes\('student'\)/);
 const css=read('public/saathi-motion.css');
 assert.match(css,/scroll-snap-type:x mandatory/);
 assert.match(css,/saathi-studio-shape/);
 assert.match(css,/saathi-studio-controls/);
 assert.match(css,/prefers-reduced-motion/);
});
