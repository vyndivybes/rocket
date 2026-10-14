// Original lesson explanations tied to verified NCERT 2026-27 Mathematics Part I,
// Chapter 1 parent exercise references. Question text is not duplicated.
// Each authored draft remains subject-review-required and NOT certified.
export const MATH1_WORKED_DRAFTS=Object.freeze([
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/1",
    "problemFocus": "Classify the listed relation examples by three properties",
    "steps": [
      "Subpart (i), y=3x on A={1,…,14}: only (1,3),(2,6),(3,9),(4,12) occur. Since (1,1) is absent it is not reflexive; (3,1) is absent so it is not symmetric; (1,3) and (3,9) occur but (1,9) does not, so it is not transitive.",
      "Subpart (ii), y=x+5 for x<4 on N: (1,6),(2,7),(3,8) are the only pairs. There are no diagonal or reverse pairs, so it is neither reflexive nor symmetric; no two pairs can form a chain, so it is transitive vacuously.",
      "Subpart (iii), y divisible by x on {1,…,6}: every x divides itself, hence reflexive. Since 1 divides 2 but 2 does not divide 1, not symmetric. If x divides y and y divides z, x divides z, so transitive.",
      "Subpart (iv), x−y is an integer for integer x,y: every ordered pair qualifies, so the universal relation is reflexive, symmetric and transitive.",
      "Subpart (v), 'same workplace' and 'same locality' are equivalence relations on people for whom those categories are defined. Exactly-7-cm-taller and father-of are neither reflexive nor symmetric nor transitive; wife-of is not reflexive or symmetric, and conventional textbook semantics make composable wife-of chains impossible (vacuous transitivity). If all residents including the unemployed are in the domain, same-workplace need not be reflexive."
    ],
    "answer": "The five relation families have distinct property classifications; see each subpart's explicit counterexample or universal proof.",
    "check": "A one-line 'all transitive' claim is wrong: the 7-cm-taller and father-of cases admit two-step chains without direct membership; the domain assumption matters for workplace."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/2",
    "problemFocus": "Real relation comparing a to the square of b",
    "steps": [
      "Reflexivity fails: a=1/2 would require 1/2≤(1/2)²=1/4, which is false. Symmetry fails because (0,1) belongs (0≤1) but (1,0) does not (1≤0 is false).",
      "For transitivity choose a=1, b=−2, c=0: 1≤(−2)²=4 and −2≤0²=0, but 1≤0² is false. Therefore two related consecutive pairs need not imply the third."
    ],
    "answer": "The relation a≤b² on R is neither reflexive, symmetric nor transitive.",
    "check": "Each property is disproved by a valid concrete witness, rather than incorrectly proving a statement only for positive numbers."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/5",
    "problemFocus": "Real relation comparing a to the cube of b",
    "steps": [
      "Reflexivity fails at a=1/2 because 1/2≤(1/2)³=1/8 is false; symmetry fails since (0,1) is in R but (1,0) is not.",
      "Transitivity fails with (a,b,c)=(10,3,1.5): 10≤3³=27, 3≤1.5³=3.375, but 10≤1.5³ is false."
    ],
    "answer": "The relation a≤b³ is neither reflexive, symmetric nor transitive on the whole real line.",
    "check": "Cubic monotonicity by itself does not prove transitivity of a≤b³; the supplied three-number counterexample settles the issue."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/6",
    "problemFocus": "Two-cycle relation on a three-element set",
    "steps": [
      "The two off-diagonal pairs (1,2) and (2,1) are reverses of each other, so the relation is symmetric.",
      "The diagonal pair (1,1) is missing, so reflexivity fails. Composing 1→2 with 2→1 would require 1→1, which is also missing; hence transitivity fails."
    ],
    "answer": "Symmetric, neither reflexive nor transitive.",
    "check": "The composable pair (1,2),(2,1) provides an explicit test that rules out vacuous transitivity."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/7",
    "problemFocus": "Books with equal page counts",
    "steps": [
      "Every book has the same page count as itself, proving reflexivity. If book A matches book B's page count, B matches A, proving symmetry.",
      "If A and B have equal counts and B and C have equal counts, A and C must have equal counts, proving transitivity."
    ],
    "answer": "Equal-page-count is an equivalence relation.",
    "check": "The proof uses ordinary equality of a numerical attribute; it groups books into page-count classes."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/8",
    "problemFocus": "Parity-equivalent elements of a five-element set",
    "steps": [
      "The difference |a−b| is even exactly when a and b share parity. Equality yields difference 0, swapping a,b preserves |a−b|, and same parity passes through any intermediate b.",
      "The equivalence classes in {1,2,3,4,5} are {1,3,5} and {2,4}; no odd element can be related to any even element."
    ],
    "answer": "An equivalence relation with two disjoint classes: odd {1,3,5} and even {2,4}.",
    "check": "The classes partition the set, and a difference of an odd and even integer is odd rather than even."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/9",
    "problemFocus": "Modulo-four and equality relations from zero through twelve",
    "steps": [
      "For R(i), a related to b when 4 divides a−b: divisibility holds for difference 0, reverses under negation, and adds under chaining. Thus reflexive, symmetric and transitive.",
      "All numbers congruent to 1 modulo 4 within 0,…,12 are 1,5,9. For R(ii) equality is an equivalence relation whose class of 1 contains only 1."
    ],
    "answer": "Both are equivalence relations; [1] modulo 4={1,5,9}; [1] under equality={1}.",
    "check": "1−5 and 5−9 are multiples of four, while 1−2 is not; only a=1 meets a=1 under equality."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/10",
    "problemFocus": "Five constructive examples with desired relation properties",
    "steps": [
      "On A={1,2}, use R(i)={(1,2),(2,1)} for symmetric but neither reflexive nor transitive; use R(ii)={(1,2)} for transitive (no composable pairs) but neither reflexive nor symmetric.",
      "On A={1,2,3}, use R(iii)=all three diagonals plus (1,2),(2,1),(2,3),(3,2) for reflexive and symmetric but not transitive because (1,3) is missing.",
      "On {1,2}, use R(iv)={(1,1),(2,2),(1,2)} for reflexive and transitive but not symmetric, and R(v)={(1,1)} for symmetric and transitive but not reflexive."
    ],
    "answer": "All five property combinations are demonstrated by the named finite relations.",
    "check": "Test the only non-diagonal chains: (1,2),(2,1) requires (1,1) in (i), and (1,2),(2,3) requires (1,3) in (iii)."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/11",
    "problemFocus": "Equal distances from the origin",
    "steps": [
      "Write r(P)=√(x²+y²). Equality of real-valued radii is reflexive, symmetric and transitive, so P related to Q iff r(P)=r(Q) is an equivalence relation.",
      "For fixed P≠(0,0), all related Q=(x,y) satisfy x²+y²=r(P)², precisely the circle with centre (0,0) and radius r(P)."
    ],
    "answer": "An equivalence relation; the class of P is the origin-centred circle passing through P.",
    "check": "For P at (3,4), radius 5 and the class is x²+y²=25; the origin is excluded only to avoid a radius-zero circle."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/12",
    "problemFocus": "Triangle similarity equivalence and listed triples",
    "steps": [
      "Each triangle is similar to itself, similarity is symmetric, and successive similarities compose, establishing reflexivity, symmetry and transitivity.",
      "T₁ has sides (3,4,5), T₃ has (6,8,10), a common factor two, so they are similar. T₂=(5,12,13) has different side ratios and is not similar to either."
    ],
    "answer": "Triangle similarity is an equivalence relation; T₁ and T₃ belong to the same equivalence class.",
    "check": "The side-ratio check is (6/3,8/4,10/5)=(2,2,2), whereas T₂ has no single matching multiplier."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/13",
    "problemFocus": "Equal number of sides in polygon equivalence",
    "steps": [
      "Each polygon has its own number of sides, equality of side counts is symmetric, and if P and Q have equal sides and Q and S equal sides then P and S do too.",
      "The referenced right-angled 3–4–5 triangle has three sides; every polygon with three sides belongs to its equivalence class."
    ],
    "answer": "The relation is an equivalence; the class of the given triangle is the set of all triangles.",
    "check": "Triangle angles and side lengths are irrelevant here: classification depends solely on the number of sides."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/14",
    "problemFocus": "Parallel line families in the XY plane",
    "steps": [
      "Using the textbook's same-direction (equal slope) relation, a line has its own slope, equality is symmetric and transitive, hence the relation is an equivalence.",
      "All lines parallel to y=2x+4 must have gradient 2, and every y=2x+c has this gradient for any real intercept c."
    ],
    "answer": "Equivalence relation of lines with common direction; class={y=2x+c:c∈R}.",
    "check": "Interpret parallelism as equal direction, including a coincident line for reflexivity, which matches the exercise's intended equivalence relation."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/15",
    "problemFocus": "Multiple-choice relation properties for a four-element relation",
    "steps": [
      "All diagonal pairs (1,1),(2,2),(3,3),(4,4) occur, so R is reflexive. R is not symmetric because (1,2) occurs but (2,1) is absent.",
      "Check nontrivial chains: 1→3 and 3→2 imply 1→2 which occurs; 3→2 and 2→2 remain 3→2; diagonal chains preserve every existing edge. Thus R is transitive."
    ],
    "answer": "Correct option B: reflexive and transitive but not symmetric.",
    "check": "A case check on each non-diagonal chain confirms transitivity, including the essential (1,3),(3,2)⇒(1,2)."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.1/16",
    "problemFocus": "Multiple-choice membership in a relation on natural numbers",
    "steps": [
      "The relation requires a=b−2 and b>6 simultaneously. For candidate (6,8), 6=8−2 and 8>6 both hold.",
      "(2,4) fails b>6; (3,8) fails 3=6; (8,7) fails 8=5. Only (6,8) meets both conditions."
    ],
    "answer": "Correct option C: (6,8) belongs to R.",
    "check": "The exercise tests membership of ordered pairs, not reflexivity or transitivity, so checking the defining equation and inequality is decisive."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/2",
    "problemFocus": "Square and cube maps on natural, integer and real domains",
    "steps": [
      "For x² on N, equality of squares implies equal positive inputs, but 2 is not a natural-number square: injective, not onto. On Z or R, x and −x have equal square, while negative numbers cannot be images: neither injective nor onto.",
      "For x³ on N or Z, strict increase proves injectivity; however integers such as 2 are not cubes, so neither map is onto its stated codomain."
    ],
    "answer": "For (i) N→N x²: one-one not onto; (ii) Z→Z x²: neither; (iii) R→R x²: neither; (iv) N→N x³: one-one not onto; (v) Z→Z x³: one-one not onto.",
    "check": "Counterexamples distinguish domains: 2 lacks a natural-number cube root, and −1 cannot be an image of x² on real or integer domains."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/5",
    "problemFocus": "Signum function cannot be a bijection R to R",
    "steps": [
      "Take distinct x=1 and x=2, both mapped to signum value +1, so the function is not injective.",
      "Since only sign values (−1,0,+1) can arise, a codomain value such as 2 has no preimage, so surjectivity fails."
    ],
    "answer": "Neither one-one nor onto on R→R.",
    "check": "The conclusion remains even if a print typo affects the negative branch: repeated positive outputs and missing value 2 suffice."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/6",
    "problemFocus": "Three-element injection into four-element codomain",
    "steps": [
      "The mapping is f(1)=4, f(2)=5, f(3)=6, with distinct outputs 4,5,6 corresponding to the three distinct inputs.",
      "Thus no pair of different domain inputs shares a value; the unused codomain element 7 establishes that it is not onto, although onto was not asked."
    ],
    "answer": "The mapping is one-one (injective), but not onto B.",
    "check": "The image of the function has exactly three distinct elements, fewer than the four elements of B."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/7",
    "problemFocus": "Linearly affine versus quadratic mappings of real numbers",
    "steps": [
      "For f(x)=3−4x, f(a)=f(b) implies −4a=−4b so a=b; given any y, x=(3−y)/4 is a real preimage, proving onto.",
      "For g(x)=1+x², g(1)=g(−1)=2 shows not one-one and values less than 1 such as y=0 have no real preimage, so not onto."
    ],
    "answer": "Part (i) bijective; part (ii) neither injective nor surjective.",
    "check": "The explicit inverse to the affine map verifies onto; symmetric inputs and missing negative outputs reject bijectivity of the quadratic."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/9",
    "problemFocus": "Odd–even halving map on natural numbers",
    "steps": [
      "The mapping sends odd n to (n+1)/2 and even n to n/2. In particular f(1)=1=f(2), so it is not injective.",
      "For any target m∈N, choose n=2m; n is even, and f(2m)=m. Hence every natural target is attained."
    ],
    "answer": "Surjective, not one-one, therefore not bijective.",
    "check": "The identical images of 1 and 2 demonstrate noninjectivity, while the constructed even preimage covers every target."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/10",
    "problemFocus": "Rational function from R excluding 3 to R excluding 1",
    "steps": [
      "Let y=(x−2)/(x−3). Solving y(x−3)=x−2 gives x(y−1)=3y−2 and x=(3y−2)/(y−1), defined for every y≠1.",
      "The inverse expression never yields x=3, since (3y−2)/(y−1)=3 would imply −2=−3. Thus each target has exactly one admissible preimage."
    ],
    "answer": "Bijective; inverse on B is f⁻¹(y)=(3y−2)/(y−1).",
    "check": "Composing f and the inverse yields the corresponding input for all x≠3 and y≠1, with both forbidden points excluded."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/11",
    "problemFocus": "Fourth-power map real to real multiple choice",
    "steps": [
      "Since f(1)=1=f(−1), the fourth-power function is not one-one.",
      "Every output x⁴ is nonnegative, so any negative codomain value, for example −1, has no preimage and the function is not onto."
    ],
    "answer": "Correct option D: neither one-one nor onto.",
    "check": "Both properties fail independently: opposite inputs collide and a negative real number is never produced."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "1.2/12",
    "problemFocus": "Multiplication-by-three map on the real numbers",
    "steps": [
      "If 3a=3b, division by 3 gives a=b, so the mapping is one-one.",
      "For any target y∈R choose x=y/3∈R. Then f(x)=y, proving it is onto."
    ],
    "answer": "Correct option A: one-one and onto (bijective).",
    "check": "The inverse f⁻¹(y)=y/3 is defined for every real y, giving a two-sided verification."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "misc/1",
    "problemFocus": "Monotonic bounded rational function to the open interval",
    "steps": [
      "For x≥0, f(x)=x/(1+x); for x<0, f(x)=x/(1−x). Both branches increase strictly and join at zero, so no two distinct inputs have the same image.",
      "Given y∈(−1,1), solving y=x/(1+|x|) gives x=y/(1−|y|), a real value of the same sign. Substituting it recovers y."
    ],
    "answer": "The function is bijective from R onto (−1,1), with inverse y/(1−|y|).",
    "check": "As x→±∞ the outputs tend to ±1 but never reach the endpoints; both branch derivatives are positive."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "misc/2",
    "problemFocus": "Cubic map from real to real is injective",
    "steps": [
      "Suppose a³=b³. Factor a³−b³=(a−b)(a²+ab+b²)=0.",
      "The cubic function is strictly increasing over R, so a³=b³ requires a=b; alternatively the only real cube root of each target is unique."
    ],
    "answer": "The map x↦x³ is injective (indeed bijective) on R.",
    "check": "The inverse real cube-root function exists for every output, so distinct inputs cannot collide."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "misc/3",
    "problemFocus": "Containment relation between subsets",
    "steps": [
      "If A⊂B denotes proper containment, no set A properly contains itself, so reflexivity fails; swapping proper containment is impossible, so symmetry also fails.",
      "Strict containment is transitive, but not an equivalence relation. If ⊂ is instead used for inclusive containment, the relation becomes reflexive and transitive but remains not symmetric for distinct nested subsets."
    ],
    "answer": "The subset-containment relation is not an equivalence relation under either convention.",
    "check": "Check the printed notation convention: strict ⊂ fails reflexivity; inclusive ⊆ still fails symmetry for A⊊B."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "misc/5",
    "problemFocus": "Agreement of two finite-domain functions",
    "steps": [
      "Evaluate f(x)=x²−x on A={−1,0,1,2}; the ordered outputs are (2,0,0,2).",
      "Evaluate g(x)=2|x−1/2|−1 on the same four points. The outputs are again (2,0,0,2), matching f at every domain element."
    ],
    "answer": "Yes, the two functions A→B are equal because all four corresponding outputs agree.",
    "check": "Equality of functions depends on matching domain, codomain and each output, not equality of algebraic expressions on every real number."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "misc/6",
    "problemFocus": "Counting reflexive symmetric nontransitive relations with required pairs",
    "steps": [
      "On A={1,2,3}, reflexivity requires all three diagonal pairs, and symmetry of compulsory (1,2),(1,3) requires (2,1),(3,1).",
      "Adding the remaining pair (2,3) requires (3,2) by symmetry; then all nine ordered pairs occur and the relation is transitive. Without them the chain (2,1),(1,3) is not closed, yielding precisely one admissible relation."
    ],
    "answer": "Correct option A: exactly 1 relation.",
    "check": "Any additional pair among (2,3),(3,2) forces both and turns the relation into the full transitive relation."
  },
  {
    "lessonId": "chapter-mathematics-1",
    "questionId": "misc/7",
    "problemFocus": "Counting equivalence relations constrained to relate 1 and 2",
    "steps": [
      "Equivalence relations correspond to partitions. Since 1 and 2 are equivalent, they must be in the same block.",
      "Either 3 is in its own block, yielding partition {{1,2},{3}}, or 3 joins the block, yielding {{1,2,3}}; no other partitions satisfy the requirement."
    ],
    "answer": "Correct option B: exactly 2 equivalence relations.",
    "check": "The two partitions generate equivalence relations uniquely, and the only placement choice is where element 3 belongs."
  }
]);
