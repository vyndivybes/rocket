import test from 'node:test';import assert from 'node:assert/strict';
import {VOICE_LANGUAGES,normalizeSpeechLocale,voiceSwitchAllowed} from '../public/voice-languages.js';
test('five allowed speech locales use stable browser-recognition language tags',()=>{assert.equal(VOICE_LANGUAGES.length,5);for(const [code] of VOICE_LANGUAGES)assert.equal(normalizeSpeechLocale(code),code);assert.equal(normalizeSpeechLocale('../../etc/passwd'),'en-IN')});
test('language switches are not accepted during capture or playback',()=>{assert.equal(voiceSwitchAllowed('listening'),false);assert.equal(voiceSwitchAllowed('speaking'),false);assert.equal(voiceSwitchAllowed('ready'),true)});
