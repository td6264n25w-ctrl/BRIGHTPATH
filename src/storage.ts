import type { AnswerRecord, Level, Subject } from "./types";

const STORAGE_KEY = "brightpath-progress-v1";

export type ProgressState = {
  studentName: string;
  points: number;
  streak: number;
  records: AnswerRecord[];
  preferredLevel: Record<Subject, Level>;
};

const initial: ProgressState = {
  studentName: "Explorer",
  points: 0,
  streak: 0,
  records: [],
  preferredLevel: { Math: "Foundation", Spelling: "Foundation" }
};

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    return { ...initial, ...JSON.parse(raw) } as ProgressState;
  } catch {
    return initial;
  }
}

export function saveProgress(progress: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // App remains usable if browser storage is disabled or full.
  }
}
