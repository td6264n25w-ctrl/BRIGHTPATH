
import type { QuestionBankItem } from "./types";

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
