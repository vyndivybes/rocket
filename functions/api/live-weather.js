import {json,error,auth,ensureRole,sameOrigin,safeBody} from '../_lib/core.js';
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return error('Origin denied',403);
 const user=await auth(request,env);if(!ensureRole(user,'student'))return error('Student only',403);
 let data;try{data=await safeBody(request,300)}catch{return error('Invalid coordinates')};
 const latitude=Number(data.latitude),longitude=Number(data.longitude);
 if(!Number.isFinite(latitude)||!Number.isFinite(longitude)||Math.abs(latitude)>90||Math.abs(longitude)>180||typeof data.latitude!=='number'||typeof data.longitude!=='number')return error('Invalid location',400);
 try{
  const endpoint=new URL('https://api.open-meteo.com/v1/forecast');
  endpoint.search=new URLSearchParams({latitude:latitude.toFixed(2),longitude:longitude.toFixed(2),current:'temperature_2m,weather_code',forecast_days:'1'}).toString();
  const response=await fetch(endpoint,{signal:AbortSignal.timeout(5500)});
  if(!response.ok)return error('Weather temporarily unavailable',502);
  const info=await response.json();const temperature=Number(info.current?.temperature_2m),code=Number(info.current?.weather_code);
  if(!Number.isFinite(temperature)||!Number.isFinite(code))return error('Weather data unavailable',502);
  return json({temperature,code,source:'Open-Meteo current conditions',notice:'Approximate weather based on device-permitted location.'});
 }catch{return error('Weather temporarily unavailable',502)}
}
