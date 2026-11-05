/**
 * Data structures, sample handouts, and export helpers for Handouts Highlighter & Notes Maker
 */

export type HighlightColorType = 'definition' | 'formula' | 'pastpaper' | 'warning';

export interface HandoutHighlightItem {
  id: string;
  courseCode: string;
  lectureNumber: string;
  colorType: HighlightColorType;
  selectedText: string;
  personalNote?: string;
  createdAt: string;
}

export interface SampleHandout {
  courseCode: string;
  courseName: string;
  lectureNumber: string;
  topic: string;
  content: string;
}

export const SAMPLE_HANDOUTS: SampleHandout[] = [
  {
    courseCode: 'CS402',
    courseName: 'Theory of Automata',
    lectureNumber: 'Lecture 15',
    topic: 'Kleene Star Closure & Regular Expressions',
    content: `A language is called regular if it can be defined by a Regular Expression (RE). If L is a regular language, then its Kleene closure, denoted as L*, is also regular. The Kleene star operator generates an infinite set of strings formed by concatenating zero or more words of the language, meaning the null string Lambda (Λ) is always included in L*. 

In contrast, the positive closure L+ does not contain the null string Lambda unless Lambda was already present in language L. Mathematically, L+ = L . L*.

IMPORTANT EXAM RULE: In VU Midterm exams, remember that if a language contains words of length >= 1 only, L* will add length 0 string (Λ). When drawing the equivalent transition graph (TG) or deterministic finite automaton (DFA), the initial state must become an accepting state if Lambda is accepted, provided no other transitions loop back undesirably.

TRICKY PAST PAPER QUESTION: Check whether the closure of non-regular languages is closed under intersection. Note that non-regular languages are NOT closed under intersection or complementation, whereas regular languages are closed under union, concatenation, and Kleene star.`,
  },
  {
    courseCode: 'CS201',
    courseName: 'Introduction to Programming',
    lectureNumber: 'Lecture 19',
    topic: 'Dynamic Memory Allocation & Pointers',
    content: `In C++, dynamic memory is allocated from the free store (Heap) at run-time using the 'new' operator. When memory is dynamically allocated using 'new', it returns the starting address of the allocated block.

Syntax: 
int *ptr = new int[50]; // Allocates contiguous array of 50 integers

It is the programmer's sole responsibility to release this memory using the 'delete[]' operator. Failing to deallocate memory leads to a severe issue known as Memory Leakage. A dangling pointer arises when memory pointed to by a pointer has been freed or deallocated, but the pointer variable still contains that expired address.

Always set ptr = NULL after deleting to avoid dangling pointers. In VU assignments and practicals, using 'delete ptr' instead of 'delete[] ptr' for an array causes undefined runtime behavior.`,
  },
  {
    courseCode: 'MGT301',
    courseName: 'Principles of Marketing',
    lectureNumber: 'Lecture 8',
    topic: 'Market Segmentation Criteria & Positioning',
    content: `Market segmentation involves dividing a market into distinct groups of buyers with different needs, characteristics, or behaviors. To be effective, market segments must satisfy five essential criteria:

1. Measurable: The size, purchasing power, and profiles of the segments can be measured.
2. Accessible: The market segments can be effectively reached and served through distribution and promotional channels.
3. Substantial: The segments are large or profitable enough to serve. A segment should be the largest possible homogeneous group worth pursuing with a tailored marketing program.
4. Differentiable: The segments are conceptually distinguishable and respond differently to different marketing mix elements.
5. Actionable: Effective programs can be designed for attracting and serving the segments.

VU EXAM NOTE: In subjective exams, differentiate clearly between demographic segmentation (age, gender, income) and psychographic segmentation (social class, lifestyle, personality characteristics).`,
  },
  {
    courseCode: 'BIO504T',
    courseName: 'Biochemistry',
    lectureNumber: 'Lecture 6',
    topic: 'Carbohydrates & Glycosidic Bonds',
    content: `Carbohydrates are polyhydroxy aldehydes or ketones, or substances that yield these compounds on hydrolysis. They have the empirical formula (CH2O)n.

Monosaccharides are linked together by glycosidic bonds formed between the anomeric carbon of one sugar and a hydroxyl group of another sugar via a condensation dehydration reaction releasing H2O.

Starch is the primary storage polysaccharide in plants, consisting of unbranched amylose (alpha-1,4-glycosidic bonds) and branched amylopectin (alpha-1,6-glycosidic branch points occurring every 24 to 30 residues). Glycogen is the animal equivalent with much denser branching (every 8 to 12 glucose residues). Cellulose, by contrast, possesses beta-1,4-glycosidic bonds, rendering it indigestible by human digestive enzymes (lack of cellulase enzyme).`,
  },
];

export const HIGHLIGHT_STYLE_CONFIG: Record<
  HighlightColorType,
  {
    label: string;
    bgLight: string;
    textLight: string;
    borderLight: string;
    bgDark: string;
    textDark: string;
    badgeEmoji: string;
  }
> = {
  definition: {
    label: 'Key Concept / Definition',
    bgLight: 'bg-amber-100',
    textLight: 'text-amber-950',
    borderLight: 'border-amber-300',
    bgDark: 'dark:bg-amber-950/60',
    textDark: 'dark:text-amber-200',
    badgeEmoji: '🟡',
  },
  formula: {
    label: 'Formula / Syntax / Rule',
    bgLight: 'bg-emerald-100',
    textLight: 'text-emerald-950',
    borderLight: 'border-emerald-300',
    bgDark: 'dark:bg-emerald-950/60',
    textDark: 'dark:text-emerald-200',
    badgeEmoji: '🟢',
  },
  pastpaper: {
    label: 'VU Past Paper Question',
    bgLight: 'bg-purple-100',
    textLight: 'text-purple-950',
    borderLight: 'border-purple-300',
    bgDark: 'dark:bg-purple-950/60',
    textDark: 'dark:text-purple-200',
    badgeEmoji: '🟣',
  },
  warning: {
    label: 'Exam Warning / Tricky Exception',
    bgLight: 'bg-rose-100',
    textLight: 'text-rose-950',
    borderLight: 'border-rose-300',
    bgDark: 'dark:bg-rose-950/60',
    textDark: 'dark:text-rose-200',
    badgeEmoji: '🔴',
  },
};

export function exportHighlightsToMarkdown(highlights: HandoutHighlightItem[]): string {
  if (!highlights || highlights.length === 0) {
    return '# VU Handouts Revision Summary\n\nNo highlights recorded yet.';
  }

  const byCourse: Record<string, HandoutHighlightItem[]> = {};
  for (const item of highlights) {
    if (!byCourse[item.courseCode]) {
      byCourse[item.courseCode] = [];
    }
    byCourse[item.courseCode].push(item);
  }

  let md = `# 🎓 VU Companion - Exam Revision Handouts Notes\n`;
  md += `Generated on: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}\n\n`;

  for (const [course, items] of Object.entries(byCourse)) {
    md += `## 📚 ${course} Revision Highlights\n\n`;
    for (const item of items) {
      const cfg = HIGHLIGHT_STYLE_CONFIG[item.colorType];
      md += `### ${cfg.badgeEmoji} [${cfg.label}] - ${item.lectureNumber}\n`;
      md += `> "${item.selectedText}"\n\n`;
      if (item.personalNote) {
        md += `*Student Note:* **${item.personalNote}**\n\n`;
      }
      md += `---\n\n`;
    }
  }

  return md;
}
