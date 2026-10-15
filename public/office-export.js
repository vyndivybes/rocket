// Client-side, dependency-free Office documents; never runs generated code or contacts servers.
const enc=new TextEncoder(),utf=x=>enc.encode(String(x));
const xml=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const text=x=>String(x??'').replace(/[\x00-\x1f]/g,c=>c==='\n'?' ':' ').slice(0,11000);
const pRel='http://schemas.openxmlformats.org/package/2006/relationships';
const office='http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const start='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
function zip(files){
 const locals=[],centers=[];let offset=0;const wr=(v,p,n,size)=>size===2?v.setUint16(p,n,true):v.setUint32(p,n,true);
 for(const [path,source] of files){
  const name=utf(path),data=utf(source);let crc=0xffffffff;
  for(const b of data){crc^=b;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0)}crc=(crc^0xffffffff)>>>0;
  const local=new Uint8Array(30+name.length),lv=new DataView(local.buffer);
  wr(lv,0,0x04034b50,4);wr(lv,4,20,2);wr(lv,6,0x0800,2);wr(lv,14,crc,4);wr(lv,18,data.length,4);wr(lv,22,data.length,4);wr(lv,26,name.length,2);local.set(name,30);
  const cd=new Uint8Array(46+name.length),cv=new DataView(cd.buffer);
  wr(cv,0,0x02014b50,4);wr(cv,4,20,2);wr(cv,6,20,2);wr(cv,8,0x0800,2);wr(cv,16,crc,4);wr(cv,20,data.length,4);wr(cv,24,data.length,4);wr(cv,28,name.length,2);wr(cv,42,offset,4);cd.set(name,46);
  locals.push(local,data);centers.push(cd);offset+=local.length+data.length;
 }
 const cdsize=centers.reduce((n,x)=>n+x.length,0),end=new Uint8Array(22),ev=new DataView(end.buffer);
 wr(ev,0,0x06054b50,4);wr(ev,8,files.length,2);wr(ev,10,files.length,2);wr(ev,12,cdsize,4);wr(ev,16,offset,4);
 const out=new Uint8Array(offset+cdsize+22);let pos=0;
 for(const x of [...locals,...centers,end]){out.set(x,pos);pos+=x.length}
 return out;
}
function rels(items){return start+'<Relationships xmlns="'+pRel+'">'+items.map((x,i)=>'<Relationship Id="rId'+(i+1)+'" Type="'+office+'/'+x[0]+'" Target="'+x[1]+'"/>').join('')+'</Relationships>'}
function types(arr){return start+'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'+arr.map(x=>'<Override PartName="'+x[0]+'" ContentType="'+x[1]+'"/>').join('')+'</Types>'}
function lines(input){return [input.title,input.question,...input.answer.split(/\n+/).filter(Boolean),'Source: '+(input.sourceUrl||'Learner-provided material'),'AI-generated content; verify important facts.'].slice(0,55)}
function docx(r){
 const p=lines(r).map(x=>'<w:p><w:r><w:t xml:space="preserve">'+xml(x)+'</w:t></w:r></w:p>').join('');
 return zip([['[Content_Types].xml',types([['/word/document.xml','application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml']])],['_rels/.rels',rels([['officeDocument','word/document.xml']])],['word/document.xml',start+'<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+p+'<w:sectPr/></w:body></w:document>']]);
}
function xlsx(r){
 const ss=lines(r).map((s,i)=>'<row r="'+(i+1)+'"><c r="A'+(i+1)+'" t="inlineStr"><is><t>'+xml(s)+'</t></is></c></row>').join('');
 const sh=start+'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>'+ss+'</sheetData></worksheet>';
 const wb=start+'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="'+office+'"><sheets><sheet name="Study brief" sheetId="1" r:id="rId1"/></sheets></workbook>';
 return zip([['[Content_Types].xml',types([['/xl/workbook.xml','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml'],['/xl/worksheets/sheet1.xml','application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml']])],['_rels/.rels',rels([['officeDocument','xl/workbook.xml']])],['xl/workbook.xml',wb],['xl/_rels/workbook.xml.rels',rels([['worksheet','worksheets/sheet1.xml']])],['xl/worksheets/sheet1.xml',sh]]);
}
function pptx(r){
 const tx=lines(r).slice(0,12).map((s,i)=>'<a:p><a:r><a:rPr lang="en-US" sz="'+(i===0?3000:1600)+'"/><a:t>'+xml(s.slice(0,320))+'</a:t></a:r></a:p>').join('');
 const sp='<p:sp><p:nvSpPr><p:cNvPr id="2" name="Content"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="400000" y="400000"/><a:ext cx="8300000" cy="6000000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr><p:txBody><a:bodyPr/><a:lstStyle/>'+tx+'</p:txBody></p:sp>';
 const head='<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>';
 const ns='xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="'+office+'"';
 const slide=start+'<p:sld '+ns+'><p:cSld><p:spTree>'+head+sp+'</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>';
 const layout=start+'<p:sldLayout '+ns+' type="blank"><p:cSld><p:spTree>'+head+'</p:spTree></p:cSld></p:sldLayout>';
 const master=start+'<p:sldMaster '+ns+'><p:cSld><p:spTree>'+head+'</p:spTree></p:cSld><p:clrMap accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" bg1="lt1" bg2="lt2" folHlink="folHlink" hlink="hlink" tx1="dk1" tx2="dk2"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst></p:sldMaster>';
 const prs=start+'<p:presentation '+ns+'><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst><p:sldId id="256" r:id="rId2"/></p:sldIdLst><p:sldSz cx="9144000" cy="6858000"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>';
 const nsOffice='application/vnd.openxmlformats-officedocument.presentationml.';
 return zip([
 ['[Content_Types].xml',types([['/ppt/presentation.xml',nsOffice+'presentation.main+xml'],['/ppt/slides/slide1.xml',nsOffice+'slide+xml'],['/ppt/slideMasters/slideMaster1.xml',nsOffice+'slideMaster+xml'],['/ppt/slideLayouts/slideLayout1.xml',nsOffice+'slideLayout+xml']])],
 ['_rels/.rels',rels([['officeDocument','ppt/presentation.xml']])],['ppt/presentation.xml',prs],['ppt/_rels/presentation.xml.rels',rels([['slideMaster','slideMasters/slideMaster1.xml'],['slide','slides/slide1.xml']])],
 ['ppt/slides/slide1.xml',slide],['ppt/slides/_rels/slide1.xml.rels',rels([['slideLayout','../slideLayouts/slideLayout1.xml']])],
 ['ppt/slideMasters/slideMaster1.xml',master],['ppt/slideMasters/_rels/slideMaster1.xml.rels',rels([['slideLayout','../slideLayouts/slideLayout1.xml']])],
 ['ppt/slideLayouts/slideLayout1.xml',layout],['ppt/slideLayouts/_rels/slideLayout1.xml.rels',rels([['slideMaster','../slideMasters/slideMaster1.xml']])]
 ]);
}
function pdf(r){
 const rows=lines(r).flatMap(s=>s.replace(/[^\x20-\x7e]/g,'?').match(/.{1,94}/g)||['']).slice(0,40);
 const escPdf=s=>s.replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
 const stream='BT /F1 12 Tf 45 785 Td '+rows.map((s,i)=>(i?'0 -18 Td ':'')+'('+escPdf(s)+') Tj').join('\n')+' ET';
 const objects=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Count 1 /Kids [3 0 R] >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>','<< /Length '+utf(stream).length+' >>\nstream\n'+stream+'\nendstream'];
 let out='%PDF-1.4\n';const positions=[0];
 for(let i=0;i<objects.length;i++){positions.push(utf(out).length);out+=(i+1)+' 0 obj\n'+objects[i]+'\nendobj\n'}
 const xref=utf(out).length;
 out+='xref\n0 '+(objects.length+1)+'\n0000000000 65535 f \n'+positions.slice(1).map(v=>String(v).padStart(10,'0')+' 00000 n \n').join('')+'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF';
 return utf(out);
}
const formats={docx:['application/vnd.openxmlformats-officedocument.wordprocessingml.document',docx],xlsx:['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',xlsx],pptx:['application/vnd.openxmlformats-officedocument.presentationml.presentation',pptx],pdf:['application/pdf',pdf]};
export function makeOfficeFile(type,input){
 const v=formats[type];if(!v)throw Error('Unsupported format');
 const data={title:text(input?.title||'Saathi study report'),question:text(input?.question||'Study question'),answer:text(input?.answer),sourceUrl:text(input?.sourceUrl)};
 if(!data.answer.trim())throw Error('No learning report is ready');
 return {extension:type,mime:v[0],bytes:v[1](data)};
}
