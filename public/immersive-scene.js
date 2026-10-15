// Depth is decorative: no network, camera, gyro or personal data access.
// All interaction is pointer-triggered. Reduced-motion preference disables transformations.
export function clampParallax(x,y,width,height){
 if(![x,y,width,height].every(Number.isFinite)||width<=0||height<=0)return {x:0,y:0};
 return {x:Math.max(-1,Math.min(1,(x/width-.5)*2)),y:Math.max(-1,Math.min(1,(y/height-.5)*2))};
}
export function attachImmersiveScene({root=document,win=window}={}){
 const motion=win.matchMedia?.('(prefers-reduced-motion: reduce)');let raf=0,active=true;
 const pointer=event=>{
  if(!active||motion?.matches||event.pointerType==='touch')return;
  const t=event.target?.closest?.('[data-immersive]');
  if(!t)return;
  const rect=t.getBoundingClientRect();
  const pos=clampParallax(event.clientX-rect.left,event.clientY-rect.top,rect.width,rect.height);
  win.cancelAnimationFrame?.(raf);
  raf=win.requestAnimationFrame(()=>{
   t.style.setProperty('--px',String(pos.x));
   t.style.setProperty('--py',String(pos.y));
   t.style.setProperty('--drift-x',Math.round(pos.x*18)+'px');
   t.style.setProperty('--drift-y',Math.round(pos.y*14)+'px');
   t.style.setProperty('--reverse-x',Math.round(pos.x*-24)+'px');
   t.style.setProperty('--reverse-y',Math.round(pos.y*-18)+'px');
   t.style.setProperty('--tilt-x',(pos.y*-10).toFixed(2)+'deg');
   t.style.setProperty('--tilt-y',(pos.x*12).toFixed(2)+'deg');
   t.style.setProperty('--spot-x',String(Math.round((pos.x+1)*50))+'%');
   t.style.setProperty('--spot-y',String(Math.round((pos.y+1)*50))+'%');
  });
 };
 const reset=event=>{
  const t=event.target?.closest?.('[data-immersive]');if(!t)return;
  t.style.setProperty('--px','0');t.style.setProperty('--py','0');t.style.setProperty('--drift-x','0px');t.style.setProperty('--drift-y','0px');t.style.setProperty('--reverse-x','0px');t.style.setProperty('--reverse-y','0px');t.style.setProperty('--tilt-x','0deg');t.style.setProperty('--tilt-y','0deg');
 };
 root.addEventListener('pointermove',pointer,{passive:true});
 root.addEventListener('pointerout',reset,{passive:true});
 const onVisibility=()=>{if(root.hidden){win.cancelAnimationFrame?.(raf);raf=0}};
 root.addEventListener('visibilitychange',onVisibility);
 return ()=>{active=false;win.cancelAnimationFrame?.(raf);root.removeEventListener('pointermove',pointer);root.removeEventListener('pointerout',reset);root.removeEventListener('visibilitychange',onVisibility)};
}
