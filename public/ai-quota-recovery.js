// Quota exhaustion is an expected account state, not an invitation to retry AI calls.
export function isQuotaError(value){return typeof value==='string'&&/daily study ai limit reached|daily ai allowance reached|daily ai limit reached/i.test(value)}
export function quotaRecoveryMessage(){
 return 'Today’s AI tutoring allowance has been used. AI explanations will be available again tomorrow (UTC reset). I have stopped the continuous voice session so it will not keep retrying. You can still save reminders, review your schedule and saved notes, rotate the aircraft, and open supported educational websites without using AI tutoring. Please type a command or restart voice conversation when needed.';
}
