// Original Saathi scrollytelling showcase; every CTA routes to a working learning feature.
const topics=[
 {key:'aviation',index:'01',eyebrow:'THE SKY LAB',title:'THINK IN 3D.',detail:'Explore flight, forces and the science behind real aircraft.',icon:'✈',theme:'sky'},
 {key:'art',index:'02',eyebrow:'THE CREATIVE LAB',title:'MAKE THE UNEXPECTED.',detail:'Sketch, imagine and experiment with your own visual language.',icon:'✳',theme:'art'},
 {key:'learn',index:'03',eyebrow:'THE STUDY LAB',title:'ASK A BIG QUESTION.',detail:'Turn complex topics into understandable explanations and practice.',icon:'?',theme:'learn'},
 {key:'plan',index:'04',eyebrow:'THE LIFE LAB',title:'OWN YOUR TIME.',detail:'Plan study, hobbies, sport and rest in one balanced week.',icon:'⌁',theme:'plan'}
];
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function studioDestinations(mode){
 if(mode==='mission')return {aviation:['tab','pilot'],art:['tab','art'],learn:['tab','companion'],plan:['tab','schedule']};
 if(mode==='student')return {aviation:['href','/mission.html'],art:['href','/mission.html'],learn:['go','library'],plan:['go','planner']};
 throw new Error('Unsupported studio experience');
}
export function renderStudioScenes(mode='student'){
 const targets=studioDestinations(mode);
 const cards=topics.map(t=>{
  const [type,value]=targets[t.key];
  const action=type==='href'?'<a class="saathi-studio-action" href="'+value+'">Enter the lab ↗</a>':'<button type="button" class="saathi-studio-action" data-'+type+'="'+value+'">Enter the lab ↗</button>';
  return '<article class="saathi-studio-slide saathi-studio-'+t.theme+'" aria-label="'+esc(t.eyebrow)+'"><div class="saathi-studio-meta"><span>'+t.index+' / 04</span><span>'+esc(t.eyebrow)+'</span></div><div class="saathi-studio-inner"><h3>'+esc(t.title)+'</h3><p>'+esc(t.detail)+'</p>'+action+'</div><div class="saathi-studio-sculpture" aria-hidden="true"><div class="saathi-studio-shape">'+esc(t.icon)+'</div></div></article>';
 }).join('');
 return '<section class="saathi-studio-showcase" aria-label="Explore Saathi learning worlds"><div class="saathi-studio-heading"><div><span class="saathi-scene-label">DISCOVER YOUR POSSIBILITIES</span><h2>CHOOSE A <em>NEW WORLD.</em></h2></div><div class="saathi-studio-controls"><button type="button" data-studio-prev="1" aria-label="Previous learning world">←</button><button type="button" data-studio-next="1" aria-label="Next learning world">→</button></div></div><div class="saathi-studio-rail" tabindex="0" role="region" aria-label="Scrollable learning worlds">'+cards+'</div><p class="saathi-studio-hint">Explore sideways → · Each world opens a real Saathi tool</p></section>';
}
