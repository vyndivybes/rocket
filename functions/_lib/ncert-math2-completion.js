// Original NCERT Mathematics Part I Chapter 2 2026–27 exercises.
// Solutions have explicit inverse-trig principal branch restrictions.
// Editorial drafts; not teacher-certified and original prompts are not copied.
export const MATH2_WORKED_DRAFTS=Object.freeze([
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/1",
    "problemFocus": "Principal branch of the triple-arcsine identity",
    "steps": [
      "Set θ=arcsin x. The specified domain −1/2≤x≤1/2 places θ within [−π/6,π/6], so 3θ stays in the principal arcsine interval [−π/2,π/2].",
      "The identity sin(3θ)=3sinθ−4sin³θ gives sin(3θ)=3x−4x³. Applying principal arcsine therefore returns exactly 3θ."
    ],
    "answer": "3 arcsin x = arcsin(3x−4x³), for −1/2≤x≤1/2.",
    "check": "At the two endpoints, the triple angle reaches ±π/2 without leaving the principal interval; outside the specified range arcsine folding may invalidate equality."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/2",
    "problemFocus": "Principal branch of the triple-arccosine identity",
    "steps": [
      "Let θ=arccos x. With 1/2≤x≤1 the principal θ belongs to [0,π/3], so 3θ belongs to the principal arccosine range [0,π].",
      "Use cos(3θ)=4cos³θ−3cosθ=4x³−3x. Taking arccos of both sides recovers the allowed angle 3θ."
    ],
    "answer": "3 arccos x = arccos(4x³−3x) for 1/2≤x≤1.",
    "check": "At x=1, both sides are zero; at x=1/2, both sides equal π and the arccosine branch condition still holds."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/3",
    "problemFocus": "Half-angle simplification of inverse tangent",
    "steps": [
      "Set θ=arctan x, so −π/2<θ<π/2 and cosθ=1/√(1+x²)>0 while sinθ=x/√(1+x²).",
      "The half-angle formula tan(θ/2)=sinθ/(1+cosθ)=x/(√(1+x²)+1)=(√(1+x²)−1)/x for x≠0; θ/2 is in the principal arctan range."
    ],
    "answer": "arctan[(√(1+x²)−1)/x] = (1/2) arctan x, x≠0.",
    "check": "Multiplying numerator and denominator by √(1+x²)+1 rationalises the expression and verifies the half-angle identity."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/4",
    "problemFocus": "Half-angle identity for positive sine interval",
    "steps": [
      "For 0<x<π, both 1−cos x and 1+cos x are positive and (1−cos x)/(1+cos x)=tan²(x/2).",
      "Since 0<x/2<π/2, tan(x/2)>0. The principal square root is tan(x/2), and principal arctan then returns x/2."
    ],
    "answer": "arctan√[(1−cos x)/(1+cos x)] = x/2.",
    "check": "The sign of the square root matters: the positive result follows from the given open interval rather than assuming √(tan²t)=tan t everywhere."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/5",
    "problemFocus": "Inverse tangent of a cosine-minus-sine ratio",
    "steps": [
      "Divide by cosx+sinx where defined and use tan(π/4−x)=(cosx−sinx)/(cosx+sinx).",
      "The prescribed range −π/4<x<3π/4 gives −π/2<π/4−x<π/2, exactly the arctangent principal interval."
    ],
    "answer": "arctan[(cosx−sinx)/(cosx+sinx)] = π/4−x.",
    "check": "The denominator vanishes at interval endpoints, which are excluded; within the interval the branch does not require an added multiple of π."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/6",
    "problemFocus": "Sine branch interpretation of an inverse tangent with a square root",
    "steps": [
      "Assume a>0 and |x|<a as required by the real denominator. Set θ=arcsin(x/a), then −π/2<θ<π/2 and sinθ=x/a.",
      "The positive cosine equals √(a²−x²)/a, giving tanθ=x/√(a²−x²). Principal arctan therefore returns θ."
    ],
    "answer": "arctan[x/√(a²−x²)] = arcsin(x/a), for a>0 and |x|<a.",
    "check": "The real square root and principal arcsine cosine sign prevent the result from requiring a second-quadrant correction."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/7",
    "problemFocus": "Inverse tangent triple-angle rational identity",
    "steps": [
      "Set θ=arctan(x/a). With a>0 and −a/√3<x<a/√3, θ belongs to (−π/6,π/6) and hence 3θ belongs to principal arctan range (−π/2,π/2).",
      "Apply tan3θ=(3t−t³)/(1−3t²) with t=x/a; multiplying numerator and denominator by a³ gives (3a²x−x³)/(a³−3ax²)."
    ],
    "answer": "arctan[(3a²x−x³)/(a³−3ax²)] = 3 arctan(x/a).",
    "check": "At the domain endpoints the triple-angle tangent has a pole; the given strict bounds keep denominator nonzero and ensure the right principal branch."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/8",
    "problemFocus": "Nested arcsine-cosine-arctangent evaluation",
    "steps": [
      "Principal arcsin(1/2) is π/6; multiplying its value by two gives π/3, with cosine equal to 1/2.",
      "Twice that cosine is 1; the principal arctan of 1 lies in the first quadrant and is π/4."
    ],
    "answer": "The nested inverse-trigonometric expression equals π/4.",
    "check": "Substituting the intermediate arguments gives tan(π/4)=1, matching the final arctangent input."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/9",
    "problemFocus": "Tangent half-sum of arcsine and arccosine parametrisations",
    "steps": [
      "Let α=arctan x and β=arctan y. Since |x|<1, 2α is in (−π/2,π/2) and arcsin[2x/(1+x²)]=2α.",
      "Since y>0, 2β lies in (0,π) and arccos[(1−y²)/(1+y²)]=2β. Halving their sum gives α+β.",
      "Using the tangent addition identity gives (x+y)/(1−xy). The requirement xy<1 and the sign/interval assumptions exclude a tangent pole and select the intended branch."
    ],
    "answer": "tan{½[arcsin(2x/(1+x²))+arccos((1−y²)/(1+y²))]}=(x+y)/(1−xy).",
    "check": "At x=0 the left reduces to tan(arctan y)=y, which agrees with the formula; at y=1 and x=0.5 it gives 3."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/10",
    "problemFocus": "Principal arcsine of a sine outside the primary interval",
    "steps": [
      "The angle 2π/3 is in quadrant II, outside the arcsine principal output interval [−π/2,π/2].",
      "Using sin(2π/3)=sin(π−2π/3)=sin(π/3), choose the representative π/3 that belongs to the principal interval."
    ],
    "answer": "arcsin(sin(2π/3)) = π/3.",
    "check": "Do not cancel inverse sine with sine without a branch check; sin(π/3)=√3/2 and arcsin of that positive value is π/3."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/11",
    "problemFocus": "Principal arctangent of a tangent in quadrant II",
    "steps": [
      "The tangent of 3π/4 equals −1, and 3π/4 does not belong to the arctangent principal output interval (−π/2,π/2).",
      "Subtract π, using tan(3π/4−π)=tan(−π/4)=−1. The equivalent angle −π/4 lies inside the required principal interval."
    ],
    "answer": "arctan(tan(3π/4)) = −π/4.",
    "check": "Both tangent values are −1, but only −π/4 belongs to the principal arctangent range."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/12",
    "problemFocus": "Tangent of an arcsine-plus-arccotangent expression",
    "steps": [
      "Let α=arcsin(3/5), giving sinα=3/5, cosα=4/5 and tanα=3/4 in quadrant I.",
      "Let β=arccot(3/2), so β lies in (0,π/2) and tanβ=2/3. Use tan(α+β)=(tanα+tanβ)/(1−tanα tanβ).",
      "Substituting gives (3/4+2/3)/(1−(3/4)(2/3))=(17/12)/(1/2)=17/6."
    ],
    "answer": "tan[arcsin(3/5)+arccot(3/2)] = 17/6.",
    "check": "Both component angles are acute and their tangent product is only 1/2, so the tangent-addition denominator remains positive."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/13",
    "problemFocus": "Principal arccosine folding of a seven-pi-over-six angle",
    "steps": [
      "Cosine at 7π/6 equals −√3/2 because the angle is in the third quadrant with reference angle π/6.",
      "The principal arccosine branch is [0,π]; its angle having cosine −√3/2 is π−π/6=5π/6."
    ],
    "answer": "Correct option B: arccos(cos(7π/6)) = 5π/6.",
    "check": "The alternative 7π/6 has the same cosine but lies outside the allowed principal branch."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/14",
    "problemFocus": "Sine of a shifted negative arcsine value",
    "steps": [
      "Principal arcsin(−1/2)=−π/6 because arcsine returns values in [−π/2,π/2].",
      "The requested argument is π/3−(−π/6)=π/2, and sin(π/2) has the value one."
    ],
    "answer": "Correct option D: sin[π/3−arcsin(−1/2)] = 1.",
    "check": "The negative sign inside arcsine must be retained; replacing the arcsine value by +π/6 would give the wrong choice."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.2/15",
    "problemFocus": "Inverse tangent minus inverse cotangent with a negative cotangent",
    "steps": [
      "Principal arctan(√3)=π/3. For inverse cotangent use the textbook range (0,π); the angle whose cotangent equals −√3 is 5π/6.",
      "Subtract to obtain π/3−5π/6=(2π−5π)/6=−π/2."
    ],
    "answer": "Correct option B: arctan(√3)−arccot(−√3)=−π/2.",
    "check": "Using an inverse cotangent range of (−π/2,π/2) would give a different answer and is not this textbook's specified branch."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/1",
    "problemFocus": "Principal arccosine of thirteen-pi-over-six",
    "steps": [
      "Subtract the full turn 2π from 13π/6 to obtain π/6, without changing the cosine value.",
      "Because π/6 lies in [0,π], the principal arccosine returns that representative directly."
    ],
    "answer": "arccos(cos(13π/6)) = π/6.",
    "check": "Cosine of 13π/6 equals √3/2, and principal arccosine of √3/2 is π/6."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/2",
    "problemFocus": "Principal arctangent of seven-pi-over-six",
    "steps": [
      "Tangent has period π; tan(7π/6)=tan(π/6)=1/√3.",
      "Since π/6 belongs to the principal arctangent interval (−π/2,π/2), the inverse returns π/6."
    ],
    "answer": "arctan(tan(7π/6)) = π/6.",
    "check": "Subtracting π changes the angle but not its tangent, and yields the unique angle in the principal branch."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/3",
    "problemFocus": "Inverse sine double-angle equals inverse tangent of twenty-four-sevenths",
    "steps": [
      "Let θ=arcsin(3/5), so θ∈(0,π/2), sinθ=3/5, cosθ=4/5 and tanθ=3/4.",
      "Double-angle formula tan2θ=2tanθ/(1−tan²θ)=(3/2)/(1−9/16)=24/7. Because θ≈0.644 rad, 2θ≈1.287 rad is still within (−π/2,π/2)."
    ],
    "answer": "2 arcsin(3/5) = arctan(24/7).",
    "check": "The principal angle check is essential: 2θ≈1.287<π/2, so arctan of its tangent returns 2θ without folding."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/4",
    "problemFocus": "Two arcsines become an arctangent by sine and cosine addition",
    "steps": [
      "Write α=arcsin(8/17) with sinα=8/17 and cosα=15/17; β=arcsin(3/5) with sinβ=3/5 and cosβ=4/5.",
      "Sine addition gives sin(α+β)=(8×4+15×3)/85=77/85; cosine addition gives cos(α+β)=(15×4−8×3)/85=36/85.",
      "Both sine and cosine are positive, so α+β is acute and tan(α+β)=(77/85)/(36/85)=77/36."
    ],
    "answer": "arcsin(8/17)+arcsin(3/5) = arctan(77/36).",
    "check": "Since cos(α+β)>0 and sin(α+β)>0, arctangent returns the correct first-quadrant angle."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/5",
    "problemFocus": "Sum of two arccosines expressed as one arccosine",
    "steps": [
      "Let α=arccos(4/5), hence cosα=4/5, sinα=3/5; let β=arccos(12/13), hence cosβ=12/13, sinβ=5/13.",
      "Cosine addition gives cos(α+β)=48/65−15/65=33/65. Since α and β are acute, their sum lies within [0,π]."
    ],
    "answer": "arccos(4/5)+arccos(12/13) = arccos(33/65).",
    "check": "The sum of the two acute angles is less than π, ensuring arccos returns the same sum rather than a supplementary angle."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/6",
    "problemFocus": "Arccosine-plus-arcsine as a single arcsine",
    "steps": [
      "Let α=arccos(12/13), so sinα=5/13, cosα=12/13; let β=arcsin(3/5), so sinβ=3/5, cosβ=4/5.",
      "Apply sin(α+β)=(5×4+12×3)/65=56/65 and cos(α+β)=(12×4−5×3)/65=33/65>0.",
      "Both angles and their sum are acute, so the principal arcsine of 56/65 equals α+β."
    ],
    "answer": "arccos(12/13)+arcsin(3/5) = arcsin(56/65).",
    "check": "Cosine of the combined angle is +33/65, excluding the second-quadrant supplementary solution that has the same sine."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/7",
    "problemFocus": "A two-angle tangent identity producing sixty-three-sixteenths",
    "steps": [
      "Set α=arcsin(5/13), yielding tanα=5/12, and β=arccos(3/5), yielding tanβ=4/3; both angles are acute.",
      "Tangent addition gives tan(α+β)=(5/12+4/3)/(1−(5/12)(4/3))=(21/12)/(4/9)=63/16.",
      "The sum is acute because cos(α+β)>0; arctangent then returns α+β as its principal value."
    ],
    "answer": "arcsin(5/13)+arccos(3/5) = arctan(63/16).",
    "check": "The positive denominator in tangent addition and positive cosine of the sum prevent a principal-branch offset of π."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/8",
    "problemFocus": "Half of an inverse cosine equals an inverse tangent of square root",
    "steps": [
      "Let θ=arctan√x for x∈[0,1]. Then θ∈[0,π/4], so 2θ∈[0,π/2], safely within the arccosine principal range.",
      "Use cos2θ=(1−tan²θ)/(1+tan²θ)=(1−x)/(1+x), and apply principal arccosine to both sides."
    ],
    "answer": "arctan√x = ½ arccos[(1−x)/(1+x)] for 0≤x≤1.",
    "check": "Check x=0 gives 0 on both sides; x=1 gives π/4 on both sides, and neither endpoint violates the principal range."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/9",
    "problemFocus": "Inverse cotangent of two square-root trigonometric combinations",
    "steps": [
      "For 0<x<π/4, set t=x/2 with 0<t<π/8. Both sin t and cos t are positive, and √(1+sin x)=cos t+sin t.",
      "Likewise √(1−sin x)=cos t−sin t, because cos t>sin t. Their sum equals 2cos t and difference equals 2sin t.",
      "The square-root ratio is cot t; the textbook's principal arccotangent branch (0,π) therefore returns t=x/2."
    ],
    "answer": "The inverse-cotangent expression equals x/2 for 0<x<π/4.",
    "check": "Squaring each half-angle expression gives 1±2sin t cos t=1±sin x, and the domain fixes the positive square-root signs."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/10",
    "problemFocus": "Inverse tangent radical fraction expressed through half arccosine",
    "steps": [
      "Let x=cos2θ for −1/√2≤x≤1. Then principal 2θ=arccos x belongs to [0,3π/4], so θ belongs to [0,3π/8].",
      "Use √(1+x)=√2cosθ and √(1−x)=√2sinθ. Their difference divided by their sum is (cosθ−sinθ)/(cosθ+sinθ)=tan(π/4−θ).",
      "The angle π/4−θ belongs to [−π/8,π/4], inside the principal arctangent interval, giving the desired expression."
    ],
    "answer": "arctan[(√(1+x)−√(1−x))/(√(1+x)+√(1−x))] = π/4−½ arccos x.",
    "check": "At x=1 the fraction equals 1 and arctan gives π/4; at x=0 it gives 0 and the right side also vanishes."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/11",
    "problemFocus": "Solving an inverse-tangent equation involving cosine and cosecant",
    "steps": [
      "With sin x≠0, tan[2 arctan(cos x)]=2cos x/(1−cos² x)=2cos x/sin² x.",
      "Equating this with tan[arctan(2 csc x)]=2/sin x gives cos x=sin x; the double-angle left side and single arctan right side both stay inside [−π/2,π/2], so tangent equality is legitimate."
    ],
    "answer": "General real solution x=π/4+nπ for any integer n.",
    "check": "For each x=π/4+nπ, cos x=sin x=±1/√2 and both inverse tangent sides evaluate to the same signed value."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/12",
    "problemFocus": "Solving arctangent fractional expression against half arctangent",
    "steps": [
      "Set θ=arctan x with x>0, so θ∈(0,π/2). The fraction (1−x)/(1+x)=tan(π/4−θ).",
      "Because π/4−θ lies in (−π/4,π/4), principal arctangent returns π/4−θ. The equation becomes π/4−θ=θ/2, hence θ=π/6."
    ],
    "answer": "The unique positive solution is x=tan(π/6)=1/√3.",
    "check": "At x=1/√3, the fractional term and the half-angle both equal tan(π/12); all assumed branch and positivity constraints hold."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/13",
    "problemFocus": "Principal choice for sine of an arctangent",
    "steps": [
      "Set θ=arctan x. Since −π/2<θ<π/2, cosine is positive, and tanθ=x.",
      "Use sinθ=tanθ/√(1+tan²θ), preserving the sign of x because cosine is positive in the principal interval."
    ],
    "answer": "Correct option D: sin(arctan x)=x/√(1+x²).",
    "check": "The result lies between −1 and 1, preserves odd symmetry in x, and equals zero at x=0."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "misc/14",
    "problemFocus": "Determining the only feasible root of a shifted arcsine equation",
    "steps": [
      "The inverse sine arguments require 0≤x≤1: one needs x∈[−1,1] and 1−x∈[−1,1] simultaneously.",
      "For x in [0,1], arcsin(1−x)≤π/2 and −2arcsin x≤0. Equality of their sum with π/2 occurs only when arcsin(1−x)=π/2 and arcsin x=0, which both require x=0."
    ],
    "answer": "Correct option C: x=0 is the only solution.",
    "check": "Direct substitution gives arcsin(1)−2arcsin(0)=π/2; every x>0 decreases the first term and subtracts a positive second term."
  }
]);
