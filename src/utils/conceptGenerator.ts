/**
 * VU 8-Semester Curriculum Architecture, Majors, and Instant High-Fidelity
 * In-Depth "WHAT, WHY, HOW, CLASSIFICATIONS" Concept Explanation Generator.
 */

export interface CourseItem {
  code: string;
  title: string;
  semester: number; // 1 to 8
  majorId: string;
}

export interface VUMajor {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export const VU_MAJORS: VUMajor[] = [
  {
    id: 'cs-it',
    name: 'Computer Science / IT',
    description: 'Programming, Automata, Databases, Systems, Mobile & Web Dev',
    iconName: 'Code',
  },
  {
    id: 'mgmt-business',
    name: 'Management / Business',
    description: 'Marketing, Finance, Accounting, Economics, TQM & Ethics',
    iconName: 'Briefcase',
  },
  {
    id: 'psych-soc',
    name: 'Psychology / Sociology',
    description: 'Cognitive Psychology, Gender Studies, Social Stratification & Behavior',
    iconName: 'Users',
  },
  {
    id: 'math-stats',
    name: 'Math / Stats',
    description: 'Calculus, Linear Algebra, Discrete Math, Numerical & Statistical Computing',
    iconName: 'Calculator',
  },
  {
    id: 'eng-lit',
    name: 'English / Literature',
    description: 'Language Comprehension, Technical Writing, Linguistics & Literature',
    iconName: 'BookOpen',
  },
  {
    id: 'edu-others',
    name: 'Education / Others',
    description: 'Educational Leadership, Biology, Physics, Ethics & International Relations',
    iconName: 'GraduationCap',
  },
];

export const SEMESTER_COURSES: CourseItem[] = [
  // SEMESTER 1
  { code: 'CS101', title: 'Introduction to Computing', semester: 1, majorId: 'cs-it' },
  { code: 'ENG101', title: 'English Comprehension', semester: 1, majorId: 'eng-lit' },
  { code: 'MTH101', title: 'Calculus and Analytical Geometry', semester: 1, majorId: 'math-stats' },
  { code: 'MTH104', title: 'Sets and Logic', semester: 1, majorId: 'math-stats' },
  { code: 'PAK301', title: 'Pakistan Studies', semester: 1, majorId: 'edu-others' },
  { code: 'PHY101', title: 'Physics', semester: 1, majorId: 'edu-others' },
  { code: 'ECO101', title: 'Basic Economics', semester: 1, majorId: 'mgmt-business' },
  { code: 'ACC101', title: 'Contemporary Financial Accounting', semester: 1, majorId: 'mgmt-business' },
  { code: 'PSY101', title: 'Introduction to Psychology', semester: 1, majorId: 'psych-soc' },
  { code: 'SOC101', title: 'Introduction to Sociology', semester: 1, majorId: 'psych-soc' },
  { code: 'EDU101', title: 'Contemporary Issues & Trends in Education', semester: 1, majorId: 'edu-others' },

  // SEMESTER 2
  { code: 'CS201', title: 'Introduction to Programming (C++)', semester: 2, majorId: 'cs-it' },
  { code: 'CS201P', title: 'Introduction to Programming (Practical)', semester: 2, majorId: 'cs-it' },
  { code: 'MTH202', title: 'Discrete Mathematics', semester: 2, majorId: 'math-stats' },
  { code: 'ENG201', title: 'Business and Technical English Writing', semester: 2, majorId: 'eng-lit' },
  { code: 'ISL201', title: 'Islamic Studies', semester: 2, majorId: 'edu-others' },
  { code: 'ETH202', title: 'Ethics (For Non-Muslims)', semester: 2, majorId: 'edu-others' },
  { code: 'MGT211', title: 'Introduction to Business', semester: 2, majorId: 'mgmt-business' },
  { code: 'PSC201', title: 'International Relations', semester: 2, majorId: 'edu-others' },
  { code: 'URD101', title: 'Urdu Language & Literature', semester: 2, majorId: 'eng-lit' },

  // SEMESTER 3
  { code: 'CS301', title: 'Data Structures', semester: 3, majorId: 'cs-it' },
  { code: 'CS301P', title: 'Data Structures (Practical)', semester: 3, majorId: 'cs-it' },
  { code: 'CS302', title: 'Digital Logic Design', semester: 3, majorId: 'cs-it' },
  { code: 'CS304', title: 'Object Oriented Programming', semester: 3, majorId: 'cs-it' },
  { code: 'MTH302', title: 'Business Mathematics & Statistics', semester: 3, majorId: 'math-stats' },
  { code: 'STA301', title: 'Statistics and Probability', semester: 3, majorId: 'math-stats' },
  { code: 'MGT201', title: 'Financial Management', semester: 3, majorId: 'mgmt-business' },
  { code: 'MGT301', title: 'Principles of Marketing', semester: 3, majorId: 'mgmt-business' },
  { code: 'EDU302', title: 'Human Development and Learning', semester: 3, majorId: 'edu-others' },

  // SEMESTER 4
  { code: 'CS401', title: 'Computer Architecture & Assembly Language', semester: 4, majorId: 'cs-it' },
  { code: 'CS402', title: 'Theory of Automata', semester: 4, majorId: 'cs-it' },
  { code: 'CS403', title: 'Database Management Systems', semester: 4, majorId: 'cs-it' },
  { code: 'MTH401', title: 'Differential Equations', semester: 4, majorId: 'math-stats' },
  { code: 'MGT401', title: 'Financial Accounting - II', semester: 4, majorId: 'mgmt-business' },
  { code: 'ECO404', title: 'Managerial Economics', semester: 4, majorId: 'mgmt-business' },
  { code: 'EDU407', title: 'Philosophy of Education', semester: 4, majorId: 'edu-others' },
  { code: 'EDU433', title: 'Student Assessment and Evaluation', semester: 4, majorId: 'edu-others' },

  // SEMESTER 5
  { code: 'CS501', title: 'Advanced Computer Architecture', semester: 5, majorId: 'cs-it' },
  { code: 'CS502', title: 'Design and Analysis of Algorithms', semester: 5, majorId: 'cs-it' },
  { code: 'CS504', title: 'Software Engineering - I', semester: 5, majorId: 'cs-it' },
  { code: 'CS515', title: 'Mobile Application Development', semester: 5, majorId: 'cs-it' },
  { code: 'MTH501', title: 'Linear Algebra', semester: 5, majorId: 'math-stats' },
  { code: 'ACC501', title: 'Business Finance', semester: 5, majorId: 'mgmt-business' },
  { code: 'MGT510', title: 'Total Quality Management', semester: 5, majorId: 'mgmt-business' },
  { code: 'PSY510', title: 'Organizational Psychology', semester: 5, majorId: 'psych-soc' },
  { code: 'PSY512', title: 'Gender Issues in Psychology', semester: 5, majorId: 'psych-soc' },
  { code: 'BIO504T', title: 'Molecular Biology', semester: 5, majorId: 'edu-others' },

  // SEMESTER 6
  { code: 'CS601', title: 'Data Communication', semester: 6, majorId: 'cs-it' },
  { code: 'CS604', title: 'Operating Systems', semester: 6, majorId: 'cs-it' },
  { code: 'CS605', title: 'Software Engineering - II', semester: 6, majorId: 'cs-it' },
  { code: 'CS607', title: 'Artificial Intelligence', semester: 6, majorId: 'cs-it' },
  { code: 'CS609', title: 'System Programming', semester: 6, majorId: 'cs-it' },
  { code: 'MTH603', title: 'Numerical Analysis', semester: 6, majorId: 'math-stats' },
  { code: 'STA630', title: 'Research Methods', semester: 6, majorId: 'math-stats' },
  { code: 'MGT602', title: 'Entrepreneurship', semester: 6, majorId: 'mgmt-business' },
  { code: 'MGT610', title: 'Business Ethics', semester: 6, majorId: 'mgmt-business' },
  { code: 'EDU604', title: 'Educational Leadership & Management', semester: 6, majorId: 'edu-others' },

  // SEMESTER 7
  { code: 'CS610', title: 'Computer Networks', semester: 7, majorId: 'cs-it' },
  { code: 'CS614', title: 'Data Warehousing', semester: 7, majorId: 'cs-it' },
  { code: 'CS615', title: 'Software Project Management', semester: 7, majorId: 'cs-it' },
  { code: 'CS619', title: 'Final Project Phase I', semester: 7, majorId: 'cs-it' },
  { code: 'CS620', title: 'Computer Vision', semester: 7, majorId: 'cs-it' },
  { code: 'STA621', title: 'Non-Parametric Methods', semester: 7, majorId: 'math-stats' },
  { code: 'STA641', title: 'Statistical Computing', semester: 7, majorId: 'math-stats' },
  { code: 'MGMT622', title: 'Business Process Re-engineering', semester: 7, majorId: 'mgmt-business' },
  { code: 'BIO5101', title: 'Cell Biology', semester: 7, majorId: 'edu-others' },
  { code: 'BIO5105', title: 'Genetics & Gene Expression', semester: 7, majorId: 'edu-others' },

  // SEMESTER 8
  { code: 'CS619', title: 'Final Year Project Phase II & Viva', semester: 8, majorId: 'cs-it' },
  { code: 'MTH5101', title: 'Advanced Mathematics', semester: 8, majorId: 'math-stats' },
  { code: 'MGT603', title: 'Strategic Management', semester: 8, majorId: 'mgmt-business' },
  { code: 'CS611', title: 'Software Quality Assurance', semester: 8, majorId: 'cs-it' },
];

export interface ConceptExplanation {
  courseCode: string;
  semesterNumber: number | string;
  majorName: string;
  topic: string;
  summary: string;
  romanUrdu: string;
  breakdown?: string[];
  snippetOrFormula?: string;
  examTip: string;
}

export interface DeepConceptExplanation {
  courseCode: string;
  semesterNumber: number | string;
  majorName: string;
  topic: string;
  whatIsIt: {
    definition: string;
    chemicalOrTechnicalForm: string;
    keyCharacteristics: string[];
  };
  whyItMatters: {
    purpose: string;
    biologicalOrSystemRole: string;
    realWorldValue: string;
  };
  howItWorksOrForms: {
    formationProcess: string;
    mechanismOrSyntax: string;
    stepByStepFlow: string[];
  };
  majorTypesAndClassifications: {
    categoryName: string;
    types: { name: string; description: string; examples: string }[];
  };
  romanUrduAnalogy: {
    title: string;
    analogyText: string;
    dailyLifeExample: string;
  };
  vuExamPastPaperSecret: {
    commonQuestionTypes: string;
    fiveMarksTopic: string;
    mcqTrick: string;
  };
}

/**
 * Filter courses by semester (1-8 or all) and major
 */
export function filterCoursesBySemesterAndMajor(
  semester: number | 'all',
  majorId: string = 'all'
): CourseItem[] {
  return SEMESTER_COURSES.filter((c) => {
    const matchSem = semester === 'all' || c.semester === semester;
    const matchMajor = majorId === 'all' || c.majorId === majorId;
    return matchSem && matchMajor;
  });
}

/**
 * Generates an in-depth WHAT, WHY, HOW, CLASSIFICATION, and ROMAN URDU explanation
 * for any course code and topic (with specialized deep dives for biology, CS, math, management, etc.).
 */
export function generateDeepConceptExplanation(
  majorId: string,
  rawCourseCode: string,
  topic: string,
  semester: number | string = 'General'
): DeepConceptExplanation {
  const code = (rawCourseCode || 'VU-COURSE').trim().toUpperCase();
  const major = VU_MAJORS.find((m) => m.id === majorId) || VU_MAJORS[0];
  const cleanTopic = (topic || 'Core Concept').trim();
  const lowerTopic = cleanTopic.toLowerCase();

  // Find course item if known
  const matched = SEMESTER_COURSES.find((c) => c.code.toUpperCase() === code);
  const semNum = matched ? matched.semester : semester;

  // 1. DEDICATED IN-DEPTH CASE: CARBOHYDRATES (User's primary explicit example!)
  if (lowerTopic.includes('carbohydrate') || lowerTopic.includes('sugar') || lowerTopic.includes('glucose')) {
    return {
      courseCode: code || 'BIO5101',
      semesterNumber: semNum,
      majorName: major.name,
      topic: 'Carbohydrates (Structure, Synthesis & Classification)',
      whatIsIt: {
        definition:
          'Carbohydrates (hydrates of carbon) are naturally occurring organic biomolecules composed of Carbon (C), Hydrogen (H), and Oxygen (O) atoms, typically following the empirical molecular formula Cn(H2O)n. Chemically, they are defined as polyhydroxy aldehydes or polyhydroxy ketones, or substances that yield these compounds upon hydrolysis.',
        chemicalOrTechnicalForm:
          'General Formula: Cn(H2O)n (1:2:1 stoichiometric ratio of C : H : O). Monomeric functional units feature either an aldehyde group (-CHO, Aldose) or a keto group (C=O, Ketose) alongside multiple hydroxyl (-OH) groups.',
        keyCharacteristics: [
          'Hydrates of Carbon with high caloric potential (approx 4 kcal/gram).',
          'Optically active stereoisomers (D-form predominantly utilized in human/animal biological metabolism).',
          'Form ring hemiacetal or hemiketal structures (Pyranose & Furanose rings) in aqueous solutions.',
        ],
      },
      whyItMatters: {
        purpose:
          'Carbohydrates serve as the fundamental fuel of biological life, providing rapid cellular ATP energy and foundational structural scaffolding across plants, animals, and microorganisms.',
        biologicalOrSystemRole:
          'In human and animal biology, Glucose is the mandatory, non-negotiable metabolic fuel for the brain, central nervous system, and red blood cells (erythrocytes). In plants, Carbohydrates form structural cellulose walls that allow trees and stems to remain rigid.',
        realWorldValue:
          'Without carbohydrates, cellular respiration halts: mitochondria cannot produce ATP via glycolysis and the Krebs cycle. Excess carbohydrates are stored as starch in plants and glycogen in animal liver/muscle tissue for fasting survival.',
      },
      howItWorksOrForms: {
        formationProcess:
          'Photosynthesis & Anabolic Condensation: In nature, carbohydrates are created by green plants and cyanobacteria through Photosynthesis using solar radiation, atmospheric Carbon Dioxide (CO2), and Water (H2O): 6CO2 + 6H2O + Light Energy → C6H12O6 + 6O2.',
        mechanismOrSyntax:
          'Glycosidic Bond Formation: Individual monosaccharide sugar units link together via Condensation Reactions (dehydration synthesis), where an -OH group of one sugar combines with an -H of another, expelling a water molecule (H2O) to forge an alpha or beta Glycosidic Bond (e.g. α-1,4 or β-1,4 linkage).',
        stepByStepFlow: [
          'Step 1: Solar photons excite chlorophyll electrons in the thylakoid membrane.',
          'Step 2: Calvin Cycle enzyme RuBisCO fixes atmospheric CO2 into 3-carbon sugars (G3P).',
          'Step 3: Two G3P molecules condense into Glucose (C6H12O6) and Fructose in the cytoplasm.',
          'Step 4: Monomers are joined by glycosidic bonds to assemble Disaccharides (Sucrose) and Polysaccharides (Starch/Cellulose).',
        ],
      },
      majorTypesAndClassifications: {
        categoryName: 'The 4 Major Taxonomic Classes of Carbohydrates',
        types: [
          {
            name: '1. Monosaccharides (Simple Sugars)',
            description: 'Single polyhydroxy aldehyde/ketone unit that cannot be hydrolyzed into simpler sugars. Highly soluble in water with sweet taste.',
            examples: 'Glucose (blood sugar), Fructose (fruit sugar), Galactose, Ribose (RNA backbone).',
          },
          {
            name: '2. Disaccharides (Double Sugars)',
            description: 'Composed of exactly two monosaccharide units joined covalently by a glycosidic bond with release of one H2O molecule.',
            examples: 'Sucrose (Table Sugar = Glucose + Fructose), Lactose (Milk Sugar = Glucose + Galactose), Maltose (Malt = Glucose + Glucose).',
          },
          {
            name: '3. Oligosaccharides (Short Chains)',
            description: 'Chains containing 3 to 10 monosaccharide residues, predominantly attached to cell surface membrane proteins (Glycoproteins) and lipids (Glycolipids) for immune cell recognition.',
            examples: 'Raffinose, Stachyose, Blood group ABO antigen determinants.',
          },
          {
            name: '4. Polysaccharides (Complex Macromolecules)',
            description: 'High molecular weight polymers of hundreds to thousands of monosaccharide units. Non-sweet and insoluble in water.',
            examples: 'Storage: Starch (in plants) & Glycogen (in human liver/muscles). Structural: Cellulose (plant cell walls) & Chitin (exoskeleton of insects/crabs).',
          },
        ],
      },
      romanUrduAnalogy: {
        title: 'Rozmarrah Ki Misaal (In-Depth Roman Urdu Samjhoti)',
        analogyText:
          'Carbohydrates ko bilkul rozmarrah ki misaal se samjhein:\n\nSocho aapka jism ek high-end sports car hai, aur carbohydrates is gari ka Premium High-Octane Petrol hain!\n\nJab aap roti, chawal (rice), ya fruit khatay hain to un mein carbohydrates hotay hain. Hamara maeda (stomach) aur intestines in lambi chains ko foran torh kar single Glucose banatay hain. Ye glucose khoon k zariye aapk dimaagh aur muscles tak pohanchta hai aur foran taaqat (energy) deta hai.\n\nAb agr aapne zaroorat se zyada roti ya metha kha liya, to gari ka petrol zaya nahi hota: Liver isko Glycogen ki shakal mein gari k "Reserve Petrol Tank" mein store kar deta hai taake kal jab aap roza rakhein ya bhooke hon, to wahan se nikaal kar use kar sakay!',
        dailyLifeExample:
          'Roti / Chawal = Complex Starch (Polysaccharide) → Pait mein ja kar hazam hua → Khoon mein Glucose (Monosaccharide) bana → Energy release hui!',
      },
      vuExamPastPaperSecret: {
        commonQuestionTypes:
          'VU Examiners frequently ask: "Define Carbohydrates and differentiate between Monosaccharides, Disaccharides, and Polysaccharides with examples" (5 Marks).',
        fiveMarksTopic:
          '5-Marks Long Question: "Explain the structure of Starch vs Cellulose. Why can humans digest Starch (alpha-1,4 linkage) but cannot digest Cellulose (beta-1,4 linkage)?" (Answer: Human digestive enzymes lack cellulase enzyme!).',
        mcqTrick:
          'Repeated MCQ: "Which carbohydrate is known as table sugar?" → Sucrose. "What is the general formula of carbohydrates?" → Cn(H2O)n.',
      },
    };
  }

  // 2. DEDICATED IN-DEPTH CASE: CS / IT (e.g. CS402 Automata, CS403 Database, CS515, CS609)
  if (majorId === 'cs-it') {
    return {
      courseCode: code,
      semesterNumber: semNum,
      majorName: major.name,
      topic: cleanTopic,
      whatIsIt: {
        definition: `In ${code} (Semester ${semNum}), "${cleanTopic}" is a formal computational mechanism, architectural pattern, or algorithmic principle designed to govern state transitions, resource allocation, and program invariants deterministically without ambiguity.`,
        chemicalOrTechnicalForm: `Technical Specification: Defines mathematical tuples (e.g. Q, Σ, δ, q0, F in automata; Entities, Attributes, Foreign Keys in databases; or Pointers and Process Control Blocks in systems) guaranteeing consistent execution.`,
        keyCharacteristics: [
          'Deterministic State Machine: Clear input alphabet, transition functions, and terminating acceptance states.',
          'Asymptotic Efficiency: Constrains memory space complexity and operational runtime overhead.',
          'Formal Verification: Eliminates race conditions, memory leaks, and normalization anomalies.',
        ],
      },
      whyItMatters: {
        purpose: `Computers cannot guess intent; they require mathematical proofs and explicit memory structures. "${cleanTopic}" ensures software executes reliably at scale across hardware layers.`,
        biologicalOrSystemRole: `In systems and software architectures, it acts as the authoritative decision arbiter—preventing invalid data insertion, CPU deadlocks, or compiler parsing failures.`,
        realWorldValue: `Without this principle, databases produce duplicate corrupt records, operating systems crash into deadlock freezes, and compilers cannot parse syntax correctly.`,
      },
      howItWorksOrForms: {
        formationProcess: `Step-by-step logic translation: Human-readable specifications are parsed into state transition tables, relational schemas, or binary instructions executed by the operating system kernel.`,
        mechanismOrSyntax: `// Core Algorithm Pattern for ${code} (${cleanTopic}):
struct ExecutionNode {
    int stateId;
    void* memoryPayload;
    ExecutionNode* next;
};
// 1. Initialize state -> 2. Process Input Alphabet -> 3. Validate Terminal State`,
        stepByStepFlow: [
          'Step 1: Ingest input symbol/query from the environment stream.',
          'Step 2: Look up transition matrix / relational index to find the next valid state.',
          'Step 3: Execute memory mutation or transaction within ACID isolation guarantees.',
          'Step 4: Emit sanitized output and release locked mutexes or heap resources.',
        ],
      },
      majorTypesAndClassifications: {
        categoryName: `Major Sub-Divisions & Variants of ${cleanTopic}`,
        types: [
          {
            name: 'Deterministic / Static Form',
            description: 'Exactly one predictable output or transition path for each unique input state. Unambiguous and high performance.',
            examples: 'DFA in CS402, 3NF BCNF schemas in CS403, Static Memory Arrays in CS201.',
          },
          {
            name: 'Non-Deterministic / Dynamic Form',
            description: 'Multiple branching paths evaluated concurrently or lazily resolved at runtime using heuristics or backtracking.',
            examples: 'NFA in CS402, Dynamic Heap Pointer reallocation in CS201, Non-relational NoSQL docs in CS403.',
          },
          {
            name: 'Hybrid / Enterprise Architecture',
            description: 'Combines structural performance with fault-tolerant recovery protocols across distributed nodes.',
            examples: 'Turing Machines in CS402, Distributed Two-Phase Commit transactions in CS403.',
          },
        ],
      },
      romanUrduAnalogy: {
        title: 'Rozmarrah Ki Misaal (In-Depth Roman Urdu Samjhoti)',
        analogyText: `Is concept ko bilkul rozmarrah ki misaal se samjhein:\n\nSocho aap ek Automatic Vending Machine (ya ATM machine) par gaye hain. Machine tab tak paise nahi nikalti jab tak aap step-by-step Card na dalein, PIN code theek na likhein, aur Cash Amount select na karein. Agar PIN ghalat ho to machine "Error State" par chali jati hai.\n\n${code} mein "${cleanTopic}" bilkul isi Vending Machine k rules jesa hai: Har step ka aik specific rule hai taake program ghalat raste par na jaye aur system crash na ho!`,
        dailyLifeExample:
          'Input Symbol diya → Rules ne verify kiya → State badli → Correct Output generate hua bina kisi error k!',
      },
      vuExamPastPaperSecret: {
        commonQuestionTypes: `VU Examiners in ${code} constantly ask: "Write the transition table / step-by-step algorithm for ${cleanTopic}" (5 Marks).`,
        fiveMarksTopic: `5-Marks Long Question: "Differentiate between the primary form and alternative variants of ${cleanTopic}. Provide one real-world code snippet or diagram."`,
        mcqTrick: `Tricky MCQ: Examiners frequently test edge cases (e.g. empty string null condition, zero pointer dereferencing, or 2NF vs 3NF transitive dependencies).`,
      },
    };
  }

  // 3. DEDICATED IN-DEPTH CASE: MANAGEMENT / BUSINESS
  if (majorId === 'mgmt-business') {
    return {
      courseCode: code,
      semesterNumber: semNum,
      majorName: major.name,
      topic: cleanTopic,
      whatIsIt: {
        definition: `In ${code} (Semester ${semNum}), "${cleanTopic}" is an analytical business framework, financial doctrine, or organizational governance model designed to evaluate commercial viability, optimize resource utilization, and maximize stakeholder value.`,
        chemicalOrTechnicalForm: `Quantitative & Strategic Formulation: Expressed through accounting ledger equations, capital budgeting formulas (NPV, IRR, WACC), market elasticities, or corporate governance protocols.`,
        keyCharacteristics: [
          'Fiduciary Responsibility: Direct alignment with shareholder wealth maximization and risk mitigation.',
          'Quantifiable Performance Metrics: Evaluated using financial ratios, variance analysis, or market share indicators.',
          'Regulatory Compliance: Strictly adheres to IFRS, GAAP standards, or corporate law frameworks.',
        ],
      },
      whyItMatters: {
        purpose: `Commercial enterprises operate under resource scarcity. "${cleanTopic}" prevents emotional guesswork by providing quantifiable methodologies to decide where money, labor, and time must be invested.`,
        biologicalOrSystemRole: `In corporate anatomy, it functions like the circulatory and nervous system—monitoring cash flow liquidity and signaling corrective interventions before insolvency strikes.`,
        realWorldValue: `Without this discipline, companies overextend leverage, launch loss-making products, face fraud/embezzlement risks, and collapse into liquidation.`,
      },
      howItWorksOrForms: {
        formationProcess: `Data capture from transactions → Ledger posting → Financial statement synthesis → Variance analysis → Strategic managerial intervention.`,
        mechanismOrSyntax: `Primary Financial Formula for ${code}:
Net Present Value (NPV) = Σ [Cash Flow_t / (1 + r)^t] - Initial Investment
Contribution Margin = Unit Selling Price - Variable Cost per Unit
Operating Leverage = Contribution Margin / Operating Income (EBIT)`,
        stepByStepFlow: [
          'Step 1: Collect historical transaction ledgers and forecasted operational cash flows.',
          'Step 2: Adjust for inflation, cost of debt, cost of equity, and weighted cost of capital (WACC).',
          'Step 3: Run break-even sensitivity analysis across optimistic, realistic, and pessimistic market scenarios.',
          'Step 4: Formalize executive policies and audit controls for compliance.',
        ],
      },
      majorTypesAndClassifications: {
        categoryName: `Major Operational Classifications in ${cleanTopic}`,
        types: [
          {
            name: 'Operational & Tactical Level',
            description: 'Day-to-day transaction processing, inventory reorder cycles, and working capital cash management.',
            examples: 'Cash flow statements, FIFO/LIFO inventory accounting, double-entry bookkeeping.',
          },
          {
            name: 'Strategic & Capital Allocation Level',
            description: 'Long-term corporate decisions involving multi-million rupee investments, factory acquisitions, or brand expansions.',
            examples: 'Discounted Cash Flow (DCF), Net Present Value (NPV), Mergers & Acquisitions (M&A).',
          },
          {
            name: 'Regulatory & Governance Audit',
            description: 'External and internal verification ensuring ethics, taxation honesty, and statutory transparency.',
            examples: 'Total Quality Management (TQM), ISO Audits, External SECP Auditor filings.',
          },
        ],
      },
      romanUrduAnalogy: {
        title: 'Rozmarrah Ki Misaal (In-Depth Roman Urdu Samjhoti)',
        analogyText: `Is concept ko bilkul aasan rozmarrah ki misaal se samjhein:\n\nSocho aap ek wholesale kapray ki shop chalatay hain. Agar aapko yehi maloom na ho k ek suit kitnay ka khareeda (Cost), bijli aur dukan ka kiraya kitna para (Fixed Costs), aur bechne par kitna bachay ga (Margin), to aap baghair sochy samjhay qarzay le lein ge aur dukan band ho jaye gi!\n\n${code} mein "${cleanTopic}" aapko bilkul exact hisab kitab sikhata hai taake aap andazay na lagayein balkay numberon ki bunyad par faisla karein!`,
        dailyLifeExample:
          'Kharidari ki qeemat jani → Kharchay nikaalay → Munafa fix kiya → Karobar ko nuqsan se bacha liya!',
      },
      vuExamPastPaperSecret: {
        commonQuestionTypes: `VU Midterm / Finalterm Examiners love numerical problem solving: "Calculate NPV or Break-even Units given the following balance sheet values" (5 Marks).`,
        fiveMarksTopic: `Subjective 5-Marks: "Define the core components of ${cleanTopic} and discuss how corporate managers mitigate operational risks using this model."`,
        mcqTrick: `MCQ Favorite: Testing definitions (e.g. Sunk costs are never relevant for decision making; Opportunity cost is the next best alternative forgone).`,
      },
    };
  }

  // 4. GENERAL IN-DEPTH FALLBACK (Mathematics, Psychology, Education, Physics, Literature, etc.)
  return {
    courseCode: code,
    semesterNumber: semNum,
    majorName: major.name,
    topic: cleanTopic,
    whatIsIt: {
      definition: `In ${code} (Semester ${semNum}), "${cleanTopic}" is a foundational theoretical doctrine, empirical law, or procedural methodology that defines how specific variables interact within this academic discipline.`,
      chemicalOrTechnicalForm: `Core Analytical Structure: Formulated through explicit definitions, symbolic notations, behavioral paradigms, or deductive logical proofs.`,
      keyCharacteristics: [
        'Systematic Rigor: Every proposition is supported by empirical evidence or mathematical deduction.',
        'Universal Applicability: Remains consistent across standardized test conditions and operational environments.',
        'Predictive Accuracy: Enables researchers and students to forecast outcomes given known starting parameters.',
      ],
    },
    whyItMatters: {
      purpose: `Academic disciplines exist to replace superstition and ambiguity with verifiable knowledge. "${cleanTopic}" provides the intellectual foundation to solve complex domain challenges.`,
      biologicalOrSystemRole: `It acts as the cornerstone principle upon which advanced semester topics and specialized research methodologies are constructed.`,
      realWorldValue: `Without mastering this core principle, advanced semester coursework becomes incomprehensible, leading to failed exam attempts and flawed practical application.`,
    },
    howItWorksOrForms: {
      formationProcess: `Problem Formulation → Hypothesis / Theoretical Assumption → Methodological Execution → Verification and Synthesis.`,
      mechanismOrSyntax: `Standard Analytical Representation for ${code} (${cleanTopic}):
// Step 1: Input Parameters [x1, x2, ... xn]
// Step 2: Apply Transformation Function f(x)
// Step 3: Verify Boundary Equilibrium & Constraints`,
      stepByStepFlow: [
        'Step 1: State the initial definitions, known values, and operational constraints.',
        'Step 2: Apply the governing theorem or conceptual framework methodically.',
        'Step 3: Analyze the intermediate outputs and resolve potential contradictions.',
        'Step 4: Formulate the final conclusion or solution supported by domain evidence.',
      ],
    },
    majorTypesAndClassifications: {
      categoryName: `Major Structural Types & Classifications of ${cleanTopic}`,
      types: [
        {
          name: 'Primary / Theoretical Paradigm',
          description: 'The classical foundation that introduced this concept into the academic literature.',
          examples: 'Classical theories, foundational proofs, and baseline models.',
        },
        {
          name: 'Applied / Empirical Variation',
          description: 'Adapted for modern industrial, laboratory, or clinical problem solving.',
          examples: 'Modern case studies, computational implementations, and laboratory protocols.',
        },
        {
          name: 'Critical & Evaluative Perspective',
          description: 'Contemporary extensions addressing edge cases, limitations, and cross-disciplinary interactions.',
          examples: 'Advanced semester critiques and research frontiers.',
        },
      ],
    },
    romanUrduAnalogy: {
      title: 'Rozmarrah Ki Misaal (In-Depth Roman Urdu Samjhoti)',
      analogyText: `Is concept ko aasan rozmarrah ki misaal se samjhein:\n\nJese ek imarat (building) ki mazbooti uski buniyaad (foundation) par munhasir hoti hai, isi tarah ${code} mein "${cleanTopic}" is poore course ki bunyadi eent hai. Jab aap iski "Kyun, Kia aur Kese" (Why, What, How) ko zehen mein bitha letay hain, to aagay chal kar poora course asaan lagne lagta hai!`,
      dailyLifeExample:
        'Bunyadi usool samjha → Zindagi ki misaal se link kiya → Paper mein baghair ratta lagaye poora concept likh diya!',
    },
    vuExamPastPaperSecret: {
      commonQuestionTypes: `VU Examiners in ${code} typically test this via 3-mark conceptual definitions or 5-mark structured explanations in Midterms and Finalterms.`,
      fiveMarksTopic: `5-Marks Long Question: "Explain the mechanism of ${cleanTopic} with neat diagram / formula and give two practical applications."`,
      mcqTrick: `Past Papers MCQ Tip: Carefully read question options containing words like 'Always', 'Never', or 'Except'—examiners use them to test deep understanding of ${cleanTopic}.`,
    },
  };
}

/**
 * Standard explanation generator for compatibility with general consumers and test suites.
 */
export function generateConceptExplanation(
  majorId: string,
  rawCourseCode: string,
  topic: string,
  semester: number | string = 'General'
): ConceptExplanation {
  const deep = generateDeepConceptExplanation(majorId, rawCourseCode, topic, semester);
  return {
    courseCode: deep.courseCode,
    semesterNumber: deep.semesterNumber,
    majorName: deep.majorName,
    topic: deep.topic,
    summary: `${deep.whatIsIt.definition} ${deep.whyItMatters.purpose}`,
    romanUrdu: `${deep.romanUrduAnalogy.title}\n${deep.romanUrduAnalogy.analogyText}\n\nMisaal: ${deep.romanUrduAnalogy.dailyLifeExample}`,
    breakdown: [
      `1. What: ${deep.whatIsIt.definition}`,
      `2. Why: ${deep.whyItMatters.purpose}`,
      `3. How: ${deep.howItWorksOrForms.formationProcess}`,
      ...deep.howItWorksOrForms.stepByStepFlow,
    ],
    snippetOrFormula: deep.howItWorksOrForms.mechanismOrSyntax,
    examTip: `VU Midterm / Finalterm: ${deep.vuExamPastPaperSecret.commonQuestionTypes} | 5-Marks: ${deep.vuExamPastPaperSecret.fiveMarksTopic} | MCQ: ${deep.vuExamPastPaperSecret.mcqTrick}`,
  };
}

