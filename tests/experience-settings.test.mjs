import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULT_EXPERIENCE,readExperience,validateExperience} from '../functions/_lib/experience.js';

test('student nickname is optional, plain text, and limited to 24 characters',()=>{
 const base={...DEFAULT_EXPERIENCE,visibleCards:[...DEFAULT_EXPERIENCE.visibleCards]};
 assert.equal(validateExperience({...base,studentNickname:''}),null);
 assert.equal(validateExperience({...base,studentNickname:'Sky'}),null);
 assert.equal(validateExperience({...base,studentNickname:'A'.repeat(25)}),'Nickname must be 24 characters or fewer and use plain text');
 assert.equal(validateExperience({...base,studentNickname:'<script>'}),'Nickname must be 24 characters or fewer and use plain text');
});

test('legacy saved settings retain values and gain an empty nickname',()=>{
 const legacy={theme:'forest',assistStyle:'guide',textSize:'large',quietMode:false,remindersEnabled:true,visibleCards:['learn','plan']};
 const restored=readExperience({preferences_json:JSON.stringify(legacy)});
 assert.equal(restored.theme,'forest');
 assert.equal(restored.assistStyle,'guide');
 assert.equal(restored.textSize,'large');
 assert.equal(restored.studentNickname,'');
 assert.deepEqual(restored.visibleCards,['learn','plan']);
});
