
export type SubjectId = "math" | "language-arts";

export type GradeBand =  {
  min: number;
  max: number;
};

export type SkillStatus =
  | "not-assessed"
  | "learning"
  | "needs-practice"
  | "proficient"
  | "mastered";

export type SkillDefinition = {
  id: string;
  title: string;
  description: string;
  prerequisites: string[];
};

export type UnitDefinition = {
  id: string;
  subjectId: SubjectId;
  title: string;
  description: string;
  gradeBand: GradeBand;
  skills: SkillDefinition[];
};

export type SubjectDefinition = {
  id: SubjectId;
  title: string;
  description: string;
  units: UnitDefinition[];
};

export const curriculumMap: SubjectDefinition[] = [
  {
    id: "math",
    title: "Mathematics",
    description:
      "Build number sense, calculation, reasoning, and problem-solving.",
    units: [
      {
        id: "math-place-value",
        subjectId: "math",
        title: "Place Value and Number Sense",
        description:
          "Understand digit values, compare numbers, and work with place-value patterns.",
        gradeBand: { min: 2, max: 5 },
        skills: [
          {
            id: "math-place-value-read",
            title: "Read and represent numbers",
            description:
              "Represent whole numbers using digits, words, and expanded form.",
            prerequisites: [],
          },
          {
            id: "math-place-value-compare",
            title: "Compare and order numbers",
            description:
              "Compare whole numbers using place value and explain the reasoning.",
            prerequisites: ["math-place-value-read"],
          },
          {
            id: "math-rounding",
            title: "Round whole numbers",
            description:
              "Round numbers to a specified place using place-value understanding.",
            prerequisites: ["math-place-value-compare"],
          },
        ],
      },
      {
        id: "math-operations",
        subjectId: "math",
        title: "Addition and Subtraction",
        description:
          "Use accurate strategies for multi-digit calculations and real-world problems.",
        gradeBand: { min: 2, max: 5 },
        skills: [
          {
            id: "math-add-multidigit",
            title: "Multi-digit addition",
            description:
              "Add multi-digit whole numbers and explain regrouping.",
            prerequisites: ["math-place-value-read"],
          },
          {
            id: "math-subtract-multidigit",
            title: "Multi-digit subtraction",
            description:
              "Subtract multi-digit whole numbers and explain regrouping.",
            prerequisites: ["math-place-value-read"],
          },
        ],
      },
      {
        id: "math-multiplication-division",
        subjectId: "math",
        title: "Multiplication and Division",
        description:
          "Connect multiplication, division, visual models, and word problems.",
        gradeBand: { min: 3, max: 5 },
        skills: [
          {
            id: "math-multiplication-facts",
            title: "Multiplication facts and strategies",
            description:
              "Use known facts, patterns, and strategies to multiply.",
            prerequisites: ["math-place-value-read"],
          },
          {
            id: "math-multidigit-multiplication",
            title: "Multi-digit multiplication",
            description:
              "Multiply larger numbers using visual models and written methods.",
            prerequisites: ["math-multiplication-facts"],
          },
          {
            id: "math-division-remainders",
            title: "Division and remainders",
            description:
              "Interpret quotients and remainders in mathematical situations.",
            prerequisites: ["math-multiplication-facts"],
          },
        ],
      },
      {
        id: "math-fractions",
        subjectId: "math",
        title: "Fractions",
        description:
          "Understand fraction meaning, equivalence, comparison, and operations.",
        gradeBand: { min: 3, max: 5 },
        skills: [
          {
            id: "math-fraction-meaning",
            title: "Understand fractions",
            description:
              "Interpret fractions as equal parts and as numbers.",
            prerequisites: ["math-place-value-read"],
          },
          {
            id: "math-equivalent-fractions",
            title: "Equivalent fractions",
            description:
              "Recognize and generate fractions representing the same amount.",
            prerequisites: ["math-fraction-meaning"],
          },
          {
            id: "math-compare-fractions",
            title: "Compare fractions",
            description:
              "Compare fractions using models, benchmarks, and reasoning.",
            prerequisites: ["math-equivalent-fractions"],
          },
        ],
      },
      {
        id: "math-measurement-geometry",
        subjectId: "math",
        title: "Measurement and Geometry",
        description:
          "Solve problems involving units, shapes, perimeter, area, and angles.",
        gradeBand: { min: 3, max: 5 },
        skills: [
          {
            id: "math-measurement-units",
            title: "Measurement and units",
            description:
              "Choose and convert appropriate units in supported situations.",
            prerequisites: ["math-place-value-read"],
          },
          {
            id: "math-perimeter-area",
            title: "Perimeter and area",
            description:
              "Distinguish perimeter from area and solve practical problems.",
            prerequisites: ["math-multidigit-multiplication"],
          },
          {
            id: "math-shapes-angles",
            title: "Shapes and angles",
            description:
              "Classify shapes and reason about their properties and angles.",
            prerequisites: [],
          },
        ],
      },
      {
        id: "math-problem-solving",
        subjectId: "math",
        title: "Word Problems and Reasoning",
        description:
          "Choose operations, explain solutions, and solve multi-step problems.",
        gradeBand: { min: 3, max: 5 },
        skills: [
          {
            id: "math-word-problems",
            title: "Choose the right strategy",
            description:
              "Identify useful information and select a suitable operation.",
            prerequisites: [
              "math-add-multidigit",
              "math-subtract-multidigit",
            ],
          },
          {
            id: "math-multistep-problems",
            title: "Multi-step problem solving",
            description:
              "Plan, solve, and check problems requiring multiple steps.",
            prerequisites: ["math-word-problems"],
          },
        ],
      },
    ],
  },
  {
    id: "language-arts",
    title: "Language Arts",
    description:
      "Develop spelling, vocabulary, grammar, reading, and writing skills.",
    units: [
      {
        id: "la-spelling-patterns",
        subjectId: "language-arts",
        title: "Spelling Patterns",
        description:
          "Recognize sound-letter patterns, spelling rules, and word structures.",
        gradeBand: { min: 2, max: 5 },
        skills: [
          {
            id: "la-short-long-vowels",
            title: "Vowel patterns",
            description:
              "Recognize common short- and long-vowel spelling patterns.",
            prerequisites: [],
          },
          {
            id: "la-syllables",
            title: "Syllables and word patterns",
            description:
              "Break words into syllables and use patterns to spell them.",
            prerequisites: ["la-short-long-vowels"],
          },
          {
            id: "la-complex-spelling",
            title: "Advanced spelling patterns",
            description:
              "Apply less predictable spelling patterns and common exceptions.",
            prerequisites: ["la-syllables"],
          },
        ],
      },
      {
        id: "la-word-building",
        subjectId: "language-arts",
        title: "Prefixes, Suffixes, and Word Roots",
        description:
          "Use meaningful word parts to understand and spell longer words.",
        gradeBand: { min: 3, max: 6 },
        skills: [
          {
            id: "la-prefixes",
            title: "Prefixes",
            description:
              "Explain how common prefixes change a word's meaning.",
            prerequisites: [],
          },
          {
            id: "la-suffixes",
            title: "Suffixes",
            description:
              "Recognize suffixes and apply common spelling changes.",
            prerequisites: ["la-prefixes"],
          },
          {
            id: "la-word-roots",
            title: "Roots and word families",
            description:
              "Use roots and related words to infer meaning and spelling.",
            prerequisites: ["la-prefixes"],
          },
        ],
      },
      {
        id: "la-vocabulary",
        subjectId: "language-arts",
        title: "Vocabulary and Word Meaning",
        description:
          "Build vocabulary through context, word relationships, and precise language.",
        gradeBand: { min: 2, max: 6 },
        skills: [
          {
            id: "la-context-clues",
            title: "Context clues",
            description:
              "Use surrounding text to infer an unfamiliar word's meaning.",
            prerequisites: [],
          },
          {
            id: "la-synonyms-antonyms",
            title: "Synonyms and antonyms",
            description:
              "Recognize similar and opposite meanings between words.",
            prerequisites: [],
          },
        ],
      },
      {
        id: "la-grammar",
        subjectId: "language-arts",
        title: "Grammar and Sentences",
        description:
          "Build clear sentences and use grammar and punctuation accurately.",
        gradeBand: { min: 2, max: 6 },
        skills: [
          {
            id: "la-parts-of-speech",
            title: "Parts of speech",
            description:
              "Identify nouns, verbs, adjectives, adverbs, and their roles.",
            prerequisites: [],
          },
          {
            id: "la-sentence-structure",
            title: "Sentence structure",
            description:
              "Recognize complete sentences and improve sentence construction.",
            prerequisites: ["la-parts-of-speech"],
          },
          {
            id: "la-punctuation",
            title: "Capitalization and punctuation",
            description:
              "Apply capitalization and punctuation conventions.",
            prerequisites: ["la-sentence-structure"],
          },
        ],
      },
      {
        id: "la-reading",
        subjectId: "language-arts",
        title: "Reading Comprehension",
        description:
          "Understand texts, draw conclusions, and support ideas with evidence.",
        gradeBand: { min: 2, max: 6 },
        skills: [
          {
            id: "la-main-idea",
            title: "Main idea and details",
            description:
              "Identify the central idea and distinguish supporting details.",
            prerequisites: [],
          },
          {
            id: "la-inference",
            title: "Inference and evidence",
            description:
              "Draw reasonable conclusions using clues from a text.",
            prerequisites: ["la-main-idea"],
          },
          {
            id: "la-text-analysis",
            title: "Compare texts and perspectives",
            description:
              "Compare information, viewpoints, and evidence across texts.",
            prerequisites: ["la-inference"],
          },
        ],
      },
      {
        id: "la-writing",
        subjectId: "language-arts",
        title: "Writing and Composition",
        description:
          "Plan, draft, organize, and revise writing for different purposes.",
        gradeBand: { min: 2, max: 6 },
        skills: [
          {
            id: "la-paragraphs",
            title: "Paragraph building",
            description:
              "Write focused paragraphs with supporting details.",
            prerequisites: ["la-sentence-structure"],
          },
          {
            id: "la-revision",
            title: "Revision and editing",
            description:
              "Improve clarity, organization, spelling, and grammar.",
            prerequisites: ["la-paragraphs", "la-punctuation"],
          },
        ],
      },
    ],
  },
];
