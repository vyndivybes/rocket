import test from 'node:test';
import assert from 'node:assert/strict';
import {validateDocumentUpload,convertDocumentToStudyText,normalizeConversionResult} from '../functions/_lib/document-conversion.js';

const pdf='JVBERi0xLjQKMSAwIG9iago8PC9UeXBlL0NhdGFsb2c+PgplbmRvYmoKJSVFT0Y=';
const docx='UEsDBBQAAAAIAAAAAAAAAAAAAAAAAAAAAAA=';
test('Cloudflare document adapter accepts only expected bounded PDF, DOCX, PPTX',()=>{
 assert.equal(validateDocumentUpload({name:'school.pdf',base64:pdf}),null);
 assert.equal(validateDocumentUpload({name:'notes.docx',base64:docx}),null);
 assert.equal(validateDocumentUpload({name:'slides.pptx',base64:docx}),null);
 for(const v of [{name:'bad.exe',base64:pdf},{name:'fake.pdf',base64:docx},{name:'broken.pptx',base64:pdf},{name:'script.html',base64:docx},{name:'../secret.pdf',base64:pdf},{name:'big.pdf',base64:'A'.repeat(1400000)}])assert.ok(validateDocumentUpload(v),JSON.stringify(v).slice(0,80));
});
test('document conversion calls provider only with validated disposable blob and never persists',async()=>{
 let name=null,bytes=0,stored=false;
 const ai={async toMarkdown(file){name=file.name;bytes=file.blob.size;return {name,format:'markdown',data:'# Electromagnetic Induction\nFaraday law is explained using a changing magnetic flux. A short science lesson with equations.'}}};
 const out=await convertDocumentToStudyText({ai,name:'school.pdf',base64:pdf});
 assert.equal(name,'school.pdf');assert.equal(bytes>0,true);assert.equal(out.status,'ready');assert.match(out.text,/Faraday law/);
 assert.equal(out.stored,false);
});
test('document conversion returns honest error for invalid outputs, unsupported providers and blank documents',async()=>{
 await assert.rejects(()=>convertDocumentToStudyText({ai:{},name:'school.pdf',base64:pdf}),/unavailable/i);
 await assert.rejects(()=>convertDocumentToStudyText({ai:{toMarkdown:async()=>[{format:'error',error:'Bad file'}]},name:'school.pdf',base64:pdf}),/failed/i);
 assert.equal(normalizeConversionResult({format:'text',data:'   '}),null);
});
