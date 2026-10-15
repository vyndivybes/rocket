// Saathi Wonder Engine: original, dependency-free motion layer.
// Visual effects do not access learners, persistence, microphone or remote services.
export const motionLabels=Object.freeze(['MAKE','LEARN','CREATE','EXPLORE','YOUR OWN FUTURE','✦']);
export function normalizePointer(x,y,w,h){
 if(![x,y,w,h].every(Number.isFinite)||w<=0||h<=0)return {x:0,y:0};
 return {x:Math.max(-1,Math.min(1,2*x/w-1)),y:Math.max(-1,Math.min(1,2*y/h-1))};
}
export function progressRatio(top,height,viewHeight){
 if(![top,height,viewHeight].every(Number.isFinite)||height<=viewHeight)return 0;
 return Math.min(1,Math.max(0,top/(height-viewHeight)));
}
export function setupSaathiMotion({doc=document,win=window}={}){
 const reduced=win.matchMedia?.('(prefers-reduced-motion: reduce)');
 const scrollRoot=doc.documentElement;let raf=0,disposed=false;
 const disposers=[];
 // A live visual ticker is created once, outside the SPA-managed root.
 if(!doc.querySelector('[data-saathi-global-ticker]')){
  const ticker=doc.createElement('div');ticker.className='saathi-ticker';ticker.dataset.saathiGlobalTicker='1';
  ticker.setAttribute('aria-label','Saathi: make, learn, create and explore');
  ticker.setAttribute('role','presentation');
  const track=doc.createElement('div');track.className='saathi-ticker-track';track.setAttribute('aria-hidden','true');
  for(let repeat=0;repeat<4;repeat++)for(const word of motionLabels){const span=doc.createElement('span');span.textContent=word;track.appendChild(span)}
  ticker.appendChild(track);doc.body.insertBefore(ticker,doc.body.firstChild);
 }
 if(!doc.querySelector('[data-saathi-progress]')){
  const progress=doc.createElement('div');progress.className='saathi-page-progress';progress.dataset.saathiProgress='1';progress.setAttribute('aria-hidden','true');
  doc.body.appendChild(progress);
 }
 if(!doc.querySelector('.saathi-dynamic-bg')){
  const bg=doc.createElement('div');bg.className='saathi-dynamic-bg';bg.setAttribute('aria-hidden','true');doc.body.appendChild(bg);
 }
 const markScroll=()=>{
  if(disposed||raf)return;
  raf=win.requestAnimationFrame(()=>{
   raf=0;
   scrollRoot.style.setProperty('--saathi-read-progress',(progressRatio(win.scrollY||0,scrollRoot.scrollHeight,win.innerHeight)*100).toFixed(2)+'%');
  });
 };
 win.addEventListener('scroll',markScroll,{passive:true});win.addEventListener('resize',markScroll,{passive:true});
 disposers.push(()=>{win.removeEventListener('scroll',markScroll);win.removeEventListener('resize',markScroll)});
 markScroll();
 const observer=typeof win.IntersectionObserver==='function'?new win.IntersectionObserver(entries=>{
  for(const entry of entries){if(entry.isIntersecting){entry.target.classList.remove('saathi-not-shown');observer.unobserve(entry.target)}}
 },{rootMargin:'0px 0px 35px 0px',threshold:0.06}):null;
 const observed=new WeakSet();
 const decorate=()=>{
  if(disposed)return;
  for(const el of doc.querySelectorAll('.card,.activity-card,.core-capability-card,.welcome-stage,.saathi-feature-stage,.hero,.saathi-showcase-strip')){
   if(observed.has(el))continue;
   observed.add(el);el.classList.add('saathi-dynamic-section');
   if(observer&&!reduced?.matches){
    const box=el.getBoundingClientRect();
    if(box.top>(win.innerHeight||900)+100){el.classList.add('saathi-not-shown');observer.observe(el)}
   }
  }
 };
 decorate();
 const mutation=new win.MutationObserver(()=>{if(!disposed){win.cancelAnimationFrame?.(raf);raf=win.requestAnimationFrame(()=>{raf=0;decorate();markScroll()})}});
 mutation.observe(doc.body,{subtree:true,childList:true});
 const pointer=event=>{
  if(disposed||reduced?.matches||event.pointerType==='touch')return;
  const stage=event.target?.closest?.('.saathi-feature-stage,.welcome-stage');if(!stage)return;
  const b=stage.getBoundingClientRect(),p=normalizePointer(event.clientX-b.left,event.clientY-b.top,b.width,b.height);
  stage.style.setProperty('--saathi-rotate-x',(-p.y*9).toFixed(1)+'deg');
  stage.style.setProperty('--saathi-rotate-y',(p.x*12).toFixed(1)+'deg');
  stage.style.setProperty('--saathi-shift-x',Math.round(-p.x*22)+'px');
  stage.style.setProperty('--saathi-shift-y',Math.round(-p.y*17)+'px');
 };
 const reset=event=>{
  const stage=event.target?.closest?.('.saathi-feature-stage,.welcome-stage');if(!stage)return;
  for(const key of ['--saathi-rotate-x','--saathi-rotate-y'])stage.style.setProperty(key,'0deg');
  for(const key of ['--saathi-shift-x','--saathi-shift-y'])stage.style.setProperty(key,'0px');
 };
 doc.addEventListener('pointermove',pointer,{passive:true});doc.addEventListener('pointerout',reset,{passive:true});
 const hidden=()=>{if(doc.hidden)win.cancelAnimationFrame?.(raf)};
 doc.addEventListener('visibilitychange',hidden);
 return ()=>{
  disposed=true;observer?.disconnect();mutation.disconnect();win.cancelAnimationFrame?.(raf);
  doc.removeEventListener('pointermove',pointer);doc.removeEventListener('pointerout',reset);doc.removeEventListener('visibilitychange',hidden);
  for(const fn of disposers)fn();
 };
}
if(typeof window!=='undefined'&&typeof document!=='undefined')setupSaathiMotion();
