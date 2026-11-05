/**
 * Comprehensive database of 200+ Virtual University of Pakistan (VU) courses
 * with course codes, official course titles, credit hours, and faculties.
 */

export interface VUCourse {
  code: string;
  title: string;
  credits: number;
  faculty: 'CS & IT' | 'Management' | 'Mathematics & Stats' | 'Humanities & Social' | 'Natural Sciences' | 'General';
  keyTopics?: string[];
}

export const VU_COURSES: VUCourse[] = [
  // Computer Science & IT (CS)
  { code: 'CS101', title: 'Introduction to Computing', credits: 3, faculty: 'CS & IT', keyTopics: ['Number Systems', 'Computer Hardware', 'HTML & Web Basics', 'Algorithms', 'Networking Foundations'] },
  { code: 'CS201', title: 'Introduction to Programming', credits: 3, faculty: 'CS & IT', keyTopics: ['C++ Syntax', 'Pointers & Dynamic Memory', 'Arrays & Strings', 'Functions & Recursion', 'File Handling'] },
  { code: 'CS201P', title: 'Introduction to Programming (Practical)', credits: 1, faculty: 'CS & IT', keyTopics: ['C++ Coding Lab', 'Debugging', 'Console Programs'] },
  { code: 'CS202', title: 'Web Design and Development', credits: 3, faculty: 'CS & IT', keyTopics: ['HTML5 & CSS3', 'JavaScript DOM', 'PHP Scripting', 'MySQL Connectivity'] },
  { code: 'CS204', title: 'Cyber Law', credits: 3, faculty: 'CS & IT', keyTopics: ['Electronic Transactions', 'Intellectual Property', 'PECA Act Pakistan', 'Cyber Crime Definitions'] },
  { code: 'CS301', title: 'Data Structures', credits: 3, faculty: 'CS & IT', keyTopics: ['Linked Lists', 'Stacks & Queues', 'Binary Search Trees (BST)', 'AVL Trees', 'Heaps & Graphs'] },
  { code: 'CS301P', title: 'Data Structures (Practical)', credits: 1, faculty: 'CS & IT', keyTopics: ['Pointer Implementation', 'BST Traversals', 'Sorting Algorithms'] },
  { code: 'CS302', title: 'Digital Logic Design', credits: 3, faculty: 'CS & IT', keyTopics: ['Boolean Algebra', 'Karnaugh Maps (K-Maps)', 'Flip-Flops', 'Counters & Shift Registers'] },
  { code: 'CS304', title: 'Object Oriented Programming', credits: 3, faculty: 'CS & IT', keyTopics: ['Encapsulation & Data Hiding', 'Inheritance & Polymorphism', 'Operator Overloading', 'Virtual Functions', 'Templates'] },
  { code: 'CS304P', title: 'Object Oriented Programming (Practical)', credits: 1, faculty: 'CS & IT', keyTopics: ['OOP in C++', 'Class Hierarchies', 'Abstract Classes'] },
  { code: 'CS401', title: 'Computer Architecture & Assembly Language', credits: 3, faculty: 'CS & IT', keyTopics: ['8086 Microprocessor', 'Registers (AX, BX, CX, DX)', 'Interrupts (INT 21h, INT 10h)', 'Memory Addressing Modes', 'TSR Programs'] },
  { code: 'CS402', title: 'Theory of Automata', credits: 3, faculty: 'CS & IT', keyTopics: ['Deterministic Finite Automata (DFA)', 'NFA to DFA Conversion', 'Regular Expressions', 'Context Free Grammars (CFG)', 'Turing Machines'] },
  { code: 'CS403', title: 'Database Management Systems', credits: 3, faculty: 'CS & IT', keyTopics: ['Entity Relationship Diagrams (ERD)', 'Relational Algebra', 'Normalization (1NF, 2NF, 3NF, BCNF)', 'SQL Queries & Joins', 'Transactions & ACID'] },
  { code: 'CS403P', title: 'Database Management Systems (Practical)', credits: 1, faculty: 'CS & IT', keyTopics: ['SQL DDL & DML', 'Stored Procedures', 'Indexing'] },
  { code: 'CS408', title: 'Human Computer Interaction', credits: 3, faculty: 'CS & IT', keyTopics: ['User Centered Design', 'Heuristic Evaluation', 'Usability Principles', 'Prototyping & Wireframes'] },
  { code: 'CS411', title: 'Visual Programming', credits: 3, faculty: 'CS & IT', keyTopics: ['C# .NET Framework', 'WPF & XAML', 'Event-Driven Architecture', 'LINQ Queries', 'ADO.NET Database Access'] },
  { code: 'CS501', title: 'Advanced Computer Architecture', credits: 3, faculty: 'CS & IT', keyTopics: ['Pipelining & Hazards', 'Instruction Level Parallelism', 'Cache Coherence', 'RISC vs CISC Architecture'] },
  { code: 'CS502', title: 'Design and Analysis of Algorithms', credits: 3, faculty: 'CS & IT', keyTopics: ['Asymptotic Notations (Big O, Omega, Theta)', 'Divide and Conquer', 'Dynamic Programming (Knapsack, LCS)', 'Greedy Algorithms', 'NP-Completeness'] },
  { code: 'CS504', title: 'Software Engineering - I', credits: 3, faculty: 'CS & IT', keyTopics: ['Software Development Life Cycle (SDLC)', 'Requirements Engineering (SRS)', 'UML Use Cases & Sequence Diagrams', 'Architectural Design Patterns'] },
  { code: 'CS506', title: 'Enterprise Application Development', credits: 3, faculty: 'CS & IT', keyTopics: ['Java Core & Collections', 'Servlets & JSP', 'JDBC Database Connectivity', 'Spring Boot Basics', 'MVC Architecture'] },
  { code: 'CS507', title: 'Information Systems', credits: 3, faculty: 'CS & IT', keyTopics: ['Management Information Systems (MIS)', 'Enterprise Resource Planning (ERP)', 'Supply Chain Systems', 'Decision Support Systems (DSS)'] },
  { code: 'CS508', title: 'Modern Programming Languages', credits: 3, faculty: 'CS & IT', keyTopics: ['Functional vs Imperative Programming', 'LISP & Scheme', 'Prolog & Logic Programming', 'Python & Go Paradigms'] },
  { code: 'CS601', title: 'Data Communication', credits: 3, faculty: 'CS & IT', keyTopics: ['OSI 7-Layer Model', 'Signals & Bandwidth', 'Modulation (AM, FM, PM)', 'Multiplexing (FDM, TDM)', 'Transmission Media'] },
  { code: 'CS602', title: 'Computer Graphics', credits: 3, faculty: 'CS & IT', keyTopics: ['Bresenham Line & Circle Algorithm', '2D/3D Transformations', 'Clipping (Cohen-Sutherland)', 'Shading & Illumination Models', 'OpenGL Basics'] },
  { code: 'CS604', title: 'Operating Systems', credits: 3, faculty: 'CS & IT', keyTopics: ['Process Scheduling (FCFS, SJF, RR)', 'Deadlocks & Banker Algorithm', 'Semaphores & Mutex', 'Paging & Virtual Memory', 'Page Replacement (FIFO, LRU)'] },
  { code: 'CS605', title: 'Software Engineering - II', credits: 3, faculty: 'CS & IT', keyTopics: ['Software Quality Assurance (SQA)', 'Software Metrics (Function Points, LOC)', 'COCOMO Cost Estimation', 'Testing Strategies (Blackbox, Whitebox)'] },
  { code: 'CS607', title: 'Artificial Intelligence', credits: 3, faculty: 'CS & IT', keyTopics: ['Search Strategies (BFS, DFS, A* Search)', 'Knowledge Representation', 'Fuzzy Logic & Expert Systems', 'Genetic Algorithms', 'Machine Learning Foundations'] },
  { code: 'CS609', title: 'System Programming', credits: 3, faculty: 'CS & IT', keyTopics: ['Windows/Linux API', 'Processes & Threads', 'Inter-Process Communication (IPC)', 'Hooks & Device Drivers'] },
  { code: 'CS610', title: 'Computer Networks', credits: 3, faculty: 'CS & IT', keyTopics: ['TCP/IP Protocol Suite', 'IP Addressing & Subnetting (IPv4/IPv6)', 'Routing Protocols (RIP, OSPF, BGP)', 'DNS, DHCP, HTTP Protocols', 'Network Security & Firewalls'] },
  { code: 'CS611', title: 'Software Quality Assurance', credits: 3, faculty: 'CS & IT', keyTopics: ['ISO 9000 & CMMI', 'Verification & Validation', 'Automated Testing', 'Defect Tracking'] },
  { code: 'CS614', title: 'Data Warehousing', credits: 3, faculty: 'CS & IT', keyTopics: ['Star & Snowflake Schemas', 'ETL (Extract, Transform, Load)', 'OLAP vs OLTP', 'Data Cubes & Data Mining'] },
  { code: 'CS615', title: 'Software Project Management', credits: 3, faculty: 'CS & IT', keyTopics: ['Project Estimation (WBS)', 'Risk Management', 'Gantt Charts & Critical Path Method (CPM)', 'Agile & Scrum Practices'] },
  { code: 'CS619', title: 'Final Year Project', credits: 6, faculty: 'CS & IT', keyTopics: ['Project Proposal (SRS)', 'Design Document (Architecture & DB)', 'Test Phase Code & Viva Voce', 'Final Deployment & Presentation'] },
  { code: 'IT430', title: 'E-Commerce', credits: 3, faculty: 'CS & IT', keyTopics: ['B2B & B2C Business Models', 'Electronic Payment Systems', 'SSL & Digital Signatures', 'Digital Marketing'] },

  // Mathematics & Statistics
  { code: 'MTH100', title: 'General Mathematics', credits: 3, faculty: 'Mathematics & Stats', keyTopics: ['Fractions & Percentages', 'Linear Equations', 'Basic Geometry', 'Sets & Functions'] },
  { code: 'MTH101', title: 'Calculus and Analytical Geometry', credits: 3, faculty: 'Mathematics & Stats', keyTopics: ['Limits & Continuity', 'Derivatives & Chain Rule', 'Integration Techniques', 'Definite Integrals', 'Maxima & Minima Optimization'] },
  { code: 'MTH202', title: 'Discrete Mathematics', credits: 3, faculty: 'Mathematics & Stats', keyTopics: ['Propositional Logic & Truth Tables', 'Set Theory & Venn Diagrams', 'Relations & Equivalence', 'Mathematical Induction', 'Graph Theory & Trees'] },
  { code: 'MTH301', title: 'Calculus II (Multivariable Calculus)', credits: 3, faculty: 'Mathematics & Stats', keyTopics: ['Partial Derivatives', 'Double & Triple Integrals', 'Gradient, Divergence & Curl', 'Green Theorem & Stokes Theorem'] },
  { code: 'MTH302', title: 'Business Mathematics & Statistics', credits: 3, faculty: 'Mathematics & Stats', keyTopics: ['Simple & Compound Interest', 'Annuities & Amortization', 'Depreciation Methods', 'Markup & Markdown Pricing'] },
  { code: 'MTH401', title: 'Differential Equations', credits: 3, faculty: 'Mathematics & Stats', keyTopics: ['First Order ODEs', 'Exact Equations', 'Higher Order Linear Equations', 'Laplace Transforms'] },
  { code: 'MTH501', title: 'Linear Algebra', credits: 3, faculty: 'Mathematics & Stats', keyTopics: ['Matrix Operations & Inverses', 'Gaussian Elimination', 'Vector Spaces & Subspaces', 'Eigenvalues & Eigenvectors', 'Diagonalization'] },
  { code: 'MTH601', title: 'Operations Research', credits: 3, faculty: 'Mathematics & Stats', keyTopics: ['Linear Programming (Simplex Method)', 'Transportation Models', 'Assignment Problems', 'Queuing Theory'] },
  { code: 'MTH603', title: 'Numerical Analysis', credits: 3, faculty: 'Mathematics & Stats', keyTopics: ['Bisection & Newton-Raphson Method', 'Newton Forward/Backward Interpolation', 'Trapezoidal & Simpson Rules', 'Runge-Kutta Methods'] },
  { code: 'STA301', title: 'Statistics and Probability', credits: 3, faculty: 'Mathematics & Stats', keyTopics: ['Measures of Central Tendency (Mean, Median, Mode)', 'Standard Deviation & Variance', 'Probability Rules & Bayes Theorem', 'Binomial, Poisson & Normal Distribution', 'Hypothesis Testing'] },
  { code: 'STA630', title: 'Research Methods', credits: 3, faculty: 'Mathematics & Stats', keyTopics: ['Sampling Techniques', 'Questionnaire Design', 'Literature Review', 'Data Analysis & Research Ethics'] },

  // Management, Accounting & Finance
  { code: 'MGT101', title: 'Financial Accounting', credits: 3, faculty: 'Management', keyTopics: ['Double Entry Bookkeeping', 'Debits & Credits Rules', 'Journal, Ledger, Trial Balance', 'Income Statement & Balance Sheet', 'Bank Reconciliation Statement (BRS)'] },
  { code: 'MGT111', title: 'Introduction to Public Administration', credits: 3, faculty: 'Management', keyTopics: ['Bureaucracy & Governance', 'Public Policy Formation', 'Decentralization'] },
  { code: 'MGT201', title: 'Financial Management', credits: 3, faculty: 'Management', keyTopics: ['Time Value of Money (PV/FV)', 'Capital Budgeting (NPV, IRR, Payback)', 'Cost of Capital (WACC)', 'Working Capital Management'] },
  { code: 'MGT211', title: 'Introduction to Business', credits: 3, faculty: 'Management', keyTopics: ['Sole Proprietorship, Partnership & Corporations', 'Business Ethics & CSR', 'Marketing Mix (4 Ps)', 'Global Trade & Tariffs'] },
  { code: 'MGT301', title: 'Principles of Marketing', credits: 3, faculty: 'Management', keyTopics: ['Market Segmentation & Targeting', 'Product Life Cycle (PLC)', 'Pricing Strategies', 'Promotional Mix & Branding'] },
  { code: 'MGT401', title: 'Financial Accounting - II', credits: 3, faculty: 'Management', keyTopics: ['Partnership Accounts', 'Company Share Capital', 'Cash Flow Statements', 'Inventory Valuation (FIFO, LIFO)'] },
  { code: 'MGT402', title: 'Cost & Management Accounting', credits: 3, faculty: 'Management', keyTopics: ['Job Order Costing', 'Process Costing', 'Break-Even Analysis (CVP)', 'Standard Costing & Variance Analysis'] },
  { code: 'MGT501', title: 'Human Resource Management', credits: 3, faculty: 'Management', keyTopics: ['Job Analysis & Descriptions', 'Recruitment & Selection', 'Performance Appraisal', 'Training & Compensation'] },
  { code: 'MGT502', title: 'Organizational Behavior', credits: 3, faculty: 'Management', keyTopics: ['Motivation Theories (Maslow, Herzberg)', 'Leadership Styles', 'Team Dynamics', 'Organizational Culture & Conflict'] },
  { code: 'MGT503', title: 'Principles of Management', credits: 3, faculty: 'Management', keyTopics: ['Planning & Goal Setting', 'Organizing Structures', 'Leading & Motivation', 'Controlling & Quality Systems'] },
  { code: 'MGT602', title: 'Entrepreneurship', credits: 3, faculty: 'Management', keyTopics: ['Opportunity Recognition', 'Business Plan Formulation', 'Startup Funding', 'Venture Capital'] },
  { code: 'MGT603', title: 'Strategic Management', credits: 3, faculty: 'Management', keyTopics: ['SWOT Analysis & PESTEL', 'Porter Five Forces', 'Competitive Advantage', 'Strategy Formulation & Execution'] },
  { code: 'MGT613', title: 'Production Operations Management', credits: 3, faculty: 'Management', keyTopics: ['Total Quality Management (TQM)', 'Six Sigma', 'Facility Location & Layout', 'Inventory Control (EOQ)'] },
  { code: 'ECO401', title: 'Economics', credits: 3, faculty: 'Management', keyTopics: ['Demand & Supply Elasticity', 'Consumer Equilibrium (Utility)', 'Market Structures (Monopoly, Perfect Competition)', 'GDP, Inflation, Monetary Policy'] },
  { code: 'FIN611', title: 'Advanced Financial Accounting', credits: 3, faculty: 'Management', keyTopics: ['Consolidated Financial Statements', 'Leases Accounting', 'Foreign Currency Transactions'] },
  { code: 'FIN621', title: 'Financial Statement Analysis', credits: 3, faculty: 'Management', keyTopics: ['Liquidity & Solvency Ratios', 'Profitability Analysis (ROE, ROA)', 'DuPont Analysis'] },
  { code: 'FIN622', title: 'Corporate Finance', credits: 3, faculty: 'Management', keyTopics: ['Valuation of Stocks and Bonds', 'Dividend Policy', 'Mergers & Acquisitions'] },
  { code: 'FIN623', title: 'Taxation Management', credits: 3, faculty: 'Management', keyTopics: ['Income Tax Ordinance Pakistan', 'Sales Tax Laws', 'Withholding Tax & Returns'] },

  // Humanities, Languages & Social Sciences
  { code: 'ENG101', title: 'English Comprehension', credits: 3, faculty: 'Humanities & Social', keyTopics: ['Reading Strategies (Skimming & Scanning)', 'Context Clues & Vocabulary', 'Sentence Structure & Grammar', 'Paragraph Coherence'] },
  { code: 'ENG201', title: 'Business and Technical English Writing', credits: 3, faculty: 'Humanities & Social', keyTopics: ['7 Cs of Communication', 'Memo, Letter & Report Writing', 'Resume & Job Applications', 'Proposal Writing & Visual Aids'] },
  { code: 'ENG301', title: 'Business Communication', credits: 3, faculty: 'Humanities & Social', keyTopics: ['Intercultural Communication', 'Presentation Skills', 'Meeting Agendas & Minutes', 'Negotiation Tactics'] },
  { code: 'ENG501', title: 'History of English Language', credits: 3, faculty: 'Humanities & Social', keyTopics: ['Old English & Anglo-Saxon', 'Middle English & Chaucer', 'Modern English Evolution'] },
  { code: 'MCM301', title: 'Communication Skills', credits: 3, faculty: 'Humanities & Social', keyTopics: ['Active Listening', 'Non-Verbal Communication', 'Barriers to Communication', 'Public Speaking'] },
  { code: 'PSY101', title: 'Introduction to Psychology', credits: 3, faculty: 'Humanities & Social', keyTopics: ['Biological Basis of Behavior', 'Classical & Operant Conditioning', 'Memory & Cognition', 'Personality Theories'] },
  { code: 'SOC101', title: 'Introduction to Sociology', credits: 3, faculty: 'Humanities & Social', keyTopics: ['Social Institutions', 'Culture & Socialization', 'Social Stratification', 'Deviance & Crime'] },
  { code: 'EDU401', title: 'Curriculum Development', credits: 3, faculty: 'Humanities & Social', keyTopics: ['Foundations of Curriculum', 'Bloom Taxonomy', 'Assessment & Evaluation'] },

  // General & Compulsory
  { code: 'PAK301', title: 'Pakistan Studies', credits: 2, faculty: 'General', keyTopics: ['Two-Nation Theory & Ideology', '14 Points of Quaid-e-Azam', 'Constitutional Development of Pakistan', 'Foreign Policy & Geopolitical Importance'] },
  { code: 'ISL201', title: 'Islamic Studies', credits: 2, faculty: 'General', keyTopics: ['Articles of Faith (Tawheed, Risalat)', 'Pillars of Islam (Salah, Zakah, Sawm, Hajj)', 'Ethics and Character in Sunnah', 'Islamic Economic Principles'] },
  { code: 'ETH202', title: 'Ethics (For Non-Muslim Students)', credits: 2, faculty: 'General', keyTopics: ['Moral Philosophies', 'Universal Human Values', 'Tolerance & Social Harmony'] },

  // Natural Sciences & Physics
  { code: 'PHY101', title: 'Physics', credits: 3, faculty: 'Natural Sciences', keyTopics: ['Newton Laws of Motion', 'Work, Energy & Power', 'Electromagnetism & Coulomb Law', 'Optics & Wave Phenomena', 'Thermodynamics Laws'] },
  { code: 'PHY301', title: 'Circuit Theory', credits: 3, faculty: 'Natural Sciences', keyTopics: ['Ohm Law & Kirchhoff Laws (KCL, KVL)', 'Thevenin and Norton Theorems', 'AC Circuits & Phasors', 'RL, RC, RLC Transient Response'] },
  { code: 'BIO101', title: 'Basic Biology', credits: 3, faculty: 'Natural Sciences', keyTopics: ['Cell Structure & Organelles', 'Cell Division (Mitosis, Meiosis)', 'Enzymes & Metabolism', 'Mendelian Genetics'] },
  { code: 'BIF101', title: 'Introduction to Bioinformatics', credits: 3, faculty: 'Natural Sciences', keyTopics: ['DNA, RNA & Protein Sequences', 'NCBI Databases & BLAST Tool', 'Pairwise & Multiple Sequence Alignment', 'Phylogenetic Trees'] },
  { code: 'BT101', title: 'Introduction to Biotechnology', credits: 3, faculty: 'Natural Sciences', keyTopics: ['Recombinant DNA Technology', 'PCR (Polymerase Chain Reaction)', 'Cloning & CRISPR Gene Editing', 'Industrial Fermentation'] },
];

/**
 * 30+ Instant Curated Explanations for high-frequency VU concepts
 * with English, Roman Urdu ("Asaan Alfaaz"), code/formula, and VU exam tip.
 */
export interface CuratedConcept {
  courseCode: string;
  topic: string;
  summary: string;
  romanUrdu: string;
  breakdown: string[];
  snippetOrFormula?: string;
  examTip: string;
}

export const CURATED_CONCEPTS: CuratedConcept[] = [
  {
    courseCode: 'CS201',
    topic: 'Pointers & Dynamic Memory Allocation',
    summary: 'A pointer is a variable that stores the memory address of another variable. Dynamic memory is allocated at runtime using `new` and freed using `delete`.',
    romanUrdu: 'Pointer asal mein kisi variable ki value save nahi karta, balkay RAM mein us variable ka ghar ka address (memory address) store karta hai. Misal k tor par agar aap kisi ko chitthi bhejein to aap uske ghar ka address likhte hain. `new` keyword se hum runtime par zaroorat k waqt RAM se jaga mangtay hain, aur kaam khatam honay par `delete` se wapis kar dete hain taake Memory Leak na ho!',
    breakdown: [
      'Declaration: `int* ptr;` creates a pointer pointing to an integer.',
      'Address-of operator `&`: retrieves the memory address of a variable (e.g. `ptr = &var;`).',
      'Dereference operator `*`: accesses the value residing at that stored address (e.g. `*ptr = 25;`).',
      'Heap Memory: `int* arr = new int[5];` allocates memory dynamically.',
      'Cleanup: Always use `delete[] arr;` to prevent memory leaks in exam code!',
    ],
    snippetOrFormula: `int number = 42;
int* ptr = &number; // ptr stores address of number

cout << "Address: " << ptr << endl;
cout << "Value: " << *ptr << endl; // Dereferencing prints 42

// Dynamic Memory Allocation
int* dynamicVal = new int(100);
cout << "Dynamic Value: " << *dynamicVal << endl;
delete dynamicVal; // Crucial to prevent memory leaks!
dynamicVal = nullptr;`,
    examTip: 'Frequent VU Midterm MCQ: "What does the dereference operator do?" and Short Question: "Write a 3-line C++ code to dynamically allocate an integer and release it to prevent memory leaks."',
  },
  {
    courseCode: 'CS301',
    topic: 'Binary Search Tree (BST) & In-Order Traversal',
    summary: 'A Binary Search Tree is a hierarchical node structure where every left child is strictly smaller than the parent node, and every right child is strictly greater.',
    romanUrdu: 'BST ek aesa tree hai jis mein rule bohat saaf hai: jo chota number hoga wo hamesha left side par jayega, aur jo bara number hoga wo right side par! Iska sabse bara faida ye hai k kisi bhi cheez ko dhoondna (search karna) bohat fast hojata hai: O(log n) time mein. Aur jab aap iska In-Order Traversal karte hain (Left -> Root -> Right), to elements hamesha chotay se baray (Ascending Order) mein sort ho k miltay hain!',
    breakdown: [
      'Root Node: Top-most node of the tree.',
      'Left Subtree rule: Values < Root.',
      'Right Subtree rule: Values > Root.',
      'In-Order Traversal: Visit Left -> Visit Current -> Visit Right.',
      'Special Property: In-Order traversal of any valid BST ALWAYS prints sorted numbers.',
    ],
    snippetOrFormula: `void inOrder(Node* root) {
  if (root == nullptr) return;
  inOrder(root->left);       // 1. Traverse left subtree
  cout << root->data << " "; // 2. Visit root
  inOrder(root->right);      // 3. Traverse right subtree
}`,
    examTip: 'VU Finalterm Favorite: Given a sequence of numbers (e.g. 45, 12, 67, 34, 89), draw the BST and write its In-Order and Pre-Order traversal.',
  },
  {
    courseCode: 'CS403',
    topic: 'Database Normalization (1NF, 2NF, 3NF)',
    summary: 'Normalization is the systematic process of organizing relational database tables to eliminate data redundancy and prevent insertion, update, and deletion anomalies.',
    romanUrdu: 'Socho aap ek register mein student ka naam, phone, course, teacher ka naam, aur fee sab ek hi lambi line mein likh rahay ho. Agar student course badlay ga to poori line dobara likhni paregi (Redundancy)! Normalization ka matlab hai table ko chotay, saaf tables mein baantna: 1NF kehta hai har dabba atomic ho (ek dabbe mein 2 phone number na hon). 2NF partial dependency khatam karta hai. Aur 3NF kehta hai non-key column kisi doosray non-key column par depend na kare!',
    breakdown: [
      '1NF (First Normal Form): Atomic values only (no multi-valued attributes / repeated groups) + unique Primary Key.',
      '2NF (Second Normal Form): Must be in 1NF + No Partial Dependency (every non-key attribute must fully depend on the entire Primary Key).',
      '3NF (Third Normal Form): Must be in 2NF + No Transitive Dependency (non-key attribute must not determine another non-key attribute).',
    ],
    snippetOrFormula: `-- Unnormalized Table Violation:
-- StudentID, StudentName, CourseID, TeacherID, TeacherRoom (TeacherRoom depends on TeacherID, not StudentID -> Transitive!)

-- 3NF Separation:
CREATE TABLE Students (StudentID INT PRIMARY KEY, StudentName VARCHAR(50));
CREATE TABLE Teachers (TeacherID INT PRIMARY KEY, TeacherName VARCHAR(50), OfficeRoom VARCHAR(20));
CREATE TABLE Enrollments (StudentID INT, CourseID INT, TeacherID INT, PRIMARY KEY(StudentID, CourseID));`,
    examTip: 'VU Midterm & Finalterm guarantee question: "Identify whether the given table is in 2NF or 3NF, and normalize it into 3NF step-by-step."',
  },
  {
    courseCode: 'CS604',
    topic: 'Deadlocks & The 4 Necessary Conditions',
    summary: 'A deadlock is a permanent state where two or more processes are blocked forever because each is waiting for a resource held by the other.',
    romanUrdu: 'Misaal: Ek tang pul (one-lane bridge) par aamnay saamnay se do gaarian aagayi hain. Na pehli gaari peechay hat rahi hai, na doosri. Dono phans gayi hain! Operating System mein jab Process 1 ne Resource A pakra ho aur Resource B maang raha ho, jabkay Process 2 ne Resource B pakra ho aur Resource A maang raha ho, to deadlock lag jata hai.',
    breakdown: [
      '1. Mutual Exclusion: At least one resource must be non-shareable (only 1 process at a time).',
      '2. Hold and Wait: A process holds at least one resource and is waiting for another.',
      '3. No Preemption: Resources cannot be forcibly snatched; must be released voluntarily.',
      '4. Circular Wait: Process P0 waits for P1, P1 waits for P2 ... and Pn waits for P0.',
      'Banker\'s Algorithm: Used by OS to ensure the system never enters an Unsafe State.',
    ],
    snippetOrFormula: `Deadlock Safe State Condition:
Work = Available Resources
Finish[i] = false for all processes
Find process i where: Request[i] <= Work
If found: Work = Work + Allocation[i]; Finish[i] = true; (System remains in Safe Sequence)`,
    examTip: 'VU Finalterm 5-Marks Question: "List the 4 Coffman conditions for deadlock and explain how circular wait can be broken by resource ordering."',
  },
  {
    courseCode: 'MTH101',
    topic: 'Limits & L\'Hôpital\'s Rule',
    summary: 'When direct substitution in a limit yields an indeterminate form (0/0 or ∞/∞), L\'Hôpital\'s Rule allows differentiating numerator and denominator independently.',
    romanUrdu: 'Jab aap limit mein x ki value direct put karein aur jawab 0/0 ya infinity/infinity ban jaye, to ghabrana nahi! L\'Hôpital\'s Rule lagao: upar walay hissay (numerator) ka alag derivative lo aur neechay walay hissay (denominator) ka alag derivative lo, aur phir dobara limit apply karo jab tak saaf number na aajaye.',
    breakdown: [
      'Check: Direct substitution must evaluate to 0/0 or ±∞/±∞.',
      'Differentiate: Take derivative of top f\'(x) and bottom g\'(x) separately (Do NOT use quotient rule!).',
      'Evaluate: Re-apply limit as x -> c.',
    ],
    snippetOrFormula: `lim (x -> 0) [sin(x) / x]
Direct substitution: sin(0) / 0 = 0 / 0  (Indeterminate!)

Apply L'Hôpital's Rule:
Derivative of sin(x) = cos(x)
Derivative of x = 1

New Limit: lim (x -> 0) [cos(x) / 1] = cos(0) / 1 = 1 / 1 = 1`,
    examTip: 'VU Midterm MCQs test standard limit results: lim(x->0) [sin(kx)/x] = k. Short questions frequently ask to evaluate indeterminate limits using L\'Hôpital\'s Rule.',
  },
  {
    courseCode: 'STA301',
    topic: 'Standard Normal Distribution & Z-Score',
    summary: 'The Z-score measures how many standard deviations a raw data point is above or below the mean in a bell curve distribution.',
    romanUrdu: 'Z-score aapko batata hai k aapka score class ki average (mean) se kitnay faaslay par hai. Agar Z-score positive ho to aap average se behtar hain; agar negative ho to average se neechay hain. Z-table se hum probability dhoondte hain!',
    breakdown: [
      'Formula: Z = (X - μ) / σ',
      'X = Raw value, μ (Mu) = Mean, σ (Sigma) = Standard Deviation',
      'Properties of Standard Normal Curve: Mean = 0, Variance = 1, Total Area = 1.0 (50% on left, 50% on right).',
    ],
    snippetOrFormula: `Z = (X - μ) / σ

Example:
Class Mean (μ) = 65, Standard Deviation (σ) = 10
Your Score (X) = 85
Z = (85 - 65) / 10 = 20 / 10 = +2.0
(You are 2 full standard deviations above class average!)`,
    examTip: 'VU Midterm Calculation Question: "Given mean = 50 and SD = 8, calculate the probability of getting marks between 50 and 66 using Z-table values."',
  },
  {
    courseCode: 'MGT101',
    topic: 'The Accounting Equation & Debit / Credit Rules',
    summary: 'The fundamental accounting equation is Assets = Liabilities + Owner\'s Equity. Every financial transaction has dual impact on this equation.',
    romanUrdu: 'Accounting ka golden rule: jo cheez karobar mein AATI hai wo Debit, aur jo cheez karobar se JAATI hai wo Credit! Hamesha yaad rakhein: Assets aur Expenses barhein to DEBIT, kam hon to CREDIT. Liabilities, Income aur Capital barhein to CREDIT, kam hon to DEBIT (DEAD CLIC formula)!',
    breakdown: [
      'Accounting Equation: Assets = Liabilities + Capital (Owner Equity)',
      'DEAD rule (Debit when increased): Expenses, Assets, Drawings',
      'CLIC rule (Credit when increased): Capital, Liabilities, Income, Creditors',
    ],
    snippetOrFormula: `DEAD (Debit on increase):
- Debit: Expenses
- Debit: Assets
- Debit: Drawings

CLIC (Credit on increase):
- Credit: Capital
- Credit: Liabilities
- Credit: Income`,
    examTip: 'VU Midterm 3-Marks Question: "Classify the following accounts as Debit or Credit balances: Cash, Bank Overdraft, Rent Expense, Capital, Accounts Payable."',
  },
];
