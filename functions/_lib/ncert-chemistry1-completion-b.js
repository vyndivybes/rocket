// Original educational working for 2026-27 NCERT Solutions Exercises 1.34–1.41.
// Official primary PDF https://www.ncert.nic.in/textbook/pdf/lech101.pdf.
// Uncertified teaching drafts; no copyrighted question text republished.
export const CHEMISTRY1_WORKED_B=Object.freeze([
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.34",
    "problemFocus": "Vapour pressure after dissolving glucose in water at 293 kelvin",
    "steps": [
      "For 450 g water, nwater=450/18=25 mol. For 25 g glucose with molar mass 180 g/mol, nglucose=25/180≈0.13889 mol.",
      "For a nonvolatile solute, Raoult's law predicts p=xwater p° with xwater=25/(25+0.13889). Multiply by the pure-water vapour pressure 17.535 mmHg."
    ],
    "answer": "Solution vapour pressure≈17.438 mmHg at 293 K.",
    "check": "The solute mole fraction is positive, so the result is below 17.535 mmHg as required by ideal vapour-pressure lowering."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.35",
    "problemFocus": "Methane molality from a Henry constant defined in molality units",
    "steps": [
      "The official question provides a Henry coefficient for methane in benzene as 4.27×10^5 mmHg per unit molality. Under that stated convention gas partial pressure equals KH times molality.",
      "At methane partial pressure 760 mmHg, divide 760 by 4.27×10^5 to obtain methane molality in mol per kilogram of benzene."
    ],
    "answer": "Methane molality≈1.78×10⁻³ mol/kg.",
    "check": "This uses the question's concentration-based Henry constant, not the alternative mole-fraction KH convention; the pressure dimensions cancel correctly."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.36",
    "problemFocus": "Pure vapour pressure of a component in an ideal binary liquid",
    "steps": [
      "For component A, nA=100/140≈0.7143 mol; for B, nB=1000/180≈5.5556 mol. Mole fractions are xA≈0.113924 and xB≈0.886076.",
      "Given pure vapour pressure pB°=500 Torr, pB=xB×500≈443.04 Torr. Total measured p=475 Torr, hence pA≈31.962 Torr and pA°=pA/xA."
    ],
    "answer": "Pure vapour pressure of A≈280.6 Torr; partial pressure A≈32.0 Torr.",
    "check": "Adding calculated partial pressures 443.04+31.96 restores 475 Torr; both component pure vapour pressures are positive."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.37",
    "problemFocus": "Detect negative deviation in acetone-chloroform vapour pressure data",
    "steps": [
      "Under ideal Raoult behaviour, an acetone mole fraction of 0.508 implies ideal acetone pressure≈0.508×741.8≈376.8 mmHg; ideal chloroform pressure≈0.492×632.8≈311.3 mmHg.",
      "The printed experiment reports partial pressures 322.7 and 257.7 mmHg, each below its ideal prediction. Total measured pressure≈580.4 mmHg versus ideal total≈688.2 mmHg."
    ],
    "answer": "The mixture shows negative deviation from Raoult's law, indicating net stronger unlike-molecule attractions such as hydrogen bonding.",
    "check": "Plot mole fraction along horizontal axis and each component vapour pressure vertically; both observed component curves fall below ideal straight-line estimates."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.38",
    "problemFocus": "Vapour phase mole fraction of benzene over benzene-toluene solution",
    "steps": [
      "Calculate benzene liquid moles as 80/78.11≈1.0242 and toluene moles as 100/92.14≈1.0853, so benzene liquid mole fraction xB≈0.4855.",
      "Using ideal Raoult behaviour, benzene partial pressure is xB×50.71 mmHg and toluene partial pressure is (1−xB)×32.06 mmHg. Benzene vapour fraction equals pB divided by their sum."
    ],
    "answer": "Benzene mole fraction in vapour≈0.599 (about 59.9 percent).",
    "check": "Vapour is richer in more volatile benzene than liquid because its pure vapour pressure 50.71 mmHg exceeds toluene's 32.06 mmHg."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.39",
    "problemFocus": "Dissolved oxygen and nitrogen mole fractions at ten atmospheres",
    "steps": [
      "At total air pressure 10 atm, use pO2≈0.20×10×760=1520 mmHg and pN2≈0.79×10×760=6004 mmHg with the question's partial air composition.",
      "Henry relation x=p/KH gives xO2=1520/(3.30×10^7)≈4.61×10⁻⁵ and xN2=6004/(6.51×10^7)≈9.22×10⁻⁵."
    ],
    "answer": "Dissolved mole fractions: oxygen≈4.61×10⁻⁵ and nitrogen≈9.22×10⁻⁵.",
    "check": "The dissolved nitrogen fraction is approximately twice the oxygen fraction; they are small and sum to about 1.38×10⁻⁴ as expected for dilute gas solution."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.40",
    "problemFocus": "Calcium chloride mass required from isotonic osmotic pressure",
    "steps": [
      "Assume full dissociation behaviour approximated by the given van't Hoff factor i=2.47. For 2.5 L at 27°C use absolute temperature T≈300 K.",
      "From πV=i nRT, moles of CaCl2 n=(0.75 atm×2.5 L)/(2.47×0.082057 L atm mol⁻¹ K⁻¹×300 K)≈0.03084 mol. Multiply by molar mass 110.98 g/mol."
    ],
    "answer": "Required calcium chloride mass≈3.42 g under ideal dilute osmotic assumptions.",
    "check": "The product i nRT/V reproduces approximately 0.75 atm; this is a textbook osmotic-pressure calculation not a sterile clinical formulation guide."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.41",
    "problemFocus": "Potassium sulfate osmotic pressure for complete dissociation",
    "steps": [
      "Convert 25 mg potassium sulfate to 0.025 g and divide by molar mass about 174.26 g/mol, obtaining 1.435×10⁻⁴ mol in 2.0 L solution.",
      "For K2SO4→2K+ +SO4²−, assume full dissociation and i=3. Apply π=i(n/V)RT with R=0.082057 L atm mol⁻¹ K⁻¹ at T≈298 K."
    ],
    "answer": "Calculated osmotic pressure≈5.26×10⁻³ atm (approximately 0.533 kPa).",
    "check": "The three dissolved ions per formula unit explain i=3; units mol/L times L atm/mol/K times kelvin give atm."
  }
]);
