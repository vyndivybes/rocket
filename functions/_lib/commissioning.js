// No runtime variable, client input or foundation score can grant production acceptance.
export const MANDATORY_GATES = Object.freeze([
 'school_board_subject_confirmation','complete_chapter_teaching','independent_academic_review',
 'practical_and_exam_assessment','human_safeguarding_review','consent_and_retention',
 'authenticated_live_journeys','responsive_live_acceptance','live_recovery'
]);
export function commissioningStatus(){
 return {status:'HOLD',productionEligible:false,gates:MANDATORY_GATES.map(id=>({id,status:'HOLD'}))};
}
