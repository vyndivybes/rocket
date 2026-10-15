import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const pages=['index.html','mission.html','privacy.html','syllabus.html'];
test('every user-facing Saathi page loads one cohesive bold motion design system',()=>{
 for(const page of pages){
  const html=read('public/'+page);
  assert.match(html,/saathi-motion\.css/,page);
  assert.match(html,/saathi-motion\.js/,page);
 }
});
test('cinematic learner and companion experiences use the shared visual language',()=>{
 assert.match(read('public/app.js'),/saathi-login-feature/);
 assert.match(read('public/experience-ui.js'),/saathi-feature-stage/);
 assert.match(read('public/mission.js'),/saathi-feature-stage/);
 assert.match(read('public/welcome-display.js'),/data-immersive/);
});
test('reduced motion and small-screen behavior do not hide core tools',()=>{
 const css=read('public/saathi-motion.css');
 assert.match(css,/prefers-reduced-motion/);
 assert.match(css,/max-width:767px/);
 assert.match(css,/focus-visible/);
 assert.match(css,/saathi-ticker/);
 assert.match(css,/saathi-feature-stage/);
 assert.doesNotMatch(css,/@import\s+url\(/);
});
test('motion runtime uses intersection observer and explicit cleanup, never site tracking',()=>{
 const js=read('public/saathi-motion.js');
 assert.match(js,/IntersectionObserver/);
 assert.match(js,/MutationObserver/);
 assert.match(js,/requestAnimationFrame/);
 assert.match(js,/visibilitychange/);
 assert.doesNotMatch(js,/fetch\(|navigator\.sendBeacon|localStorage/);
});
test('visual reference libraries and third party branding are never embedded in Saathi',()=>{
 for(const page of pages){
  const html=read('public/'+page);
  assert.doesNotMatch(html,/henrietta|wearetattoodigital|cdn\.prod\.website-files/i);
  assert.doesNotMatch(html,/CustomWiggle|SplitText\.min|webflow\.js/i);
 }
});
