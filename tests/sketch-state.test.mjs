import test from 'node:test';
import assert from 'node:assert/strict';
import {createSketchState} from '../public/sketch-state.js';
test('a sketch survives switching Mission Control panels within the current page session',()=>{
 const s=createSketchState(),png='data:image/png;base64,aGVsbG8=';
 assert.equal(s.snapshot(),null);
 assert.equal(s.remember(png),true);
 assert.equal(s.snapshot(),png);
 assert.equal(s.remember('https://example.test/image.png'),false);
 assert.equal(s.snapshot(),png);
 s.clear();assert.equal(s.snapshot(),null);
});
test('sketch state stores only PNG data and is not persisted in browser storage',()=>{
 const s=createSketchState();
 assert.equal(s.remember('data:text/html;base64,PHNjcmlwdD4='),false);
 assert.equal(s.snapshot(),null);
 assert.deepEqual(Object.keys(s),['remember','snapshot','clear']);
});
