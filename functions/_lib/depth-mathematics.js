export const MATHEMATICS_DEPTH = [
  [
    {
      "heading": "Reflexive, symmetric, transitive relations",
      "explanation": "For a relation R on A, reflexive means every aRa; symmetric means aRb implies bRa; transitive means aRb and bRc imply aRc. Equivalence requires all three.",
      "tryIt": "Test equality modulo 3 for equivalence on integers, illustrating each of the three required properties."
    },
    {
      "heading": "Equivalence classes and partitions",
      "explanation": "An equivalence relation partitions a set into non-overlapping classes, where elements in one class are related. Every element belongs to exactly one equivalence class.",
      "tryIt": "Group integers 0 through 8 by equal remainder after division by 3, and compare their equivalence classes."
    },
    {
      "heading": "Function domain and codomain",
      "explanation": "A function assigns each domain input exactly one output in a codomain; the actual range need not equal codomain. Many-to-one functions remain valid functions.",
      "tryIt": "Decide whether mapping x to x² from R to R has range equal to its codomain and explain."
    },
    {
      "heading": "Injective and surjective functions",
      "explanation": "Injectivity ensures different inputs have different outputs; surjectivity ensures every codomain element has a preimage. Bijective functions are both.",
      "tryIt": "Assess x↦2x+3 from R to R for injectivity and surjectivity with a short algebraic proof."
    },
    {
      "heading": "Composition and inverse",
      "explanation": "Composition f∘g applies g then f where domains allow. A two-sided inverse exists for a bijection, reversing its assignments and satisfying inverse composition identities.",
      "tryIt": "Find the inverse of f(x)=3x−2 on R, and verify f⁻¹(f(x))=x."
    }
  ],
  [
    {
      "heading": "Principal branches and restrictions",
      "explanation": "Inverse trigonometric functions are defined by restricting periodic trigonometric functions to one-to-one principal branches. The resulting inverse has a prescribed domain and range.",
      "tryIt": "Write the principal ranges of arcsin, arccos and arctan, and explain why these restrictions matter."
    },
    {
      "heading": "Graphs of arcsin and arccos",
      "explanation": "The graph of an inverse on an allowed interval reflects the corresponding restricted original graph over y=x. Arcsin is increasing while arccos is decreasing.",
      "tryIt": "Sketch the arcsin graph with endpoints and compare its monotonic direction with arccos."
    },
    {
      "heading": "Principal values and composition",
      "explanation": "Principal-value conventions mean arcsin(sinθ) need not equal θ outside [−π/2,π/2], and arccos(cosθ) similarly requires its range.",
      "tryIt": "Evaluate arcsin(sin(5π/6)) with a principal-range argument."
    },
    {
      "heading": "Basic inverse identities",
      "explanation": "On valid domains, arcsin x + arccos x = π/2. Related tangent identities require branch and sign care; algebraic manipulations cannot override restrictions.",
      "tryIt": "Check arcsin(0.5)+arccos(0.5) and state the interval of validity."
    },
    {
      "heading": "Solving inverse-trigonometric equations",
      "explanation": "Solve equations by identifying branch ranges, checking domain and eliminating extraneous solutions introduced by applying periodic trig functions.",
      "tryIt": "Solve arctan x = π/4 and justify uniqueness using the principal range."
    }
  ],
  [
    {
      "heading": "Types and notation",
      "explanation": "Matrix order counts rows×columns, and entries are indexed by row and column. Zero, identity, diagonal, scalar and triangular matrices have structural definitions.",
      "tryIt": "Write a 2×3 matrix and identify each entry's row–column position without transposing indices."
    },
    {
      "heading": "Addition and scalar multiplication",
      "explanation": "Matrices of equal order add entrywise and distribute over scalar multiplication. Different orders cannot generally be added.",
      "tryIt": "Add two 2×2 matrices and verify the resulting order remains unchanged."
    },
    {
      "heading": "Matrix multiplication",
      "explanation": "AB exists when A's column count equals B's row count, with each output element a row–column dot product. Multiplication is not generally commutative.",
      "tryIt": "Find AB for a 2×3 and 3×1 example and explain why BA may be undefined."
    },
    {
      "heading": "Transpose and symmetry",
      "explanation": "Transposing swaps i,j indices. A symmetric matrix satisfies Aᵀ=A; a skew-symmetric one satisfies Aᵀ=−A, forcing its diagonal entries to zero.",
      "tryIt": "Check whether the matrix [[0,2],[-2,0]] is skew symmetric and explain the diagonal condition."
    },
    {
      "heading": "Inverse and singularity",
      "explanation": "A nonsingular square matrix has an inverse satisfying AA⁻¹=I; uniqueness follows algebraically. A nonzero matrix can multiply another nonzero matrix to produce zero.",
      "tryIt": "Calculate the inverse of [[2,1],[1,1]] and verify multiplication produces the identity."
    },
    {
      "heading": "Elementary operations and applications",
      "explanation": "Elementary row or column operations help transform matrices and solve systems; their effect on determinant and invertibility requires care.",
      "tryIt": "Perform one elementary row operation on a simple 2×2 matrix and identify whether it changes rank."
    }
  ],
  [
    {
      "heading": "Determinants of orders two and three",
      "explanation": "A 2×2 determinant is ad−bc. A 3×3 determinant can be evaluated by cofactor expansion, with alternating signs determined by row and column position.",
      "tryIt": "Expand a 3×3 determinant along a row containing a zero and explain how that simplifies computation."
    },
    {
      "heading": "Minors and cofactors",
      "explanation": "A minor deletes one row and column, while its cofactor includes the sign factor (−1)^(i+j). Cofactor expansion expresses the full determinant.",
      "tryIt": "Find the cofactor of an entry in the first row, second column of a 3×3 matrix."
    },
    {
      "heading": "Determinant properties",
      "explanation": "Swapping two rows reverses determinant sign; scaling a row scales it and adding a multiple of one row to another leaves it unchanged.",
      "tryIt": "Predict the determinant after swapping two rows of a matrix with known nonzero determinant."
    },
    {
      "heading": "Adjoint and inverse matrix",
      "explanation": "For an invertible square matrix, A⁻¹=adj(A)/det(A). Zero determinant prevents this construction and indicates non-unique or unsolvable general systems.",
      "tryIt": "Calculate det of [[3,1],[2,1]] and use it to decide if an inverse exists."
    },
    {
      "heading": "Linear equations and consistency",
      "explanation": "A system Ax=b has a unique solution when A is square and nonsingular. Singular systems can be inconsistent or have infinitely many solutions.",
      "tryIt": "Distinguish a pair of identical linear equations from two inconsistent parallel equations."
    },
    {
      "heading": "Triangle area from coordinates",
      "explanation": "The area of a triangle through three planar points can be expressed as half the absolute value of a 3×3 determinant with final column 1.",
      "tryIt": "Calculate area of the triangle with vertices (0,0), (2,0), (0,3) using a determinant."
    }
  ],
  [
    {
      "heading": "Limits and continuity",
      "explanation": "Continuity at x=a requires function value to agree with its limiting value from the domain; piecewise functions demand appropriate one-sided limits.",
      "tryIt": "For a piecewise function, choose the constant ensuring left and right limits match at a boundary."
    },
    {
      "heading": "Differentiability and continuity",
      "explanation": "Differentiability implies continuity, but corners and cusps show the converse need not hold. At interior points two-sided derivatives must agree.",
      "tryIt": "Compare left and right derivatives of |x| at x=0 and identify why it is not differentiable."
    },
    {
      "heading": "Product and quotient rules",
      "explanation": "Differentiation of products uses (fg)'=f'g+fg' and quotients use (f'g−fg')/g² where denominator is nonzero.",
      "tryIt": "Differentiate x²sinx with the product rule and identify both terms."
    },
    {
      "heading": "Chain and inverse-trig rules",
      "explanation": "Composite functions use (f(g(x)))'=f'(g(x))g'(x). Derivatives of inverse-trigonometric functions have specified domains and sign conventions.",
      "tryIt": "Differentiate sin(3x²) and identify the inner derivative factor."
    },
    {
      "heading": "Implicit differentiation",
      "explanation": "If x and y are linked by an equation, differentiate both sides treating y as a function of x; apply chain rule to its appearances.",
      "tryIt": "Implicitly differentiate x²+y²=25 and solve for dy/dx where y≠0."
    },
    {
      "heading": "Exponential and logarithmic derivatives",
      "explanation": "For a>0, derivative of eˣ is eˣ and derivative of ln|x| is 1/x on x≠0. Logarithmic differentiation helps with products and variable exponents.",
      "tryIt": "Differentiate xˣ for x>0 by writing ln y=x ln x and applying implicit differentiation."
    },
    {
      "heading": "Parametric and higher derivatives",
      "explanation": "For x(t),y(t), dy/dx=(dy/dt)/(dx/dt) where dx/dt≠0. A second derivative requires differentiating the first with respect to x.",
      "tryIt": "For x=t², y=t³ and t≠0, calculate dy/dx and then d²y/dx²."
    }
  ],
  [
    {
      "heading": "Derivative as rate of change",
      "explanation": "A derivative gives instantaneous response; units are output units per input unit. For a position function, first derivative is velocity and second is acceleration.",
      "tryIt": "Given s(t)=t³ metres, calculate velocity and acceleration at t=2 seconds."
    },
    {
      "heading": "Monotonic intervals",
      "explanation": "On an interval where f' is positive the function is increasing and where negative it is decreasing. Critical points divide the real line for sign analysis.",
      "tryIt": "Use f'(x)=2x−4 to identify increasing and decreasing intervals of a quadratic."
    },
    {
      "heading": "First-derivative extrema test",
      "explanation": "At an interior critical point, a derivative sign change from positive to negative indicates local maximum and negative to positive indicates local minimum.",
      "tryIt": "Construct a sign chart for f'(x)=x(x−2) and classify each stationary point."
    },
    {
      "heading": "Second-derivative test and ambiguity",
      "explanation": "At a stationary point, f''>0 gives a local minimum and f''<0 a maximum under suitable differentiability conditions; zero is inconclusive.",
      "tryIt": "Explain why f(x)=x⁴ has a minimum at zero even though f''(0)=0."
    },
    {
      "heading": "Optimisation problems",
      "explanation": "Translate constraints into a one-variable objective and inspect stationary points plus allowed endpoints. Report practical units and verify feasibility.",
      "tryIt": "Maximise the area of a rectangle with fixed perimeter 20 m using one variable and endpoints."
    },
    {
      "heading": "Tangents and normals",
      "explanation": "A tangent at differentiable x=a has slope f'(a), and the normal line has negative reciprocal slope when the tangent is neither horizontal nor vertical.",
      "tryIt": "Write the tangent equation to y=x² at x=2 and explain the normal slope."
    }
  ],
  [
    {
      "heading": "Antiderivatives and constants",
      "explanation": "Indefinite integration reverses differentiation and includes a constant C; power, exponential and trigonometric identities generate standard formula families.",
      "tryIt": "Differentiate the result of ∫(3x²+2)dx to verify the integrand is restored."
    },
    {
      "heading": "Substitution techniques",
      "explanation": "When an integrand contains a composite function and its derivative, substitute u=g(x) and transform differential and limits consistently.",
      "tryIt": "Evaluate ∫2x cos(x²)dx by using u=x² and explain the new differential."
    },
    {
      "heading": "Partial fractions",
      "explanation": "A rational function can often be decomposed into simpler fractions once its denominator is factored; polynomial division comes first if improper.",
      "tryIt": "Decompose 1/[x(x+1)] into simple partial fractions and integrate term by term."
    },
    {
      "heading": "Integration by parts",
      "explanation": "The product rule gives ∫u dv=uv−∫v du. A sensible choice of u can reduce logarithmic, inverse-trigonometric or polynomial products.",
      "tryIt": "Use integration by parts to compute ∫x eˣ dx and differentiate the result."
    },
    {
      "heading": "Definite integral and theorem",
      "explanation": "The fundamental theorem evaluates a definite integral as F(b)−F(a) for a continuous integrand and antiderivative F; it measures signed accumulation.",
      "tryIt": "Compute ∫1³ 2x dx and explain why there is no arbitrary constant in the final numerical answer."
    },
    {
      "heading": "Definite-integral symmetry",
      "explanation": "Substitution, parity and periodicity can simplify definite integrals, but symmetry assumptions require the function and interval to fit.",
      "tryIt": "Show why an odd continuous function integrates to zero over [−a,a], then contrast its geometric area."
    },
    {
      "heading": "Integrals with trigonometric identities",
      "explanation": "Trigonometric identities such as sin²x=(1−cos2x)/2 transform products and squares into integrable forms; check the domain and constants.",
      "tryIt": "Find ∫sin²x dx using the double-angle identity and verify by differentiation."
    }
  ],
  [
    {
      "heading": "Area under a positive curve",
      "explanation": "When f(x)≥0 on [a,b], the area between graph and x-axis is ∫aᵇ f(x)dx, with geometric square units set by axes.",
      "tryIt": "Compute the area under y=x² between x=0 and x=2 using an antiderivative."
    },
    {
      "heading": "Signed versus absolute area",
      "explanation": "A definite integral can cancel positive and negative signed contributions; geometric area requires splitting at zeros and integrating absolute values.",
      "tryIt": "Find geometric area between y=x and the axis on [−1,1], comparing it with the signed integral."
    },
    {
      "heading": "Area between two curves",
      "explanation": "For continuous upper function f and lower function g on [a,b], area is ∫(f−g)dx. Determine intersection points before choosing limits.",
      "tryIt": "Find the intersection points of y=x and y=x² on [0,1] and formulate the area integral."
    },
    {
      "heading": "Choosing strips and axes",
      "explanation": "Vertical strips integrate with respect to x; horizontal strips integrate with respect to y when curves are better expressed as x-functions of y.",
      "tryIt": "Explain when horizontal strips simplify the region bounded by a parabola and a vertical line."
    },
    {
      "heading": "Unit and consistency checks",
      "explanation": "Integration area answers depend on graph scale and orientation. Sketching a region prevents negative or omitted regions and should precede formal integration.",
      "tryIt": "Explain why integrating upper-minus-lower avoids negative area for two nonintersecting curves."
    }
  ],
  [
    {
      "heading": "Order, degree and formation",
      "explanation": "A differential equation includes derivatives of an unknown function; order is its highest derivative and degree is defined for a polynomial in derivatives.",
      "tryIt": "Identify the order and degree of (d²y/dx²)² + dy/dx = 0 and explain degree conventions."
    },
    {
      "heading": "Separable first-order equations",
      "explanation": "For dy/dx=g(x)h(y), rearrange dy/h(y)=g(x)dx when valid, integrate and include the constant and any lost constant solutions.",
      "tryIt": "Solve dy/dx=xy by separation where y≠0 and check whether y=0 is also a solution."
    },
    {
      "heading": "Homogeneous first-order equations",
      "explanation": "An equation dy/dx=F(y/x) is homogeneous in the relevant first-order sense and often reduces through y=vx, then dy/dx=v+x dv/dx.",
      "tryIt": "For dy/dx=1+y/x, introduce v=y/x and derive the transformed equation."
    },
    {
      "heading": "Linear differential equations",
      "explanation": "A first-order linear ODE dy/dx+P(x)y=Q(x) uses integrating factor exp(∫P dx) to transform into a derivative of a product.",
      "tryIt": "Solve dy/dx+y=eˣ using integrating factor eˣ and verify by substitution."
    },
    {
      "heading": "Particular solution and initial condition",
      "explanation": "Integrating yields a family of solutions; an initial or boundary condition fixes the constant when uniqueness conditions permit.",
      "tryIt": "Find the solution of dy/dx=2x through (x,y)=(0,3) and verify it meets both conditions."
    },
    {
      "heading": "Checking domain and excluded roots",
      "explanation": "Algebraic rearrangements can divide by expressions that vanish, accidentally removing solutions; always substitute candidate solutions into original equation.",
      "tryIt": "When separating dy/dx=xy, explain why constant y=0 should be checked separately."
    }
  ],
  [
    {
      "heading": "Vector representation and magnitudes",
      "explanation": "Vectors have direction and magnitude; Cartesian components and unit basis vectors support addition, scaling and norm √(ax²+ay²+az²).",
      "tryIt": "Find the unit vector in direction (3,4,0) and confirm its magnitude is one."
    },
    {
      "heading": "Direction cosines and ratios",
      "explanation": "Direction cosines with coordinate axes satisfy l²+m²+n²=1; direction ratios are proportional triples and need not themselves be normalised.",
      "tryIt": "Normalise direction ratios 1:2:2 into direction cosines and verify the identity."
    },
    {
      "heading": "Dot product and projection",
      "explanation": "The dot product a·b=|a||b|cosθ is scalar, measures alignment and can compute projection or angles between vectors.",
      "tryIt": "Use dot product to test perpendicularity of (1,2,0) and (2,−1,3)."
    },
    {
      "heading": "Cross product and area",
      "explanation": "The cross product a×b is perpendicular to the plane of a,b and has magnitude |a||b|sinθ, equal to the parallelogram area.",
      "tryIt": "Calculate magnitude of (1,0,0)×(0,2,0) and interpret a corresponding triangle area."
    },
    {
      "heading": "Triple-product interpretation",
      "explanation": "The scalar triple product a·(b×c) gives oriented volume of a parallelepiped; magnitude equals volume and zero indicates coplanarity.",
      "tryIt": "Evaluate the volume formed by the three standard coordinate unit vectors."
    },
    {
      "heading": "Applications to geometry",
      "explanation": "Vectors support distances, angles, projections and geometric relations without ambiguous drawing scale. State whether a result is a scalar or a vector.",
      "tryIt": "Compare the role of dot and cross products when finding an angle versus area of a parallelogram."
    }
  ],
  [
    {
      "heading": "Line vector equation",
      "explanation": "A 3D line has vector form r=a+λb using a fixed point a and nonzero direction b, with the same parameter in every coordinate.",
      "tryIt": "Show whether point (3,0,1) lies on line r=(1,2,3)+t(1,−1,−1)."
    },
    {
      "heading": "Cartesian and symmetric forms",
      "explanation": "When direction components are nonzero, a line may be expressed (x−x0)/a=(y−y0)/b=(z−z0)/c. Zero components instead require fixed coordinates.",
      "tryIt": "Convert line r=(2,1,0)+t(3,0,2) into suitable Cartesian equations while handling y correctly."
    },
    {
      "heading": "Angle between 3D lines",
      "explanation": "Angle between two lines follows angle between their direction vectors through the dot product, usually taking the acute angle for unoriented lines.",
      "tryIt": "Compute the angle between perpendicular direction vectors (1,0,0) and (0,1,0)."
    },
    {
      "heading": "Shortest distance: parallel lines",
      "explanation": "For parallel lines separated by displacement vector c and direction b, perpendicular separation magnitude can be expressed |c×b|/|b|.",
      "tryIt": "For x-directed parallel lines through (0,0,0) and (0,3,4), calculate shortest distance."
    },
    {
      "heading": "Skew lines and shortest distance",
      "explanation": "Nonparallel 3D lines that do not intersect are skew; their shortest separation can be calculated using scalar triple products and cross product of directions.",
      "tryIt": "Explain why two lines can be nonparallel and nonintersecting in 3D while this cannot happen for planar infinite lines."
    },
    {
      "heading": "Checking intersection",
      "explanation": "To prove two parameterised lines intersect, solve all coordinate equations for the two line parameters consistently. A solution from only two coordinates is insufficient.",
      "tryIt": "Attempt to solve a three-coordinate intersection and describe the third-coordinate consistency test."
    }
  ],
  [
    {
      "heading": "Decision variables and objective",
      "explanation": "A linear programming problem defines controllable variables, a linear objective to maximise or minimise, and constraints representing resources or requirements.",
      "tryIt": "Write an objective for profit from two products with profits 3 and 5 units per item."
    },
    {
      "heading": "Feasible half-planes",
      "explanation": "Each linear inequality defines a half-plane; their intersection and nonnegativity conditions form the feasible region. Infeasible models have no common point.",
      "tryIt": "Draw x+y≤4, x≥0, y≥0 and identify the feasible triangle vertices."
    },
    {
      "heading": "Corner point principle",
      "explanation": "For a bounded feasible polygon, a linear objective reaches an optimum at a vertex. A tie along an edge can yield multiple optimal feasible points.",
      "tryIt": "Evaluate Z=2x+y at the corner points of x+y≤3 with nonnegative variables."
    },
    {
      "heading": "Bounded and unbounded problems",
      "explanation": "An unbounded feasible region does not automatically imply an unbounded objective; check the direction of improvement, constraints and attainable values.",
      "tryIt": "Give an example of an unbounded feasible region where minimising x+y still has a finite minimum."
    },
    {
      "heading": "Model interpretation and units",
      "explanation": "An optimisation answer must satisfy each resource and nonnegativity restriction. Linear approximations have practical limitations and may need integer restrictions.",
      "tryIt": "Explain why a negative optimal quantity of manufactured bicycles is inadmissible even if algebra gives it."
    },
    {
      "heading": "Graphical limitations",
      "explanation": "Two-variable graphical methods show vertices and objective lines clearly; higher-dimensional models usually require other algorithms.",
      "tryIt": "Explain why a plot of only one inequality cannot establish the feasible region of a multi-constraint model."
    }
  ],
  [
    {
      "heading": "Conditional probability and sample space",
      "explanation": "P(A|B)=P(A∩B)/P(B) for P(B)>0; conditioning restricts the effective sample space to outcomes satisfying B.",
      "tryIt": "In a group of 20 cyclists, 8 draw. Find probability of drawing given the person cycles."
    },
    {
      "heading": "Multiplication rule",
      "explanation": "P(A∩B)=P(A)P(B|A), which becomes a product P(A)P(B) under independence. The order of a sequential calculation matters.",
      "tryIt": "Find probability of drawing two red marbles without replacement from three red and two blue marbles."
    },
    {
      "heading": "Independent events",
      "explanation": "A and B are independent if knowing one does not change probability of the other, equivalently P(A∩B)=P(A)P(B). Independence differs from disjointness.",
      "tryIt": "Explain why two positive-probability mutually exclusive events cannot be independent."
    },
    {
      "heading": "Total probability theorem",
      "explanation": "For disjoint exhaustive B_i with positive probabilities, P(A)=ΣP(A|B_i)P(B_i); partitioning clarifies multi-source scenarios.",
      "tryIt": "A factory has two lines with distinct defect rates; set up total probability of a defect."
    },
    {
      "heading": "Bayes theorem and base rates",
      "explanation": "Bayes theorem computes posterior P(B|A)=P(A|B)P(B)/P(A), where denominators must reflect full evidence probability.",
      "tryIt": "Given test sensitivity and false-positive rate, explain why prevalence influences positive predictive value."
    },
    {
      "heading": "Random-variable distributions",
      "explanation": "A discrete random variable maps outcomes to numbers and has probabilities summing to one. Expectation E[X]=ΣxP(X=x) summarises mean outcome.",
      "tryIt": "A fair die has outcomes 1–6; find its expected value and verify probability normalisation."
    }
  ]
];
