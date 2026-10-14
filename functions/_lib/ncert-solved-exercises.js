import {MORE_INDEXES,CH2_WORKED_DRAFTS} from './ncert-chapter2.js';
// Original explanatory drafts only; no textbook questions are republished.
// Checked identifiers refer to NCERT reprint 2026-27 chapter PDFs.
export const SOURCE_VERIFIED_EXERCISES=Object.freeze({
 'chapter-physics-1':Object.freeze({
  officialPdf:'https://ncert.nic.in/textbook/pdf/leph101.pdf',reprint:'2026-27',
  exerciseLabels:['End-of-chapter Exercises'],
  questionIds:Object.freeze(Array.from({length:23},(_,i)=>'1.'+(i+1)))
 }),
 'chapter-mathematics-1':Object.freeze({
  officialPdf:'https://ncert.nic.in/textbook/pdf/lemh101.pdf',reprint:'2026-27',
  exerciseLabels:['Exercise 1.1','Exercise 1.2','Miscellaneous Exercise'],
  questionIds:Object.freeze([
   ...Array.from({length:16},(_,i)=>'1.1/'+(i+1)),
   ...Array.from({length:12},(_,i)=>'1.2/'+(i+1)),
   ...Array.from({length:7},(_,i)=>'misc/'+(i+1))
  ])
 }),
 ...MORE_INDEXES
});
const DRAFTS=[
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.1",
    "problemFocus": "Coulomb force at 30 cm",
    "steps": [
      "Convert r=30 cm to 0.30 m; take q1=2×10⁻⁷ C and q2=3×10⁻⁷ C.",
      "Apply F=k|q1q2|/r²=(8.99×10⁹)(6×10⁻¹⁴)/0.09, treating air as vacuum."
    ],
    "answer": "5.99×10⁻³ N, repulsive.",
    "check": "Charge signs are equal; doubling separation would divide this force by four."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.2",
    "problemFocus": "Force-to-distance inversion",
    "steps": [
      "Take |q1|=0.4 μC=4×10⁻⁷ C, |q2|=0.8 μC=8×10⁻⁷ C and force F=0.2 N.",
      "Solve r=√(k|q1q2|/F)=√[(8.99×10⁹)(3.2×10⁻¹³)/0.2] metres."
    ],
    "answer": "r≈0.120 m; the opposite force is 0.2 N attractive.",
    "check": "Substituting r=0.120 m reproduces 0.20 N, consistent with Newton's third law."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.3",
    "problemFocus": "Electric to gravitational force ratio",
    "steps": [
      "Divide k e²/r² by Gmₑmₚ/r²; the squared separation cancels exactly, leaving a dimensionless quantity.",
      "Using the electron and proton masses, elementary charge, G and Coulomb constant gives approximately 2.27×10³⁹."
    ],
    "answer": "Dimensionless electric-to-gravity ratio ≈2.27×10³⁹.",
    "check": "Both forces have the same inverse-square dependence, so the ratio is independent of r."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.4",
    "problemFocus": "Quantisation at microscopic scale",
    "steps": [
      "Every net isolated-body charge is an integer multiple of e≈1.602×10⁻¹⁹ C, expressed as q=ne.",
      "One microcoulomb already corresponds to about 6.24×10¹² elementary charges, making single-electron increments macroscopically negligible."
    ],
    "answer": "Charges are quantised; the granularity is usually invisible macroscopically.",
    "check": "The change for a single electron is a tiny fraction of one microcoulomb."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.5",
    "problemFocus": "Conservation during triboelectric charging",
    "steps": [
      "Treat a rubbed glass rod and silk cloth as a closed, originally neutral combined system.",
      "Electrons move from one material to another, creating equal and opposite excess charges while total charge remains constant."
    ],
    "answer": "The acquired positive and negative charges sum to zero.",
    "check": "Charge transfer changes distribution but does not create total net charge."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.6",
    "problemFocus": "Cancellation for symmetric square charges",
    "steps": [
      "Opposite vertices A and C bear equal +2 μC, producing opposing equal-magnitude forces at the square centre.",
      "Opposite vertices B and D bear equal −5 μC and their forces also cancel vectorially along the other diagonal."
    ],
    "answer": "Net force on the central +1 μC charge = 0 N.",
    "check": "Opposite corners are equally distant from the centre; individual nonzero forces cancel in matched pairs."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.7",
    "problemFocus": "Electric-field line geometry",
    "steps": [
      "An electrostatic field line follows the direction of the local electric field at every point where that field exists.",
      "Crossing would imply two field directions at a single point; an unexplained break in charge-free space would imply a false source or sink."
    ],
    "answer": "Field lines cannot intersect or abruptly end in free space.",
    "check": "A unique vector field cannot have two different directions at one point."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.8",
    "problemFocus": "Field and test force at dipole midpoint",
    "steps": [
      "The midpoint is 0.10 m from each of the ±3 μC charges, and both contributions point toward the negative charge.",
      "Their magnitudes add to E=2k(3×10⁻⁶)/(0.10)²≈5.39×10⁶ N/C; multiply by qtest=−1.5×10⁻⁹ C."
    ],
    "answer": "E≈5.39×10⁶ N/C toward −; force≈8.09×10⁻³ N toward +.",
    "check": "The negative test charge experiences force opposite to the positive-test-charge field direction."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.9",
    "problemFocus": "Charge total and vector dipole moment",
    "steps": [
      "The source charges +2.5×10⁻⁷ C and −2.5×10⁻⁷ C cancel in the scalar total.",
      "Their separation is 0.30 m, so p=qd=7.5×10⁻⁸ C·m directed from negative at z=+0.15 m to positive at z=−0.15 m along the z-axis."
    ],
    "answer": "Qnet=0; p=−7.5×10⁻⁸ k̂ C·m (negative z-axis).",
    "check": "The dipole moment must point from negative charge toward positive charge."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.10",
    "problemFocus": "Torque on inclined electric dipole",
    "steps": [
      "Use the cross-product torque magnitude τ=pE sinθ for a dipole in a uniform electric field.",
      "Substitute p=4×10⁻⁹ C·m, E=5×10⁴ N/C and sin30°=1/2."
    ],
    "answer": "Torque magnitude =1.0×10⁻⁴ N·m.",
    "check": "This equals half the maximum pE as expected for a 30-degree angle."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.11",
    "problemFocus": "Electron count and moved mass",
    "steps": [
      "Negative polythene charge implies that electrons were transferred from wool to polythene.",
      "Count |q|/e = 3×10⁻⁷/(1.602×10⁻¹⁹)≈1.87×10¹²; multiply by mₑ≈9.109×10⁻³¹ kg."
    ],
    "answer": "≈1.87×10¹² electrons; mass≈1.71×10⁻¹⁸ kg.",
    "check": "Only electron mass moves at this microscopic scale; the acquired body charge is negative."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.12",
    "problemFocus": "Repulsion and changes of scale",
    "steps": [
      "For equal q=6.5×10⁻⁷ C and r=0.50 m, Coulomb's law gives F=kq²/r²≈0.0152 N.",
      "Doubling both charges multiplies q1q2 by 4; halving separation increases inverse-square force by 4."
    ],
    "answer": "Original≈0.0152 N; new≈0.243 N, both repulsive.",
    "check": "The force ratio is 16, agreeing with the independent product of the two scaling factors."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.13",
    "problemFocus": "Charge signs in a field-deflection figure",
    "steps": [
      "The positive upper plate and negative lower plate generate a downward-directed electric field, so negative particles are accelerated upward against the field.",
      "Both paths 1 and 2 bend upward and are negatively charged. Path 3 bends downward and is positively charged.",
      "Under the textbook's common incident-speed comparison, particle 3 has the greatest electric-field deflection, identifying the highest charge-to-mass ratio."
    ],
    "answer": "Particles 1 and 2 are negative; particle 3 is positive. Particle 3 has the greatest charge-to-mass ratio.",
    "check": "The force direction follows F=qE: negative charges bend toward the positive upper plate; positive charges bend toward the lower negative plate. Magnitude comparison assumes comparable entry speeds."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.14",
    "problemFocus": "Electric flux through a square",
    "steps": [
      "Square side 0.10 m gives area A=0.010 m², and E=3.0×10³ N/C.",
      "Use Φ=EAcosθ: normal parallel to field gives θ=0, while a 60-degree normal gives cos60=0.5."
    ],
    "answer": "Flux: 30 and 15 N·m²/C respectively.",
    "check": "The second angle halves the first flux without changing the square's area."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.15",
    "problemFocus": "Gauss flux of a uniform field through cube",
    "steps": [
      "A constant electric field enters and leaves a closed cube on opposite sides in balanced amounts.",
      "By Gauss's law, Φtotal=Qenclosed/ε₀; no charge is enclosed in the stated uniform-field geometry."
    ],
    "answer": "Total flux through the cube is zero.",
    "check": "Zero net flux does not require zero local flux on the individual cube faces."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.16",
    "problemFocus": "Charge implied by flux measurement",
    "steps": [
      "Use Gauss's law Q=ε₀Φ to convert the measured net outward flux into enclosed charge.",
      "Multiply ε₀=8.854×10⁻¹² by +8.0×10³ in SI units to get +7.08×10⁻⁸ C."
    ],
    "answer": "Qenclosed≈+7.08×10⁻⁸ C.",
    "check": "A net flux of zero means the net enclosed charge is zero, not that no positive and negative charges exist."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.17",
    "problemFocus": "Square as a cube face",
    "steps": [
      "Imagine a 10 cm cube for which the original square is one face and the charge 5 cm above its centre lies at the cube centre.",
      "The six equivalent faces share total outward flux Q/ε₀, so each gets one sixth."
    ],
    "answer": "One-face flux≈1.88×10⁵ N·m²/C.",
    "check": "Six identical contributions of Q/(6ε₀) total exactly Q/ε₀."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.18",
    "problemFocus": "Cube-centred point-charge flux",
    "steps": [
      "Closed-surface flux depends on enclosed charge only, not the cube edge length.",
      "For central charge Q=2.0 μC, calculate Q/ε₀=2.0×10⁻⁶/(8.854×10⁻¹²)."
    ],
    "answer": "Net outward flux≈2.26×10⁵ N·m²/C.",
    "check": "Changing cube size while keeping the charge enclosed leaves net flux unchanged."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.19",
    "problemFocus": "Radius independence of closed-surface flux",
    "steps": [
      "Gauss's law fixes net flux for a given enclosed charge, so doubling the sphere radius does not change the result.",
      "The charge is Q=ε₀Φ=8.854×10⁻¹²×(−1.0×10³) C."
    ],
    "answer": "Flux stays −1.0×10³ N·m²/C; Q≈−8.85×10⁻⁹ C.",
    "check": "The negative sign represents net inward flux appropriate for negative charge."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.20",
    "problemFocus": "Net charge of conductor from external field",
    "steps": [
      "The measurement radius 0.20 m exceeds sphere radius 0.10 m, so use |E|=k|Q|/r².",
      "Calculate |Q|=(1.5×10³)(0.20)²/(8.99×10⁹); inward field fixes the charge sign negative."
    ],
    "answer": "Charge≈−6.68×10⁻⁹ C.",
    "check": "A negative isolated sphere produces radially inward electric field beyond its surface."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.21",
    "problemFocus": "Surface density and total charged-sphere flux",
    "steps": [
      "Convert diameter 2.4 m to radius 1.2 m; spherical area is 4πr²≈18.1 m².",
      "Multiply 80.0 μC/m² by area to obtain Q≈1.45×10⁻³ C and divide by ε₀ for flux."
    ],
    "answer": "Q≈1.45×10⁻³ C; flux≈1.63×10⁸ N·m²/C.",
    "check": "Using square metres is necessary because the supplied charge density is per unit area."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.22",
    "problemFocus": "Linear density for infinite-line field",
    "steps": [
      "An ideal uniform infinite line gives electric field magnitude |E|=|λ|/(2πε₀r).",
      "Rearrange |λ|=2πε₀r|E|; insert r=0.020 m and |E|=9.0×10⁴ N/C to evaluate magnitude."
    ],
    "answer": "|λ|≈1.00×10⁻⁷ C/m.",
    "check": "The source only gives field magnitude, so the sign of λ cannot be inferred from this number alone."
  },
  {
    "lessonId": "chapter-physics-1",
    "questionId": "1.23",
    "problemFocus": "Field regions for charged parallel plates",
    "steps": [
      "Each infinite sheet contributes E=σ/(2ε₀), pointing away from its positive charge and toward its negative charge.",
      "For the two opposite inner-face densities ±17.0×10⁻²² C/m², contributions cancel outside and add between the sheets."
    ],
    "answer": "Outer fields both zero; between plates≈1.92×10⁻¹⁰ N/C.",
    "check": "The interplate direction is from positive to negative and magnitude is σ/ε₀ under the ideal large-plate approximation."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/3",
    "problemFocus": "Successor relation on finite set",
    "steps": [
      "The pairs are (1,2),(2,3),(3,4),(4,5),(5,6) on {1,…,6}.",
      "Reflexivity fails because (1,1) is missing, and symmetry fails because (2,1) is missing.",
      "Transitivity fails because (1,2) and (2,3) appear while (1,3) does not."
    ],
    "answer": "Neither reflexive, symmetric, nor transitive.",
    "check": "Each failed property is demonstrated by an explicit counterexample among permitted elements."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/4",
    "problemFocus": "Usual order relation on reals",
    "steps": [
      "For all real a, a≤a, establishing reflexivity.",
      "If a≤b and b≤c, then a≤c, establishing transitivity.",
      "Symmetry fails because 1≤2 is true but 2≤1 is false."
    ],
    "answer": "Reflexive and transitive, but not symmetric.",
    "check": "The proof handles all real a,b,c for transitivity and one valid counterexample for symmetry."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/1",
    "problemFocus": "Reciprocal map over nonzero real numbers",
    "steps": [
      "If 1/a=1/b for nonzero a,b, then a=b, proving injectivity.",
      "For every nonzero target y, choosing x=1/y gives f(x)=y, proving surjectivity.",
      "With domain N and codomain all nonzero real values, −1 has no preimage."
    ],
    "answer": "Bijective over nonzero reals; not onto when domain is N.",
    "check": "The function 1/x is its own inverse on nonzero real numbers, validating bijection."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/3",
    "problemFocus": "Greatest-integer mapping on reals",
    "steps": [
      "The floor function sends every x in [n,n+1) to the same integer n.",
      "Distinct reals such as 1.2 and 1.8 both give 1, and no noninteger real appears in the range."
    ],
    "answer": "Neither injective nor surjective as a function from R to R.",
    "check": "The excluded target 0.5 and repeated output 1 provide explicit failure checks."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/4",
    "problemFocus": "Modulus mapping on reals",
    "steps": [
      "The absolute-value function sends both +2 and −2 to output 2.",
      "Its range is [0,∞), so a target such as −1 in the codomain R can never occur."
    ],
    "answer": "Neither injective nor surjective as a function R→R.",
    "check": "Positive and negative inputs illustrate many-to-one behaviour; a negative output is impossible."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/8",
    "problemFocus": "Coordinate swap between product sets",
    "steps": [
      "Mapping (a,b) to (b,a) preserves unique pairs because equality of swapped outputs forces both original coordinates equal.",
      "Every target (b,a) has preimage (a,b); applying swap twice restores the original pair."
    ],
    "answer": "This function is bijective, with the same swap as its inverse.",
    "check": "The composition of swap with itself is the identity on both respective product sets."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "misc/4",
    "problemFocus": "Number of onto maps of finite set to itself",
    "steps": [
      "For equal finite domain and codomain size n, a surjection must also be injective.",
      "Choose distinct output images successively in n,n−1,…,1 ways and multiply the possibilities."
    ],
    "answer": "Exactly n! surjective functions for an n-element set.",
    "check": "For n=3 the permutations are 3×2×1=6, matching the factorial rule."
  }
].concat(CH2_WORKED_DRAFTS);
const SELF_CHECK_RUBRIC=Object.freeze({
 Physics:Object.freeze([
  'Identify the applicable physical principle, boundary conditions and any diagram assumptions.',
  'Convert quantities into compatible SI units before substituting numerical values.',
  'Show vector direction, algebraic steps, units and a reasonableness or limiting-case check.'
 ]),
 Mathematics:Object.freeze([
  'State the precise domain, codomain, definitions or hypotheses.',
  'Justify each algebraic or logical inference and show explicit counterexamples when needed.',
  'Give the conclusion with an inverse, substitution or special-case check.'
 ])
});
export const ORIGINAL_WORKED_SOLUTIONS=Object.freeze(DRAFTS.map(x=>Object.freeze({...x,
 reviewStatus:'ORIGINAL_EDITORIAL_DRAFT',certified:false,questionTextRepublished:false,
 selfCheckRubric:SELF_CHECK_RUBRIC[x.lessonId.startsWith('chapter-physics-')?'Physics':'Mathematics']
})));
export function questionBankProgress(){
 const indexed=Object.entries(SOURCE_VERIFIED_EXERCISES);
 const authored=new Set(ORIGINAL_WORKED_SOLUTIONS.map(x=>x.lessonId+'::'+x.questionId));
 const missingByIndexedChapter=indexed.map(([lessonId,source])=>({
  lessonId,sourceUrl:source.officialPdf,
  indexedQuestionCount:source.questionIds.length,
  missingQuestionIds:source.questionIds.filter(id=>!authored.has(lessonId+'::'+id))
 }));
 const indexedPrintedQuestions=indexed.reduce((n,[,source])=>n+source.questionIds.length,0);
 const indexedDraftQuestionCount=ORIGINAL_WORKED_SOLUTIONS.length;
 return {mappedUnits:66,indexedUnits:indexed.length,unindexedUnitCount:66-indexed.length,
  indexedPrintedQuestions,indexedDraftQuestionCount,
  unansweredIndexedCount:missingByIndexedChapter.reduce((n,x)=>n+x.missingQuestionIds.length,0),
  missingByIndexedChapter,authoredSolutions:indexedDraftQuestionCount,
  qualifiedSolutions:0,totalPrintedQuestionsAcrossCurriculum:null,status:'HOLD'};
}

export function chapterSourceIndex(id){
 const x=SOURCE_VERIFIED_EXERCISES[id];
 return x?{...x,questionIds:[...x.questionIds],exerciseLabels:[...x.exerciseLabels]}:null;
}
export function workedSolutionsForChapter(id){
 return ORIGINAL_WORKED_SOLUTIONS.filter(x=>x.lessonId===id).map(x=>({...x,steps:[...x.steps]}));
}
