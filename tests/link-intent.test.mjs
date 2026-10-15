import test from 'node:test';
import assert from 'node:assert/strict';
import {detectStudyLinkQuestion} from '../public/link-intent.js';
test('assistant recognises a posted YouTube video and preserves the learner question',()=>{
 const r=detectStudyLinkQuestion('Explain the lift concept at 4:30 https://www.youtube.com/watch?v=dQw4w9WgXcQ');
 assert.equal(r.url,'https://www.youtube.com/watch?v=dQw4w9WgXcQ');assert.match(r.question,/4:30/);
});
test('assistant recognises an educational webpage with trailing punctuation',()=>{
 const r=detectStudyLinkQuestion('Can you help me understand https://ncert.nic.in/textbook.php?');
 assert.equal(r.url,'https://ncert.nic.in/textbook.php');assert.match(r.question,/understand/);
});
test('non-URL chat remains chat; insecure, malformed and credential URLs are not routed',()=>{
 assert.equal(detectStudyLinkQuestion('Help with Physics force today'),null);
 assert.equal(detectStudyLinkQuestion('Look at http://127.0.0.1/private'),null);
 assert.equal(detectStudyLinkQuestion('Read https://u:p@example.com/secret'),null);
});
