// Authorial notes for the official NCERT 2026–27 Current Electricity chapter.
// Source: https://ncert.nic.in/textbook/pdf/leph103.pdf, pp. 105–106.
// Diagram 3.20 is described with an original schematic; its accuracy is NOT independently certified.
export const PHYSICS_3_INDEX=Object.freeze({
 officialPdf:'https://ncert.nic.in/textbook/pdf/leph103.pdf',reprint:'2026-27',
 exerciseLabels:['Exercises'],questionIds:Object.freeze(Array.from({length:9},(_,i)=>'3.'+(i+1)))
});
export const PHYSICS_3_DRAFTS=Object.freeze([
  {
    "lessonId": "chapter-physics-3",
    "questionId": "3.1",
    "problemFocus": "Maximum short circuit current including source internal resistance",
    "steps": [
      "With a short-circuit load, external resistance tends toward zero, so the total circuit resistance is the battery's internal resistance alone, 0.4 Ω.",
      "Apply Imax=emf/r=12 V/0.4 Ω, using volts divided by ohms to obtain amperes; in practice this high current can damage a battery."
    ],
    "answer": "The ideal short-circuit current is 30 A.",
    "check": "Check that I×r=30×0.4=12 V; this is a theoretical result and not a recommendation to short a battery."
  },
  {
    "lessonId": "chapter-physics-3",
    "questionId": "3.2",
    "problemFocus": "Load resistance and terminal voltage of a battery",
    "steps": [
      "The 10 V source and internal resistance 3 Ω carry current 0.5 A; the total resistance is 10/0.5=20 Ω.",
      "Remove the internal resistance to obtain the external load R=20−3=17 Ω; terminal voltage is IR=0.5×17=8.5 V."
    ],
    "answer": "Load resistance 17 Ω; terminal potential difference 8.5 V.",
    "check": "The drop inside the battery is Ir=1.5 V, so 8.5+1.5=10 V matches its emf."
  },
  {
    "lessonId": "chapter-physics-3",
    "questionId": "3.3",
    "problemFocus": "Temperature of a heater from resistance and coefficient",
    "steps": [
      "Use the linear approximation R=R0[1+α(T−T0)], with R0=100 Ω at 27°C and α=1.70×10⁻⁴ °C⁻¹.",
      "Set 117/100=1+α(T−27), so T−27=0.17/(1.70×10⁻⁴)=1000°C."
    ],
    "answer": "The estimated heater temperature is 1027°C.",
    "check": "Back substitution gives R=100[1+1.70×10⁻⁴×1000]=117 Ω; extrapolation over this range assumes α remains approximately constant."
  },
  {
    "lessonId": "chapter-physics-3",
    "questionId": "3.4",
    "problemFocus": "Resistivity derived from measured conductor resistance",
    "steps": [
      "A uniform 15 m wire has cross-section 6.0×10⁻⁷ m² and measured resistance 5.0 Ω.",
      "From R=ρL/A solve ρ=RA/L=(5.0×6.0×10⁻⁷)/15 Ω·m."
    ],
    "answer": "Resistivity is 2.0×10⁻⁷ Ω·m.",
    "check": "The units reduce to Ω×m²/m=Ω·m; resistivity is independent of wire length for a fixed material and temperature."
  },
  {
    "lessonId": "chapter-physics-3",
    "questionId": "3.5",
    "problemFocus": "Temperature coefficient of silver-wire resistivity",
    "steps": [
      "The wire has resistance 2.1 Ω at 27.5°C and 2.7 Ω at 100°C, a difference of 0.6 Ω over 72.5°C.",
      "Taking 27.5°C as the reference, α=(R2−R1)/(R1ΔT)=0.6/(2.1×72.5)."
    ],
    "answer": "The resistance temperature coefficient at 27.5°C is about 3.94×10⁻³ °C⁻¹.",
    "check": "Reconstruction: 2.1[1+(3.94×10⁻³)(72.5)]≈2.7 Ω; the reference temperature must be stated."
  },
  {
    "lessonId": "chapter-physics-3",
    "questionId": "3.6",
    "problemFocus": "Steady nichrome filament temperature under constant supply voltage",
    "steps": [
      "At fixed 230 V, initial wire resistance is R27=230/3.2=71.875 Ω and hot resistance Rhot=230/2.8≈82.143 Ω.",
      "Their ratio is 3.2/2.8≈1.142857, so using Rhot/R27=1+α(T−27), ΔT=0.142857/(1.70×10⁻⁴)≈840.34°C."
    ],
    "answer": "Steady filament temperature ≈867°C under constant average temperature coefficient.",
    "check": "At 867°C the predicted resistance is 82.14 Ω and current 230/82.14≈2.8 A; the constant-α approximation is explicitly assumed."
  },
  {
    "lessonId": "chapter-physics-3",
    "questionId": "3.7",
    "problemFocus": "Kirchhoff solution for the asymmetric bridge circuit in Figure 3.20",
    "steps": [
      "Represent the upper diamond with A–B 10 Ω, B–C 5 Ω, lower A–D 5 Ω, D–C 10 Ω, and centre B–D 5 Ω. A 10 V source with series 10 Ω drives the A-to-C bridge.",
      "Take C=0 and A=V. Kirchhoff at B yields (B−V)/10+B/5+(B−D)/5=0, or 5B−2D=V. At D, (D−V)/5+D/10+(D−B)/5=0, or −2B+5D=2V.",
      "Solve B=3V/7, D=4V/7. Total A-to-C bridge current is V/7, so Rbridge=7 Ω. With 10 Ω series, source current is 10/17 A and V=70/17 V."
    ],
    "answer": "Branch currents: A→B 4/17 A; A→D 6/17 A; B→C 6/17 A; D→C 4/17 A; D→B 2/17 A; source/series path 10/17 A.",
    "check": "KCL: at A (4+6)/17=10/17; at B (4+2)/17=6/17; the original Figure 3.20 sets the branch directions and sign convention, so compare with the actual figure before grading.",
    "diagram": "        B\n    10Ω/|\\\\5Ω\n     /  |5Ω \\\\\n A ●    |     ● C\n     \\\\ |    /\n    5Ω\\\\|/10Ω\n        D\nA—[10 Ω series]—(10 V source)—C",
    "diagramVerified": false
  },
  {
    "lessonId": "chapter-physics-3",
    "questionId": "3.8",
    "problemFocus": "Charging current and terminal potential of a storage battery",
    "steps": [
      "A 120 V external supply opposes the battery emf 8 V. In the charging path the series resistor 15.5 Ω and battery internal resistance 0.5 Ω give total 16 Ω.",
      "Calculate charging current I=(120−8)/16=7 A. The battery terminal voltage during charging equals emf plus internal voltage drop: Vterminal=8+(7×0.5)=11.5 V."
    ],
    "answer": "Charging current 7 A; terminal battery voltage 11.5 V.",
    "check": "Across the series resistor the drop is 7×15.5=108.5 V, and 108.5+11.5=120 V. The resistor limits charging current."
  },
  {
    "lessonId": "chapter-physics-3",
    "questionId": "3.9",
    "problemFocus": "Electron drift speed and transit time along copper wire",
    "steps": [
      "Electron current is I=neAvd. For n=8.5×10²⁸ m⁻³, e≈1.602×10⁻¹⁹ C and A=2.0×10⁻⁶ m², vd=3.0/(neA)≈1.10×10⁻⁴ m/s.",
      "To traverse length 3.0 m at this average drift speed, t=L/vd≈2.72×10⁴ s=7.56 hours. This is drift time, not electric-signal propagation time."
    ],
    "answer": "Average electron drift time ≈2.72×10⁴ seconds, or about 7.6 hours.",
    "check": "Substituting vd into neAvd reproduces 3.0 A; slow drift does not imply current starts after several hours."
  }
]);
