// Original physics teaching responses, not NCERT question reproductions.
// NCERT provided PDF has conflicting 2025-26 rendered and 2026-27 extraction footers.
export const PHYSICS4_INDEX=Object.freeze({officialPdf:'https://www.ncert.nic.in/textbook/pdf/leph104.pdf',reprint:'2026-27',reprintVerified:false,reprintEvidence:'Rendered exercise footer reads 2025-26; extracted PDF text reads 2026-27. Independent edition confirmation pending.',exerciseLabels:['Exercises'],questionIds:Object.freeze(Array.from({length:13},(_,i)=>'4.'+(i+1)))});
export const PHYSICS4_DRAFTS=Object.freeze([
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.1",
    "problemFocus": "Central field of circular coil",
    "steps": [
      "Use Biot–Savart B=μ₀NI/(2r) for N=100, I=0.40 A, and radius r=0.080 m.",
      "Substitute B=4π×10⁻⁷×100×0.40/(2×0.080) tesla, preserving radius conversion from centimetres."
    ],
    "answer": "The field is 3.14×10⁻⁴ T (0.314 millitesla).",
    "check": "The expression has tesla units and inverse-radius dependence, so a doubled radius would halve the result."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.2",
    "problemFocus": "Magnetic field beside a long straight conductor",
    "steps": [
      "Apply Ampère's circular-law result B=μ₀I/(2πr), appropriate to a long straight wire away from its ends.",
      "For I=35 A and r=0.20 m, multiply 2×10⁻⁷ by 35/0.20 to obtain B in tesla."
    ],
    "answer": "Magnetic field magnitude B=3.50×10⁻⁵ T.",
    "check": "Current and separation enter linearly and inversely, respectively; moving twice as far reduces B by half."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.3",
    "problemFocus": "Right-hand direction east of southward current",
    "steps": [
      "Use east as +x, north as +y and up as +z. Current north-to-south points −y; the observation point east of the wire lies +x.",
      "For I=50 A and r=2.5 m, B=μ₀I/(2πr)=4.0×10⁻⁶ T; cross product of −y current with +x radial direction points +z."
    ],
    "answer": "B=4.00×10⁻⁶ T, vertically upward at the eastward point.",
    "check": "The field circles the conductor; reversing north-to-south current would reverse the upward direction."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.4",
    "problemFocus": "Field south below overhead westbound power line",
    "steps": [
      "Use east +x, north +y and vertical up +z. East-to-west current is −x and the location below the wire lies −z.",
      "Use B=μ₀I/(2πr) with 90 A and 1.5 m, giving 1.2×10⁻⁵ T. Cross product (−x)×(−z) points −y (south)."
    ],
    "answer": "B=1.20×10⁻⁵ T directed south at the point below the conductor.",
    "check": "The direction is perpendicular to both westbound current and downward radial displacement, as Biot–Savart requires."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.5",
    "problemFocus": "Magnetic force per metre on angled conductor",
    "steps": [
      "Start with F=I L B sinθ, the magnitude of current-element vector cross magnetic field. Divide both sides by L.",
      "Substitute I=8 A, B=0.15 T, θ=30 degrees and sin30°=0.5, obtaining 8×0.15×0.5 N per metre."
    ],
    "answer": "Force per unit length is 0.60 N/m.",
    "check": "For a parallel field the force vanishes; for a perpendicular field it would be 1.2 N/m, twice this value."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.6",
    "problemFocus": "Magnetic force inside solenoid",
    "steps": [
      "A 3.0 cm long straight conductor has SI length 0.030 m and carries 10 A perpendicular to the 0.27 T internal field.",
      "Apply magnitude F=I L B sin90°=10×0.030×0.27×1 in newtons; the field direction controls the force orientation."
    ],
    "answer": "The wire experiences magnetic-force magnitude 0.081 N.",
    "check": "Using 3.0 rather than 0.030 as the metre length would be a factor-100 conversion error."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.7",
    "problemFocus": "Attraction between parallel current-carrying wires",
    "steps": [
      "For two long wires at spacing d=0.040 m carrying 8 A and 5 A parallel same-direction currents, use F/L=μ₀I₁I₂/(2πd).",
      "For a 0.10 m length, F=2×10⁻⁷×8×5×0.10/0.040=2.00×10⁻⁵ N."
    ],
    "answer": "Wire A feels 2.00×10⁻⁵ N toward wire B, so the interaction is attractive.",
    "check": "Equal-current direction corresponds to attraction, while reversing one current reverses this force."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.8",
    "problemFocus": "Solenoid field from five stacked winding layers",
    "steps": [
      "There are 5×400=2000 turns along 80 cm or 0.80 m. The turn density is therefore n=2500 turns/m.",
      "Near the centre of a long solenoid, B≈μ₀nI=(4π×10⁻⁷)×2500×8.0 tesla."
    ],
    "answer": "The estimated magnetic field is 2.51×10⁻² T (25.1 millitesla).",
    "check": "Diameter 1.8 cm is far below length 80 cm, supporting the long-solenoid centre approximation."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.9",
    "problemFocus": "Magnetic torque on square multicoil",
    "steps": [
      "For square side 10 cm, area A=(0.10 m)²=0.010 m². With N=20 turns and I=12 A, dipole moment m=NIA=2.4 A m².",
      "Use torque τ=mB sinθ=2.4×0.80×sin30°=2.4×0.80×0.5 N m."
    ],
    "answer": "The square coil has torque magnitude 0.960 N m.",
    "check": "The torque would vanish for magnetic moment parallel to the field and peak at ninety degrees."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.10",
    "problemFocus": "Two meter current and voltage sensitivity ratios",
    "steps": [
      "At equal torsional stiffness, current sensitivity is deflection/current proportional to N A B. The M₂/M₁ ratio is (42×0.0018×0.50)/(30×0.0036×0.25)=1.40.",
      "Voltage sensitivity is current sensitivity divided by coil resistance, so the voltage ratio is 1.40×(10/14)=1.00."
    ],
    "answer": "Sensitivity ratio M₂/M₁: current 1.40 and voltage 1.00 (equal).",
    "check": "The larger resistance of meter two exactly compensates for its higher current sensitivity, consistent with their ratios."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.11",
    "problemFocus": "Electron circular orbit radius in perpendicular field",
    "steps": [
      "Magnetic Lorentz force remains normal to electron velocity and supplies the centripetal force, so electron speed is constant and the path circular.",
      "Set mv²/r=evB and rearrange r=mv/(eB). Insert m=9.1×10⁻³¹ kg, v=4.8×10⁶ m/s, e=1.5×10⁻¹⁹ C, B=6.5×10⁻⁴ T."
    ],
    "answer": "Electron orbit radius r=4.48×10⁻² m, about 4.48 cm.",
    "check": "For unchanged field, increasing speed increases radius but not cyclotron frequency; the electron's sign changes curvature sense."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.12",
    "problemFocus": "Cyclotron frequency and speed independence",
    "steps": [
      "From the circular-orbit condition, angular frequency ω=v/r=eB/m; velocity cancels because radius is proportional to velocity.",
      "With the exercise's supplied electron charge, magnetic field and mass, evaluate f=ω/(2π)=eB/(2πm)."
    ],
    "answer": "Electron frequency f≈1.71×10⁷ Hz; it does not depend on speed in the nonrelativistic model.",
    "check": "Substituting r=mv/(eB) into f=v/(2πr) explicitly cancels the speed term."
  },
  {
    "lessonId": "chapter-physics-4",
    "questionId": "4.13",
    "problemFocus": "Counter torque and irregular coil shape effect",
    "steps": [
      "Part (a): circular coil area is π(0.080 m)², N=30, I=6.0 A and B=1.0 T. The angle between its normal and B is 60 degrees.",
      "Compute τ=NIAB sinθ=30×6×π×0.080²×sin60°≈3.134 N m. Part (b): a planar coil of the same area and orientation has the same magnetic dipole moment."
    ],
    "answer": "Part (a) requires 3.13 N m counter torque; part (b) gives the same value for an irregular planar coil of equal area.",
    "check": "In a uniform magnetic field the torque depends on current, turns, enclosed vector area and orientation, not the outline shape."
  }
]);
