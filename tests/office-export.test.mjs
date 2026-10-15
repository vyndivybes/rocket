import test from 'node:test';import assert from 'node:assert/strict';
import {makeOfficeFile} from '../public/office-export.js';
const sample={title:'Flight physics',question:'What is lift?',answer:'Lift depends on pressure & motion.\nConfirm units and sources.',sourceUrl:'https://www1.grc.nasa.gov/'};
const dec=new TextDecoder();
function zipNames(data){let offset=0,names=[];const view=new DataView(data.buffer,data.byteOffset,data.byteLength);while(view.getUint32(offset,true)===0x04034b50){const length=view.getUint16(offset+26,true),extra=view.getUint16(offset+28,true),size=view.getUint32(offset+18,true);const name=dec.decode(data.slice(offset+30,offset+30+length));names.push(name);offset+=30+length+extra+size;if(offset+4>data.length)break;}return names}
test('genuine Office ZIP packages include Open XML and self-contained content',()=>{
 for(const type of ['docx','xlsx','pptx']){
  const result=makeOfficeFile(type,sample);
  assert.equal(result.extension,type);assert.ok(result.mime.includes(type==='pptx'?'presentation':type==='xlsx'?'spreadsheet':'wordprocessing'));
  assert.equal(dec.decode(result.bytes.slice(0,2)),'PK');
  const names=zipNames(result.bytes);
  assert.ok(names.includes('[Content_Types].xml'));
  assert.ok(names.includes('_rels/.rels'));
  if(type==='docx')assert.ok(names.includes('word/document.xml'));
  if(type==='xlsx')assert.ok(names.includes('xl/worksheets/sheet1.xml'));
  if(type==='pptx')assert.ok(names.includes('ppt/slides/slide1.xml'));
 }
});
test('PDF begins with standard header and ends with valid xref trailer',()=>{
 const out=dec.decode(makeOfficeFile('pdf',sample).bytes);
 assert.ok(out.startsWith('%PDF-1.4'));assert.match(out,/xref\n0 6\n/);assert.match(out,/%%EOF$/);
 assert.match(out,/What is lift/);
});
test('Office XML does not execute markup supplied in an AI answer',()=>{
 const data=makeOfficeFile('docx',{...sample,answer:'<script>alert(1)</script> & study'});
 const decoded=dec.decode(data.bytes);
 assert.ok(!decoded.includes('<script>alert(1)</script>'));
 assert.ok(decoded.includes('&lt;script&gt;'));
});
test('blank content and unsupported document extension rejected',()=>{
 assert.throws(()=>makeOfficeFile('docx',{answer:''}));assert.throws(()=>makeOfficeFile('exe',sample));
});
