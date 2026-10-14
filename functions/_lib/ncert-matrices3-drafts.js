// Original, teacher-unverified Matrices Exercise 3.1 answer drafts for the official
// NCERT 2026-27 Part I PDF. No textbook question stems are copied.
export const MATRIX3_WORKED_DRAFTS=Object.freeze([
  {
    "lessonId": "chapter-mathematics-3",
    "questionId": "3.1/1",
    "problemFocus": "Read matrix order and entries using row then column",
    "steps": [
      "Count three horizontal rows and four vertical columns in the displayed rectangular array. The number of matrix entries equals their product 3×4=12.",
      "Read the requested entries by indexing first the row and then the column, using the printed matrix values for each position."
    ],
    "answer": "Order 3×4; 12 entries; a13=19, a21=35, a33=−5, a24=12, a23=5/2.",
    "check": "The top-right entry a14 is −7 rather than a13; a24 is the second-row fourth-column entry 12."
  },
  {
    "lessonId": "chapter-mathematics-3",
    "questionId": "3.1/2",
    "problemFocus": "Possible matrix orders from prime-factor and composite totals",
    "steps": [
      "For a matrix of order m×n, its number of entries equals mn. List every positive ordered factor pair of 24 including reversed orders.",
      "For 13 entries, primality restricts the positive integer factor pairs to 1×13 and its reverse 13×1, with no other possible dimensions."
    ],
    "answer": "For 24: 1×24, 2×12, 3×8, 4×6, 6×4, 8×3, 12×2, 24×1; for 13: 1×13, 13×1.",
    "check": "Every listed pair multiplies to the requested entry count, and reversed dimensions are distinct matrix orders."
  },
  {
    "lessonId": "chapter-mathematics-3",
    "questionId": "3.1/3",
    "problemFocus": "Classify matrix dimensions for eighteen or five elements",
    "steps": [
      "Enumerate all ordered pairs of positive integers whose product is 18 by listing divisor partners 1 and 18, 2 and 9, 3 and 6.",
      "Because 5 is prime, only dimensions 1×5 or 5×1 are allowed for a five-entry matrix."
    ],
    "answer": "Eighteen entries permit 1×18, 2×9, 3×6, 6×3, 9×2, 18×1; five permit 1×5 and 5×1.",
    "check": "Check every pair by multiplication; 3×6 and 6×3 produce the same number of entries but different shapes."
  },
  {
    "lessonId": "chapter-mathematics-3",
    "questionId": "3.1/4",
    "problemFocus": "Construct three explicit two-by-two matrices from indexing rules",
    "steps": [
      "Take row index i=1,2 and column j=1,2. In part (i) evaluate (i+j)²/2 at each position, and in part (ii) evaluate i/j.",
      "For part (iii) use the squared quantity (i+2j)²/2, maintaining the factor of two multiplying the column index before squaring."
    ],
    "answer": "(i) [[2,9/2],[9/2,8]]; (ii) [[1,1/2],[2,1]]; (iii) [[9/2,25/2],[8,18]].",
    "check": "For each part verify a11 from i=j=1 and a22 from i=j=2; all resulting matrices are 2×2 as prescribed."
  },
  {
    "lessonId": "chapter-mathematics-3",
    "questionId": "3.1/5",
    "problemFocus": "Construct both three-by-four matrices entry by entry",
    "steps": [
      "For subpart (i), at i=1,2,3 and j=1,2,3,4 apply the absolute-value rule aij=|−3i+j|/2, then lay values in their correct row and column.",
      "For subpart (ii), compute aij=2i−j for each of the twelve pairs; this gives rows decreasing by one along columns and increasing by two along rows."
    ],
    "answer": "(i) [[1,1/2,0,1/2],[5/2,2,3/2,1],[4,7/2,3,5/2]]; (ii) [[1,0,−1,−2],[3,2,1,0],[5,4,3,2]].",
    "check": "The first matrix contains only nonnegative entries due to absolute values; both have three rows and four columns."
  },
  {
    "lessonId": "chapter-mathematics-3",
    "questionId": "3.1/6",
    "problemFocus": "Solve three matrix-equality systems using corresponding entries",
    "steps": [
      "In (i), identify y=4, z=3 and x=1 by comparing matching positions of the two 2×2 arrays. In (ii), equate the entries to obtain x+y=6, xy=8 and z=0.",
      "The quadratic t²−6t+8=0 has roots 2 and 4, allowing x,y in either order. In (iii), use x+y+z=9, x+z=5 and y+z=7 to obtain y=4, z=3, x=2."
    ],
    "answer": "(i) x=1,y=4,z=3; (ii) x,y=(2,4) or (4,2), z=0; (iii) x=2,y=4,z=3.",
    "check": "Substitution checks both product/sum possibilities in (ii), while the three sums in (iii) become 9,5,7."
  },
  {
    "lessonId": "chapter-mathematics-3",
    "questionId": "3.1/7",
    "problemFocus": "Equate corresponding entries in a symbolic two-by-two matrix",
    "steps": [
      "Reading corresponding positions gives a−b=−1, 2a+c=5, 2a−b=0 and 3c+d=13.",
      "Subtract the first equation from the third to find a=1; then b=2, c=3 and d=4 follow successively."
    ],
    "answer": "The unique solution is a=1, b=2, c=3 and d=4.",
    "check": "The matrix on the left becomes [[−1,5],[0,13]], exactly the printed right-hand matrix."
  },
  {
    "lessonId": "chapter-mathematics-3",
    "questionId": "3.1/8",
    "problemFocus": "Recognise the defining property of a square matrix",
    "steps": [
      "A rectangular array has m rows and n columns. The mathematical definition of a square matrix requires equal numbers of rows and columns.",
      "Compare the four alternatives using this definition; only the choice equating m and n satisfies it."
    ],
    "answer": "Correct multiple-choice option C: m=n.",
    "check": "A 2×3 matrix is not square, while 3×3 is square, confirming the equality criterion."
  },
  {
    "lessonId": "chapter-mathematics-3",
    "questionId": "3.1/9",
    "problemFocus": "Check simultaneous equality of all four matrix entries",
    "steps": [
      "Entry equality requires 3x+7=0, 5=y−2, y+1=8 and 2−3x=4. The off-diagonals imply y=7 consistently.",
      "The first diagonal equation gives x=−7/3, but the last gives x=−2/3; one x cannot satisfy both, so the arrays cannot be equal."
    ],
    "answer": "Correct multiple-choice option B: no values of x and y make these two matrices equal.",
    "check": "The obstruction is at the two diagonal entries and cannot be repaired by setting y=7, as both incompatible x values remain."
  },
  {
    "lessonId": "chapter-mathematics-3",
    "questionId": "3.1/10",
    "problemFocus": "Count zero-one matrices of order three by three",
    "steps": [
      "A 3×3 array contains nine independent entries; each entry may be either zero or one, giving two choices for each position.",
      "By the multiplication principle, the total is 2 multiplied by itself nine times, or 2^9."
    ],
    "answer": "Correct multiple-choice option D: 512 binary matrices of order 3×3.",
    "check": "For an n-entry binary matrix the general count is 2^n; nine entries yield 512 exactly."
  }
]);
