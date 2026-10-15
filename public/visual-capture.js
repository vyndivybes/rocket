// Opt-in single-frame camera/screen capture. No automatic background recording.
export function frameDimensions(width,height,maxEdge=960){
 if(!Number.isFinite(width)||!Number.isFinite(height)||width<1||height<1)return null;
 const scale=Math.min(1,maxEdge/Math.max(width,height));
 return {width:Math.max(1,Math.round(width*scale)),height:Math.max(1,Math.round(height*scale))};
}
export async function captureVisualFrame(kind,{mediaDevices=globalThis.navigator?.mediaDevices,document=globalThis.document}={}){
 if(!['screen','camera'].includes(kind))throw Error('Unsupported visual source');
 if(!mediaDevices)throw Error('Camera or screen capture is not available in this browser.');
 let stream,video;
 try{
  if(kind==='screen'){if(typeof mediaDevices.getDisplayMedia!=='function')throw Error('Screen sharing is not supported by this browser.');stream=await mediaDevices.getDisplayMedia({video:true,audio:false});}
  else{if(typeof mediaDevices.getUserMedia!=='function')throw Error('Camera is not supported by this browser.');stream=await mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false});}
  video=document.createElement('video');video.muted=true;video.playsInline=true;video.srcObject=stream;
  await video.play();
  const dimensions=frameDimensions(video.videoWidth,video.videoHeight);
  if(!dimensions)throw Error('Could not read the selected visual frame.');
  const canvas=document.createElement('canvas');canvas.width=dimensions.width;canvas.height=dimensions.height;
  canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);
  const image=canvas.toDataURL('image/jpeg',0.65);
  if(image.length>720000)throw Error('Frame exceeds the image budget.');
  return image;
 }finally{
  try{stream?.getTracks()?.forEach(t=>t.stop())}catch{}
  if(video){try{video.pause()}catch{}video.srcObject=null}
 }
}
