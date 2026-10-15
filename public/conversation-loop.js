// An explicit user-started conversation, confined to the current page and browser.
// Never turns on microphone in background; user can stop at any turn.
export function createConversationLoop({maxTurns=12}={}){
 let enabled=false,turns=0,waiting=false;
 return Object.freeze({
  start(){enabled=true;turns=0;waiting=false;return true},
  stop(){enabled=false;waiting=false;return false},
  active:()=>enabled,
  submitted(){if(!enabled)return false;waiting=true;turns++;if(turns>=maxTurns){enabled=false;waiting=false;return false}return true},
  speechFinished(){if(!enabled||!waiting)return false;waiting=false;return true},
  failed(){enabled=false;waiting=false},
  state:()=>({enabled,turns,waiting})
 });
}
