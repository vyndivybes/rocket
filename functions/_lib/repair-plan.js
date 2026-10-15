export function shouldRepairPrototype(build,attempt){return !build&&attempt===0}
export function buildRepairInstruction(goal){
 return ('Produce valid JSON with exactly title, html, css, js. Original project request: '+String(goal).slice(0,600)+'. Retry strictly: no network, no external libraries, no src or href attributes, no inline HTML event handlers, no cookies, no storage, no parent frame, no navigation. Small functional markup, CSS and DOM event listeners only. No markdown or surrounding commentary.').slice(0,1000);
}
