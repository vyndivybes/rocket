// Original, uncertified editorial answers for NCERT 2026-27 Chemical Kinetics 3.21–3.30.
export const CHEMISTRY_3_DRAFTS_C=Object.freeze([
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.21",
    "problemFocus": "Rate of a gaseous first order decomposition in pressure units",
    "steps": [
      "For SO2Cl2 producing SO2 and Cl2 at fixed temperature and volume, initial pressure is 0.5 atm and reactant partial pressure after total reaches 0.6 atm equals 1.0-0.6=0.4 atm.",
      "The first-order rate constant is ln(0.5/0.4)/100=0.002231 s^-1; when total pressure reaches 0.65 atm, the residual reactant partial pressure is 0.35 atm."
    ],
    "answer": "The disappearance rate is about 7.81e-4 atm/s at total pressure 0.65 atm.",
    "check": "Multiply 0.35 atm by k=0.002231 s^-1, which yields pressure per time, not molarity per time without RT."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.22",
    "problemFocus": "Arrhenius regression from five experimentally measured k values",
    "steps": [
      "Convert Celsius temperatures 0,20,40,60,80 to Kelvin. The table of 10^5 times k gives 0.0787,1.70,25.7,178,2140; divide each entry by 100000 to obtain k per second.",
      "A linear least-squares fit of natural log k versus reciprocal kelvin yields slope approximately -12115 K and intercept ln A about 30.31; hence Ea about 100.7 kJ/mol and A about 1.46e13 s^-1."
    ],
    "answer": "Fitted k at 30°C about 6.43e-5 s^-1, at 50°C about 7.63e-4 s^-1; Ea about 101 kJ/mol.",
    "check": "The extrapolated answers depend on numerical regression versus a hand drawn graph, and all reciprocal temperatures must use kelvin."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.23",
    "problemFocus": "Calculate Arrhenius prefactor from first-order rate and activation energy",
    "steps": [
      "Rearrange k=A exp(-Ea/(RT)) to A=k exp(Ea/(RT)), with rate 2.418e-5 s^-1 at T=546 K.",
      "Convert activation energy 179.9 kJ/mol to 179900 J/mol; evaluate exponent 179900/(8.314 times 546), then multiply exp(exponent) by 2.418e-5."
    ],
    "answer": "Pre-exponential factor A about 3.93e12 s^-1.",
    "check": "Substituting the calculated A into the Arrhenius equation at 546 K recovers the supplied rate constant."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.24",
    "problemFocus": "Amount of reactant remaining after one hundred seconds",
    "steps": [
      "For an initial first-order concentration of 1.0 M, use the integrated rate form [A]t=[A]0 exp(-kt).",
      "With k=0.020 s^-1 and t=100 s, kt=2 and the remaining fraction is exp(-2)=0.135335."
    ],
    "answer": "Remaining concentration approximately 0.135 mol/L.",
    "check": "The result is positive and below the initial one molar concentration, as expected for an irreversible decay."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.25",
    "problemFocus": "Remaining sucrose fraction after eight hours of first-order decay",
    "steps": [
      "A first-order process with half-life three hours retains the fraction (1/2)^(t/t_half) after time t.",
      "Evaluate t/t_half=8/3 and 2^(-8/3)=0.15749 to obtain the surviving fraction."
    ],
    "answer": "Remaining sucrose approximately 0.1575 or 15.75 percent of original.",
    "check": "At six hours the fraction is 25 percent, and by nine hours 12.5 percent, so the eight hour answer lies correctly between."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.26",
    "problemFocus": "Extract activation energy from specified inverse-temperature exponent",
    "steps": [
      "Match the given k=(4.5e11 s^-1) exp(-28000 K/T) to the standard Arrhenius expression k=A exp(-Ea/(RT)).",
      "Identifying coefficients gives Ea/R=28000 K and Ea=28000 times 8.314 J/mol, or about 232792 J/mol."
    ],
    "answer": "Activation energy Ea about 233 kJ/mol.",
    "check": "The ratio Ea/(RT) is dimensionless, consistent with the exponent 28000 K divided by absolute temperature."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.27",
    "problemFocus": "Use base ten Arrhenius law with specified first-order half-life",
    "steps": [
      "For log10 k=14.34-12500/T, compare with log10 A-Ea/(2.303 RT), so Ea=2.303 times R times 12500 about 239 kJ/mol.",
      "A 256 minute half-life corresponds to k=ln2/(256 times 60) about 4.513e-5 s^-1. Solve 14.34-12500/T=log10(4.513e-5), giving T about 669 K."
    ],
    "answer": "Activation energy about 239 kJ/mol and required temperature about 669 K.",
    "check": "Substituting the calculated T in the source equation returns a rate constant giving a half-life of about 256 minutes."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.28",
    "problemFocus": "Calculate temperature for 3.33 times higher reaction rate",
    "steps": [
      "At 10°C initial temperature T1=283.15 K, the initial k=4.5e3 s^-1 and target k=1.5e4 s^-1 give rate-constant ratio 3.333.",
      "With Ea=60000 J/mol, use 1/T2=1/T1-(8.314/Ea) ln(3.333) to calculate T2 about 297.19 K."
    ],
    "answer": "Required temperature about 297.2 K or 24.0°C.",
    "check": "T2 exceeds T1 because activation energy is positive; back substitution restores the target rate ratio."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.29",
    "problemFocus": "Kinetic activation energy from equal completion times",
    "steps": [
      "Equal first-order conversion times imply k308/k298=ln(1/0.75)/ln(1/0.90) about 2.731.",
      "Use Ea=R ln(2.731)/(1/298-1/308) about 76.65 kJ/mol; then k318=(4e10 s^-1) exp(-Ea/(8.314 times 318))."
    ],
    "answer": "Ea about 76.7 kJ/mol and k at 318 K about 1.03e-2 s^-1.",
    "check": "The ratio of logarithmic completion factors matches the Arrhenius k ratio, and the resulting k retains seconds inverse."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.30",
    "problemFocus": "Activation energy from fourfold rate increase over twenty kelvin",
    "steps": [
      "Assuming unchanged concentrations, the observed rate ratio four corresponds to the same Arrhenius rate-constant ratio k313/k293=4.",
      "Rearrange ln4=Ea/R(1/293-1/313) and compute Ea=8.314 ln4/(1/293-1/313)."
    ],
    "answer": "Activation energy approximately 52.9 kJ/mol.",
    "check": "Increasing temperature with a positive activation energy raises the rate; the reciprocal temperature difference supplies a positive energy."
  }
]);
