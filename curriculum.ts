export type CurriculumUnit = {
  subject: "Math" | "Spelling";
  grade: 3 | 4;
  unit: string;
  skills: string[];
  masteryEvidence: string;
};

export const curriculum: CurriculumUnit[] = [
  { subject:"Math", grade:3, unit:"Place value and rounding", skills:["Read and write multi-digit numbers","Compare numbers","Round to nearest ten or hundred"], masteryEvidence:"Explains digit value and rounds independently." },
  { subject:"Math", grade:3, unit:"Addition and subtraction", skills:["Fluency within 1,000","Regrouping","Estimate and check"], masteryEvidence:"Solves multi-digit problems and checks reasonableness." },
  { subject:"Math", grade:3, unit:"Multiplication and division", skills:["Equal groups","Arrays and area models","Related facts","One-step word problems"], masteryEvidence:"Connects multiplication and division and explains a strategy." },
  { subject:"Math", grade:3, unit:"Fractions", skills:["Unit fractions","Number lines","Equivalent fractions","Compare simple fractions"], masteryEvidence:"Represents fractions visually and identifies simple equivalents." },
  { subject:"Math", grade:3, unit:"Measurement and geometry", skills:["Time and measurement","Area and perimeter","Shapes and attributes","Data displays"], masteryEvidence:"Chooses appropriate units and solves practical tasks." },
  { subject:"Math", grade:4, unit:"Multi-digit operations", skills:["Multi-digit multiplication","Division with remainders","Factors and multiples","Multi-step problems"], masteryEvidence:"Shows a reliable strategy and checks the result." },
  { subject:"Math", grade:4, unit:"Fractions and decimals", skills:["Equivalent fractions","Compare fractions","Like-denominator operations","Decimal place value"], masteryEvidence:"Uses models or explanations, not only memorized procedures." },
  { subject:"Math", grade:4, unit:"Geometry and measurement", skills:["Angles","Lines and symmetry","Area and perimeter","Measurement conversions"], masteryEvidence:"Applies concepts to unfamiliar problems." },
  { subject:"Spelling", grade:3, unit:"Phonics and vowel patterns", skills:["Vowel teams","Long and short vowels","Consonant blends and digraphs","Syllable patterns"], masteryEvidence:"Spells practiced patterns in both words and sentences." },
  { subject:"Spelling", grade:3, unit:"Word structure", skills:["Prefixes","Suffixes","Inflectional endings","Plural spelling changes"], masteryEvidence:"Applies a word rule to a new example." },
  { subject:"Spelling", grade:3, unit:"High-frequency words and meaning", skills:["Irregular common words","Homophones","Vocabulary in context"], masteryEvidence:"Selects and writes the correct word in context." },
  { subject:"Spelling", grade:4, unit:"Advanced patterns and morphology", skills:["Multisyllabic words","Greek and Latin roots","Advanced vowel patterns","Meaningful word parts"], masteryEvidence:"Uses syllables and word parts to attempt unfamiliar words." },
  { subject:"Spelling", grade:4, unit:"Conventions and transfer", skills:["Suffix spelling changes","Possessives and contractions","Editing","Dictation and sentence writing"], masteryEvidence:"Transfers spelling knowledge into independent writing." }
];

export const weekOne = [
  { day:"Monday", math:"Place value, rounding, and multi-digit addition", spelling:"Long vowels and vowel teams (ea, ai, oa)", game:"Number trail + word-pattern sorting" },
  { day:"Tuesday", math:"Multiplication facts and division as the inverse", spelling:"Prefixes un-, re-, and dis-", game:"Equal-groups puzzle + word builder" },
  { day:"Wednesday", math:"Fractions on number lines and simple equivalents", spelling:"Homophones and commonly confused words", game:"Fraction pizza + choose-the-right-word" },
  { day:"Thursday", math:"Two-step word problems and checking answers", spelling:"Plurals, suffixes, and spelling changes", game:"Mini mystery with math and word clues" },
  { day:"Friday", math:"Mixed review based on the week's evidence", spelling:"Dictation, sentence editing, and retrieval", game:"Mixed-skill boss battle" }
];
