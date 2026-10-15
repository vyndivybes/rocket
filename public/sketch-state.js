export function createSketchState(){
 let image=null;
 return {
  remember(value){
   if(typeof value!=='string'||!/^data:image\/png;base64,[a-z0-9+/=]+$/i.test(value)||value.length>6000000)return false;
   image=value;return true;
  },
  snapshot(){return image},
  clear(){image=null}
 };
}
