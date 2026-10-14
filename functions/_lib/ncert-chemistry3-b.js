// Original, uncertified editorial answers for NCERT 2026-27 Chemical Kinetics 3.11–3.20.
export const CHEMISTRY_3_DRAFTS_B=Object.freeze([
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.11",
    "problemFocus": "Derive two-component kinetics from four initial trials",
    "steps": [
      "Compare trials I and IV with B fixed at 0.10 M: A quadruples from 0.10 to 0.40 M, while rate quadruples, so the order in A is one.",
      "Compare trials II and III with A=0.30 M: B doubles from 0.20 to 0.40 M while rate quadruples, so B order is two. Trial I gives k=0.006/(0.1 times 0.1 squared)=6."
    ],
    "answer": "Rate = 6 [A][B]^2 with k=6 L^2 mol^-2 min^-1.",
    "check": "Trial II predicts 0.072 M/min and trial III 0.288 M/min from the same k, matching both supplied observations."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.12",
    "problemFocus": "Complete the three missing entries in a kinetic table",
    "steps": [
      "The rate law is r=k[A], since the stated order in B is zero. Trial I gives k=0.020/0.10=0.20 min^-1.",
      "Thus trial II A=0.040/0.20=0.20 M, trial III rate=0.20 times 0.40=0.080 M/min, and trial IV A=0.020/0.20=0.10 M."
    ],
    "answer": "Trial II A=0.20 M; trial III rate=0.080 M/min; trial IV A=0.10 M.",
    "check": "Each completed row reproduces k=0.20 min^-1 and rate remains independent of B despite differing B entries."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.13",
    "problemFocus": "First-order half-life for three rate constant units",
    "steps": [
      "For a first-order reaction the half-life is ln(2)/k with units reciprocal to the supplied rate-constant unit.",
      "For 200 per second divide 0.693 by 200; for 2 per minute divide by 2; for 4 per year divide by 4."
    ],
    "answer": "Half-lives 0.00347 seconds; 0.3465 minutes; 0.17325 years.",
    "check": "Multiplying each half-life by its matching k produces approximately 0.693, and the time units are retained correctly."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.14",
    "problemFocus": "Radiocarbon sample dating from remaining fraction",
    "steps": [
      "Radioactive carbon obeys exponential decay with k=ln2/5730 years^-1 for the given first-order half-life.",
      "A sample retaining 80 percent has t=ln(1/0.8)/k=5730 ln(1.25)/ln2, yielding about 1844.65 years."
    ],
    "answer": "Estimated age approximately 1845 years.",
    "check": "Replacing t in 2^(-t/5730) returns 0.8, confirming the measured retained isotope ratio."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.15",
    "problemFocus": "Experimental N2O5 decomposition kinetic graph and half-life",
    "steps": [
      "Use t from zero to 3200 seconds and 100 times molarity decreasing from 1.63 to 0.35. Plot reactant concentration against time and natural log concentration against time.",
      "For first-order r=k[A], an endpoint estimate is k=ln(1.63/0.35)/3200=4.81e-4 per second. Then t_half=0.693/k approximately 1442 seconds; log concentration is approximately linear."
    ],
    "answer": "First-order rate approximately k[A], k about 4.81e-4 s^-1; half-life about 1.44e3 seconds.",
    "check": "Half of the initial concentration is approximately 0.00815 M, crossed between 1200 and 1600 seconds, agreeing with the exponential estimate."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.16",
    "problemFocus": "Time for a first-order sample to drop to one-sixteenth",
    "steps": [
      "A first-order remaining fraction equals exp(-k t), so reducing to 1/16 means k t=ln16.",
      "Substitute the stated rate constant k=60 s^-1 to obtain t=ln16/60=0.04621 seconds."
    ],
    "answer": "Time required about 4.62e-2 s.",
    "check": "One-sixteenth corresponds to four successive half-lives, and four times ln2/60 gives the same answer."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.17",
    "problemFocus": "Microgram radioactive strontium decay using exact rendered printed units",
    "steps": [
      "The rendered official NCERT 2026-27 problem starts with 1 μg of Sr-90, rather than the incorrect milligram transcription, and specifies a half-life of 28.1 years.",
      "Use m=1 μg times 2^(-elapsed years/28.1). At 10 years the factor is 0.7814; at 60 years it is 0.2276."
    ],
    "answer": "Remaining mass about 0.781 μg after 10 years and 0.228 μg after 60 years.",
    "check": "The microgram unit persists in both outputs; confusing μg and mg would introduce a thousandfold mass error."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.18",
    "problemFocus": "Prove first-order 99 percent completion takes twice ninety percent time",
    "steps": [
      "At 90 percent completion the remaining fraction is 0.10, so t90=(ln10)/k for a first-order decay.",
      "At 99 percent completion the remaining fraction is 0.01, so t99=ln100/k=2 ln10/k=2 t90."
    ],
    "answer": "First-order t99 equals exactly 2 times t90.",
    "check": "The proof assumes the same positive first-order rate constant; it is not a universal identity for other reaction orders."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.19",
    "problemFocus": "Half-life inferred from forty minutes and thirty percent consumption",
    "steps": [
      "The stated thirty percent decomposition means 70 percent of the reactant remains after forty minutes.",
      "Use k=ln(1/0.70)/40 min^-1 and t_half=ln2/k to find about 77.7 minutes."
    ],
    "answer": "Half-life approximately 77.7 min.",
    "check": "The model fraction after forty minutes is 2^(-40/77.7) about 0.70, which matches the observation."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.20",
    "problemFocus": "Decomposition rate constant from pressure growth at two times",
    "steps": [
      "For A converting to one gas and nitrogen gas, the initial A partial pressure is 35 mmHg and residual A pressure equals 2 times 35 minus total pressure.",
      "At 360 seconds residual A=70-54=16 mmHg, giving k=ln(35/16)/360=0.00217 s^-1; at 720 seconds residual A=7 mmHg giving k=ln5/720=0.00224 s^-1."
    ],
    "answer": "First-order rate constant approximately 2.2e-3 per second.",
    "check": "The two independent observations agree within their rounding and the pressure balance conserves the initial number of A moles."
  }
]);
