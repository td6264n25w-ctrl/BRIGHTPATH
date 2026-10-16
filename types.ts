export type Subject = "Math" | "Spelling";
export type Level = "Foundation" | "Challenge";
export type AnswerRecord = {
  id: string;
  subject: Subject;
  skill: string;
  grade: number;
  correct: boolean;
  usedHint: boolean;
  answeredAt: string;
};
export type Question = {
  id: string;
  subject: Subject;
  skill: string;
  grade: number;
  level: Level;
  prompt: string;
  options?: string[];
  answer: string;
  hint: string;
  explanation: string;
  mode?: "choice" | "typed";
};
