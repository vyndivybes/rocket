const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function load(){
 try{
 const response=await fetch('/api/syllabus-coverage',{credentials:'same-origin'});
 if(response.status===403||response.status===401){document.querySelector('#syllabus-status').textContent='Sign in using your student account in the learning workspace.';return;}
 if(!response.ok)throw Error('Unable to load syllabus inventory');
 const data=await response.json();
 document.querySelector('#syllabus-status').textContent=data.boardConfirmed?'CBSE 2026–27 selected. Qualification is incomplete.':'Board not confirmed as CBSE. This is a CBSE reference only; select your board and subjects in My subjects before relying on it.';
 document.querySelector('#syllabus-subjects').innerHTML=data.subjects.map(s=>'<section class="card" style="margin:16px 0;padding:20px"><h2>'+esc(s.subject)+'</h2><p><strong>Coverage:</strong> Incomplete · '+(s.mappingStatus==='official_chapter_titles_verified'?'Official chapter titles verified':'Official chapter-by-chapter mapping pending')+'</p>'+(s.chapters.length?'<p>Qualified complete chapters: 0 of '+s.totalChapters+'. A foundation lesson is not syllabus certification.</p><ol>'+s.chapters.map(ch=>'<li style="padding:7px 0">'+esc(ch.title)+' — '+(ch.status==='foundation_only'?'Related foundation exercise available; chapter not complete':'No qualified chapter lesson')+'</li>').join('')+'</ol>':'<p>Not yet independently mapped. Read the official curriculum; no percentage is claimed.</p>')+'<p><a target="_blank" rel="noopener noreferrer" href="'+esc(s.officialSource)+'">Read official curriculum source</a></p></section>').join('');
 }catch(err){document.querySelector('#syllabus-status').textContent=err.message;}
}
load();