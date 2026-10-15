// Actual 3D aircraft and environment built with Three.js WebGL, not flat CSS effects.
// Three.js loaded on demand; text/voice tutor remains usable if graphics unavailable.
const canvas=document.getElementById('saathi-stage');
const label=document.getElementById('saathi-object-label');
const stateLabel=document.getElementById('saathi-state');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lowPower=window.matchMedia('(max-width: 700px)').matches;
const root=document.getElementById('saathi-experience');
let dispose=()=>{};
(async()=>{
 try{
  const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.180.0/+esm');
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x0a1c2b);
  scene.fog=new THREE.FogExp2(0x0d2c40,0.014);
  const camera=new THREE.PerspectiveCamera(42,1,0.1,300);
  camera.position.set(lowPower?16:18,lowPower?9:7,lowPower?24:23);
  camera.lookAt(2,2,0);
  const renderer=new THREE.WebGLRenderer({canvas,antialias:!lowPower,powerPreference:'low-power',alpha:false});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,lowPower?1.2:1.7));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.5;
  scene.add(new THREE.HemisphereLight(0x9ecade,0x192d40,2.6));
  const sun=new THREE.DirectionalLight(0xffdbaf,4.6);sun.position.set(-16,23,-22);scene.add(sun);
  const fill=new THREE.PointLight(0x75bce8,120,65);fill.position.set(13,9,4);scene.add(fill);
  const metal=new THREE.MeshStandardMaterial({color:0xa8bbc4,metalness:0.83,roughness:0.24,flatShading:false});
  const pale=new THREE.MeshStandardMaterial({color:0xdde5e9,metalness:0.68,roughness:0.31});
  const dark=new THREE.MeshStandardMaterial({color:0x142c42,metalness:0.65,roughness:0.24});
  const glass=new THREE.MeshPhysicalMaterial({color:0x326585,metalness:0.23,roughness:0.07,transparent:true,opacity:0.8,clearcoat:0.9});
  function mesh(geo,mat,pos,name,parent=scene){const m=new THREE.Mesh(geo,mat);m.position.set(...pos);m.name=name||'';parent.add(m);return m;}
  // Detailed procedural single-engine aircraft (training simulator display object).
  const plane=new THREE.Group();plane.name='Aircraft';plane.position.set(5,3.25,-3);scene.add(plane);
  const fuselage=mesh(new THREE.CylinderGeometry(.5,.85,9,24,1),metal,[0,0,0],'Fuselage',plane);
  fuselage.rotation.x=Math.PI/2;
  const nose=mesh(new THREE.SphereGeometry(.58,22,14),pale,[0,0,4.5],'Propeller & nose',plane);nose.scale.set(1,1,1.6);
  const wing=mesh(new THREE.BoxGeometry(14,.16,2.5),pale,[0,-.15,.1],'Wings',plane);
  const wingTipL=mesh(new THREE.BoxGeometry(1,.22,2.1),dark,[-7.3,-.12,.1],'Wing tip',plane);
  const wingTipR=mesh(new THREE.BoxGeometry(1,.22,2.1),dark,[7.3,-.12,.1],'Wing tip',plane);
  wingTipL.rotation.z=-0.12;wingTipR.rotation.z=0.12;
  const tail=mesh(new THREE.BoxGeometry(5,.13,1.35),pale,[0,.3,-3.5],'Horizontal stabiliser',plane);
  const fin=mesh(new THREE.BoxGeometry(.13,2.4,1.6),dark,[0,1.1,-3.3],'Vertical stabiliser',plane);fin.rotation.x=-.13;
  const canopy=mesh(new THREE.SphereGeometry(1,22,16),glass,[0,.5,1],'Cockpit',plane);canopy.scale.set(.78,.63,1.7);
  const prop=new THREE.Group();prop.position.z=5.35;plane.add(prop);
  const blade=mesh(new THREE.BoxGeometry(.16,3.1,.08),dark,[0,0,0],'Propeller',prop);
  mesh(new THREE.SphereGeometry(.16,12,10),pale,[0,0,.1],'Propeller',prop);
  for(const sign of [-1,1]){const wheel=mesh(new THREE.TorusGeometry(.32,.13,10,18),dark,[sign*1.5,-1.07,.9],'Landing gear',plane);wheel.rotation.y=Math.PI/2;const strut=mesh(new THREE.CylinderGeometry(.055,.07,.8,8),metal,[sign*1.5,-.69,.9],'Landing gear',plane);strut.rotation.z=sign*.3;}
  // Hangar floor and visible world depth.
  const floor=mesh(new THREE.PlaneGeometry(190,190),new THREE.MeshStandardMaterial({color:0x142d3b,roughness:.47,metalness:.17}),[0,-.4,0],'Ground');
  floor.rotation.x=-Math.PI/2;
  const grid=new THREE.GridHelper(160,45,0x4c8292,0x294354);grid.position.y=-.38;scene.add(grid);
  for(let i=0;i<9;i++){
   const x=(i-4)*15;
   const frame=new THREE.Mesh(new THREE.BoxGeometry(.22,20,.25),dark);
   frame.position.set(x,9,-33);scene.add(frame);
   const beam=new THREE.Mesh(new THREE.BoxGeometry(14,.23,.25),dark);beam.position.set(x+7,18,-33);scene.add(beam);
  }
  const back=new THREE.Mesh(new THREE.PlaneGeometry(190,95),new THREE.MeshBasicMaterial({color:0x193b54,side:THREE.DoubleSide}));back.position.set(0,20,-39);scene.add(back);
  const lightStrip=new THREE.Mesh(new THREE.BoxGeometry(100,.14,.16),new THREE.MeshBasicMaterial({color:0xa3e1f5}));lightStrip.position.set(0,17,-32.7);scene.add(lightStrip);
  const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();
  let turning=false,lastX=0,rotationTarget=-.2,rotationY=-.2,animation=0,visible=true,alive=true;
  const onDown=e=>{turning=true;lastX=e.clientX;pointer.x=(e.clientX/canvas.clientWidth)*2-1;pointer.y=-((e.clientY/canvas.clientHeight)*2-1);
    const bounds=canvas.getBoundingClientRect();pointer.x=((e.clientX-bounds.left)/bounds.width)*2-1;pointer.y=-((e.clientY-bounds.top)/bounds.height)*2+1;
    raycaster.setFromCamera(pointer,camera);
    const hits=raycaster.intersectObjects(plane.children,true);
    if(hits.length){const part=hits[0].object.name||'Aircraft';label.textContent='SELECTED · '+part.toUpperCase()+' · ASK SAATHI ABOUT THIS PART';root.dispatchEvent(new CustomEvent('saathi:part',{detail:{part}}));}
  };
  const onMove=e=>{if(turning){rotationTarget+=(e.clientX-lastX)*.006;lastX=e.clientX}};
  const onUp=()=>{turning=false};
  canvas.addEventListener('pointerdown',onDown);window.addEventListener('pointermove',onMove,{passive:true});window.addEventListener('pointerup',onUp);
  const resize=()=>{const w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)};
  const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
  const onVis=()=>{visible=!document.hidden};document.addEventListener('visibilitychange',onVis);
  let aiPhase='READY';root.addEventListener('saathi:phase',e=>{aiPhase=e.detail||'READY';});
  const clock=new THREE.Clock();
  const tick=()=>{if(!alive)return;animation=requestAnimationFrame(tick);if(!visible)return;const t=clock.getElapsedTime();const delta=Math.min(.05,clock.getDelta());
    rotationY+=(rotationTarget-rotationY)*.055;
    plane.rotation.y=rotationY+(reduced?0:Math.sin(t*.19)*.04);
    plane.rotation.z=reduced?0:Math.sin(t*.31)*.012;
    plane.position.y=3.25+(reduced?0:Math.sin(t*.54)*.075);
    if(!reduced){prop.rotation.z+=.025;fill.intensity=aiPhase==='WORKING'?160+Math.sin(t*6)*45:aiPhase==='LISTENING'?220:120;}
    renderer.render(scene,camera);
  };
  tick();stateLabel.textContent='LIVE 3D · WEBGL';
  dispose=()=>{alive=false;cancelAnimationFrame(animation);observer.disconnect();document.removeEventListener('visibilitychange',onVis);window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerup',onUp);canvas.removeEventListener('pointerdown',onDown);scene.traverse(o=>{o.geometry?.dispose?.();});for(const m of [metal,pale,dark,glass])m.dispose();renderer.dispose()};
  window.addEventListener('pagehide',dispose,{once:true});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();alive=false;cancelAnimationFrame(animation);stateLabel.textContent='3D PAUSED · TEXT/VOICE AVAILABLE'},{once:true});
 }catch(err){
  stateLabel.textContent='2D FALLBACK · AI AVAILABLE';
  label.textContent='3D graphics unavailable; Saathi text and voice remain functional.';
 }
})();
