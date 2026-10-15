import test from 'node:test';import assert from 'node:assert/strict';import {quotaRecoveryMessage,isQuotaError} from '../public/ai-quota-recovery.js';
test('recognises exhausted daily AI limit but not generic errors',()=>{assert.equal(isQuotaError('Daily study AI limit reached. Try tomorrow.'),true);assert.equal(isQuotaError('Network offline'),false)});
test('rate-limit recovery describes non-AI features without claiming unlimited AI',()=>{const m=quotaRecoveryMessage();assert.match(m,/today/i);assert.match(m,/tomorrow/);assert.match(m,/reminders/);assert.match(m,/voice session/);});
