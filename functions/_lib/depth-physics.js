export const PHYSICS_DEPTH = [
  [
    {
      "heading": "Charge, quantisation and conservation",
      "explanation": "Electric charge occurs in integral multiples of elementary charge e for isolated ordinary particles; a closed system conserves total charge during rubbing or transfer. Insulators and conductors distribute charge differently.",
      "tryIt": "Explain why rubbing a rod transfers charge rather than creating charge; identify the opposite sign acquired by the second surface."
    },
    {
      "heading": "Coulomb's law and medium",
      "explanation": "For stationary point charges the magnitude of electrostatic force follows F=k|q1q2|/r²; its vector direction is set by attraction or repulsion. In matter the permittivity changes the proportionality constant.",
      "tryIt": "If separation triples with charges unchanged, calculate the new force as a fraction of the original; justify using the inverse-square law."
    },
    {
      "heading": "Field and superposition",
      "explanation": "The electric field E is force per unit positive test charge. Add individual point-charge field contributions vectorially; a field-line diagram shows direction, and its density indicates approximate relative strength.",
      "tryIt": "Sketch the directions of the fields from two equally positive charges at the midpoint and explain their vector sum."
    },
    {
      "heading": "Electric dipole and torque",
      "explanation": "A dipole consists of equal opposite separated charges, with dipole moment p=q(2a) oriented from negative to positive. In a uniform field its torque is p×E and potential energy is −p·E.",
      "tryIt": "Compare torque when a dipole lies parallel and perpendicular to a uniform field; explain stable alignment."
    },
    {
      "heading": "Flux and Gauss's law",
      "explanation": "Electric flux measures the surface integral of E·dA. Gauss's law gives the net flux through any closed surface as enclosed charge divided by ε₀, regardless of the surface's shape.",
      "tryIt": "Apply Gauss's law to a spherical closed surface enclosing +Q and discuss what changes when the radius increases."
    },
    {
      "heading": "Applications of Gauss's law",
      "explanation": "For symmetric charge distributions, Gaussian surfaces simplify the field: a long uniform charged wire has E proportional to 1/r, a broad sheet has nearly uniform field, and a charged thin shell has zero interior field.",
      "tryIt": "Explain which symmetry and Gaussian surface you would use for a uniformly charged thin spherical shell."
    }
  ],
  [
    {
      "heading": "Potential, work and reference",
      "explanation": "Electric potential difference is change in potential energy per unit charge; a conservative electrostatic field gives path-independent work. A potential chosen zero at infinity is a convention suitable for isolated charges.",
      "tryIt": "Show why a positive test charge moving from higher to lower potential loses electric potential energy under electrostatic motion."
    },
    {
      "heading": "Point charge and dipole potential",
      "explanation": "The potential from a point charge in vacuum is kq/r and potentials add as scalars, unlike electric fields. A dipole's far-field potential depends on direction relative to its dipole axis.",
      "tryIt": "At equal distances from +Q and −Q, find the net scalar potential and discuss whether the electric field must be zero."
    },
    {
      "heading": "Equipotentials and conductors",
      "explanation": "Electric field is perpendicular to an equipotential surface, and an ideal electrostatic conductor has zero internal field. Its bulk sits at one potential, with excess charge on its boundary.",
      "tryIt": "Explain why motion along one equipotential produces no electrostatic work, even when the field nearby is nonzero."
    },
    {
      "heading": "Capacitance and dielectrics",
      "explanation": "Capacitance C=Q/V depends on conductor geometry and dielectric environment. An ideal parallel-plate capacitor has C=εA/d; a dielectric generally increases capacitance compared with vacuum.",
      "tryIt": "Predict the capacitance change if plate separation is doubled at unchanged area and dielectric; state assumptions."
    },
    {
      "heading": "Capacitor combinations",
      "explanation": "Parallel capacitors have a common voltage and equivalent capacitance equal to their sum; series capacitors carry equal charge in the simple ideal model and reciprocals add.",
      "tryIt": "Find the equivalent capacitance of 2 μF and 3 μF in parallel and in series, keeping capacitance units explicit."
    },
    {
      "heading": "Energy and safe interpretation",
      "explanation": "Capacitors store electrostatic energy U=½CV²=Q²/(2C), and ideal isolated and battery-connected cases respond differently when geometry changes. Real stored energy requires safe discharge procedures.",
      "tryIt": "For fixed C, derive the factor change in U if voltage is halved; do not propose an unsupervised physical experiment."
    }
  ],
  [
    {
      "heading": "Current, drift and mobility",
      "explanation": "Electric current is charge flow per unit time. In a conductor the average carrier drift velocity relates current to charge density, cross-sectional area and carrier charge magnitude.",
      "tryIt": "Explain why electrons have a small drift speed although a circuit's electrical response propagates quickly."
    },
    {
      "heading": "Ohm's law and I–V characteristics",
      "explanation": "An ohmic resistor obeys V=IR under constant physical conditions; non-ohmic devices such as diodes have nonlinear current–voltage characteristics. Resistance has units of ohms.",
      "tryIt": "Use V=IR to calculate current through an ideal 8 Ω resistor at 12 V and distinguish the ideal from real-device assumptions."
    },
    {
      "heading": "Resistivity and temperature",
      "explanation": "For a uniform conductor R=ρL/A. Resistivity is a material property that commonly changes with temperature; increasing length raises resistance while increasing cross-section lowers it.",
      "tryIt": "If a wire is stretched to twice its original length with volume conserved, explain the resistance change assuming resistivity fixed."
    },
    {
      "heading": "Cells, emf and internal resistance",
      "explanation": "Cell emf is work supplied per unit charge, whereas terminal voltage may differ because of internal resistance. In simple discharge Vterminal=emf−Ir; series and parallel battery rules require model assumptions.",
      "tryIt": "For a 9 V cell with internal resistance 1 Ω delivering 2 A, calculate its terminal voltage with units."
    },
    {
      "heading": "Kirchhoff loop and junction rules",
      "explanation": "Kirchhoff's current law follows charge conservation at a node; the loop voltage rule follows energy accounting around closed circuits. Choose an assumed current direction and maintain consistent signs.",
      "tryIt": "At a junction 3 A enters while 1 A leaves by one branch; calculate the remaining outward current and justify conservation."
    },
    {
      "heading": "Bridge and circuit comparisons",
      "explanation": "In a balanced Wheatstone bridge, resistor ratios satisfy a relation that leaves no current through the central detector in the ideal model. Equivalent series and parallel reductions help validate results.",
      "tryIt": "A bridge with arm resistances 2 Ω, 4 Ω, 3 Ω and 6 Ω in corresponding ratio is balanced; show the two equal ratios."
    }
  ],
  [
    {
      "heading": "Magnetic force on charge",
      "explanation": "The magnetic portion of Lorentz force is q(v×B) and is perpendicular to velocity. Its magnitude depends on sinθ, which makes the magnetic force vanish for parallel motion.",
      "tryIt": "Compare a proton travelling parallel to B with one travelling perpendicular at the same speed; state force magnitudes symbolically."
    },
    {
      "heading": "Motion in a uniform field",
      "explanation": "With velocity perpendicular to uniform B, a nonrelativistic charge follows circular motion of radius mv/(|q|B). A parallel velocity component gives a helical trajectory.",
      "tryIt": "Find whether orbit radius grows or shrinks if speed doubles at fixed charge, mass and magnetic field."
    },
    {
      "heading": "Field of a current: Biot–Savart",
      "explanation": "A steady current produces magnetic field contributions integrated through the Biot–Savart law. For a circular loop, symmetry simplifies the field at its centre to B=μ₀I/(2R) for one ideal turn.",
      "tryIt": "Explain the field change at a circular loop's centre if its current doubles while radius stays constant."
    },
    {
      "heading": "Ampere's circuital law",
      "explanation": "Ampere's law relates closed-loop B·dl to enclosed steady current. It is especially useful for high symmetry, such as a long straight wire or ideal long solenoid.",
      "tryIt": "Choose an Amperian loop for an infinitely long wire and state the radial dependence of field magnitude."
    },
    {
      "heading": "Torque and measuring instruments",
      "explanation": "A current loop in a uniform magnetic field experiences a torque proportional to NIABsinθ. Moving-coil galvanometers convert current to angular deflection and may be adapted by suitable resistances.",
      "tryIt": "Explain qualitatively how attaching a shunt can extend a galvanometer's current range without changing coil maximum current."
    },
    {
      "heading": "Magnetic fields and vector directions",
      "explanation": "Use the right-hand rule for conventional-current field orientation; reverse sign for electron charge motion. Direction must be reasoned independently from magnetic-force magnitude.",
      "tryIt": "Draw current out of a page and identify clockwise or counter-clockwise magnetic-field direction around the wire."
    }
  ],
  [
    {
      "heading": "Magnet and equivalent solenoid",
      "explanation": "A bar magnet produces a dipole-like field outside its body, and an ideal current loop or solenoid exhibits an equivalent large-scale dipolar pattern. Field lines form closed loops.",
      "tryIt": "Sketch field-line direction outside and inside an ideal bar magnet; state why no isolated north charge is assumed."
    },
    {
      "heading": "Magnetic dipole in field",
      "explanation": "A small magnetic dipole has moment m and torque m×B in an external uniform field. The potential energy −m·B is lowest for aligned moments under the model.",
      "tryIt": "State the stable orientation of a freely turning magnetic dipole in a uniform field and explain the torque at alignment."
    },
    {
      "heading": "Gauss's law for magnetism",
      "explanation": "The net magnetic flux through a closed surface is zero in classical electromagnetism, expressed as ∮B·dA=0. It reflects the absence of observed isolated magnetic monopoles.",
      "tryIt": "Explain why field lines entering a closed surface must on balance also leave it, despite a local field being strong."
    },
    {
      "heading": "Diamagnetism and paramagnetism",
      "explanation": "Diamagnetic responses generally oppose an applied magnetic field weakly; paramagnetic materials exhibit weak alignment because of microscopic magnetic moments. Temperature can affect response.",
      "tryIt": "Classify a weakly repelled sample and describe why direction of induced magnetisation matters to the definition."
    },
    {
      "heading": "Ferromagnets, domains and hysteresis",
      "explanation": "Ferromagnets can form domains whose alignment produces strong magnetisation. Hysteresis captures history-dependent magnetisation and energy dissipation on cycling, with soft and hard magnetic uses.",
      "tryIt": "Compare a soft magnetic core and a permanent magnet in terms of ease of demagnetisation and typical applications."
    }
  ],
  [
    {
      "heading": "Magnetic flux and linkage",
      "explanation": "For a flat loop in uniform magnetic field, flux is Φ=BAcosθ, measured in webers, with θ measured from the surface normal. A coil's total linkage is NΦ.",
      "tryIt": "Rotate a loop through 90 degrees relative to the field and compute the flux change from initial alignment of its normal."
    },
    {
      "heading": "Faraday's induction equation",
      "explanation": "A changing flux linkage produces induced emf ε=−d(NΦ)/dt. Use the average-flux form for uniform changes and distinguish emf magnitude from circuit current.",
      "tryIt": "Ten turns experience a per-turn flux change 0.03 Wb in 0.15 s; compute the average emf magnitude and units."
    },
    {
      "heading": "Lenz's law and conservation",
      "explanation": "The induced current direction, when a closed conducting path exists, opposes the change in linked flux that causes it. This opposition is consistent with energy conservation.",
      "tryIt": "A north pole approaches a conducting loop; determine the loop's near-face pole and justify from the increasing flux."
    },
    {
      "heading": "Motional emf and conductor motion",
      "explanation": "A straight conductor moving across a magnetic field can develop motional emf of magnitude Bℓv for mutually perpendicular directions. Direction follows magnetic force on charges.",
      "tryIt": "For ideal B=0.2 T, ℓ=0.5 m and v=4 m/s with perpendicular geometry, calculate motional emf."
    },
    {
      "heading": "Inductance and energy",
      "explanation": "Self-inductance expresses how changing current induces emf opposing that change. An ideal inductor stores magnetic energy U=½LI², while mutual inductance links coupled coils.",
      "tryIt": "Explain what happens to stored energy if current through a fixed ideal inductor doubles."
    },
    {
      "heading": "Eddy currents and generators",
      "explanation": "Eddy currents are induced circulating currents in conducting bulk objects; they can produce braking and heating, while laminated cores reduce losses. Generators transform mechanical work into electrical energy through changing flux.",
      "tryIt": "Explain why a generator cannot deliver electrical power without mechanical input while operating under load."
    }
  ],
  [
    {
      "heading": "Sinusoids and RMS values",
      "explanation": "A sinusoidal current i=I₀sinωt has rms magnitude I₀/√2, and frequency f=ω/(2π). RMS values give equivalent resistive heating power to DC under the ideal comparison.",
      "tryIt": "Compute the rms voltage of a sinusoidal waveform with peak 100√2 V and state the heating interpretation."
    },
    {
      "heading": "Reactance and phase",
      "explanation": "An inductor has reactance XL=ωL and current lags ideal inductor voltage; a capacitor has XC=1/(ωC) and its current leads voltage. Reactance is frequency-dependent.",
      "tryIt": "If AC frequency doubles, predict how ideal inductive reactance and capacitive reactance change."
    },
    {
      "heading": "RLC impedance and resonance",
      "explanation": "For a series RLC circuit, impedance magnitude is √(R²+(XL−XC)²). Resonance occurs when XL=XC, leaving impedance equal to R for ideal series components.",
      "tryIt": "Explain why the current amplitude of a driven series RLC circuit peaks near resonance at fixed applied voltage."
    },
    {
      "heading": "Power and power factor",
      "explanation": "Average real power in a sinusoidal steady-state circuit is VrmsIrmscosφ. The power factor describes the fraction of apparent power converted to net real work or dissipation.",
      "tryIt": "If Vrms=100 V, Irms=2 A and cosφ=0.6, calculate average real power and contrast apparent power."
    },
    {
      "heading": "Transformers and energy constraints",
      "explanation": "An ideal transformer approximately satisfies Vs/Vp=Ns/Np and conserves power Pp≈Ps. Real transformers have resistive, magnetic and leakage losses, so output power is not larger than input.",
      "tryIt": "A transformer has twice as many secondary turns as primary; predict the ideal voltage ratio and current ratio."
    },
    {
      "heading": "AC safety and network limits",
      "explanation": "Mains AC involves serious electrical hazards. Understanding peak versus rms ratings and the power-factor concept is theory; laboratory work must use teacher-supervised low-energy apparatus.",
      "tryIt": "Explain why comparing an AC RMS rating directly to its peak value without conversion is misleading."
    }
  ],
  [
    {
      "heading": "Displacement current",
      "explanation": "Maxwell's displacement-current contribution arises from time-varying electric flux, allowing consistent field equations across a charging capacitor even without charge transport through its dielectric.",
      "tryIt": "Explain why a changing field between capacitor plates supports magnetic effects when no electrons cross the dielectric gap."
    },
    {
      "heading": "Coupled electric and magnetic fields",
      "explanation": "An electromagnetic wave in vacuum has transverse electric and magnetic fields, mutually perpendicular and perpendicular to the propagation direction. Energy propagates without requiring a material medium.",
      "tryIt": "Sketch the three mutually perpendicular directions for E, B and propagation in a simple plane electromagnetic wave."
    },
    {
      "heading": "Wave speed and wavelength",
      "explanation": "In vacuum c≈3×10⁸ m/s and c=fλ. Frequency is determined by the source and is not altered across an interface, while wavelength depends on the medium speed.",
      "tryIt": "For an EM wave at 150 MHz in vacuum, compute its wavelength and show conversion from MHz to Hz."
    },
    {
      "heading": "Spectrum order and photon energy",
      "explanation": "Radio, microwave, infrared, visible, ultraviolet, X-ray and gamma bands appear in broadly increasing frequency. Photon energy E=hf grows as wavelength falls in vacuum.",
      "tryIt": "Compare photon energies of visible red and visible violet light based on frequency without using memorised numerical energies."
    },
    {
      "heading": "Applications and safety",
      "explanation": "Different bands support communications, imaging, heating or analysis, with exposure considerations depending on intensity and frequency. Ionising high-energy radiation requires special precautions.",
      "tryIt": "Distinguish a radiowave communication use from an X-ray imaging use and explain why their safety protocols differ."
    }
  ],
  [
    {
      "heading": "Reflection and mirror formula",
      "explanation": "Reflection from a smooth surface follows equal incidence and reflection angles. Spherical mirrors use a Cartesian sign convention with 1/f=1/v+1/u, and image properties depend on object distance.",
      "tryIt": "Locate a real image for an object beyond the centre of curvature of a concave mirror using a qualitative ray diagram."
    },
    {
      "heading": "Snell's law and refraction",
      "explanation": "Across a medium boundary n₁sinθ₁=n₂sinθ₂, measured relative to the normal. Refraction changes direction when refractive indices differ and the ray is oblique.",
      "tryIt": "Predict whether light entering glass from air bends toward or away from the normal and explain using refractive index."
    },
    {
      "heading": "Total internal reflection and prisms",
      "explanation": "From higher refractive index to lower, total internal reflection occurs above the critical angle sinθc=n₂/n₁. Prisms can refract or disperse light, with wavelength-dependent refraction.",
      "tryIt": "For n₁=1.5 and n₂=1, estimate the critical angle and state which side must contain the source."
    },
    {
      "heading": "Spherical lens relation",
      "explanation": "For thin lenses with a consistent Cartesian convention, 1/f=1/v−1/u. Magnification m=v/u; positive f indicates converging convex lens in the standard convention.",
      "tryIt": "Place an object 30 cm from a convex lens of focal length 10 cm and calculate image distance with signed values."
    },
    {
      "heading": "Lens maker and combinations",
      "explanation": "The lens-maker relation links focal length with refractive index and surface curvature in a thin-lens model. Thin lenses placed together have approximately additive powers measured in dioptres.",
      "tryIt": "Find combined power of +2 D and −1 D thin lenses in contact and interpret whether the pair converges."
    },
    {
      "heading": "Microscopes, telescopes and eye",
      "explanation": "Optical instruments combine lenses to obtain magnification or angular resolution. Near-point accommodation and common vision corrections relate object and image positions to eye optics.",
      "tryIt": "Compare the objective focal-length choice in a compound microscope with an astronomical telescope qualitatively."
    }
  ],
  [
    {
      "heading": "Wavefronts and Huygens principle",
      "explanation": "A wavefront joins points of common phase. Huygens's principle constructs a new wavefront as the envelope of secondary wavelets, providing geometric explanations of reflection and refraction.",
      "tryIt": "Use a sketch of incident parallel wavefronts to describe what changes when light enters a slower medium obliquely."
    },
    {
      "heading": "Coherent sources and superposition",
      "explanation": "Stable relative phase is necessary for a steady interference pattern. Constructive interference occurs for integer-wavelength path differences and destructive for half-integer offsets in a two-source model.",
      "tryIt": "State the path-difference condition for the first dark fringe in ideal Young double-slit interference."
    },
    {
      "heading": "Young double-slit fringe width",
      "explanation": "For small angles and slit separation d much smaller than screen distance D, fringe width is β=λD/d. It increases with wavelength and screen distance but decreases with slit separation.",
      "tryIt": "For λ=500 nm, D=1 m and d=0.25 mm, compute fringe spacing in millimetres."
    },
    {
      "heading": "Interference intensity and coherence limits",
      "explanation": "Interference combines field amplitudes, not just intensities, and equal-amplitude sources can produce strong visibility. Finite source width or variable phase reduces fringe contrast.",
      "tryIt": "Explain what would happen to the stable fringe contrast if the relative phase between slits changed randomly."
    },
    {
      "heading": "Single-slit diffraction",
      "explanation": "A finite aperture causes spreading of light; narrower slits generally produce a broader central diffraction feature for fixed wavelength. The first-minimum scale is set by a sinθ≈λ.",
      "tryIt": "Predict whether the central diffraction maximum widens or narrows when a slit is made narrower."
    },
    {
      "heading": "Polarisation as extension",
      "explanation": "Polarisation selects orientations of a transverse electric-field oscillation. It supports the transverse character of light; confirm whether a particular polarisation derivation is examined in the current official syllabus.",
      "tryIt": "Explain why the concept of polarisation is associated with transverse waves, contrasting it with ordinary sound in air."
    }
  ],
  [
    {
      "heading": "Photon energy and momentum",
      "explanation": "Light exchanges energy in photons of E=hf and momentum p=h/λ in vacuum, while still displaying wave interference. Higher frequency means larger energy per photon.",
      "tryIt": "If light frequency doubles, state the change in photon energy and distinguish it from changing photon number."
    },
    {
      "heading": "Photoelectric threshold and work function",
      "explanation": "The metal work function φ sets a minimum photon energy. Below threshold hf<φ, ideal one-photon emission does not occur however intense the beam, while above threshold electrons may escape.",
      "tryIt": "Describe why doubling intensity of light below threshold does not produce emission in the ideal photoelectric model."
    },
    {
      "heading": "Einstein photoelectric equation",
      "explanation": "The maximum kinetic energy of emitted electrons follows Kmax=hf−φ; stopping potential Vs satisfies eVs=Kmax. Graphs of Kmax against frequency have slope h.",
      "tryIt": "For a light frequency 1×10¹⁴ Hz above threshold, estimate the excess photoelectron energy using Planck's constant."
    },
    {
      "heading": "Experimental evidence and interpretation",
      "explanation": "Photoelectric observations establish a frequency threshold and rapid electron emission, challenging a purely classical continuous-wave energy-transfer picture.",
      "tryIt": "Explain how photoelectric current may depend on illumination intensity above threshold while electron maximum energy does not."
    },
    {
      "heading": "de Broglie waves",
      "explanation": "Moving material particles have a wavelength λ=h/p, so faster nonrelativistic particles of fixed mass have shorter associated wavelengths. Electron diffraction supplies experimental support.",
      "tryIt": "A particle's momentum doubles; explain the predicted change in de Broglie wavelength and which quantity remains fixed."
    }
  ],
  [
    {
      "heading": "Rutherford scattering",
      "explanation": "Scattering of alpha particles suggested concentrated positive nuclear charge and mostly empty atom volume. The classical planetary picture was inadequate to explain stable atoms and line spectra.",
      "tryIt": "Explain why rare large-angle alpha deflections suggest a small dense positive region rather than diffuse charge."
    },
    {
      "heading": "Bohr's stationary orbits",
      "explanation": "The Bohr hydrogen model restricts electron orbital angular momentum in stable allowed states and assigns discrete energies En=−13.6/n² eV.",
      "tryIt": "Calculate the binding energy magnitude of a hydrogen electron at n=2 in electronvolts."
    },
    {
      "heading": "Emission and absorption",
      "explanation": "Light is emitted when an electron drops to a lower energy level and absorbed during upward transitions, with hν=|Ei−Ef|. Transitions explain discrete hydrogen lines.",
      "tryIt": "For n=3 to n=2 in hydrogen, state whether energy is emitted or absorbed and set up the energy difference."
    },
    {
      "heading": "Hydrogen spectral families",
      "explanation": "Hydrogen transitions ending at n=1 belong to Lyman series and at n=2 to Balmer; their wavelengths depend on integer initial and final energy levels.",
      "tryIt": "Identify the destination level for a Balmer photon and describe how to calculate its wavelength."
    },
    {
      "heading": "Model limits",
      "explanation": "Bohr's picture works for hydrogen-like atoms but does not fully explain many-electron systems or fine spectral details; modern quantum mechanics supplies a more comprehensive picture.",
      "tryIt": "Give one experimental fact the Bohr model describes and one limitation that prevents universal use."
    }
  ],
  [
    {
      "heading": "Nuclear constituents and isotopes",
      "explanation": "Nuclei contain protons and neutrons; proton number Z determines element and mass number A=Z+N. Isotopes differ in N while sharing Z.",
      "tryIt": "For a nuclide with A=27 and Z=13, calculate neutron number and explain which value defines the element."
    },
    {
      "heading": "Nuclear radius and density",
      "explanation": "Nuclear size scales roughly with A^(1/3) because nuclear matter density is approximately similar across many nuclides. Radius is vastly smaller than atom size.",
      "tryIt": "Explain why doubling A does not double the nuclear radius, using the one-third power dependence."
    },
    {
      "heading": "Mass defect and binding energy",
      "explanation": "A bound nucleus has less rest mass than separated constituent nucleons; the difference multiplied by c² gives binding energy. Binding energy per nucleon helps compare stability.",
      "tryIt": "Given an abstract 0.010 u mass defect, set up its energy in MeV using approximately 931.5 MeV per atomic mass unit."
    },
    {
      "heading": "Radioactivity and half-life",
      "explanation": "Unstable nuclei decay probabilistically. For a large sample, N=N₀(1/2)^(t/T½). Distinguish changes from alpha, beta and gamma emission in nuclear bookkeeping.",
      "tryIt": "After four half-lives, calculate the fraction of undecayed original nuclei and note why this is a population expectation."
    },
    {
      "heading": "Fission and fusion",
      "explanation": "Heavy nuclei may release energy through fission, while light nuclei can fuse under extreme conditions. Energy release tracks mass-energy differences and reaction products.",
      "tryIt": "Distinguish fission of a heavy nucleus from fusion of light nuclei without describing hazardous apparatus."
    },
    {
      "heading": "Energy conservation and safeguards",
      "explanation": "In nuclear equations, nucleon number, electric charge and total energy–momentum must balance. Radiation requires regulated protective controls, never home demonstrations.",
      "tryIt": "Check conserved charge and nucleon count for a simple symbolic alpha-emission nuclear equation."
    }
  ],
  [
    {
      "heading": "Energy bands",
      "explanation": "Solids have energy bands and gaps; conductors, insulators and semiconductors differ in available electronic states. Temperature affects carrier excitation and resistivity.",
      "tryIt": "Explain why a semiconductor's electrical conductivity can increase with temperature, unlike an ordinary metallic conductor."
    },
    {
      "heading": "Intrinsic and doped types",
      "explanation": "Intrinsic material has comparable electron and hole concentrations. Donor doping produces n-type electron majority carriers and acceptor doping produces p-type hole majority carriers.",
      "tryIt": "Classify a group-V donor impurity in silicon and name the majority carrier."
    },
    {
      "heading": "Junction formation",
      "explanation": "When p- and n-type regions meet, carrier diffusion leaves a depletion region and built-in field. Equilibrium involves opposing diffusion and drift contributions.",
      "tryIt": "Describe qualitatively how the depletion region forms in an unbiased p-n junction."
    },
    {
      "heading": "Forward and reverse bias",
      "explanation": "Forward bias typically reduces the junction barrier and allows larger current, whereas reverse bias tends to broaden depletion and leave only a small leakage before breakdown.",
      "tryIt": "Compare how forward and reverse bias affect the depletion barrier in a diode."
    },
    {
      "heading": "Rectifier circuit concept",
      "explanation": "A diode can conduct asymmetrically under an AC source, enabling half-wave and full-wave rectification designs; actual output shape depends on load and filtering.",
      "tryIt": "Sketch the qualitative waveform after ideal half-wave rectification of a sine wave without proposing mains wiring."
    },
    {
      "heading": "Semiconductor safety and uses",
      "explanation": "Diodes, LEDs and photovoltaic junction devices rely on carrier movement and recombination. Any physical circuit demo should use teacher-supervised, current-limited low voltage.",
      "tryIt": "Explain why a current-limiting resistor is used with a visible LED in an educational demonstration."
    }
  ]
];
