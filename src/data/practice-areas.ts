export interface PracticeArea {
  slug: string;
  num: string;
  title: string;
  shortDesc: string;
  icon: string;
  intro: string;
  scope: string[];
  typicalCases: string[];
  deliverables: string[];
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: "construction-defects",
    num: "01",
    title: "Construction Defects",
    shortDesc:
      "Design and workmanship failures across commercial, multi-family, and institutional projects.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M8 40 L8 18 L24 8 L40 18 L40 40 Z"/><path d="M8 40 L40 40" stroke-width="1.5"/><path d="M18 40 L18 26 L30 26 L30 40"/><path d="M24 26 L24 40"/></svg>`,
    intro:
      "Construction defect matters turn on whether the building was designed, specified, and constructed in accordance with the governing standard of care. Meridian engagements begin with that question — and end with a documented answer traceable to physical evidence.",
    scope: [
      "Commercial, multi-family, and institutional projects",
      "Design defects and specification failures",
      "Workmanship and installation deficiencies",
      "Material failures and substrate incompatibilities",
      "Sequence-of-trades and means-and-methods issues",
    ],
    typicalCases: [
      "Plaintiff-side construction defect litigation",
      "Developer and contractor defense matters",
      "Subrogation claims against responsible trades",
      "Transition-period HOA investigations",
    ],
    deliverables: [
      "Written expert reports structured for disclosure",
      "Documented root-cause analysis tied to standards",
      "Deposition and trial testimony",
      "Mediation and settlement support",
    ],
  },
  {
    slug: "water-intrusion",
    num: "02",
    title: "Water Intrusion & Envelope",
    shortDesc:
      "Roofing, stucco, EIFS, window and door installations, flashing, and moisture migration pathways.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M8 14 L40 14 L40 34 L8 34 Z"/><path d="M8 14 L24 26 L40 14"/><path d="M8 34 L18 24"/><path d="M40 34 L30 24"/></svg>`,
    intro:
      "Water finds the weakest detail. Envelope investigations require tracing moisture back through flashing, membranes, and substrates — not stopping at the stain. Meridian reports document the pathway, not just the damage.",
    scope: [
      "Roof assemblies and flashing terminations",
      "Stucco, EIFS, and cement plaster claddings",
      "Fenestration: windows, doors, curtain wall",
      "Below-grade waterproofing and foundation drainage",
      "Parapets, coping, and through-wall flashings",
    ],
    typicalCases: [
      "Water intrusion and leak litigation",
      "Mold and indoor air quality matters",
      "Property damage insurance disputes",
      "Product liability claims involving envelope assemblies",
    ],
    deliverables: [
      "Moisture mapping and intrusion pathway documentation",
      "Non-destructive and destructive testing reports",
      "Scope of repair analysis",
      "Expert reports and testimony",
    ],
  },
  {
    slug: "insurance-catastrophe",
    num: "03",
    title: "Insurance & Cat Loss",
    shortDesc:
      "Hurricane, hail, wind, and water-loss evaluations, including coverage-relevant causation analysis.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M24 6 L6 14 L6 28 C6 36 14 42 24 44 C34 42 42 36 42 28 L42 14 Z"/><path d="M17 24 L22 29 L32 19"/></svg>`,
    intro:
      "Insurance disputes hinge on causation. Whether a loss is covered often depends on whether damage was caused by a covered peril or by pre-existing conditions, wear, or excluded causes. Meridian provides the causation analysis that supports — or challenges — coverage.",
    scope: [
      "Hurricane, windstorm, and tornado damage",
      "Hail impact assessment and differentiation",
      "Water loss: plumbing, roof, and flood",
      "Fire, smoke, and post-fire structural evaluation",
      "Collapse and catastrophic failure analysis",
    ],
    typicalCases: [
      "First-party property claims",
      "Bad faith and coverage litigation",
      "Business interruption matters",
      "Large-loss reinsurance disputes",
    ],
    deliverables: [
      "Causation analysis with peril differentiation",
      "Pre-existing versus event damage assessments",
      "Repair versus replacement scope analysis",
      "Expert reports and testimony",
    ],
  },
  {
    slug: "structural-failures",
    num: "04",
    title: "Structural Failures",
    shortDesc:
      "Settlement, movement, foundation, framing, and load-path investigations to code and standard of care.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M6 38 L6 14 L18 14 L18 38"/><path d="M18 26 L42 26 L42 38"/><path d="M6 38 L42 38"/><path d="M12 20 L12 24"/><path d="M26 32 L26 36"/><path d="M34 32 L34 36"/></svg>`,
    intro:
      "Structural investigations require evaluating the load path as a whole, not just the point of observed distress. Meridian analyzes foundations, framing, and connections against the applicable code and standard of care at time of construction.",
    scope: [
      "Foundation settlement and heave",
      "Framing, connection, and load-path failures",
      "Concrete, masonry, and steel evaluation",
      "Post-tensioned and conventionally reinforced slabs",
      "Soil-structure interaction and geotechnical interface",
    ],
    typicalCases: [
      "Structural defect litigation",
      "Collapse and partial collapse investigations",
      "Foundation warranty and performance claims",
      "Adjacent-construction damage disputes",
    ],
    deliverables: [
      "Structural condition assessments",
      "Load-path and failure-mode analysis",
      "Repair scope and cost-of-repair evaluation",
      "Expert reports and testimony",
    ],
  },
  {
    slug: "code-standard-of-care",
    num: "05",
    title: "Code & Standard of Care",
    shortDesc:
      "Compliance analysis against governing codes, published standards, and industry practice at time of construction.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M14 6 L34 6 L38 10 L38 42 L10 42 L10 10 Z"/><path d="M16 18 L32 18"/><path d="M16 24 L32 24"/><path d="M16 30 L26 30"/><circle cx="34" cy="32" r="5"/><path d="M37 35 L40 38"/></svg>`,
    intro:
      "Code compliance is a question of fact. Standard of care is a question of what a reasonable practitioner would have done at the time. Meridian reports separate the two — and document both against published authority.",
    scope: [
      "International Building Code (IBC) and local amendments",
      "International Residential Code (IRC) analysis",
      "ASTM, ACI, AISC, and industry-association standards",
      "Manufacturer installation requirements",
      "Historical code research for older construction",
    ],
    typicalCases: [
      "Code compliance disputes",
      "Professional liability matters",
      "Warranty and product-performance claims",
      "Contract disputes involving scope and specification",
    ],
    deliverables: [
      "Code compliance analysis reports",
      "Standard-of-care evaluations with published basis",
      "Specification conformance review",
      "Expert reports and testimony",
    ],
  },
  {
    slug: "expert-testimony",
    num: "06",
    title: "Expert Witness Testimony",
    shortDesc:
      "Deposition and trial testimony supported by documented methodology and chain-of-custody evidence handling.",
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.25"><rect x="8" y="10" width="32" height="28"/><path d="M8 18 L40 18"/><path d="M14 26 L22 26"/><path d="M14 30 L26 30"/><path d="M30 26 L34 30 L30 34"/></svg>`,
    intro:
      "Testimony is where the work is tested. Meridian&apos;s methodology — documented investigation, traceable opinions, disclosed basis — is built from the first site visit with Daubert admissibility in mind.",
    scope: [
      "Deposition testimony preparation and delivery",
      "Trial testimony with demonstrative support",
      "Daubert and Frye challenge response",
      "Rebuttal expert reports",
      "Arbitration and mediation expert support",
    ],
    typicalCases: [
      "Construction defect trials",
      "Insurance coverage and bad faith matters",
      "Professional liability claims",
      "Product liability involving building assemblies",
    ],
    deliverables: [
      "Rule 26 / Rule 702-compliant expert disclosures",
      "Deposition testimony with documented basis",
      "Trial testimony with demonstrative exhibits",
      "Rebuttal reports responsive to opposing experts",
    ],
  },
];
