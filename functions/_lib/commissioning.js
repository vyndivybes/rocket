// This exact server-side binding permits the owner-authorized restricted pilot.
// It does not turn any commissioning gate into a PASS.
const RELEASE_OVERRIDE='owner-authorized-restricted-pilot-2026-10-15';
export const MANDATORY_GATES = Object.freeze([
 'school_board_subject_confirmation','complete_chapter_teaching','independent_academic_review',
 'practical_and_exam_assessment','human_safeguarding_review','consent_and_retention',
 'authenticated_live_journeys','responsive_live_acceptance','live_recovery'
]);
export function commissioningStatus(env={}){
 const overridden=env?.SAATHI_PRODUCTION_RELEASE_OVERRIDE===RELEASE_OVERRIDE;
 return {
  status:overridden?'OVERRIDDEN':'HOLD',
  productionEligible:overridden,
  releaseBasis:overridden?'Owner-authorized restricted pilot override; commissioning gates remain HOLD':null,
  gates:MANDATORY_GATES.map(id=>({id,status:'HOLD'}))
 };
}
