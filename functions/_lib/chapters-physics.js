// Original Saathi 2026–27 CBSE chapter-level teaching drafts. Independent subject-teacher verification remains required.
export const PHYSICS_DRAFTS=[
  {
    "learningObjectives": [
      "Calculate electric force with Coulomb's law",
      "Distinguish electric field from electric force",
      "Use superposition for multiple sources"
    ],
    "concept": "Electric charge is conserved and occurs in positive or negative form. Coulomb's law gives the magnitude of the force between two stationary point charges as F = k|q1 q2|/r² in vacuum. Electric field E at a point is the force per unit positive test charge, E = F/q, directed away from positive source charges and towards negative charges. Fields from multiple charges add as vectors.",
    "example": "Two positive charges, 2 microcoulomb and 3 microcoulomb, are 0.30 m apart in vacuum. Using k ≈ 9×10⁹ N m²/C²: F = 9×10⁹ × (2×10⁻⁶)(3×10⁻⁶)/(0.30)² = 0.60 N. Because the charges have the same sign, the force is repulsive.",
    "question": "If the distance between two fixed point charges is doubled, what happens to the Coulomb-force magnitude?",
    "options": [
      "It doubles",
      "It becomes one quarter",
      "It becomes four times larger",
      "It stays unchanged"
    ],
    "answerIndex": 1,
    "explanation": "Coulomb's inverse-square law gives F proportional to 1/r² for fixed charges. Replacing r by 2r multiplies force by 1/4. Direction still depends on charge signs.",
    "misconception": "Do not add electric-field magnitudes blindly: their directions matter. Electric field is force per unit charge, not the same numerical quantity as total force."
  },
  {
    "learningObjectives": [
      "Relate potential difference to work per charge",
      "Explain capacitance and parallel-plate dependence",
      "Compute energy stored in a capacitor"
    ],
    "concept": "Electric potential V is potential energy per unit charge and potential difference equals work done per charge. For a capacitor C = Q/V, where Q is magnitude of charge on either plate and V is potential difference. For an ideal parallel-plate capacitor in vacuum, C = ε₀A/d. Its stored energy may be written U = ½CV² = Q²/(2C).",
    "example": "An ideal capacitor of 5 microfarads is charged to 10 V. Its stored charge is Q = CV = 5×10⁻⁶×10 = 50 microcoulombs. Stored energy U = ½ × 5×10⁻⁶ × 10² = 2.5×10⁻⁴ J. Always convert microfarads to farads.",
    "question": "For a fixed capacitance, what happens to stored energy when the applied voltage is doubled?",
    "options": [
      "It halves",
      "It doubles",
      "It quadruples",
      "It remains constant"
    ],
    "answerIndex": 2,
    "explanation": "With C fixed, U = ½CV². Doubling V makes V² four times greater. A real capacitor must not be used beyond its voltage rating.",
    "misconception": "Capacitance is not the charge itself; it is charge stored per unit voltage. Stored energy does not vary linearly with voltage when capacitance is fixed."
  },
  {
    "learningObjectives": [
      "Apply Ohm's law to ohmic conductors",
      "Differentiate series and parallel combinations",
      "Calculate electric power"
    ],
    "concept": "Current is charge flow per unit time I = ΔQ/Δt. For an ohmic conductor at constant physical conditions V = IR. Resistors in series have R_eq = sum of resistances; in parallel, 1/R_eq = sum of reciprocals. Electric power is P = VI, equal to I²R for a resistive element. Resistivity depends on material and temperature.",
    "example": "Two resistors 4 Ω and 6 Ω connected in series have equivalent resistance 10 Ω. Under an ideal 20 V supply, I = 20/10 = 2 A. The voltage across the 6 Ω resistor is IR = 12 V; across the 4 Ω resistor it is 8 V. The drops total 20 V.",
    "question": "What is the equivalent resistance of ideal 6 Ω and 3 Ω resistors connected in parallel?",
    "options": [
      "9 Ω",
      "3 Ω",
      "2 Ω",
      "18 Ω"
    ],
    "answerIndex": 2,
    "explanation": "For two parallel resistors, R_eq = (6×3)/(6+3) = 18/9 = 2 Ω. Parallel equivalent resistance is lower than either positive individual resistance.",
    "misconception": "Ohm's law with a constant R does not apply unchanged to every device at every temperature. Never treat a series current rule as a parallel voltage rule."
  },
  {
    "learningObjectives": [
      "Predict magnetic force direction on moving charges",
      "Calculate force magnitude in a uniform field",
      "Relate current to magnetic field patterns"
    ],
    "concept": "A moving charge in a magnetic field experiences force F = q(v×B), perpendicular to both velocity and magnetic field. Magnitude is |q|vB sinθ. A straight current-carrying conductor in a field experiences force F = ILB sinθ. Currents produce magnetic fields; the right-hand rule gives their direction for conventional current.",
    "example": "A proton moves at 2×10⁶ m/s perpendicular to a 0.5 T uniform field. With |q| ≈ 1.6×10⁻¹⁹ C, magnetic force magnitude is 1.6×10⁻¹⁹×2×10⁶×0.5 = 1.6×10⁻¹³ N. Because the force is perpendicular to velocity, it changes direction, not the instantaneous speed.",
    "question": "A charged particle moves exactly parallel to a uniform magnetic field. What is the magnetic force magnitude?",
    "options": [
      "Maximum",
      "Zero",
      "Equal to qB",
      "Equal to its weight"
    ],
    "answerIndex": 1,
    "explanation": "F = |q|vB sinθ, and sin 0° = 0. Thus a particle moving parallel or antiparallel to the field has no magnetic-force contribution from that field.",
    "misconception": "A magnetic field does not do mechanical work on an isolated moving point charge, because the Lorentz magnetic force is perpendicular to velocity."
  },
  {
    "learningObjectives": [
      "Explain bar magnet field patterns",
      "Describe dia-, para- and ferromagnetic responses",
      "Recognise Earth's magnetic field as a vector"
    ],
    "concept": "A bar magnet has north and south poles; magnetic field lines form closed loops and do not begin or terminate as isolated magnetic monopoles in conventional electromagnetism. Materials respond differently: diamagnets weakly oppose applied fields; paramagnets weakly align; ferromagnets can exhibit strong magnetisation and domains. Earth's field has horizontal and vertical components, inclination and declination.",
    "example": "For a magnetic field of magnitude 50 microtesla inclined 30° below horizontal, the horizontal component is B cos30° ≈ 43.3 microtesla and the downward vertical component is B sin30° = 25 microtesla. These are components of the same field vector.",
    "question": "Which class of material is typically weakly repelled by an externally applied magnetic field?",
    "options": [
      "Diamagnetic",
      "Paramagnetic",
      "Ferromagnetic",
      "All materials are identical"
    ],
    "answerIndex": 0,
    "explanation": "Diamagnetic response creates a small induced magnetisation opposing the applied field, so such substances are generally weakly repelled. Responses of other classes differ.",
    "misconception": "A magnetic north pole and south pole do not normally occur as independently isolated magnetic charges. Do not confuse magnetic declination with dip or inclination."
  },
  {
    "learningObjectives": [
      "State Faraday's law and flux linkage",
      "Explain the negative sign using Lenz's law",
      "Calculate average induced emf"
    ],
    "concept": "Magnetic flux through a flat surface is Φ = BA cosθ when B is uniform and θ is measured from the area normal. A changing flux linkage through N turns induces emf ε = −N dΦ/dt. The minus sign describes Lenz's law: induced effects oppose the change that causes them. Motion of a conductor, changing area or varying magnetic field can change flux.",
    "example": "An ideal 20-turn coil experiences a uniform flux change from 0.01 Wb to 0.04 Wb per turn in 0.30 s. Average induced emf magnitude = 20×0.03/0.30 = 2 V. To get its polarity, additionally examine whether flux is increasing or decreasing and apply Lenz's law.",
    "question": "A 5-turn coil has flux per turn increasing by 0.20 Wb in 1.0 s. What is the average induced emf magnitude?",
    "options": [
      "0.04 V",
      "0.20 V",
      "1.0 V",
      "5.0 V"
    ],
    "answerIndex": 2,
    "explanation": "Magnitude |ε| = N|ΔΦ|/Δt = 5×0.20/1.0 = 1.0 V. The negative sign in Faraday's law identifies polarity, not a negative magnitude.",
    "misconception": "A steady magnetic flux through a stationary loop induces no emf merely because a magnetic field exists. It is the change in linked flux that matters."
  },
  {
    "learningObjectives": [
      "Distinguish RMS from peak AC",
      "Relate frequency to inductive and capacitive reactance",
      "Describe series resonance"
    ],
    "concept": "Alternating voltage and current vary with time, commonly sinusoidally. For a sinusoid, Vrms = Vpeak/√2 and Irms = Ipeak/√2. An inductor has reactance XL = ωL and a capacitor XC = 1/(ωC), where ω = 2πf. A series RLC circuit resonates when XL = XC, leaving a minimum impedance magnitude R in the ideal model.",
    "example": "An ideal sinusoidal source with a peak voltage 100√2 V has rms voltage 100 V. For a resistor of 50 Ω connected alone, Irms = 100/50 = 2 A and average dissipated power is 100×2 = 200 W.",
    "question": "For a sinusoidal AC voltage with peak value 200 V, what is its rms value?",
    "options": [
      "200√2 V",
      "200/√2 V",
      "400 V",
      "100 V"
    ],
    "answerIndex": 1,
    "explanation": "The root-mean-square value of a sinusoidal voltage is Vpeak/√2, or approximately 141.4 V for a 200 V peak. This relationship is specific to a sinusoid.",
    "misconception": "Peak and RMS voltage are not interchangeable. Real power in an AC circuit generally involves power factor; VI is not always average real power."
  },
  {
    "learningObjectives": [
      "Identify transverse E and B fields",
      "Relate wavelength, frequency and propagation speed",
      "Order electromagnetic spectrum bands"
    ],
    "concept": "Electromagnetic waves are propagating coupled electric and magnetic fields transverse to the direction of travel in vacuum. Their vacuum speed is c ≈ 3×10⁸ m/s, and c = fλ. The spectrum runs from radio through microwave, infrared, visible, ultraviolet, X-rays and gamma rays in increasing frequency. Photon energy E = hf grows with frequency.",
    "example": "A radio wave has frequency 100 MHz = 1×10⁸ Hz. In vacuum, λ = c/f = 3×10⁸/1×10⁸ = 3 m. In a medium the propagation speed and wavelength may differ, while frequency across a boundary stays unchanged.",
    "question": "Which electromagnetic radiation has a higher frequency than visible light?",
    "options": [
      "Typical radio waves",
      "Typical microwaves",
      "Ultraviolet light",
      "Typical infrared light"
    ],
    "answerIndex": 2,
    "explanation": "Ultraviolet lies beyond visible violet at higher frequency. Infrared, microwave and radio occupy lower-frequency portions of the electromagnetic spectrum.",
    "misconception": "Visible light is only a narrow electromagnetic band. Higher frequency generally means higher photon energy, not necessarily higher wave speed in vacuum."
  },
  {
    "learningObjectives": [
      "Apply the thin-lens relation using a consistent sign convention",
      "Describe total internal reflection",
      "Differentiate microscope and telescope roles"
    ],
    "concept": "Geometric optics models light as rays when wavelength is small relative to objects. Refraction follows Snell's law n1 sinθ1 = n2 sinθ2. Total internal reflection occurs for light attempting to pass from higher to lower refractive index beyond the critical angle. Mirrors and lenses form images; image positions and magnifications depend on a consistent Cartesian sign convention.",
    "example": "Using the Cartesian lens convention for a converging lens of focal length +10 cm and object distance u = −30 cm, 1/f = 1/v − 1/u gives 1/10 = 1/v + 1/30. Thus v = +15 cm. Magnification v/u = −0.5: the real image is inverted and half the object's height.",
    "question": "For total internal reflection to be possible, which starting condition is required?",
    "options": [
      "Light travels from lower to higher refractive index",
      "Light travels from higher to lower refractive index",
      "The incident angle must be zero",
      "The medium must be vacuum only"
    ],
    "answerIndex": 1,
    "explanation": "Total internal reflection requires incidence from an optically denser medium toward a less optically dense one and an angle greater than the critical angle.",
    "misconception": "A converging lens does not always form a real image: an object inside focal length forms a virtual image. Never mix sign conventions between formulas."
  },
  {
    "learningObjectives": [
      "Explain interference from coherent sources",
      "Relate path difference to fringes",
      "State the idea behind diffraction and polarisation"
    ],
    "concept": "Wave optics accounts for interference, diffraction and polarisation. Two coherent waves with stable phase relation can reinforce or cancel. For a double-slit experiment in small-angle approximation, fringe width β = λD/d, where λ is wavelength, D screen distance and d slit separation. Diffraction becomes prominent when apertures are comparable to wavelength; polarisation demonstrates transverse wave behaviour.",
    "example": "For light of wavelength 600 nm, slit separation 0.30 mm and screen distance 1.5 m, fringe width β = (600×10⁻⁹×1.5)/(0.30×10⁻³) = 0.003 m = 3 mm. Use consistent SI units before substituting.",
    "question": "In ideal Young's double-slit interference, if slit separation is doubled while other values stay fixed, what happens to fringe width?",
    "options": [
      "It doubles",
      "It halves",
      "It quadruples",
      "It remains unchanged"
    ],
    "answerIndex": 1,
    "explanation": "From β = λD/d, doubling d halves β. This formula uses small-angle geometry and approximately coherent monochromatic light.",
    "misconception": "Interference does not require light waves to 'collide'. Superposition combines amplitudes, and intensity depends on the resulting amplitude squared."
  },
  {
    "learningObjectives": [
      "Use the photon energy relation E=hf",
      "Interpret the photoelectric threshold",
      "Relate de Broglie wavelength to momentum"
    ],
    "concept": "Experiments with light and matter reveal wave-particle duality. A photon's energy is E = hf. In the photoelectric effect, electrons are emitted only when incident photon frequency exceeds threshold frequency; maximum kinetic energy satisfies Kmax = hf − φ, with φ the work function. Matter also has a de Broglie wavelength λ = h/p.",
    "example": "If a surface has threshold frequency 5×10¹⁴ Hz and incident light is 6×10¹⁴ Hz, the excess photon energy is h×1×10¹⁴ ≈ 6.63×10⁻²⁰ J. This equals the ideal maximum kinetic energy of emitted photoelectrons, not the average energy.",
    "question": "For photoelectric emission above threshold, what primarily sets the maximum kinetic energy of emitted electrons?",
    "options": [
      "Light frequency",
      "Light intensity alone",
      "Surface area alone",
      "Number of photons alone"
    ],
    "answerIndex": 0,
    "explanation": "Einstein's equation Kmax = hf − φ shows maximum electron kinetic energy depends on frequency and the material's work function, not intensity alone.",
    "misconception": "Greater intensity at a frequency below threshold does not produce photoelectrons in the ideal single-photon photoelectric effect. Intensity controls photon rate, not energy per photon."
  },
  {
    "learningObjectives": [
      "Identify quantised energy levels in atoms",
      "Explain emission spectra from downward transitions",
      "Use energy conservation for photon frequency"
    ],
    "concept": "In the Bohr model of hydrogen, the electron occupies stationary energy levels with En = −13.6 eV/n²; emitted or absorbed photon energy equals a difference between levels. Transitions to lower energy emit photons; transitions upward absorb energy. The model explains hydrogen spectral lines but has limitations for many-electron atoms and must not be treated as a full quantum theory.",
    "example": "For hydrogen, n = 2 has energy −3.4 eV and n = 1 has energy −13.6 eV. A 2→1 transition releases ΔE = 10.2 eV as a photon. Use E = hf to relate that photon energy to its frequency.",
    "question": "When an electron in hydrogen transitions from n=3 to n=2, what happens?",
    "options": [
      "A photon is emitted",
      "A photon must be absorbed",
      "The nucleus becomes a neutron",
      "Energy is unchanged"
    ],
    "answerIndex": 0,
    "explanation": "The n=3 energy is higher (less negative) than n=2. A downward transition releases their energy difference, commonly as an emitted photon.",
    "misconception": "Negative bound-state energies do not mean the atom emits negative-energy photons. Emitted photon energy is the positive difference between two bound levels."
  },
  {
    "learningObjectives": [
      "Describe nuclear composition and isotopes",
      "Connect mass defect with binding energy",
      "Distinguish radioactive decay pathways"
    ],
    "concept": "An atomic nucleus contains protons and neutrons. Isotopes have the same proton number but different neutron number. The mass defect Δm corresponds to nuclear binding energy E = Δmc². Radioactive decay is statistical at the single-nucleus level and characterised by half-life for a large sample. Alpha, beta and gamma processes differ in emitted particles and changes to nuclear composition.",
    "example": "A radioactive sample has an initial count of 8000 undecayed nuclei and a half-life of 4 hours. After 8 hours, two half-lives have passed: expected undecayed count is 8000×(1/2)² = 2000. This is an expectation for many nuclei, not an exact prediction for any one nucleus.",
    "question": "After three half-lives, what fraction of a large radioactive sample is expected to remain undecayed?",
    "options": [
      "1/2",
      "1/3",
      "1/6",
      "1/8"
    ],
    "answerIndex": 3,
    "explanation": "Each half-life leaves half the preceding sample. After three half-lives, (1/2)³ = 1/8 remains on average for a large population.",
    "misconception": "Half-life does not depend on the amount of sample in ordinary decay models; it is not the time for every nucleus to disappear."
  },
  {
    "learningObjectives": [
      "Differentiate intrinsic and extrinsic semiconductors",
      "Explain the role of p-n junction bias",
      "Recognise rectification and basic devices"
    ],
    "concept": "A semiconductor has conductivity between typical conductors and insulators, controllable by temperature and doping. Donor doping produces n-type material with electrons as majority carriers; acceptor doping produces p-type material with holes as majority carriers. A p-n junction diode conducts strongly under suitable forward bias and much less under reverse bias until breakdown, enabling rectification.",
    "example": "Consider an ideal diode in series with a resistor and a low-voltage DC source. Under forward bias, the junction offers a conducting path in the ideal model; under reverse bias, ideal current is approximately zero. Real diodes require allowance for forward-voltage drop and reverse leakage.",
    "question": "In an n-type semiconductor, which carrier is the majority charge carrier?",
    "options": [
      "Holes",
      "Protons",
      "Electrons",
      "Neutrons"
    ],
    "answerIndex": 2,
    "explanation": "Donor impurities introduce extra electrons available as majority carriers in n-type semiconductor material. Holes remain minority carriers.",
    "misconception": "N-type does not mean the entire material has a net negative charge. Doped semiconductor regions are approximately electrically neutral overall."
  }
];
