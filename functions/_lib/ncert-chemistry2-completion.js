// Original NCERT 2026–27 Chemistry Unit 2 answers keyed to source-confirmed
// printed question numbers. These are editorial drafts pending teacher review.
export const CHEMISTRY2_COMPLETION_DRAFTS=Object.freeze([
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.4",
    "problemFocus": "Standard potentials, standard Gibbs energies and equilibria of two galvanic reactions",
    "steps": [
      "For Cr metal oxidation against Cd²⁺ reduction, E°cell=E°(Cd²⁺/Cd)−E°(Cr³⁺/Cr)=−0.40−(−0.74)=+0.34 V. Balance electrons: 2Cr+3Cd²⁺→2Cr³⁺+3Cd, hence n=6.",
      "At 298 K, ΔrG°=−nFE°=−6×96485×0.34≈−196.8 kJ mol⁻¹. log10 K=nE°/0.05916≈34.48, so K≈3.0×10³⁴.",
      "For Fe²⁺ oxidation with Ag⁺ reduction, E°cell=E°(Ag⁺/Ag)−E°(Fe³⁺/Fe²⁺)=0.80−0.77=+0.03 V; n=1. Hence ΔrG°≈−2.89 kJ mol⁻¹ and log10 K=0.03/0.05916≈0.507, K≈3.2."
    ],
    "answer": "Reaction (i): E°≈+0.34 V, ΔrG°≈−197 kJ mol⁻¹, K≈3.0×10³⁴; (ii): E°≈+0.03 V, ΔrG°≈−2.89 kJ mol⁻¹, K≈3.2.",
    "check": "The signs obey ΔG°=−nFE°; positive standard cell EMF predicts K>1. Small changes to tabulated E° affect equilibrium constant significantly."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.5",
    "problemFocus": "Four Nernst EMFs at 298 K with reaction quotient and units",
    "steps": [
      "Use E=E°−(0.05916/n)log10 Q at 298 K. For Mg|Mg²⁺(0.001)||Cu²⁺(0.0001)|Cu, E°=0.34−(−2.37)=2.71 V, Q=0.001/0.0001=10, n=2. E≈2.680 V.",
      "For Fe|Fe²⁺(0.001)||H⁺(1)|H₂(1 bar)|Pt, E°=0−(−0.44)=0.44 V, Q=0.001/(1)²=0.001 and n=2, giving E≈0.529 V.",
      "For Sn|Sn²⁺(0.050)||H⁺(0.020)|H₂(1 bar)|Pt, E°≈0.14 V and Q=0.050/(0.020)²=125; n=2 gives E≈0.078 V.",
      "For Pt|Br⁻(0.010)|Br₂(l)||H⁺(0.030)|H₂(1 bar)|Pt, E°=0−1.09=−1.09 V and Q=1/(0.010²×0.030²)≈1.11×10⁷; n=2 gives E≈−1.298 V."
    ],
    "answer": "Four cell EMFs ≈(i) +2.680 V; (ii) +0.529 V; (iii) +0.078 V; (iv) −1.298 V using the stated standard-potential rounding.",
    "check": "Every quotient follows the balanced total cell reaction, not arbitrary inversion; the negative fourth EMF corresponds to the nonspontaneous direction as written."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.6",
    "problemFocus": "Standard Gibbs energy and emf of the Zn–Ag₂O button-cell reaction",
    "steps": [
      "The reaction Zn(s)+Ag₂O(s)+H₂O(l)→Zn²⁺(aq)+2Ag(s)+2OH⁻(aq) transfers n=2 mol electrons per mole reaction.",
      "Using tabulated standard reductions E°(Ag₂O/Ag in alkali)≈+0.34 V and E°(Zn²⁺/Zn)≈−0.76 V, E°cell≈+1.10 V. Then ΔrG°=−nFE°≈−2×96485×1.10 J mol⁻¹."
    ],
    "answer": "E°cell≈+1.10 V and ΔrG°≈−212 kJ mol⁻¹ (for tabulated reduction potentials +0.34 and −0.76 V).",
    "check": "A positive emf is consistent with negative Gibbs energy under the stated standard states; the electrolyte pH and electrode convention must match the reference table."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.10",
    "problemFocus": "NaCl conductivity table, five molar conductivities and extrapolated limit",
    "steps": [
      "The textbook gives 10²κ/(S m⁻¹) at c=0.001,0.010,0.020,0.050,0.100 mol/L as 1.237,11.85,23.15,55.53,106.74. Convert κ=(listed number)/100 S/m and c(M)×1000 mol/m³.",
      "Compute Λm=κ/c. In S cm² mol⁻¹ the five results are 123.70, 118.50, 115.75, 111.06 and 106.74 respectively. The abscissae √c are approximately 0.03162,0.10000,0.14142,0.22361 and 0.31623 in √(mol/L).",
      "Plot Λm on the vertical axis against √c on the horizontal axis and extrapolate the near-linear dilute-data trend to √c=0. A least-squares fit across the five provided points gives an approximate intercept 124.75 S cm² mol⁻¹; the estimate depends on fitting and graph precision."
    ],
    "answer": "Λm ≈[123.70, 118.50, 115.75, 111.06, 106.74] S cm² mol⁻¹; graph-extrapolated Λm° ≈125 S cm² mol⁻¹ (approximate).",
    "check": "The limiting value must exceed the concentration-dependent values and is a graphical extrapolation, not a direct reading from any measured finite-concentration sample."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.17",
    "problemFocus": "Thermodynamic feasibility of five redox pairings",
    "steps": [
      "Use E°cell=E°red(oxidant)−E°red(reductant couple). Standard reductions: Fe³⁺/Fe²⁺≈0.77 V, I₂/I⁻≈0.54 V, Ag⁺/Ag≈0.80 V, Cu²⁺/Cu≈0.34 V and Br₂/Br⁻≈1.09 V.",
      "(i) Fe³⁺ oxidising I⁻: E°≈0.77−0.54=+0.23 V (feasible). (ii) Ag⁺ oxidising Cu: E°≈0.80−0.34=+0.46 V (feasible).",
      "(iii) Fe³⁺ oxidising Br⁻: E°≈0.77−1.09=−0.32 V (not feasible). (iv) Fe³⁺ oxidising Ag(s): E°≈0.77−0.80=−0.03 V (not feasible). (v) Br₂ oxidising Fe²⁺: E°≈1.09−0.77=+0.32 V (feasible)."
    ],
    "answer": "Feasibility under standard conditions: (i) Yes; (ii) Yes; (iii) No; (iv) No; (v) Yes.",
    "check": "All predicted spontaneous directions have E°cell>0 and ΔG°<0; this test applies to standard conditions, not an arbitrary nonstandard concentration."
  }
]);
