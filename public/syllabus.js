const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function renderUnit(ch){
 const label=ch.strand?ch.strand+' · '+ch.title:ch.title;
 const note=ch.moduleId?'Original chapter teaching draft available; teacher review required':ch.status==='foundation_only'?'Related foundation exercise only; unit not completed':'No qualified teaching content';
 const p=ch.practice||{attempts:0,correct:0};
 const exerciseNote=ch.exerciseQuestionCount===null?'NCERT exercise question census pending; no verified complete solution bank':('2026-27 NCERT print references indexed: '+Number(ch.exerciseQuestionCount||0)+' · Original worked drafts: '+Number(ch.exerciseWorkedDraftCount||0)+' · Independently qualified solutions: '+Number(ch.exerciseVerifiedQuestionCount||0));
 return '<li style="padding:7px 0">'+esc(label)+' — '+esc(note)+'<p>'+esc(exerciseNote)+'</p>'+
   '<p>Foundation attempts: '+Number(p.attempts||0)+' · Correct: '+Number(p.correct||0)+' · '+esc((ch.revision||'not_assessed').replaceAll('_',' '))+'</p>'+
   (ch.moduleId?'<a href="/?lesson='+encodeURIComponent(ch.moduleId)+'">Open chapter draft</a> · ':'')+
   (ch.foundationLessonIds?.length?'<a href="/">Open foundation lessons</a>':'')+'</li>';
}
function renderSubject(s){
 const mapped=s.mappingStatus==='official_outline_verified';
 const state=mapped?'Official outline mapped; no qualified teaching content':s.mappingStatus==='subject_code_required'?'English course unspecified. Select English Elective (001) in My subjects if applicable.':'Official mapping pending';
 const literature=s.curriculumUnitType==='literary_texts';
 const main=s.chapters?.length?'<p>Available teaching drafts: '+Number(s.chapterModuleCount||0)+' of '+Number(s.totalChapters||0)+' · Original guided subtopics: '+Number(s.guidedSubtopicCount||0)+'. Qualified '+(literature?'literary texts':'complete chapters')+': '+Number(s.qualifiedChapters||0)+' of '+Number(s.totalChapters||0)+'. Editorial breadth is not independent textbook verification or mastery.</p>'+
    '<ol>'+s.chapters.map(renderUnit).join('')+'</ol>':'<p>No verified unit inventory yet. No percentage is claimed.</p>';
 const skillPractice=s.skillPractice?.length?
    '<h3>Foundational skill practice (not a literature completion)</h3><ul>'+s.skillPractice.map(p=>
      '<li>'+esc(p.title)+' — '+Number(p.attempts)+' attempts; '+Number(p.correct)+' correct'+
      ' · '+(p.revision==='review_worked_example'?'Review the worked example':
          p.revision==='try_new_unseen_question'?'Try a new unseen question; repeated answers are not mastery':'Not assessed yet')+
      ' · <a href="/">Open learning workspace</a></li>'
    ).join('')+'</ul><p>These scores reflect repeated short fixed exercises, not independent exam readiness or textbook completion.</p>':'';
 const fiction=s.fictionChoices?.length?
    '<p><strong>Novel selection requires school confirmation:</strong> '+s.fictionChoices.map(esc).join(' OR ')+'. Neither novel is marked complete or automatically selected.</p>':'';
 const exam=s.assessmentStructure;
 const examParts=exam?[
  ['Theory',exam.theory],['Practical',exam.practical],
  ['Internal assessment',exam.internal],['Seminar',exam.seminar]
 ].filter(x=>x[1]>0).map(x=>esc(x[0])+': '+Number(x[1])+' marks'):[];
 const examNote=examParts.length?'<p><strong>CBSE examination structure:</strong> '+examParts.join(' · ')+'. These are maximum marks, not learner scores; assessment status: teacher review required.</p>':'';
 const sections=s.assessmentSections?.length?
    '<h3>Official assessment components</h3><ul>'+s.assessmentSections.map(x=>'<li>'+esc(x.name)+' — '+Number(x.marks)+' marks</li>').join('')+'</ul><p>These are examination requirements, not earned marks or readiness scores. The internal seminar needs teacher review.</p>':'';
 const foundation=s.foundationSkillLessonIds?.length?'<p>General writing foundation exercise available in Lessons &amp; practice; it does not count as a Kaleidoscope text.</p>':'';
 const formative=s.formativeTopics?.length?'<p><strong>Formative-only topics (not part of summative theory-paper marks):</strong> '+s.formativeTopics.map(esc).join(', ')+'. School-based discussion and formative assessment may still apply.</p>':'';
 const supplemental=s.supplementaryCoursework?.length?'<h3>Extended programmes and assessed coursework — review required</h3>'+s.supplementaryCoursework.map(item=>'<details style="margin:12px 0"><summary><strong>'+esc(item.title)+'</strong> · '+esc(item.kind.replaceAll('_',' '))+'</summary><ol>'+item.subtopics.map(step=>'<li><strong>'+esc(step.heading)+'</strong><p>'+esc(step.explanation)+'</p><p><em>Guided activity:</em> '+esc(step.tryIt)+'</p></li>').join('')+'</ol></details>').join(''):'';
 return '<section class="card" style="margin:16px 0;padding:20px"><h2>'+esc(s.subject)+(s.code?' ('+esc(s.code)+')':'')+'</h2>'+
   '<p><strong>Coverage:</strong> INCOMPLETE · '+esc(state)+'</p>'+examNote+main+skillPractice+fiction+sections+foundation+formative+supplemental+
   '<p>Exam readiness: HOLD. '+(literature?'Seminar and literature assessment require teacher review.':s.subject==='Mathematics'?'Internal assessment must be reviewed by the school; Mathematics has no laboratory practical examination.':'Practical assessment requires teacher verification; do not perform hazardous laboratory work unsupervised.')+'</p>'+
   '<p><a target="_blank" rel="noopener noreferrer" href="'+esc(s.officialSource)+'">Read official curriculum source</a></p></section>';
}
async function load(){
 const status=document.querySelector('#syllabus-status');
 const subjects=document.querySelector('#syllabus-subjects');
 try{
  const response=await fetch('/api/syllabus-coverage',{credentials:'same-origin'});
  if(response.status===403||response.status===401){status.textContent='Sign in using your student account in the learning workspace.';return;}
  if(!response.ok)throw Error(response.status===409?'Confirm your board and subjects in My subjects.':'Unable to load academic records; no coverage inferred.');
  const data=await response.json();
  status.textContent=data.boardConfirmed?'CBSE 2026–27 learner-selected. School confirmation and qualification remain on HOLD.':'Board is not learner-selected as CBSE. No CBSE syllabus applicability is inferred.';
  subjects.innerHTML=(data.subjects||[]).map(renderSubject).join('');
 }catch(err){status.textContent=err.message;}
}
load();
