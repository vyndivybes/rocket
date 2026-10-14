# Saathi NCERT 2026–27 exercise source-discrepancy corrective audit
Date: 14 October 2026 | Development only | Production HOLD

## Issue
The latest Saathi solution bank holds 169 *original editorial* answers tied to 180 printed parent identifiers in seven syllabus chapter modules (Physics 1/2, Chemistry 1/2, Mathematics 1/2, Biology 7). It does not have complete NCERT question or in-text/subpart coverage, nor independent teacher-certified answers.

**New primary-source blocker:** Saathi's Chemistry Chapter 1 (Solutions) index uses 1.1 through 1.33. Multiple websites presenting 2026–27 coverage assert *41* end-of-chapter question numbers, 1.1 through 1.41. This conflict cannot be resolved by matching tertiary article titles; the official NCERT `lech101.pdf` failed reliable retrieval at audit time and hosted sources appear to mix old and new numbering. Therefore the 33-indexed-unit *completeness* claim is unqualified, and 1.34–1.41 are **potentially additional missing indexed questions**, not yet officially established.

Source references:
- NCERT official textbook selector: https://ncert.nic.in/textbook.php
- NCERT official PDF target: https://ncert.nic.in/textbook/pdf/lech101.pdf (retrieval timeout in this audit)
- Secondary 2026–27 listings reporting 41: https://cbseprepmaster.com/ncert-solutions/class-12/chemistry-12-part1/solutions and https://www.ncerttextbooks.com/ncert-books/class-12/chemistry/chemistry-i/
- Prior 33-question developer inventory remains editable but is NOT adequate proof of the edition's final exercise count.

The authenticated `/api/syllabus-coverage` response now includes `sourceReconciliationHolds` with a formal `SOURCE_CONFLICT_HOLD` and *null* authoritative count; the syllabus UI warns the learner rather than making a 100% claim.

## Latest execution evidence
- PR #20 merged Maths 1 28 and Chemistry 2 five step-by-step original answer drafts.
- PR #21 merged Maths 2 29 more source-indexed principal-value worked drafts. Postmerge CI green.
- The seven-chapter draft-bank arithmetic remains **169 editorial answers, 180 previously indexed parent identifiers, 11 gaps among those 180**. Because of this newly detected NCERT Chemistry Ch1 conflict, the known denominator **may not even be complete for those seven chapters**. A fully authoritative seven-chapter printed denominator and curriculum-wide total are unknown.
- 59 additional curriculum units have not been reconciled question by question (43 further science/Maths chapters + 16 English Elective literary/assessment modules).
- Qualified question-level answers **0**; official marking-scheme, experimental practicals, writing/seminar and safeguarding/recovery evidence still required. English Elective 001 has theory 80 marks (Reading20/Grammar8/Writing20/Kaleidoscope22/Fiction10) and teacher-assessed seminar 20. School choice of one R. K. Narayan novel remains open.
- All production permissions/DB/credentials are unchanged, production PR #1 stays draft/unmerged.

## Release-blocker closure
Obtain and inspect a source-identifiable final **2026–27 NCERT `lech101.pdf`** (including last printed exercise page), verify edition/publishing page and whether 1.34–1.41 are present. Reconcile all question references and each subpart against the official source, then author original individual solutions and independently recheck. Until a whole-class official source census and academically checked answer bank exist, full NCERT solution coverage must remain **HOLD**; a code-test PASS alone does not qualify those answers.
