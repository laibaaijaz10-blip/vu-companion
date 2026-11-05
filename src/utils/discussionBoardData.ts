/**
 * Data structures and helper logic for the VU Student Discussion & Doubt Board
 */

export interface DiscussionReply {
  id: string;
  author: string;
  authorRole: string; // e.g., 'Semester 6 Senior', 'Alum & TA', 'Semester 2 Classmate'
  date: string;
  content: string;
  upvotes: number;
  isVerifiedSolution: boolean;
}

export interface DiscussionPost {
  id: string;
  courseCode: string;
  courseName: string;
  semester: number; // 1 to 8
  category: 'CS/IT' | 'Management' | 'Psychology' | 'Math/Stats' | 'English' | 'Education' | 'General';
  title: string;
  description: string;
  codeSnippet?: string;
  author: string;
  authorRole: string;
  createdAt: string;
  upvotes: number;
  replies: DiscussionReply[];
  tags: string[];
}

export const INITIAL_DISCUSSIONS: DiscussionPost[] = [
  {
    id: 'disc-1',
    courseCode: 'CS402',
    courseName: 'Theory of Automata',
    semester: 4,
    category: 'CS/IT',
    title: 'How to convert (a+b)*ab into a Minimal DFA without getting confused in state transition table?',
    description: 'In Lecture 14 handouts, the subset construction method creates 4 states. But in past midterm papers, the question asks for minimum states directly. Do we need to draw NFA with null transitions first or can we directly construct 3 states? Please clarify for 5 marks question.',
    author: 'Hamza Tariq',
    authorRole: 'Semester 4 Student (Lahore)',
    createdAt: 'Yesterday, 4:15 PM',
    upvotes: 18,
    tags: ['Automata', 'DFA', 'Midterm', 'Past Papers'],
    replies: [
      {
        id: 'rep-1',
        author: 'Engr. Bilal Qureshi',
        authorRole: 'BSCS Senior (8th Semester)',
        date: 'Yesterday, 5:30 PM',
        content: 'Direct minimal DFA for (a+b)*ab requires exactly 3 states:\nState q0 (start): loops on \'b\', goes to q1 on \'a\'.\nState q1: loops on \'a\', goes to q2 (final) on \'b\'.\nState q2 (final): goes to q1 on \'a\', goes back to q0 on \'b\'.\nIn VU exams, if it is 3 marks you can draw directly. If 5 marks, write transition table as well! Full marks milenge InshaAllah.',
        upvotes: 24,
        isVerifiedSolution: true,
      },
      {
        id: 'rep-2',
        author: 'Zainab Fatima',
        authorRole: 'Semester 4 Classmate',
        date: 'Yesterday, 7:10 PM',
        content: 'JazakAllah Bilal bhai! I was losing 2 marks on the loop back from q2 to q0 on input b.',
        upvotes: 5,
        isVerifiedSolution: false,
      },
    ],
  },
  {
    id: 'disc-2',
    courseCode: 'CS201',
    courseName: 'Introduction to Programming',
    semester: 2,
    category: 'CS/IT',
    title: 'Assignment 2 Pointer Segmentation Fault in Dev-C++ 5.11',
    description: 'When running the dynamic array resize function, program crashes with exit code 3221225477 (Access Violation). Handout lecture 19 page 142 shows new int[size], but deleting old pointer deletes the entire copied array. What is the right sequence?',
    codeSnippet: 'int* temp = new int[newSize];\nfor(int i=0; i<size; i++) temp[i] = arr[i];\ndelete[] arr;\narr = temp; // is this safe?',
    author: 'Ayesha Noor',
    authorRole: 'Semester 2 Student (Rawalpindi)',
    createdAt: '2 days ago',
    upvotes: 27,
    tags: ['CS201', 'Pointers', 'Dev-C++', 'Assignment 2'],
    replies: [
      {
        id: 'rep-3',
        author: 'Usman Ali',
        authorRole: 'VU Alumni & Software Engineer',
        date: '2 days ago',
        content: 'Your code snippet is conceptually correct, but make sure:\n1. arr is not initialized to NULL or garbage pointer initially.\n2. In Dev-C++, check compiler settings: Tools -> Compiler Options -> Settings -> Code Generation -> Language standard: ISO C++11.\n3. Make sure newSize is strictly greater than size. Also update your tracking variable `size = newSize;` right after assigning `arr = temp;`!',
        upvotes: 19,
        isVerifiedSolution: true,
      },
    ],
  },
  {
    id: 'disc-3',
    courseCode: 'MTH101',
    courseName: 'Calculus and Analytical Geometry',
    semester: 1,
    category: 'Math/Stats',
    title: 'L\'Hôpital\'s Rule vs Direct Factoring: Which one does VU examiner prefer for 0/0 limits?',
    description: 'In past papers, limit as x->2 of (x^2 - 4)/(x - 2) is asked. In lecture 18, sir solved by factoring (x-2)(x+2). But L\'Hôpital gives 2x / 1 = 4 in 1 line. Will examiner deduct marks if we use L\'Hopital before lecture 25?',
    author: 'Saad Ahmed',
    authorRole: 'Semester 1 Student (Karachi)',
    createdAt: '3 days ago',
    upvotes: 14,
    tags: ['Calculus', 'Limits', 'Midterm', 'Lecture 18'],
    replies: [
      {
        id: 'rep-4',
        author: 'Maryam Khalid',
        authorRole: 'Semester 3 Student',
        date: '3 days ago',
        content: 'Important rule for VU: In Midterm (Lectures 1-22), L\'Hopital is NOT yet introduced in the syllabus. VU checkers look for factorization steps like handouts. If you use L\'Hopital in Midterm, they sometimes give 0 or 1 mark because syllabus covered algebraic techniques. Use factoring for Midterm, and L\'Hopital only if question specifically says "Using L\'Hopital Rule".',
        upvotes: 31,
        isVerifiedSolution: true,
      },
    ],
  },
  {
    id: 'disc-4',
    courseCode: 'MGT201',
    courseName: 'Financial Management',
    semester: 3,
    category: 'Management',
    title: 'NPV vs IRR conflict when projects are mutually exclusive (Exam tip needed)',
    description: 'When project A has higher NPV but project B has higher IRR, which project should the financial manager select according to VU handouts? This came in last year final term subjective.',
    author: 'Muhammad Fahad',
    authorRole: 'Semester 3 Student (Multan)',
    createdAt: '4 days ago',
    upvotes: 12,
    tags: ['Finance', 'Capital Budgeting', 'Finalterm', 'NPV'],
    replies: [
      {
        id: 'rep-5',
        author: 'Danish Khan',
        authorRole: 'BBA 7th Semester Senior',
        date: '4 days ago',
        content: 'Always choose NPV! Handouts clearly state: "Whenever there is a conflict between NPV and IRR for mutually exclusive projects, Net Present Value (NPV) is the superior decision criterion because it measures total wealth maximization in absolute currency, whereas IRR assumes reinvestment at the internal rate which is often unrealistic."',
        upvotes: 16,
        isVerifiedSolution: true,
      },
    ],
  },
];

export function filterDiscussions(
  discussions: DiscussionPost[],
  filters: {
    category?: string;
    semester?: number | 'all';
    courseCode?: string;
    searchTerm?: string;
    statusTab?: 'all' | 'unanswered' | 'answered' | 'top';
  }
): DiscussionPost[] {
  return discussions.filter((post) => {
    // Category filter
    if (filters.category && filters.category !== 'all' && post.category !== filters.category) {
      return false;
    }

    // Semester filter
    if (filters.semester && filters.semester !== 'all' && post.semester !== filters.semester) {
      return false;
    }

    // Course code filter
    if (filters.courseCode && filters.courseCode.trim() !== '') {
      const qCourse = filters.courseCode.toLowerCase().trim();
      if (!post.courseCode.toLowerCase().includes(qCourse)) {
        return false;
      }
    }

    // Status tab filter
    if (filters.statusTab === 'unanswered' && post.replies.length > 0) {
      return false;
    }
    if (filters.statusTab === 'answered' && post.replies.length === 0) {
      return false;
    }

    // Search term
    if (filters.searchTerm && filters.searchTerm.trim() !== '') {
      const term = filters.searchTerm.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(term);
      const matchDesc = post.description.toLowerCase().includes(term);
      const matchCourse = post.courseCode.toLowerCase().includes(term);
      const matchTags = post.tags.some((t) => t.toLowerCase().includes(term));
      if (!matchTitle && !matchDesc && !matchCourse && !matchTags) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (filters.statusTab === 'top') {
      return b.upvotes - a.upvotes;
    }
    return 0; // maintain natural order / latest
  });
}
