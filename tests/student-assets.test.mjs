import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const headers=readFileSync(new URL('../public/_headers',import.meta.url),'utf8');
const privacy=readFileSync(new URL('../public/privacy.html',import.meta.url),'utf8');
const app=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
test('staging front end has safe content and iframe/camera restrictions',()=>{
 for(const s of ["script-src 'self'","frame-ancestors 'none'","camera=(self)","connect-src 'self'","Referrer-Policy: no-referrer"])assert.ok(headers.includes(s),s);
});
test('student privacy notice discloses data collection, AI processing and unavailable automatic alerts',()=>{
 for(const s of ['Cloudflare Workers AI','not stored','cannot contact','administrator','current prescribed textbooks'])assert.ok(privacy.includes(s),s);
});
test('student interface has setup, lessons, and practice learning flow',()=>{
 for(const s of ['profile-form','practice-form','data-lesson','setupView','libraryView','lessonView'])assert.ok(app.includes(s),s);
});
