// Original educational working, unreviewed, for prior gaps in NCERT Solutions 2026-27.
// Source official PDF https://www.ncert.nic.in/textbook/pdf/lech101.pdf. No exercise text copied.
export const CHEMISTRY1_WORKED_A=Object.freeze([
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.15",
    "problemFocus": "Molar mass from relative vapour pressure lowering of a two-percent solution",
    "steps": [
      "Take a 100 g solution basis: 2.00 g nonvolatile solute and 98.0 g water. The vapour pressure lowering is 1.013−1.004=0.009 bar, giving xsolute=0.009/1.013=0.0088845 by Raoult's law.",
      "Water moles are 98/18≈5.4444. From xsolute=nsolute/(nsolute+5.4444), obtain nsolute=xsolute×5.4444/(1−xsolute)≈0.04880 mol and divide 2.00 g by this amount."
    ],
    "answer": "The apparent molar mass of the solute is approximately 41.0 g/mol.",
    "check": "Back-substitute 2/41.0 and 98/18 in the solvent mole fraction; multiplying it by 1.013 bar gives about 1.004 bar as observed."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.19",
    "problemFocus": "Solute molar mass and pure water vapour pressure from two dilutions",
    "steps": [
      "Initially 30 g solute dissolves in 90 g water, giving nwater=5 mol. Adding 18 g water raises nwater to 6 mol, while the measured vapour pressure rises from 2.8 to 2.9 kPa.",
      "For unknown solute amount n, use 2.8=p°×5/(5+n) and 2.9=p°×6/(6+n). Equate p° to solve n≈1.30435 mol; then molar mass=30/1.30435 and p°=2.8(5+n)/5."
    ],
    "answer": "Solute molar mass ≈23.0 g/mol; pure water vapour pressure ≈3.53 kPa.",
    "check": "Using six moles water and solute 1.30435 yields solvent fraction 6/7.30435 and p=3.53×6/7.30435≈2.9 kPa."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.21",
    "problemFocus": "Atomic masses from AB2 and AB4 freezing-point depressions",
    "steps": [
      "For one gram of each molecular solute separately in 20 g benzene with Kf=5.1 K kg/mol, the first depression 2.3 K implies MAB2=5.1/(2.3×0.020)≈110.87 g/mol.",
      "Second depression 1.3 K implies MAB4=5.1/(1.3×0.020)≈196.15 g/mol. Difference is two B atoms, so B=(196.15−110.87)/2≈42.64; A=110.87−2B≈25.59."
    ],
    "answer": "Approximate atomic masses: element A≈25.6 u and element B≈42.6 u.",
    "check": "Reconstruct AB2≈25.6+2×42.6≈110.8 and AB4≈25.6+4×42.6≈196.0, consistent with the two colligative measurements."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.23",
    "problemFocus": "Dominant interactions in five pairs of dissolved solutes and solvents",
    "steps": [
      "Nonpolar n-hexane and n-octane, and iodine in carbon tetrachloride, mix chiefly through London dispersion; their molecular permanent dipoles are minimal.",
      "NaClO4 in water has strong ion–dipole interactions; methanol and acetone can form hydrogen bonds involving methanol O–H and acetone oxygen; acetonitrile and acetone interact primarily through molecular dipoles."
    ],
    "answer": "Pairwise main attractions: (i) dispersion; (ii) dispersion; (iii) ion–dipole; (iv) hydrogen bond/dipole; (v) dipole–dipole.",
    "check": "These are dominant interaction classes, not a claim that other weaker universal dispersion interactions are absent."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.24",
    "problemFocus": "Increasing solubility of four selected solutes in nonpolar octane",
    "steps": [
      "n-Octane is nonpolar and preferentially stabilises nonpolar molecular species via London dispersion. Ionic KCl is poorly accommodated without strong ion–dipole solvation.",
      "Among the polar molecules methanol hydrogen-bonds strongly and acetonitrile is polar aprotic, so both dissolve less than nonpolar cyclohexane; the expected textbook ranking puts methanol below acetonitrile."
    ],
    "answer": "Expected increasing octane solubility: KCl < methanol < acetonitrile < cyclohexane.",
    "check": "The low ionic salt solubility and high hydrocarbon solubility are the robust limits; exact intermediate solubilities depend on temperature and formulation."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.25",
    "problemFocus": "Qualitative solubility of six organic compounds in water",
    "steps": [
      "Polar formic acid and ethylene glycol strongly hydrogen-bond with water and are highly soluble or miscible. The hydroxyl groups of phenol and pentanol support only limited miscibility because their hydrophobic portions remain significant.",
      "Toluene is nonpolar, and chloroform has only slight solubility at ordinary conditions; both fit the poorly soluble comparison group for this NCERT classroom classification."
    ],
    "answer": "Highly soluble: formic acid and ethylene glycol; partially soluble: phenol and pentanol; very poorly soluble: toluene and chloroform.",
    "check": "Chloroform has a small finite water solubility, so 'insoluble' is a relative classroom category rather than strict zero equilibrium solubility."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.26",
    "problemFocus": "Molarity of sodium ions in mineral water and denominator ambiguity",
    "steps": [
      "The water contains 92 g Na+ per kilogram of water, corresponding to 92/23≈4.00 mol Na+ per kg solvent. The liquid density is 1.25 g/mL and an approximate mass basis is needed to express molarity.",
      "If the textbook intends 92 g in one kilogram of solution, volume=1000/1.25=800 mL and c≈4.00/0.800=5.00 M. If the phrase truly means one kilogram water plus 92 g sodium and required counterions, solution mass differs; concentration needs complete composition."
    ],
    "answer": "Common textbook approximation gives c(Na+)≈5.0 M, assuming the kilogram density basis is the sample solution; strict 1 kg-water wording requires total solution mass and counterions.",
    "check": "The calculation 92/23=4 mol is firm, but molarity depends on final volume; this response is explicitly flagged for edition/assumption verification rather than claiming exact laboratory molarity."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.29",
    "problemFocus": "Water mass for the prescribed nalorphene molality word problem",
    "steps": [
      "Convert the mathematical sample 1.5 mg to 0.0015 g and take approximate nalorphene molecular molar mass 311.37 g/mol, yielding nsolute≈4.82×10⁻⁶ mol.",
      "From specified molality 1.5×10⁻³ mol/kg, solvent mass kg=nsolute/molality≈0.00321 kg. This is a stoichiometric exercise only, not a medication formulation procedure."
    ],
    "answer": "Theoretical water mass≈3.21 g for 1.5 mg nalorphene at the stated dilute molality.",
    "check": "Recomputing 4.82×10⁻⁶ mol divided by 0.00321 kg gives 1.5×10⁻³ mol/kg as required."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.31",
    "problemFocus": "Acidity and freezing-point depression for three substituted acids",
    "steps": [
      "In dilute aqueous solutions, each weak monobasic acid produces approximately one extra ion when it dissociates, giving van't Hoff i=1+alpha. Stronger dissociation increases particle concentration and freezing-point depression.",
      "Electron-withdrawing fluorine or trichloromethyl substitution stabilises conjugate bases relative to unsubstituted acetic acid. At equal analytical concentration, trifluoroacetic has the highest effective dissociation, trichloroacetic intermediate and acetic lowest."
    ],
    "answer": "Expected increasing acid dissociation and magnitude of freezing depression: acetic acid < trichloroacetic acid < trifluoroacetic acid.",
    "check": "The trend assumes comparable molal concentrations and idealised colligative behaviour; effective i approaches two for nearly fully dissociated monobasic acids."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.32",
    "problemFocus": "Freezing point of aqueous chlorobutyric acid with known acid constant",
    "steps": [
      "Ten grams acid of molar mass approximately 122.55 g/mol gives 0.08160 mol in 0.250 kg water and molality m≈0.3264 mol/kg. Model HA⇌H+ +A− with i=1+alpha.",
      "Approximate molarity by this dilute molality and solve Ka=0.0014=m alpha²/(1−alpha) for alpha≈0.06338. Then deltaTf=1.86×m×(1+alpha)≈0.6456 K."
    ],
    "answer": "Estimated freezing depression ≈0.646 K and water freezing temperature ≈−0.646°C (about 272.50 K).",
    "check": "The weak-acid relation is approximate because molarity and molality are not exactly interchangeable; back-substitution of alpha gives the supplied Ka to rounding."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.33",
    "problemFocus": "Dissociation and acid strength inferred from observed freezing depression",
    "steps": [
      "For 19.5 g fluoroacetic acid, molar mass ≈78.04 g/mol and 0.500 kg water, molality is approximately 0.4997 mol/kg. Nonionised expected depression is 1.86×0.4997≈0.929 K.",
      "The observed depression is 1.00 K, so i≈1.0758 and alpha=i−1≈0.0758 for a monobasic acid. Using dilute concentration c≈0.500 mol/L, Ka≈c alpha²/(1−alpha)."
    ],
    "answer": "Estimated dissociation alpha≈0.0758 (7.58%) and Ka≈3.1×10⁻³ under the dilute-volume approximation.",
    "check": "Computing (1+0.0758)×1.86×0.4997 gives approximately 1.00 K; precise Ka requires density to convert molality to molarity."
  }
]);
