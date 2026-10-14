import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {exerciseCoverageSummary} from '../functions/_lib/ncert-exercise.js';

test('Chemistry Ch1 2026-27 33 vs 41 source conflict prevents full NCERT answer qualification',()=>{
 const c=exerciseCoverageSummary();
 assert.equal(c.coverageStatus,'HOLD');
 assert.equal(c.questionCount,null);
 assert.equal(c.verifiedQuestionCount,0);
 assert.equal(c.verifiedQuestionPercent,null);
 assert.equal(c.sourceReconciliationHolds.length,1);
 const h=c.sourceReconciliationHolds[0];
 assert.equal(h.lessonId,'chapter-chemistry-1');
 assert.equal(h.indexedParentIds,33);
 assert.equal(h.reportedAlternativeParentIds,41);
 assert.equal(h.confirmedAuthoritativeCount,null);
 assert.equal(h.status,'SOURCE_CONFLICT_HOLD');
 assert.match(c.explanation,/33 versus 41|33 vs 41|33.*41/);
});

test('learner-facing syllabus clearly explains disputed textbook edition count without treating it as certified',()=>{
 const ui=readFileSync(new URL('../public/syllabus.js',import.meta.url),'utf8');
 assert.match(ui,/sourceReconciliationHolds/);
 assert.match(ui,/33 versus 41/);
 assert.match(ui,/official NCERT print edition/);
});
