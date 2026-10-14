// ORIGINAL worked drafts linked by NCERT 2026-27 exercise number; no textbook
// questions or complete scans are embedded. No teacher-certified answer yet.
export const CHEMISTRY_EXERCISE_INDEXES=Object.freeze({
 'chapter-chemistry-1':Object.freeze({
  officialPdf:'https://ncert.nic.in/textbook/pdf/lech101.pdf',
  reprint:'2026-27',
  exerciseLabels:['Exercises (end of Unit 1)'],
  questionIds:Object.freeze(Array.from({length:33},(_,i)=>'1.'+(i+1)))
 }),
 'chapter-chemistry-2':Object.freeze({
  officialPdf:'https://ncert.nic.in/textbook/pdf/lech102.pdf',
  reprint:'2026-27',
  exerciseLabels:['Exercises (end of Unit 2)'],
  questionIds:Object.freeze(Array.from({length:18},(_,i)=>'2.'+(i+1)))
 })
});
export const CHEMISTRY_WORKED_DRAFTS=Object.freeze([
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.1",
    "problemFocus": "Classification of nine kinds of binary solutions",
    "steps": [
      "Classify the solvent's state as gas, liquid or solid; for each, consider a gas, liquid or solid solute.",
      "Illustrate gas/gas with air; liquid/gas with chloroform vapour in nitrogen; solid/gas with camphor in nitrogen; gas/liquid with dissolved oxygen; liquid/liquid ethanol and water; solid/liquid glucose and water; gas/solid hydrogen in palladium; liquid/solid sodium amalgam; solid/solid copper in gold."
    ],
    "answer": "Nine solute–solvent physical-state combinations, each illustrated by a distinct mixture.",
    "check": "The solvent determines the bulk physical state; a solution remains homogeneous rather than a visibly separate phase."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.2",
    "problemFocus": "Gas dissolved in solid solvent",
    "steps": [
      "A solid solution can contain gas particles within a continuous solid host lattice or interstitial sites.",
      "Hydrogen occupies interstitial sites in palladium, which remains the solid solvent; it is not a gas bubble mixture."
    ],
    "answer": "Hydrogen dissolved in palladium is a gas-in-solid solution.",
    "check": "The host remains solid and the dispersed hydrogen is the gaseous solute, meeting both classification criteria."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.3",
    "problemFocus": "Four solution concentration definitions",
    "steps": [
      "Mole fraction is component moles over all component moles, and molality is solute moles per kilogram of solvent.",
      "Molarity is solute moles per litre of final solution; mass percentage is 100 times component mass divided by total solution mass."
    ],
    "answer": "xᵢ=nᵢ/Σn; m=n_solute/kg_solvent; M=n_solute/L_solution; mass%=100 m_component/m_solution.",
    "check": "Mole fraction and mass fraction are dimensionless; molality depends on solvent mass, molarity on final solution volume."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.4",
    "problemFocus": "Nitric acid 68-percent mass and solution density",
    "steps": [
      "Take 1.000 L of solution; using density 1.504 g/mL gives solution mass 1504 g.",
      "Nitric acid makes up 68% of this mass, giving 1022.72 g HNO₃ or about 16.23 mol using 63.01 g/mol."
    ],
    "answer": "Molarity of the nitric acid sample ≈16.2 mol/L.",
    "check": "One litre was used as the volume denominator; acid amount is 1022.72/63.01≈16.23 mol."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.5",
    "problemFocus": "Glucose solution conversion across concentration scales",
    "steps": [
      "Use a 100 g basis: 10 g glucose = 0.05556 mol, and 90 g water =5.000 mol; molality is 0.05556/0.090 kg.",
      "Mole fractions are 0.05556/5.05556 and 5/5.05556. Density 1.2 g/mL makes the solution volume 83.33 mL, giving molarity 0.05556/0.08333 L."
    ],
    "answer": "Molality≈0.617 m; x_glucose≈0.01099; x_water≈0.98901; molarity≈0.667 M.",
    "check": "Both mole fractions sum to unity, and the two concentration denominators are solvent kilograms versus solution litres."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.6",
    "problemFocus": "Hydrochloric acid requirement for equimolar carbonate mixture",
    "steps": [
      "Let n be the amount of each solute. Their combined mass gives n(106+84)=1.00 g, hence n≈0.005263 mol each.",
      "Sodium carbonate consumes 2n moles HCl, while sodium bicarbonate consumes n; total 3n≈0.015789 mol; volume at 0.1 mol/L is n/0.1 in litres."
    ],
    "answer": "About 158 mL of 0.100 M HCl is required.",
    "check": "Using both balanced neutralisations gives total acid stoichiometry 2n+n=3n rather than incorrectly treating both salts alike."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.7",
    "problemFocus": "Mass fraction after blending two solutions",
    "steps": [
      "The first 300 g of 25% solution contributes 75 g of solute; 400 g of 40% solution contributes 160 g.",
      "Masses add to 235 g solute in 700 g final solution; divide 235 by 700 and multiply by 100."
    ],
    "answer": "Final solute concentration≈33.57% by mass.",
    "check": "The result lies between 25% and 40% and is weighted toward the larger second solution."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.8",
    "problemFocus": "Ethylene-glycol molality and molarity",
    "steps": [
      "With glycol molar mass 62 g/mol, 222.6 g provides about 3.5903 mol; 200 g of water is 0.200 kg solvent.",
      "Molality is 3.5903/0.200; total solution mass 422.6 g divided by 1.072 g/mL gives volume≈394.22 mL for molarity."
    ],
    "answer": "Molality≈17.95 mol/kg; molarity≈9.11 mol/L.",
    "check": "Using kilograms of solvent versus litres of solution explains why the numerical concentrations are different."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.9",
    "problemFocus": "Trace chloroform expressed as mass percentage and molality",
    "steps": [
      "Fifteen ppm by mass equals 15 mg of chloroform per kilogram of solution, or 0.0015% of total mass.",
      "For a dilute one-kilogram sample, chloroform mass is 0.015 g ≈0.0001257 mol at 119.38 g/mol; water mass is about 0.999985 kg."
    ],
    "answer": "Mass percentage=0.0015%; molality≈1.26×10⁻⁴ mol/kg.",
    "check": "Ppm is scaled by one million while percent uses one hundred; both use the same mass fraction here."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.10",
    "problemFocus": "Ethanol and water molecular interactions",
    "steps": [
      "Both water and alcohol have polar O–H groups and can form hydrogen bonds, while ethanol also has a nonpolar ethyl group.",
      "Mixing disrupts original water–water and alcohol–alcohol interactions and creates new cross-species hydrogen bonds; local structure affects vapour-pressure behaviour."
    ],
    "answer": "Hydrogen bonding and competing hydrophobic interactions strongly affect miscibility and non-ideal mixing.",
    "check": "Predicting the direction of vapour-pressure deviation requires comparing unlike interactions with those of the pure components."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.11",
    "problemFocus": "Why heating usually reduces dissolved gas concentration",
    "steps": [
      "Gas dissolution in a liquid is frequently exothermic, so raising temperature favours escape of dissolved gas.",
      "By Le Châtelier's principle, a temperature rise often shifts the gas–solution equilibrium toward the free gas; exceptions are possible."
    ],
    "answer": "For many gases in water, equilibrium solubility decreases as temperature increases.",
    "check": "This is an equilibrium trend rather than a universal rule independent of gas, solvent or pressure."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.12",
    "problemFocus": "Henry law and application examples",
    "steps": [
      "At fixed temperature in the dilute regime, the gas partial pressure is proportional to its equilibrium mole fraction in solution: p=K_H x.",
      "Carbonated drinks are bottled at elevated CO₂ pressure; divers need controlled ascent to avoid dissolved-gas bubble release; altitude reduces oxygen partial pressure."
    ],
    "answer": "Henry's law is p=K_H x, with constant depending on gas, solvent and temperature.",
    "check": "Larger p means greater dissolved x at fixed K_H; gas solubility at lower pressure is reduced."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.13",
    "problemFocus": "Partial-pressure ratio for ethane in a solution",
    "steps": [
      "For the same solvent amount and temperature in a dilute regime, Henry's law gives p proportional to ethane amount.",
      "Use the provided amounts: p₂/p₁=(5.00×10⁻²)/(6.56×10⁻³)≈7.62195, multiplying the initial 1 bar."
    ],
    "answer": "Predicted ethane partial pressure≈7.62 bar.",
    "check": "This assumes the solvent amount and temperature are unchanged and dilute behaviour remains applicable."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.14",
    "problemFocus": "Positive and negative deviations from Raoult law",
    "steps": [
      "Weaker unlike A–B interactions typically increase vapour pressure relative to Raoult's prediction and require heat absorption on mixing.",
      "Stronger unlike A–B interactions typically depress vapour pressure relative to ideal prediction and release heat during mixing."
    ],
    "answer": "Positive deviation generally corresponds to Δ_mix H>0; negative deviation to Δ_mix H<0.",
    "check": "The sign of deviation follows relative intermolecular attraction, not a universal claim about any particular solvent pair."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.16",
    "problemFocus": "Ideal heptane-octane total vapour pressure",
    "steps": [
      "At 373 K take approximately 100 g/mol for heptane and 114 g/mol for octane; 26 g and 35 g give 0.260 and 0.307 mol.",
      "Mole fraction heptane is 0.260/(0.260+0.307)≈0.459; total vapour pressure by Raoult is 0.459×105.2+0.541×46.8 kPa."
    ],
    "answer": "Total ideal-mixture vapour pressure≈73.6 kPa.",
    "check": "The result is between the pure heptane and octane vapour pressures (46.8 and 105.2 kPa)."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.17",
    "problemFocus": "Solvent vapour pressure for one-molal dilute solute",
    "steps": [
      "One molal nonvolatile solute contributes 1 mol per 1 kg water; water amount is about 1000/18=55.56 mol.",
      "Raoult's law gives p=x_water p°=[55.56/(55.56+1)]×12.3 kPa."
    ],
    "answer": "Water vapour pressure≈12.08 kPa.",
    "check": "The solution vapour pressure is just below pure water's 12.3 kPa, consistent with nonvolatile-solute addition."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.18",
    "problemFocus": "Nonvolatile solute mass from relative vapour-pressure lowering",
    "steps": [
      "An ideal solution with p/p°=0.80 has solvent mole fraction 0.80 and solute mole fraction 0.20.",
      "With 114 g octane ≈1.00 mol solvent, n_solute/n_solvent=0.20/0.80=0.25; multiply by 40 g/mol."
    ],
    "answer": "Required nonvolatile-solute mass≈10.0 g.",
    "check": "The resulting solvent mole fraction is 1/(1+0.25)=0.8, giving the required relative pressure."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.20",
    "problemFocus": "Glucose freezing point against equal-mass-fraction sucrose",
    "steps": [
      "For 5% mass solute, use 5 g solute and 95 g water. At same solvent mass and ideal non-electrolyte conditions, freezing depression is inversely proportional to solute molar mass.",
      "With sucrose≈342 g/mol and glucose≈180 g/mol, multiply observed sucrose depression (273.15−271)=2.15 K by 342/180≈1.9."
    ],
    "answer": "Predicted glucose-solution freezing point≈269.07 K.",
    "check": "The lower-molar-mass glucose creates more dissolved particles, producing about 1.9 times the depression."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.22",
    "problemFocus": "Glucose concentration from osmotic pressure ratio",
    "steps": [
      "At fixed temperature for the same solute, π=cRT so concentration is proportional to osmotic pressure.",
      "Initial glucose concentration 36/180=0.200 mol/L at 4.98 bar; for 1.52 bar multiply 0.200×(1.52/4.98)."
    ],
    "answer": "New concentration≈0.0610 mol/L, equivalent to ≈11.0 g/L glucose.",
    "check": "The new concentration is smaller than 0.200 mol/L because the osmotic pressure is lower at the same temperature."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.27",
    "problemFocus": "Solubility product of sparingly soluble CuS",
    "steps": [
      "For the ideal simple equilibrium CuS(s)⇌Cu²⁺+S²⁻ in pure water, let each ion molarity be s.",
      "Use Ksp=[Cu²⁺][S²⁻]=s²=6×10⁻¹⁶ and take its square root."
    ],
    "answer": "Ideal solubility≈2.45×10⁻⁸ mol/L.",
    "check": "This ignores secondary acid–base and complexation equilibria; the question's simple Ksp model yields s²."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.28",
    "problemFocus": "Aspirin mass percentage in acetonitrile",
    "steps": [
      "Mass percentage of a component is its mass over total solution mass times 100.",
      "The solvent contributes 450 g and aspirin 6.5 g; total solution is 456.5 g, so evaluate 6.5/456.5×100."
    ],
    "answer": "Aspirin mass percentage≈1.42%.",
    "check": "Using solvent mass 450 g alone would overestimate the mass fraction; the denominator must include dissolved aspirin."
  },
  {
    "lessonId": "chapter-chemistry-1",
    "questionId": "1.30",
    "problemFocus": "Benzoic acid needed for dilute molarity",
    "steps": [
      "A final 250 mL solution is 0.250 L; at 0.15 mol/L the target benzoic acid amount is 0.0375 mol.",
      "Benzoic acid C₇H₆O₂ has molar mass about 122.12 g/mol; multiply 0.0375×122.12."
    ],
    "answer": "Required benzoic acid≈4.58 g for 250 mL of 0.15 M solution.",
    "check": "The mass calculation uses final solution volume rather than an assumed solvent volume."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.1",
    "problemFocus": "Electrochemical displacement series from reduction potentials",
    "steps": [
      "A more negative reduction potential generally means the elemental metal is more willing to oxidise and displace ions of metals with more positive E°.",
      "Arrange standard reduction potentials approximately Mg −2.37, Al −1.66, Zn −0.76, Fe −0.44, Cu +0.34 V to infer displacement strength."
    ],
    "answer": "Decreasing metal reducing and displacement strength: Mg > Al > Zn > Fe > Cu.",
    "check": "A metal earlier in this ordering can typically displace ions of metals to its right under standard conditions."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.2",
    "problemFocus": "Increasing strength of metal reducing agents",
    "steps": [
      "For metal atoms, more negative E°(Mⁿ⁺/M) corresponds to stronger tendency to lose electrons.",
      "Order given standard reductions from most positive to most negative: Ag +0.80, Hg +0.79, Cr −0.74, Mg −2.37, K −2.93 V."
    ],
    "answer": "Increasing reducing power: Ag < Hg < Cr < Mg < K.",
    "check": "The ordering reverses the reduction-potential ranking, since the elemental metal acts as the electron donor."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.3",
    "problemFocus": "Galvanic cell with zinc and silver ions",
    "steps": [
      "Oxidation occurs at the negative zinc anode: Zn(s)→Zn²⁺(aq)+2e⁻; electrons travel through the external wire.",
      "Reduction occurs at the positive silver cathode: 2Ag⁺(aq)+2e⁻→2Ag(s), while supporting electrolyte ions move in the salt bridge."
    ],
    "answer": "Cell: (−) Zn|Zn²⁺ || Ag⁺|Ag (+); zinc anode and silver cathode.",
    "check": "Combining both half-reactions conserves charge and mass; electron flow is from zinc toward silver."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.7",
    "problemFocus": "Specific and molar electrolyte conductivities",
    "steps": [
      "Conductivity κ is conductance of a standard geometric column, with SI units S/m; molar conductivity Λm=κ/c where c is mol/m³.",
      "On dilution, κ generally decreases as mobile ion count per volume falls; Λm increases as interionic effects decrease and weak electrolytes ionise more."
    ],
    "answer": "κ usually decreases on dilution whereas molar conductivity Λm increases.",
    "check": "Distinguish concentration per volume from mobility per mole, avoiding the incorrect inference that both trends must agree."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.8",
    "problemFocus": "KCl molar conductivity from solution conductivity",
    "steps": [
      "Convert the conductivity κ=0.0248 S/cm with c=0.20 mol/L using Λm=1000κ/c in S cm² mol⁻¹.",
      "Substitution gives Λm=(1000×0.0248)/0.20 =124 S cm² mol⁻¹."
    ],
    "answer": "KCl molar conductivity≈124 S cm² mol⁻¹.",
    "check": "Equivalently κ=2.48 S/m and c=200 mol/m³ gives Λm=0.0124 S m²/mol."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.9",
    "problemFocus": "Conductivity-cell geometrical constant",
    "steps": [
      "The cell constant G*=l/A equals the conductivity κ multiplied by measured cell resistance R.",
      "Multiply κ=0.146×10⁻³ S/cm by R=1500 Ω; SΩ is dimensionless."
    ],
    "answer": "Cell constant G*≈0.219 cm⁻¹.",
    "check": "The reciprocal-length dimension matches l/A, making the reported unit physically consistent."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.11",
    "problemFocus": "Acetic acid dissociation from limiting molar conductivity",
    "steps": [
      "At c=0.00241 M, Λm=(7.896×10⁻⁵ S/cm)×1000/0.00241≈32.76 S cm²/mol.",
      "The dissociation fraction α≈Λm/Λm°=32.76/390.5≈0.0839, and Ka=c α²/(1−α)."
    ],
    "answer": "Λm≈32.76 S cm²/mol; Ka≈1.85×10⁻⁵.",
    "check": "Back-substitution of α≈0.0839 in Ostwald's dilution law reproduces Ka to rounding precision."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.12",
    "problemFocus": "Faraday charge for three reduction processes",
    "steps": [
      "Reduction of one mol Al³⁺ requires three mol electrons, while one mol Cu²⁺ consumes two mol electrons.",
      "Permanganate MnO₄⁻ to Mn²⁺ in acidic medium requires five electrons per manganese atom; multiply each electron mole count by F≈96485 C/mol."
    ],
    "answer": "Required charge: Al³⁺ 3F; Cu²⁺ 2F; MnO₄⁻→Mn²⁺ 5F.",
    "check": "The charge requirements follow oxidation-state changes +3→0, +2→0, and +7→+2 respectively."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.13",
    "problemFocus": "Charge for electrolytic calcium and aluminium manufacture",
    "steps": [
      "Reduction of Ca²⁺ to Ca requires 2F/mol: 20.0 g calcium is ≈0.50 mol and needs about 1.00 F.",
      "Reduction of Al³⁺ to Al requires 3F/mol: 40.0 g aluminium is ≈1.4815 mol and needs 4.444 F."
    ],
    "answer": "Calcium≈1.00 F; aluminium≈4.44 F.",
    "check": "The moles multiplied by electron stoichiometry reproduce total moles of electrons in Faradays."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.14",
    "problemFocus": "Electron balance for water and ferrous oxide oxidation",
    "steps": [
      "Oxidising one mole water into half a mole O₂ formally releases two moles of electrons per mole water.",
      "Fe(II) in one mol FeO is oxidised to Fe(III) in Fe₂O₃, removing one electron per Fe atom, hence one F per mol FeO."
    ],
    "answer": "Water oxidation: 2F per mole H₂O; FeO oxidation: 1F per mole FeO.",
    "check": "Oxygen's charge-balance and Fe oxidation-state change determine electrons rather than the raw reaction coefficients alone."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.15",
    "problemFocus": "Nickel mass from electrolytic current and duration",
    "steps": [
      "Charge delivered by 5 A for 20 min is Q=5×1200=6000 coulombs.",
      "Ni²⁺+2e⁻→Ni, so nickel deposited m=Q×58.69/(2×96485) grams under 100% current efficiency."
    ],
    "answer": "Deposited nickel mass≈1.83 g.",
    "check": "Substituting the molar mass and Faraday constant yields about 0.0311 mol Ni from 0.0622 mol electrons."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.16",
    "problemFocus": "Series-cell electroplating masses and elapsed time",
    "steps": [
      "Depositing 1.45 g Ag corresponds to 1.45/107.87≈0.01344 mol electrons or Q≈1296.6 C.",
      "At 1.5 A, time Q/I≈864 s; Zn²⁺ and Cu²⁺ each use 2 e⁻, giving n≈0.00672 mol each; use 65.38 and 63.55 g/mol."
    ],
    "answer": "Current duration≈864 s; copper≈0.427 g; zinc≈0.439 g.",
    "check": "The identical series current transfers the same charge through each cell but different metal masses because electron valences and molar masses differ."
  },
  {
    "lessonId": "chapter-chemistry-2",
    "questionId": "2.18",
    "problemFocus": "Electrolysis products with active and inert electrodes",
    "steps": [
      "For aqueous silver nitrate with silver electrodes, silver dissolves at anode and Ag⁺ plates as silver metal at cathode; an inert platinum anode instead evolves oxygen.",
      "Dilute sulphuric acid with Pt yields hydrogen at the cathode and oxygen at the anode; aqueous CuCl₂ with Pt ordinarily deposits Cu at cathode and releases chlorine at the anode."
    ],
    "answer": "Ag/AgNO₃: Ag electrodes transfer Ag; AgNO₃/Pt: Ag and O₂; dilute H₂SO₄/Pt: H₂ and O₂; CuCl₂/Pt: Cu and Cl₂.",
    "check": "The anodic half-reaction changes with electrode material; product distribution in water can also depend on concentration and overpotentials."
  }
]);
