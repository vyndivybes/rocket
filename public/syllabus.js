const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function renderUnit(ch){
 const label=ch.strand?ch.strand+' · '+ch.title:ch.title;
 const note=ch.status==='foundation_only'?'Related foundation exercise only; unit not completed':'No qualified teaching content';
 const p=ch.practice||{attempts:0,correct:0};
 return '<li style="padding:7px 0">'+esc(label)+' — '+esc(note)+
   '<p>Foundation attempts: '+Number(p.attempts||0)+' · Correct: '+Number(p.correct||0)+' · '+esc((ch.revision||'not_assessed').replaceAll('_',' '))+'</p>'+
   (ch.foundationLessonIds?.length?'<a href="/">Open foundation lessons</a>':'')+'</li>';
}
function renderSubject(s){
 const mapped=s.mappingStatus==='official_outline_verified';
 const state=mapped?'Official outline mapped; no qualified teaching content':s.mappingStatus==='subject_code_required'?'English course unspecified. Select English Elective (001) in My subjects if applicable.':'Official mapping pending';
 const literature=s.curriculumUnitType==='literary_texts';
 const main=s.chapters?.length?'<p>Qualified '+(literature?'literary texts':'complete chapters')+': 0 of '+s.totalChapters+'. A foundation lesson does not establish mastery.</p>'+
    '<ol>'+s.chapters.map(renderUnit).join('')+'</ol>':'<p>No verified unit inventory yet. No percentage is claimed.</p>';
 const fiction=s.fictionChoices?.length?
    '<p><strong>Novel selection requires school confirmation:</strong> '+s.fictionChoices.map(esc).join(' OR ')+'. Neither novel is marked complete or automatically selected.</p>':'';
 const sections=s.assessmentSections?.length?
    '<h3>Official assessment components</h3><ul>'+s.assessmentSections.map(x=>'<li>'+esc(x.name)+' — '+Number(x.marks)+' marks</li>').join('')+'</ul><p>These are examination requirements, not earned marks or readiness scores. The internal seminar needs teacher review.</p>':'';
 const foundation=s.foundationSkillLessonIds?.length?'<p>General writing foundation exercise available in Lessons &amp; practice; it does not count as a Kaleidoscope text.</p>':'';
 const formative=s.formativeTopics?.length?'<p>Additional formative topics: '+s.formativeTopics.map(esc).join(', ')+'.</p>':'';
 return '<section class="card" style="margin:16px 0;padding:20px"><h2>'+esc(s.subject)+(s.code?' ('+esc(s.code)+')':'')+'</h2>'+
   '<p><strong>Coverage:</strong> INCOMPLETE · '+esc(state)+'</p>'+main+fiction+sections+foundation+formative+
   '<p>Exam readiness: HOLD. '+(literature?'Seminar and literature assessment require teacher review.':'Practical and internal assessment requirements need teacher verification; do not perform hazardous laboratory work unsupervised.')+'</p>'+
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
