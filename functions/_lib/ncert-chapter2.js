// Original editorial drafts for official NCERT 2026–27 chapter PDFs.
export const MORE_INDEXES=Object.freeze({
 'chapter-physics-2':Object.freeze({officialPdf:'https://ncert.nic.in/textbook/pdf/leph102.pdf',reprint:'2026-27',exerciseLabels:['End-of-chapter Exercises'],questionIds:Object.freeze(Array.from({length:11},(_,i)=>'2.'+(i+1)))}),
 'chapter-mathematics-2':Object.freeze({officialPdf:'https://ncert.nic.in/textbook/pdf/lemh102.pdf',reprint:'2026-27',exerciseLabels:['Exercise 2.1','Exercise 2.2','Miscellaneous Exercise'],questionIds:Object.freeze([...Array.from({length:14},(_,i)=>'2.1/'+(i+1)),...Array.from({length:15},(_,i)=>'2.2/'+(i+1)),...Array.from({length:14},(_,i)=>'misc/'+(i+1))])})
});
export const CH2_WORKED_DRAFTS=Object.freeze([
  {
    "lessonId": "chapter-physics-2",
    "questionId": "2.1",
    "problemFocus": "Zero potential of unlike charges",
    "steps": [
      "Place +5×10⁻⁸ C at x=0 and −3×10⁻⁸ C at x=0.16 m; zero net potential requires 5/|x|=3/|x−0.16|.",
      "Between the charges, 5(0.16−x)=3x gives x=0.10 m; beyond the negative charge, 5(x−0.16)=3x gives x=0.40 m. The left-hand region yields no valid root."
    ],
    "answer": "x=0.10 m and x=0.40 m measured from the positive charge.",
    "check": "At x=0.10 m, 5/0.10=3/0.06; at x=0.40 m, 5/0.40=3/0.24. Both pairs of potential magnitudes match."
  },
  {
    "lessonId": "chapter-physics-2",
    "questionId": "2.2",
    "problemFocus": "Potential at regular hexagon centre",
    "steps": [
      "For a regular hexagon, the distance from any vertex to its centre equals the side length 0.10m.",
      "The potential adds scalarly as six times kq/r, with q=5 millicoulombs (5 mC = 5×10⁻³ C) and r=0.10 m; V=6×(8.99×10⁹)×(5×10⁻³)/(0.10)."
    ],
    "answer": "V≈2.70×10⁹ V at the centre",
    "check": "The vector electric field vanishes by symmetry, but all positive potentials add."
  },
  {
    "lessonId": "chapter-physics-2",
    "questionId": "2.3",
    "problemFocus": "Dipole equipotential bisector",
    "steps": [
      "The perpendicular bisector is equidistant from equal positive and negative source charges.",
      "On that plane, potential kq/r−kq/r vanishes; electric field is perpendicular from the positive to negative charge."
    ],
    "answer": "Perpendicular-bisector plane V=0, field normal from + to −",
    "check": "Equal potentials cancel by sign, but their electric fields need not cancel."
  },
  {
    "lessonId": "chapter-physics-2",
    "questionId": "2.4",
    "problemFocus": "Electric field of conducting sphere",
    "steps": [
      "Electrostatic equilibrium requires zero field inside a metallic conducting sphere.",
      "For exterior points use E=kQ/r² with Q=1.6×10⁻⁷C, evaluating separately at r=.12m and .18m."
    ],
    "answer": "Inside zero; outside ≈1.00×10⁵ and ≈4.44×10⁴ N/C",
    "check": "The ratio for r=.18m and r=.12m equals four ninths."
  },
  {
    "lessonId": "chapter-physics-2",
    "questionId": "2.5",
    "problemFocus": "Capacitance and dielectric insertion",
    "steps": [
      "Parallel-plate capacitance is proportional to dielectric constant divided by plate separation.",
      "Halving separation contributes factor two and dielectric κ=6 adds factor six; multiply 8pF by twelve."
    ],
    "answer": "New capacitance = 96 pF",
    "check": "Both independent geometry changes increase capacitance by the expected factors."
  },
  {
    "lessonId": "chapter-physics-2",
    "questionId": "2.6",
    "problemFocus": "Equivalent series capacitance",
    "steps": [
      "For three equal 9pF capacitors the sum of reciprocals gives Ceq=3pF.",
      "Their common series charge makes voltage equal across identical capacitors; divide 120V into three."
    ],
    "answer": "Equivalent 3 pF; each voltage = 40 V",
    "check": "Three 40V potential differences sum to the applied 120V."
  },
  {
    "lessonId": "chapter-physics-2",
    "questionId": "2.7",
    "problemFocus": "Parallel capacitances and charges",
    "steps": [
      "In parallel the capacitances 2, 3 and 4 pF add to an equivalent 9pF.",
      "Each shares 100V; use Q=CV separately to obtain 200pC, 300pC and 400pC."
    ],
    "answer": "Equivalent 9 pF; charges 200, 300 and 400 pC",
    "check": "The total equals 900pC, matching Ceq times voltage."
  },
  {
    "lessonId": "chapter-physics-2",
    "questionId": "2.8",
    "problemFocus": "Air plate capacitance",
    "steps": [
      "Area-to-gap ratio is (6×10⁻³m²)/(3×10⁻³m)=2m, so C=2ε₀.",
      "Thus capacitance is 17.7pF; multiplying by 100V produces 1.77nC of charge on each plate."
    ],
    "answer": "C≈17.7 pF; magnitudes Q≈1.77 nC",
    "check": "The positive and negative plates have equal magnitude but opposite signs."
  },
  {
    "lessonId": "chapter-physics-2",
    "questionId": "2.9",
    "problemFocus": "Dielectric with battery and without battery",
    "steps": [
      "A κ=6 dielectric occupying the full capacitor gap multiplies its capacitance by six.",
      "Battery connected holds 100V fixed and increases Q sixfold; isolated capacitor holds Q fixed and voltage falls sixfold."
    ],
    "answer": "Connected Q≈10.6 nC; isolated Q≈1.77 nC and V≈16.7 V",
    "check": "Stored energy grows sixfold at fixed V and falls sixfold at fixed Q."
  },
  {
    "lessonId": "chapter-physics-2",
    "questionId": "2.10",
    "problemFocus": "Energy stored in 12pF capacitor",
    "steps": [
      "The electric energy relation for a charged capacitor is U=½CV² with C in farads.",
      "Insert C=12×10⁻¹² farads and voltage 50V; calculate 0.5×12×10⁻¹²×2500 joules."
    ],
    "answer": "Stored energy =1.50×10⁻⁸ J",
    "check": "The formula's dimensions are farad-volt squared, which equal joules."
  },
  {
    "lessonId": "chapter-physics-2",
    "questionId": "2.11",
    "problemFocus": "Energy lost in equal charge-sharing capacitors",
    "steps": [
      "Initial energy of the 600pF, 200V capacitor is ½CV²=12 microjoules.",
      "After connecting an equal uncharged capacitor, both are at 100V and share a combined energy of 6 microjoules."
    ],
    "answer": "Energy lost =6.0×10⁻⁶ J",
    "check": "The energy stored after equilibration is half the initial energy."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/1",
    "problemFocus": "Principal inverse sine negative half",
    "steps": [
      "Inverse sine uses the closed principal range from −π/2 to π/2.",
      "The sine of −π/6 equals −1/2 and the negative reference angle lies in this interval."
    ],
    "answer": "−π/6 (principal value)",
    "check": "Direct substitution of the angle returns the original value −1/2."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/2",
    "problemFocus": "Principal inverse cosine root three over two",
    "steps": [
      "The inverse cosine returns a principal value between zero and π.",
      "At angle π/6 cosine is √3/2, giving exactly the requested argument."
    ],
    "answer": "π/6 (principal value)",
    "check": "The evaluated cosine agrees and angle lies within the branch."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/3",
    "problemFocus": "Principal inverse cosecant two",
    "steps": [
      "Convert cosecant equal to two into sine equal to one half.",
      "The positive reference angle π/6 is permitted by the inverse cosecant principal branch."
    ],
    "answer": "π/6 (principal value)",
    "check": "Taking cosecant of π/6 returns exactly two."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/4",
    "problemFocus": "Principal inverse tangent negative root three",
    "steps": [
      "The principal inverse tangent interval is −π/2 to π/2, excluding endpoints.",
      "Tangent of −π/3 equals −√3; this negative angle lies inside the valid interval."
    ],
    "answer": "−π/3 (principal value)",
    "check": "Substituting tangent reproduces the argument and respects the branch."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/5",
    "problemFocus": "Principal inverse cosine negative half",
    "steps": [
      "Cosine is negative in the second quadrant of the arccosine principal range.",
      "The reference angle is π/3, so the principal angle is π−π/3=2π/3."
    ],
    "answer": "2π/3 (principal value)",
    "check": "Cosine of 2π/3 equals −1/2 without changing branch."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/6",
    "problemFocus": "Principal inverse tangent negative one",
    "steps": [
      "Inverse tangent requires the output angle to lie between −π/2 and π/2.",
      "Tangent of negative π/4 is −1 and the value lies in that principal interval."
    ],
    "answer": "−π/4 (principal value)",
    "check": "The negative quarter-turn angle has the required tangent."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/7",
    "problemFocus": "Principal inverse secant two over root three",
    "steps": [
      "Take reciprocal to obtain the equivalent cosine value √3/2.",
      "The angle π/6 satisfies cosine and lies in the secant principal branch excluding π/2."
    ],
    "answer": "π/6 (principal value)",
    "check": "The secant of π/6 is precisely two divided by √3."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/8",
    "problemFocus": "Principal inverse cotangent root three",
    "steps": [
      "Cotangent equals √3 at the standard positive reference angle π/6.",
      "The inverse cotangent principal branch is (0,π), so choose the acute angle π/6."
    ],
    "answer": "π/6 (principal value)",
    "check": "This angle gives the required cotangent and stays away from branch endpoints."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/9",
    "problemFocus": "Principal inverse cosine negative inverse root two",
    "steps": [
      "The negative cosine is in quadrant two of the arccosine branch [0,π].",
      "Subtract the reference angle π/4 from π to get the second quadrant principal value."
    ],
    "answer": "3π/4 (principal value)",
    "check": "Cosine of 3π/4 equals the requested −1/√2."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/10",
    "problemFocus": "Principal inverse cosecant negative root two",
    "steps": [
      "Taking the reciprocal makes sine equal to negative one over root two.",
      "The principal inverse cosecant value is negative π/4, the allowed negative reference angle."
    ],
    "answer": "−π/4 (principal value)",
    "check": "Cosecant of −π/4 returns −√2 in the prescribed branch."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/11",
    "problemFocus": "Sum of principal inverse function values",
    "steps": [
      "Evaluate arctan(1)=π/4, arccos(−1/2)=2π/3 and arcsin(−1/2)=−π/6.",
      "Add with common denominator twelve: (3+8−2)π/12=9π/12=3π/4."
    ],
    "answer": "3π/4 (sum of principal values)",
    "check": "The arithmetic preserves the negative arcsine term."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/12",
    "problemFocus": "Arccosine half plus twice arcsine half",
    "steps": [
      "Use arccos(1/2)=π/3 and arcsin(1/2)=π/6 in their branches.",
      "Substitute and combine π/3+2×(π/6)=π/3+π/3."
    ],
    "answer": "2π/3 (sum of principal values)",
    "check": "Both individual principal angles reproduce the specified arguments."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/13",
    "problemFocus": "Principal inverse sine range",
    "steps": [
      "The arcsine range includes both endpoints −π/2 and π/2.",
      "These endpoints are attained for arguments −1 and +1, ruling out strict inequalities."
    ],
    "answer": "option B: −π/2 ≤ y ≤ π/2",
    "check": "The closed range is required because arcsin is defined at ±1."
  },
  {
    "lessonId": "chapter-mathematics-2",
    "questionId": "2.1/14",
    "problemFocus": "Principal inverse tangent minus inverse secant",
    "steps": [
      "The first principal angle is arctan(√3)=π/3 in quadrant one.",
      "The second is arcsec(−2)=2π/3 in quadrant two; subtract to get π/3−2π/3."
    ],
    "answer": "−π/3 (option B)",
    "check": "Secant at 2π/3 is −2, confirming the subtraction branch."
  }
]);
