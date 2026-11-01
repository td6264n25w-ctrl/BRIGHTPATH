
import type { QuestionBankItem } from "./types";
import type { Question, Level } from "../types";

import { mathGrade3 } from "./math/grade3";
import { mathGrade4 } from "./math/grade4";
import { spellingGrade3 } from "./spelling/grade3";
import { spellingGrade4 } from "./spelling/grade4";

export const questionBank: QuestionBankItem[] = [
  ...mathGrade3,
  ...mathGrade4,
  ...spellingGrade3,
  ...spellingGrade4
];

export function getQuestionsByGrade(grade: 3 | 4) {
  return questionBank.filter((question) => question.grade === grade);
}

export function getQuestionsBySubject(subject: "Math" | "Spelling") {
  return questionBank.filter((question) => question.subject === subject);
}

export function getQuestionsBySkill(skill: string) {
  return questionBank.filter(
    (question) => question.skill.toLowerCase() === skill.toLowerCase()
  );
}

// Convert the new database format into the format
// the existing BrightPath game already understands.
export const playableQuestions: Question[] = questionBank.map((item) => {
  const level: Level =
    item.difficulty === "foundation" || item.difficulty === "developing"
      ? "Foundation"
      : "Challenge";

  return {
    id: item.id,
    subject: item.subject,
    skill: item.skill,
    grade: item.grade,
    level,
    prompt: item.prompt,
    answer: item.answer,
    options: item.choices,
    hint: item.hint,
    explanation: item.explanation,
    mode: item.kind === "typed" ? "typed" : "choice"
  };
});
