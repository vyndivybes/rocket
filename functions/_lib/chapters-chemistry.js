// Original Saathi CBSE Chemistry theory drafts. Lab safety: no unsupervised procedures.
export const CHEMISTRY_DRAFTS=[
  {
    "learningObjectives": [
      "Distinguish molarity and mole fraction",
      "Apply Raoult's law to ideal solutions",
      "Explain colligative-property dependence"
    ],
    "concept": "A solution is a homogeneous mixture of solute and solvent. Molarity M = moles of solute/litres of solution; mole fraction is component moles divided by total moles. For ideal solutions Raoult's law relates a component's vapour partial pressure to its liquid-phase mole fraction. Colligative properties depend primarily on numbers of dissolved solute particles; apparent values may change through association or dissociation.",
    "example": "A hypothetical solution contains 0.20 mol solute in 0.500 L final solution. Its molarity is 0.20/0.500 = 0.40 M. For a separate binary mixture with 2 mol A and 3 mol B, the mole fraction of A is 2/(2+3) = 0.40. Notice that these two quantities share a number but use different definitions.",
    "question": "A solution has 0.75 mol solute in 1.5 L of final solution. What is its molarity?",
    "options": [
      "0.20 M",
      "0.50 M",
      "1.125 M",
      "2.0 M"
    ],
    "answerIndex": 1,
    "explanation": "Molarity = moles/volume in litres = 0.75/1.5 = 0.50 mol/L. Using solvent volume instead of final solution volume would be a different calculation.",
    "misconception": "Molarity depends on the final solution volume and can change with temperature. Mole fraction is dimensionless, and colligative effects depend on effective particle count, not chemical identity alone."
  },
  {
    "learningObjectives": [
      "Distinguish oxidation and reduction electrodes",
      "Apply standard cell-potential relation",
      "Interpret Nernst concentration dependence"
    ],
    "concept": "In a galvanic cell oxidation occurs at the anode, reduction at the cathode. With both electrode values written as standard reduction potentials, E°cell = E°cathode − E°anode. A positive E°cell corresponds to negative standard Gibbs-energy change for the cell reaction. Under nonstandard conditions the Nernst equation accounts for reaction quotient and temperature. Electrons move through the external circuit from anode to cathode.",
    "example": "For a hypothetical galvanic cell with E°cathode = +0.34 V and E°anode = −0.76 V, E°cell = +0.34 − (−0.76) = +1.10 V. The value is a difference between reduction potentials; do not reverse the sign of one entry and then subtract it again.",
    "question": "Using standard reduction potentials, cathode +0.80 V and anode +0.20 V, what is standard cell potential?",
    "options": [
      "+1.00 V",
      "+0.60 V",
      "−0.60 V",
      "+0.20 V"
    ],
    "answerIndex": 1,
    "explanation": "E°cell = E°cathode − E°anode = 0.80 − 0.20 = +0.60 V. Both inputs are reduction potentials, so the cathode-minus-anode rule applies.",
    "misconception": "The anode is the oxidation site in both galvanic and electrolytic cells, but the polarity of electrodes can differ. Do not confuse conductance with conductivity."
  },
  {
    "learningObjectives": [
      "Define rate as change in concentration over time",
      "Distinguish reaction order from molecularity",
      "Apply first-order half-life relation"
    ],
    "concept": "Chemical kinetics studies rates of chemical reactions and the factors affecting them. Rate expressions relate change in concentration to time and must account for stoichiometric coefficients. Reaction order is obtained experimentally from the rate law, not simply read from a balanced overall equation. For a first-order process with constant k, concentration decays exponentially and t½ = ln2/k, independent of starting concentration.",
    "example": "For an ideal first-order reaction with k = 0.10 min⁻¹, t½ = 0.693/0.10 = 6.93 min. After two such half-lives, 25% of the initial reactant concentration remains, assuming the first-order model holds throughout.",
    "question": "For a first-order reaction with k = 0.231 min⁻¹, approximately what is its half-life?",
    "options": [
      "0.33 min",
      "3.0 min",
      "7.0 min",
      "23.1 min"
    ],
    "answerIndex": 1,
    "explanation": "Use t½ = 0.693/k = 0.693/0.231 = 3.0 min. Because k has units min⁻¹, half-life is in minutes.",
    "misconception": "A reaction coefficient in the balanced equation is not automatically its experimental reaction order. A catalyst changes rate mechanisms but does not change equilibrium thermodynamics."
  },
  {
    "learningObjectives": [
      "Recognise d- and f-block electronic trends",
      "Explain variable oxidation states",
      "Describe coloured complexes and magnetic behaviour"
    ],
    "concept": "Transition-metal chemistry involves partially filled d subshells in atoms or common cations, with varied oxidation states, coordination chemistry and often coloured ions. The lanthanoids show gradual ionic-radius decrease across the series owing to imperfect shielding by 4f electrons. Unpaired electrons usually contribute paramagnetism. Colour often involves electronic transitions and depends on oxidation state and ligands.",
    "example": "Consider Fe²⁺ and Fe³⁺. The two ions differ in electron count and oxidation state, helping explain why iron forms multiple compounds and complexes. In comparing ionic radii within comparable electron configurations, higher positive nuclear attraction generally favours a smaller cation.",
    "question": "What is a major cause of lanthanoid contraction across the series?",
    "options": [
      "Increasing shielding by 4f electrons",
      "Poor shielding by 4f electrons",
      "Complete absence of nuclear charge",
      "All lanthanoids being gases"
    ],
    "answerIndex": 1,
    "explanation": "The 4f electrons shield the increasing nuclear charge poorly, so effective attraction on outer electrons rises and many trivalent ionic radii decrease progressively.",
    "misconception": "Not every d-block element is a transition element under the common incomplete-d-subshell definition; metallic classification and transition behaviour are related but not identical."
  },
  {
    "learningObjectives": [
      "Identify coordination number and ligands",
      "Use oxidation-state bookkeeping",
      "Distinguish geometrical and optical isomerism"
    ],
    "concept": "A coordination compound contains a central metal atom or ion bonded to ligands through donor atoms. Coordination number counts directly bound donor atoms, not necessarily the number of ligand molecules. Ligands may be mono- or polydentate. The oxidation state of the central metal can be calculated from complex charge and ligand charges. Some complexes show structural, geometric or optical isomerism.",
    "example": "For [Co(NH₃)₆]³⁺, each NH₃ ligand is neutral and monodentate. The central cobalt oxidation state is therefore +3 and the coordination number is 6. For [Fe(CN)₆]⁴⁻, six CN⁻ ligands total −6, so iron must be +2.",
    "question": "In [Co(NH₃)₆]³⁺, what is the cobalt oxidation state?",
    "options": [
      "+1",
      "+2",
      "+3",
      "+6"
    ],
    "answerIndex": 2,
    "explanation": "All six ammonia ligands carry formal charge zero. The overall complex charge is +3, so the cobalt oxidation state is +3.",
    "misconception": "Coordination number is not the same as oxidation number. A bidentate ligand contributes two donor atoms but is still one ligand molecule."
  },
  {
    "learningObjectives": [
      "Compare substitution and elimination pathways",
      "Distinguish SN1 from SN2 limiting models",
      "Recognise haloarene lower substitution reactivity"
    ],
    "concept": "Haloalkanes contain a halogen bonded to an aliphatic carbon, whereas haloarenes contain a halogen directly bonded to an aromatic ring. Nucleophilic substitutions may proceed through concerted SN2 mechanisms or carbocation-mediated SN1 mechanisms depending on substrate, nucleophile, solvent and conditions. Elimination competes under suitable conditions. Aromatic carbon–halogen bonding differs from that of simple alkyl halides and usually resists ordinary SN1/SN2 substitution.",
    "example": "For a primary alkyl halide reacting with a sufficiently strong nucleophile in a suitable polar aprotic solvent, the SN2 model often dominates: the nucleophile attacks the carbon as the leaving group departs. At an asymmetric reacting centre, backside attack produces inversion of configuration.",
    "question": "Which statement about an ideal SN2 substitution at an asymmetric carbon is accurate?",
    "options": [
      "It proceeds by a freely formed planar carbocation",
      "It occurs in one concerted displacement step",
      "Its rate depends only on substrate",
      "It always produces retention of configuration"
    ],
    "answerIndex": 1,
    "explanation": "The limiting SN2 mechanism is concerted, with bond formation and leaving-group departure occurring in one step. Backside attack typically gives stereochemical inversion.",
    "misconception": "SN1 and SN2 are mechanistic models, not universal labels inferred only from the molecule name. Product distributions depend on solvent, nucleophile and competing reactions."
  },
  {
    "learningObjectives": [
      "Distinguish alcohols, phenols and ethers",
      "Explain phenol acidity relative to alcohols",
      "Identify oxidation-product patterns"
    ],
    "concept": "Alcohols contain a hydroxyl group on saturated carbon; phenols have –OH attached directly to an aromatic ring; ethers contain an R–O–R' linkage. Phenol is more acidic than an ordinary aliphatic alcohol because its conjugate base has resonance stabilisation. Primary alcohols can be oxidised to aldehydes and then carboxylic acids; secondary alcohols to ketones under suitable conditions.",
    "example": "In structure CH₃CH₂OH, the –OH belongs to an alcohol, ethanol. In C₆H₅OH, the –OH is directly attached to an aromatic ring, so the compound is phenol. CH₃OCH₃ has an oxygen between two carbon groups and is an ether. Functional placement changes chemistry.",
    "question": "Which functional-group description matches an ether?",
    "options": [
      "R–COOH",
      "R–O–R'",
      "R–CHO",
      "R–NH₂"
    ],
    "answerIndex": 1,
    "explanation": "An ether has an oxygen atom single-bonded to two organic groups, represented by R–O–R'. The other structures correspond to carboxylic acid, aldehyde and amine.",
    "misconception": "Phenol is not simply an aromatic version of ethanol in acid-base behaviour; phenoxide resonance changes acidity. Formula alone may not identify functional-group placement."
  },
  {
    "learningObjectives": [
      "Recognise carbonyl functional groups",
      "Contrast aldehyde and ketone oxidation",
      "Explain nucleophilic addition to carbonyls"
    ],
    "concept": "Aldehydes contain terminal –CHO; ketones contain a carbonyl between two carbon groups; carboxylic acids contain –COOH. The polar C=O bond makes carbonyl carbon susceptible to nucleophilic attack. Aldehydes are generally more readily oxidised to acids than typical ketones, explaining common qualitative differentiation. Carbonyl addition and acid derivatives also feature reactions governed by electronic and steric effects.",
    "example": "CH₃CHO is ethanal (aldehyde), CH₃COCH₃ is propanone (ketone), and CH₃COOH is ethanoic acid. Compare the carbonyl carbon's attachments: aldehyde to H, ketone to two carbons, and acid to OH. This classification predicts typical reaction behaviour.",
    "question": "Which compound contains an aldehyde functional group?",
    "options": [
      "CH₃COCH₃",
      "CH₃CHO",
      "CH₃CH₂OH",
      "CH₃COOH"
    ],
    "answerIndex": 1,
    "explanation": "CH₃CHO has a terminal –CHO group, so it is ethanal, an aldehyde. CH₃COCH₃ is a ketone, CH₃CH₂OH an alcohol and CH₃COOH an acid.",
    "misconception": "Not every molecule containing oxygen is an aldehyde. The location and bonding of the carbonyl group determine classification and much of its reactivity."
  },
  {
    "learningObjectives": [
      "Classify primary, secondary and tertiary amines",
      "Explain amine basicity in general terms",
      "Describe diazonium aromatic transformations conceptually"
    ],
    "concept": "Amines are organic derivatives of ammonia with carbon groups bonded to nitrogen. A primary amine has one organic substituent on N, a secondary has two and a tertiary has three. Their basic behaviour arises from the nitrogen lone pair, but solvent, substituent electronics and sterics influence relative basicity. Aromatic amines and diazonium salts support important synthetic transformations, which require controlled laboratory conditions.",
    "example": "CH₃NH₂ is methylamine, a primary amine; (CH₃)₂NH is dimethylamine, a secondary amine; (CH₃)₃N is trimethylamine, a tertiary amine. Count organic substituents on nitrogen rather than the total number of carbon atoms.",
    "question": "What is the classification of (CH₃)₂NH?",
    "options": [
      "Primary amine",
      "Secondary amine",
      "Tertiary amine",
      "Amide"
    ],
    "answerIndex": 1,
    "explanation": "The nitrogen atom is bonded to two methyl groups and one hydrogen, making (CH₃)₂NH a secondary amine. An amide would have nitrogen associated with a carbonyl group.",
    "misconception": "Basic strength is not governed by a simple substituent-count rule in every solvent. Amines and amides are not interchangeable because resonance affects nitrogen lone-pair availability."
  },
  {
    "learningObjectives": [
      "Recognise common carbohydrate classes",
      "Describe peptide bonds and proteins",
      "Compare DNA and RNA constituents"
    ],
    "concept": "Biomolecules include carbohydrates, proteins, nucleic acids and vitamins. Monosaccharides are simple sugars, while disaccharides and polysaccharides contain glycosidic linkages. Amino acids join through peptide (amide) bonds to form polypeptides whose folding influences function. Nucleotides contain sugar, phosphate and nitrogenous base; DNA usually uses deoxyribose and thymine, while RNA uses ribose and uracil.",
    "example": "Two amino acids can be represented as linked by –CO–NH–, the peptide linkage. A strand with three linked amino acid residues contains two peptide bonds. Counting bonds is different from counting residues: number of links in a linear chain of n residues is n−1.",
    "question": "In a simple linear chain of five amino acid residues, how many peptide bonds connect neighbouring residues?",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "answerIndex": 1,
    "explanation": "Each adjacent pair of amino acid residues is connected by one peptide bond. A linear chain of five residues has four connections, or n−1 = 4 peptide bonds.",
    "misconception": "DNA and RNA differ in sugar and usual bases, not merely in being double-stranded versus single-stranded; exceptions exist. Denaturation is not the same as hydrolysis of peptide bonds."
  }
];
