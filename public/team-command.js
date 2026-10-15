export function teamCommand(value){
 if(typeof value!=='string'||value.length>1600)return null;
 const m=value.trim().match(/^(?:(?:saathi[,!]?\s*)?(?:ask|use|bring)\s+(?:your\s+)?(?:specialist\s+)?(?:team|agents)\s+(?:to|for|on)\s+|(?:team study|team help)\s*:\s*)(.+)$/i);
 return m?.[1]?.trim().length>=8?m[1].trim():null;
}
