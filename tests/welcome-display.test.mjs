import test from 'node:test';
import assert from 'node:assert/strict';
import {renderWelcomeScene} from '../public/welcome-display.js';
const now=new Date(2026,9,15,7,30);
test('first companion screen renders personal graphical schedule and optional audio controls',()=>{
 const html=renderWelcomeScene({assistant:'Nova',now,schedule:[{id:'a',title:'Chemistry practice',time:'08:30',minutes:30,kind:'study',enabled:true,days:[4]}],tasks:[],phase:'listening'});
 assert.match(html,/Good morning/i);
 assert.match(html,/Chemistry practice/);
 assert.match(html,/8:30 AM/);
 assert.match(html,/TODAY.S FLIGHT PLAN/);
 assert.match(html,/id="play-welcome"/);
 assert.match(html,/id="voice-auto-send"/);
 assert.match(html,/data-phase="listening"/);
 assert.doesNotMatch(html,/autoplay/);
});
test('welcome scene escapes learner-supplied labels and does not invent scheduled events',()=>{
 const html=renderWelcomeScene({assistant:'<script>unsafe</script>',now,schedule:[{id:'a',title:'<img src=x onerror=alert(1)>',time:'08:30',minutes:20,kind:'art',enabled:true,days:[4]}],tasks:[]});
 assert.doesNotMatch(html,/<script>unsafe/);
 assert.doesNotMatch(html,/<img src=x/);
 const empty=renderWelcomeScene({assistant:'Nova',now,schedule:[],tasks:[]});
 assert.match(empty,/Your day is open for discovery/);
 assert.doesNotMatch(empty,/8:30 AM/);
});
