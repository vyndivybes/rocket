// Uses only aggregate, learner-owned graded practice counters. No transcripts.
export function selectRevisionFocus(practice,lessons){
 if(!Array.isArray(lessons)||!Array.isArray(practice?.lessonRevision))return null;
 const allowed=new Map(lessons.filter(x=>typeof x?.id==='string'&&typeof x.title==='string').map(x=>[x.id,x]));
 const candidates=practice.lessonRevision.filter(x=>
  allowed.has(x?.lessonId)&&Number.isSafeInteger(x.attempts)&&x.attempts>0&&
  ['review_and_practise','try_new_question','independent_review_required'].includes(x.revision));
 const priority={'review_and_practise':0,'try_new_question':1,'independent_review_required':2};
 candidates.sort((a,b)=>priority[a.revision]-priority[b.revision]||((a.accuracy??1)-(b.accuracy??1))||b.attempts-a.attempts);
 const x=candidates[0];if(!x)return null;const lesson=allowed.get(x.lessonId);
 return {lessonId:x.lessonId,title:lesson.title,subject:lesson.subject,
  reason:x.revision,nextQuestionId:typeof x.nextQuestionId==='string'?x.nextQuestionId:null};
}
