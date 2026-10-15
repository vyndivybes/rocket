// Push is intentionally generic on the lock screen. No lesson names or private student data.
self.addEventListener('push',event=>{
 let info={};try{info=event.data?.json()||{}}catch{}
 if(info.kind!=='SAATHI_REMINDER_V1')return;
 event.waitUntil(self.registration.showNotification('Saathi reminder',{body:'You have an activity in your private study schedule.',tag:'saathi-study-reminder',icon:'/saathi-symbol.svg',data:{url:'/mission.html'}}));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
  const page=list.find(c=>new URL(c.url).origin===self.location.origin);
  if(page)return page.focus();
  return clients.openWindow('/mission.html');
 }));
});
