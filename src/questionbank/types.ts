
import type { Subject } from "../types";

export type QuestionDifficulty =
  | "foundation"
  | "developing"
  | "intermediate"
  | "advanced";

export type QuestionKind =
  | "choice"
  | "typed"
  | "letters";

export type QuestionBankItem = {
  id: string;

  // Curriculum placement
  grade: 3 | 4;
  subject: Subject;
  skill: string;
  learningObjective: string;

  // Difficulty and format
  difficulty: QuestionDifficulty;
  kind: QuestionKind;

  // Question content
  prompt: string;
  answer: string;
  choices?: string[];

  // Teaching support
  hint: string;
  explanation: string;
  workedExample?: string;
  misconceptionTags: string[];

  // Future adaptive-engine support
  prerequisiteSkills?: string[];
  estimatedSeconds?: number;
};
