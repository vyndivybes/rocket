import test from 'node:test';import assert from 'node:assert/strict';import {teamCommand} from '../public/team-command.js';
test('team commands engage multi-specialist path while ordinary questions stay normal',()=>{assert.equal(teamCommand('Saathi, ask your team to help with aircraft physics'),'help with aircraft physics');assert.equal(teamCommand('Explain Newtons laws'),null)});
