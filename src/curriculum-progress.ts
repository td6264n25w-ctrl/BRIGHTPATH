
export type SkillStatus =
  | "not-assessed"
  | "learning"
  | "needs-practice"
  | "proficient"
  | "mastered";

export type SkillProgress = {
  skillId: string;
  status: SkillStatus;
  lessonsCompleted: number;
  assessmentAttempts: number;
  correctAnswers: number;
  totalAnswers: number;
  lastPracticedAt?: string;
};

export type LessonProgress = {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
};

export type CurriculumProgress = {
  version: 1;
  skills: Record<string, SkillProgress>;
  lessons: Record<string, LessonProgress>;
};

export function createInitialCurriculumProgress(): CurriculumProgress {
  return {
    version: 1,
    skills: {},
    lessons: {},
  };
}

export function recordLessonCompletion(
  progress: CurriculumProgress,
  lessonId: string,
  skillIds: string[],
): CurriculumProgress {
  const now = new Date().toISOString();

  const lessons = {
    ...progress.lessons,
    [lessonId]: {
      lessonId,
      completed: true,
      completedAt: now,
    },
  };

  const skills = { ...progress.skills };

  for (const skillId of skillIds) {
    const previous = skills[skillId];

    skills[skillId] = {
      skillId,
      status: previous?.status ?? "learning",
      lessonsCompleted: (previous?.lessonsCompleted ?? 0) + 1,
      assessmentAttempts: previous?.assessmentAttempts ?? 0,
      correctAnswers: previous?.correctAnswers ?? 0,
      totalAnswers: previous?.totalAnswers ?? 0,
      lastPracticedAt: now,
    };
  }

  return {
    version: 1,
    skills,
    lessons,
  };
}
