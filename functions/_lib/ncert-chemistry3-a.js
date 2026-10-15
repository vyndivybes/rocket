// Original, uncertified editorial draft answers for NCERT 2026-27 Chemical Kinetics 3.1–3.10.
export const CHEMISTRY_3_DRAFTS_A=Object.freeze([
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.1",
    "problemFocus": "Four rate laws and rate constant dimensions",
    "steps": [
      "For a rate law with concentration exponents ni, the reaction order is their sum. A concentration-per-second rate implies that k has units (mol per litre) raised to (1 minus order) per second.",
      "The four displayed laws are second order for NO squared, second order for H2O2 times iodide, three-halves order for acetaldehyde, and first order for ethyl chloride."
    ],
    "answer": "Orders 2, 2, 1.5 and 1; k units respectively L/mol/s, L/mol/s, L^0.5/mol^0.5/s and per second.",
    "check": "Recombine each listed k dimension with its reactant powers; the product must always have concentration divided by time units."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.2",
    "problemFocus": "Initial and later rate from reactant consumption",
    "steps": [
      "At initial A=0.10 M and B=0.20 M, insert k=2.0e-6 into the experimental law r=k[A][B]^2 to get 8.0e-9 M/s.",
      "For 2A+B forming product, a decrease in A from 0.10 to 0.06 M consumes B by 0.020 M. Thus B=0.18 M and r=2.0e-6 times 0.06 times 0.18 squared."
    ],
    "answer": "Initial rate = 8.0e-9 M/s; later rate = 3.888e-9 M/s.",
    "check": "The stoichiometric 2 to 1 reactant-consumption ratio changes the B value, so holding B at 0.20 M would contradict an otherwise isolated process."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.3",
    "problemFocus": "Zero-order ammonia surface decomposition",
    "steps": [
      "The balanced reaction is 2 NH3 to N2 plus 3 H2. If the intended zero-order reaction rate r is 2.5e-4 mol/L/s, d[N2]/dt equals r.",
      "Hydrogen formation is three times the reaction rate because three H2 molecules form per reaction event; the printed unit on k is incompatible with zero-order dimensions and needs textbook review."
    ],
    "answer": "Nitrogen formation = 2.5e-4 M/s; hydrogen formation = 7.5e-4 M/s, subject to the printed k-unit correction.",
    "check": "The N2 to H2 rate ratio is 1 to 3 from the balanced equation, and the inconsistent original k unit prevents automatic answer certification."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.4",
    "problemFocus": "Pressure expression of a three-halves order rate",
    "steps": [
      "A pressure-change rate measured using bar and minutes has pressure divided by time units, namely bar/min.",
      "With rate=k times gas partial pressure to the three-halves power, dimensional division gives k as bar to the minus one-half per minute."
    ],
    "answer": "Rate units = bar/min; k units = bar^(-1/2)/min.",
    "check": "Multiplying the derived k dimensions by pressure to the 3/2 power produces bar/min, so dimensional consistency is restored."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.5",
    "problemFocus": "Factors controlling observed chemical reaction rates",
    "steps": [
      "Changing temperature modifies the activation factor, while concentration or gas pressure modifies collision opportunities. Catalysts introduce alternative kinetic pathways.",
      "The identities and physical states of reactants, accessible surface of heterogeneous solids, solvent conditions and inhibitors also influence observed rates."
    ],
    "answer": "Important factors are concentration, temperature, catalyst, reactant identity, physical state and heterogeneous surface area.",
    "check": "The powers in a measured rate law come from experiment; they cannot in general be inferred solely from a balanced reaction coefficient."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.6",
    "problemFocus": "Second-order sensitivity to reactant concentration",
    "steps": [
      "If reaction is second order with respect to one reactant A, write rate proportional to concentration of A squared when all other quantities remain fixed.",
      "Doubling gives a factor of 2 squared or 4, while halving gives a factor of one-half squared or one-quarter."
    ],
    "answer": "Rate quadruples on doubling and becomes one-quarter on halving.",
    "check": "The rate factors are purely consequences of the experimentally established square dependence and do not require an assumed mechanism."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.7",
    "problemFocus": "Temperature and the Arrhenius kinetic equation",
    "steps": [
      "The Arrhenius law k=A exp(-Ea/(R T)) describes the common temperature dependence of rate constants for a positive activation barrier.",
      "Taking logs yields ln(k)=ln(A)-Ea/(R T); comparing temperatures yields ln(k2/k1)=Ea/R times (1/T1-1/T2)."
    ],
    "answer": "k=A exp(-Ea/(R T)); slope of ln(k) versus 1/T equals -Ea/R.",
    "check": "All absolute temperatures must be kelvin, and activation energy must use units consistent with the gas constant R."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.8",
    "problemFocus": "Thirty-to-sixty-second average reactant loss rate",
    "steps": [
      "For time t=30 seconds, A concentration is 0.31 M; by 60 seconds it declines to 0.17 M, a loss of 0.14 M.",
      "Positive disappearance rate equals 0.14 M divided by 30 seconds, giving approximately 0.004667 M per second."
    ],
    "answer": "Average rate from 30 to 60 s = 4.67e-3 mol/L/s.",
    "check": "A disappearing reactant has a negative raw concentration derivative; conventional reaction rate includes the negative sign and is positive."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.9",
    "problemFocus": "First-order A and second-order B rate scaling",
    "steps": [
      "The differential law is rate=k[A][B]^2, first order in A, second order in B and third order overall.",
      "Tripling B with A fixed scales the rate by nine; doubling A and B simultaneously multiplies it by two times four."
    ],
    "answer": "Rate = k[A][B]^2; B tripled: 9 times; A and B doubled: 8 times.",
    "check": "The two multiplicative changes agree with the independent concentration exponents one and two, giving total order three."
  },
  {
    "lessonId": "chapter-chemistry-3",
    "questionId": "3.10",
    "problemFocus": "Determine fractional rate order by initial-rate comparison",
    "steps": [
      "At fixed A=0.20 M, changing B from 0.30 to 0.10 M leaves the initial rate 5.07e-5 M/s unchanged, so the B order is zero.",
      "On doubling A to 0.40 M, rate rises to 1.43e-4 M/s, giving ratio about 2.82. The exponent satisfying two to its power around 2.82 is 1.5."
    ],
    "answer": "Order in A = 3/2; order in B = 0; overall order = 1.5.",
    "check": "Two to the power 3/2 equals 2.828, reproducing the measured rate ratio within reported data rounding."
  }
]);
