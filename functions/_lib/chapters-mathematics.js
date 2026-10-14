// Original Saathi CBSE 2026–27 Mathematics chapter teaching drafts; school internal assessment not certified.
export const MATHEMATICS_DRAFTS=[
  {
    "learningObjectives": [
      "Identify relations and functions",
      "Distinguish one-one and onto functions",
      "Check equivalence-relation properties"
    ],
    "concept": "A relation from A to B is a subset of A×B, whereas a function assigns each input in its domain exactly one output in its codomain. A one-one (injective) function never maps different inputs to the same value; an onto (surjective) function reaches every element of the stated codomain. A relation is an equivalence relation when reflexive, symmetric and transitive.",
    "example": "On the real numbers, f(x)=2x+1 is one-one because f(a)=f(b) implies 2a+1=2b+1, hence a=b. It is onto the reals because for any output y, x=(y−1)/2 yields f(x)=y. The stated domain and codomain matter.",
    "question": "Which mapping f: R→R is one-one and onto?",
    "options": [
      "f(x)=x²",
      "f(x)=2x+1",
      "f(x)=|x|",
      "f(x)=0"
    ],
    "answerIndex": 1,
    "explanation": "The linear function 2x+1 has nonzero slope, so it is injective; every real y has real preimage (y−1)/2, so it is surjective onto R.",
    "misconception": "A function's surjectivity cannot be decided without knowing its codomain. A relation is not automatically a function if one input has two assigned outputs."
  },
  {
    "learningObjectives": [
      "Recognise principal value branches",
      "Evaluate inverse trigonometric expressions",
      "Use inverse composition with domain limits"
    ],
    "concept": "Inverse trigonometric functions return principal angles on restricted ranges so they can be single-valued. The principal range of arcsin is [−π/2,π/2], arccos is [0,π], and arctan is (−π/2,π/2). Expressions such as arcsin(sin θ) equal θ only when θ lies within the appropriate principal interval.",
    "example": "Because sin(5π/6)=1/2, arcsin(sin(5π/6)) = arcsin(1/2) = π/6, not 5π/6. The inverse-sine function returns the principal angle π/6.",
    "question": "What is the principal value of arctan(1)?",
    "options": [
      "−π/4",
      "π/4",
      "3π/4",
      "5π/4"
    ],
    "answerIndex": 1,
    "explanation": "tan(π/4)=1, and π/4 lies inside the principal range (−π/2,π/2) of arctan.",
    "misconception": "Inverse trigonometric notation does not mean a reciprocal. arcsin x is not 1/sin x, and inverse values depend on principal range."
  },
  {
    "learningObjectives": [
      "Perform matrix multiplication",
      "Identify compatible matrix dimensions",
      "Distinguish transpose from inverse"
    ],
    "concept": "An m×n matrix contains m rows and n columns. A product AB exists when columns of A equal rows of B, with (AB)ij = sum over k of Aik Bkj. Matrix multiplication generally does not commute: AB may differ from BA. The transpose exchanges rows and columns, while an inverse A⁻¹ exists only for nonsingular square matrices.",
    "example": "For A = [[1,2],[3,4]] and B = [[2,0],[1,2]], AB = [[1×2+2×1,1×0+2×2],[3×2+4×1,3×0+4×2]] = [[4,4],[10,8]]. Verify each entry by row–column dot products.",
    "question": "A is a 2×3 matrix and B is a 3×4 matrix. What are the dimensions of AB?",
    "options": [
      "2×4",
      "3×3",
      "4×2",
      "Not defined"
    ],
    "answerIndex": 0,
    "explanation": "The inner dimensions are both 3, so multiplication is defined. The result inherits 2 rows from A and 4 columns from B.",
    "misconception": "Entrywise multiplication is not standard matrix multiplication. An inverse does not exist for every square matrix, and AB=BA is not a general rule."
  },
  {
    "learningObjectives": [
      "Calculate small determinants",
      "Relate determinant to singularity",
      "Apply elementary determinant properties"
    ],
    "concept": "The determinant is a scalar associated with a square matrix. For [[a,b],[c,d]], det = ad−bc. A square matrix is invertible exactly when its determinant is nonzero. Swapping two rows reverses determinant sign, while multiplying one row by k multiplies determinant by k. Determinants also support solving linear systems through inverse or Cramer's rule.",
    "example": "For matrix [[3,2],[1,4]], determinant = 3×4−2×1 = 10. Because this is nonzero, the matrix is invertible. For [[1,2],[2,4]] the determinant is 4−4 = 0, so no inverse exists.",
    "question": "What is the determinant of [[2,5],[1,3]]?",
    "options": [
      "1",
      "11",
      "−1",
      "6"
    ],
    "answerIndex": 0,
    "explanation": "For a 2×2 matrix, determinant = ad−bc = 2×3−5×1 = 1.",
    "misconception": "A determinant is defined only for square matrices in the usual school context. Zero determinant implies singularity, not that every matrix entry is zero."
  },
  {
    "learningObjectives": [
      "Test continuity using limits",
      "Differentiate elementary functions",
      "Interpret derivatives as local rates"
    ],
    "concept": "A function f is continuous at a if lim(x→a) f(x)=f(a), with the appropriate one-sided domain conditions. Differentiability at a implies continuity there, but continuity alone does not guarantee a derivative. For a polynomial, use the power rule d(xⁿ)/dx=nxⁿ⁻¹ and linearity; composite functions require the chain rule.",
    "example": "For f(x)=x³+2x, f'(x)=3x²+2. At x=2, the instantaneous rate of change is f'(2)=3×4+2=14. By contrast f(x)=|x| is continuous at x=0 but not differentiable there because its one-sided slopes are −1 and +1.",
    "question": "What is the derivative of f(x)=4x³−5x at x=1?",
    "options": [
      "7",
      "12",
      "−1",
      "16"
    ],
    "answerIndex": 0,
    "explanation": "f'(x)=12x²−5, so f'(1)=12−5=7. The derivative is the instantaneous slope, not the original function value.",
    "misconception": "A sharp corner can be continuous yet non-differentiable. Checking left and right derivatives is essential at piecewise boundaries."
  },
  {
    "learningObjectives": [
      "Find stationary points with derivatives",
      "Classify extrema using sign or second derivative",
      "Interpret monotonic intervals"
    ],
    "concept": "Derivative sign indicates local increase or decrease where differentiable: f'>0 indicates increasing and f'<0 decreasing. At an interior differentiable local extremum, f' may vanish. A second-derivative test classifies a stationary point with f''>0 as a local minimum and f''<0 as a local maximum; when f''=0, further analysis is needed. Applications include optimisation under explicit constraints.",
    "example": "For f(x)=x²−6x+8, f'(x)=2x−6. Set derivative zero: x=3. Since f''(x)=2>0, x=3 gives a local and global minimum on R. The minimum value is 9−18+8=−1.",
    "question": "For f(x)=−x²+4x, where is its maximum on the real line?",
    "options": [
      "x=0",
      "x=1",
      "x=2",
      "x=4"
    ],
    "answerIndex": 2,
    "explanation": "Differentiate to get f'(x)=−2x+4; setting this to zero gives x=2. The second derivative −2 is negative, confirming a maximum.",
    "misconception": "f'(a)=0 is only a candidate, not proof of maximum or minimum. Endpoint extrema may occur without an interior stationary point."
  },
  {
    "learningObjectives": [
      "Apply elementary integration formulas",
      "Distinguish indefinite and definite integrals",
      "Use substitution for simple composites"
    ],
    "concept": "Integration reverses differentiation when finding antiderivatives, up to a constant: ∫xⁿ dx = xⁿ⁺¹/(n+1)+C for n≠−1. A definite integral ∫a^b f(x)dx gives signed accumulation and is computed using an antiderivative F as F(b)−F(a). Substitution changes variables to simplify a composite integrand.",
    "example": "Evaluate ∫0^2 3x² dx. An antiderivative is x³; applying limits yields [x³]0² = 8−0 = 8. For an indefinite integral, write ∫3x²dx=x³+C, retaining the constant.",
    "question": "What is the definite integral from 0 to 1 of 2x dx?",
    "options": [
      "0",
      "1",
      "2",
      "1/2"
    ],
    "answerIndex": 1,
    "explanation": "An antiderivative of 2x is x². Therefore [x²]0¹=1−0=1. A definite integral returns a number, not +C.",
    "misconception": "The integration constant appears in indefinite integrals, not a final definite-integral value. A signed integral is not always the same as geometric area."
  },
  {
    "learningObjectives": [
      "Explain definite integrals as signed area",
      "Find area between a curve and axis",
      "Split intervals when a function changes sign"
    ],
    "concept": "For a continuous f, the definite integral gives signed area between graph and x-axis. To calculate geometric area, integrate |f(x)|, splitting where the function crosses the axis. Between two graphs y=f(x) and y=g(x), area on an interval is ∫|f(x)−g(x)|dx, using the appropriate upper-minus-lower expression on each subinterval.",
    "example": "Between y=x and the x-axis from x=0 to x=2, area = ∫0² x dx = [x²/2]0² = 2 square units. By contrast ∫−1¹ x dx=0, though total geometric area is 1 square unit; positive and negative signed regions cancel.",
    "question": "What is the geometric area beneath y=x² and above the x-axis from x=0 to x=3?",
    "options": [
      "3",
      "6",
      "9",
      "27"
    ],
    "answerIndex": 2,
    "explanation": "Because x² is nonnegative, area = ∫0³ x² dx = [x³/3]0³ = 27/3 = 9 square units.",
    "misconception": "A zero definite integral does not necessarily mean zero enclosed area. Interchanging upper and lower curves can produce a negative signed integral."
  },
  {
    "learningObjectives": [
      "Recognise order and degree",
      "Solve simple separable equations",
      "Verify a solution by substitution"
    ],
    "concept": "A differential equation relates a function to one or more derivatives. Its order is that of the highest derivative; its degree concerns powers of derivatives when expressed polynomially in them. Separable first-order equations can be rearranged to put y terms with dy and x terms with dx. A general solution includes integration constants; an initial condition selects one particular member.",
    "example": "Solve dy/dx = 2x with y(0)=3. Integrate both sides: y=x²+C. The initial condition gives 3=0+C, hence y=x²+3. Check derivative dy/dx=2x, matching the given equation.",
    "question": "Which function solves dy/dx=3x² and y(0)=2?",
    "options": [
      "y=x³+2",
      "y=3x³+2",
      "y=x²+2",
      "y=3x²+2"
    ],
    "answerIndex": 0,
    "explanation": "The antiderivative of 3x² is x³+C. y(0)=2 fixes C=2, so y=x³+2. Differentiating verifies dy/dx=3x².",
    "misconception": "An arbitrary constant cannot be dropped from a general solution. Substituting back into the equation is a reliable check for sign or integration errors."
  },
  {
    "learningObjectives": [
      "Compute vector magnitude and unit vectors",
      "Evaluate dot and cross products",
      "Interpret angle via dot product"
    ],
    "concept": "A vector has magnitude and direction. For a=(ax,ay,az), |a|=√(ax²+ay²+az²). Dot product a·b=|a||b|cosθ is scalar and measures directional alignment; cross product a×b is a vector perpendicular to both, with magnitude |a||b|sinθ. Components support systematic computation in three dimensions.",
    "example": "Take a=(3,4,0). Its magnitude is √(9+16)=5, so its unit vector is (3/5,4/5,0). For b=(0,2,0), a·b=3×0+4×2=8. The dot product is a scalar rather than a vector.",
    "question": "For perpendicular nonzero vectors a and b, what is a·b?",
    "options": [
      "|a||b|",
      "Zero",
      "−|a||b|",
      "Always one"
    ],
    "answerIndex": 1,
    "explanation": "a·b=|a||b|cos90°=0 because the cosine of a right angle is zero.",
    "misconception": "A zero dot product indicates perpendicular nonzero vectors, but it can also arise if one vector is the zero vector. Dot and cross products are different operations."
  },
  {
    "learningObjectives": [
      "Describe a line in vector form",
      "Use direction ratios in 3D",
      "Recognise skew lines"
    ],
    "concept": "A line in three dimensions can be written r = a + λb, where a is a fixed point vector and nonzero b a direction vector. Two lines may intersect, be parallel or be skew (neither parallel nor intersecting). The angle between their directions can be calculated from the dot product. Coordinate equations require consistent parameter values across x, y and z.",
    "example": "The line r=(1,2,3)+t(2,0,−1) passes through (1,2,3). At t=2 its point is (1+4,2,3−2)=(5,2,1). Direction ratios are proportional to (2,0,−1), not the coordinates of the first point.",
    "question": "For r=(0,1,2)+t(1,−2,3), which point is on the line at t=1?",
    "options": [
      "(1,−1,5)",
      "(1,1,3)",
      "(0,−1,5)",
      "(2,−1,1)"
    ],
    "answerIndex": 0,
    "explanation": "Insert t=1 to obtain (0+1,1−2,2+3)=(1,−1,5). All three coordinates must use the same value of t.",
    "misconception": "Skew lines are possible in three dimensions and are not simply nonintersecting parallel lines. A line's anchor vector need not point along the line."
  },
  {
    "learningObjectives": [
      "Formulate linear inequalities",
      "Find corner points of a feasible region",
      "Evaluate linear objectives at vertices"
    ],
    "concept": "Linear programming optimises a linear objective under linear equality or inequality constraints. With two variables, constraints define a feasible region in the plane. When a finite optimum exists at a vertex for a bounded polygonal feasible set, compare the objective at feasible corner points. Practical models require nonnegativity, correct units and careful handling of infeasible or unbounded cases.",
    "example": "Maximise Z=3x+2y subject to x≥0, y≥0 and x+y≤4. The triangular feasible-region vertices are (0,0), (4,0), (0,4). Evaluate Z: 0,12,8. The maximum is 12 at (4,0).",
    "question": "Maximise Z=x+2y subject to x≥0, y≥0 and x+y≤3. What is the optimal value?",
    "options": [
      "0",
      "3",
      "5",
      "6"
    ],
    "answerIndex": 3,
    "explanation": "Feasible vertices are (0,0), (3,0), (0,3); the corresponding Z values are 0,3 and 6. Thus the maximum is 6 at (0,3).",
    "misconception": "A candidate optimum must satisfy every constraint. Not every linear programme has a feasible solution or a finite optimum; graph shape and direction matter."
  },
  {
    "learningObjectives": [
      "Apply conditional probability",
      "Recognise independent events",
      "Use Bayes' theorem carefully"
    ],
    "concept": "Conditional probability for P(B)>0 is P(A|B)=P(A∩B)/P(B). Events A and B are independent when P(A∩B)=P(A)P(B), in which case conditioning on B does not change P(A). Bayes' theorem reverses conditioning using prior probabilities and likelihoods: P(A|B)=P(B|A)P(A)/P(B). Care is needed with base rates.",
    "example": "In a group of 20 cyclists, 8 also draw. Given a randomly selected learner is a cyclist, P(draw|cycle)=8/20=0.40. For independent fair-coin tosses, probability of two heads is (1/2)(1/2)=1/4.",
    "question": "If P(A∩B)=0.15 and P(B)=0.30, what is P(A|B)?",
    "options": [
      "0.045",
      "0.15",
      "0.50",
      "2.0"
    ],
    "answerIndex": 2,
    "explanation": "P(A|B)=P(A∩B)/P(B)=0.15/0.30=0.50. Conditioning uses P(B) in the denominator and requires P(B)>0.",
    "misconception": "P(A|B) and P(B|A) are generally not equal. Independence and mutual exclusivity are different; disjoint positive-probability events cannot be independent."
  }
];
