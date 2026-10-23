import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, BookOpen, Brain, Calculator, CheckCircle2, CircleHelp,
  GraduationCap, Lightbulb, RotateCcw, Sparkles, Target, Trophy, UserRound,
  ChartNoAxesColumnIncreasing, LockKeyhole
} from "lucide-react";
import { questions } from "./questions";
import { curriculum, weekOne } from "./curriculum";
import { loadProgress, saveProgress, type ProgressState } from "./storage";
import type { AnswerRecord, Level, Question, Subject } from "./types";

type Tab = "learn" | "parent" | "curriculum";


function chooseNext(
  subject: Subject,
  level: Level,
  records: AnswerRecord[],
  seen: Set<string>
): Question | null {
  const pool = questions.filter(
    q => q.subject === subject && q.level === level
  );
  const unseen = pool.filter(q => !seen.has(q.id));

  if (unseen.length === 0) return null;

  const skillStats = new Map<string, { correct: number; total: number }>();

  for (const r of records.filter(r => r.subject === subject)) {
    const prev = skillStats.get(r.skill) ?? { correct: 0, total: 0 };
    prev.total++;
    if (r.correct && !r.usedHint) prev.correct++;
    skillStats.set(r.skill, prev);
  }

  unseen.sort((a, b) => {
    const sa = skillStats.get(a.skill) ?? { correct: 0, total: 0 };
    const sb = skillStats.get(b.skill) ?? { correct: 0, total: 0 };
    const pa = sa.total === 0 ? -1 : sa.correct / sa.total;
    const pb = sb.total === 0 ? -1 : sb.correct / sb.total;

    return pa - pb || sa.total - sb.total;
  });

  return unseen[0];
}

  const skillStats = new Map<string, { correct: number; total: number }>();
  for (const r of records.filter(r => r.subject === subject)) {
    const prev = skillStats.get(r.skill) ?? { correct: 0, total: 0 };
    prev.total++;
    if (r.correct && !r.usedHint) prev.correct++;
    skillStats.set(r.skill, prev);
  }
  // Prefer skills with limited evidence or lower independent accuracy.
  candidates.sort((a, b) => {
    const sa = skillStats.get(a.skill) ?? { correct: 0, total: 0 };
    const sb = skillStats.get(b.skill) ?? { correct: 0, total: 0 };
    const pa = sa.total === 0 ? -1 : sa.correct / sa.total;
    const pb = sb.total === 0 ? -1 : sb.correct / sb.total;
    return pa - pb || sa.total - sb.total;
  });
  return candidates[0] ?? pool[0] ?? questions[0];
}

function App() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [tab, setTab] = useState<Tab>("learn");
  const [subject, setSubject] = useState<Subject>("Math");
  const [level, setLevel] = useState<Level>("Foundation");
  const [seen, setSeen] = useState<Set<string>>(
  () => new Set(loadProgress().records.map(r => r.questionId).filter((id): id is string => Boolean(id)))
);;
  const [question, setQuestion] = useState<Question | null>(() => questions[0] ?? null);
  const [choice, setChoice] = useState("");
  const [typed, setTyped] = useState("");
  const [usedHint, setUsedHint] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [sessionCount, setSessionCount] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => saveProgress(progress), [progress]);

  const records = progress.records;
  const totalCorrect = records.filter(r => r.correct).length;
  const accuracy = records.length ? Math.round(totalCorrect / records.length * 100) : 0;
  const subjectRecords = records.filter(r => r.subject === subject);
  const subjectAccuracy = subjectRecords.length
    ? Math.round(subjectRecords.filter(r => r.correct).length / subjectRecords.length * 100) : 0;

  const skillSummary = useMemo(() => {
    const map = new Map<string, { subject: Subject; correct: number; total: number; lastAt: string }>();
    for (const r of records) {
      const key = `${r.subject}::${r.skill}`;
      const s = map.get(key) ?? { subject: r.subject, correct: 0, total: 0, lastAt: r.answeredAt };
      s.total++;
      if (r.correct) s.correct++;
      s.lastAt = r.answeredAt;
      map.set(key, s);
    }
    return [...map.entries()].map(([key, value]) => ({ key, ...value }));
  }, [records]);

  function startSubject(nextSubject: Subject) {
    setSubject(nextSubject);
    const nextLevel = progress.preferredLevel[nextSubject];
    setLevel(nextLevel);
    setQuestion(chooseNext(nextSubject, nextLevel, records, seen));
    setChoice("");
    setTyped("");
    setFeedback(null);
    setUsedHint(false);
  }

  function changeLevel(nextLevel: Level) {
    setLevel(nextLevel);
    setProgress(p => ({ ...p, preferredLevel: { ...p.preferredLevel, [subject]: nextLevel } }));
    setQuestion(chooseNext(subject, nextLevel, records, seen));
    setChoice("");
    setTyped("");
    setFeedback(null);
    setUsedHint(false);
  }

  function submitAnswer() {
    if (!question || feedback) return;
    const response = question.mode === "typed" ? typed.trim().toLowerCase() : choice;
    if (!response) return;
    const correct = response.replace(/\s+/g, " ") === question.answer.toLowerCase().replace(/\s+/g, " ");
    const record: AnswerRecord = {
  id: `${question.id}-${Date.now()}`,
  questionId: question.id,
  subject: question.subject,
      grade: question.grade,
      correct,
      usedHint,
      answeredAt: new Date().toISOString()
    };
    setProgress(p => ({
      ...p,
      points: p.points + (correct && !usedHint ? 10 : correct ? 5 : 0),
      streak: correct ? p.streak + 1 : 0,
      records: [...p.records, record]
    }));
    setSessionCount(n => n + 1);
    if (correct) setSessionCorrect(n => n + 1);
    setSeen(prev => new Set(prev).add(question.id));
    setFeedback(correct ? "correct" : "incorrect");
  }

  function nextQuestion() {
    // A lightweight adaptive nudge: repeated success can unlock challenge; repeated difficulty keeps foundation.
    const recent = records.filter(r => r.subject === subject).slice(-5);
    const recentAccuracy = recent.length ? recent.filter(r => r.correct && !r.usedHint).length / recent.length : 0;
    let nextLevel: Level = level;
    if (recent.length >= 4 && recentAccuracy >= 0.8) nextLevel = "Challenge";
    if (recent.length >= 4 && recentAccuracy < 0.5) nextLevel = "Foundation";
    setLevel(nextLevel);
    setProgress(p => ({ ...p, preferredLevel: { ...p.preferredLevel, [subject]: nextLevel } }));
    setQuestion(chooseNext(subject, nextLevel, records, seen));
    setChoice("");
    setTyped("");
    setFeedback(null);
    setUsedHint(false);
  }

  function resetProgress() {
    const fresh = loadProgress();
    fresh.studentName = progress.studentName;
    setProgress({ ...fresh, points: 0, streak: 0, records: [] });
    setSeen(new Set());
    setSessionCount(0);
    setSessionCorrect(0);
    setQuestion(questions[0] ?? null);
    setSubject("Math");
    setLevel("Foundation");
    setChoice("");
    setTyped("");
    setFeedback(null);
    setShowResetConfirm(false);
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="brand-row">
          <div className="brand-mark"><GraduationCap size={26} /></div>
          <div><div className="brand-name">BrightPath</div><div className="brand-tag">LEARN · PRACTICE · GROW</div></div>
          <div className="points-pill"><Sparkles size={15} /> {progress.points} points</div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">YOUR LEARNING ADVENTURE</p>
          <h1>Hello, {progress.studentName || "Explorer"}!</h1>
          <p>Every question is a chance to grow. Let's explore.</p>
        </div>
        <div className="hero-stats">
          <div><span>Correct</span><strong>{totalCorrect}</strong></div>
          <div><span>Streak</span><strong>{progress.streak} 🔥</strong></div>
          <div><span>Answered</span><strong>{records.length}</strong></div>
        </div>
      </header>

      <nav className="tabs" aria-label="Main navigation">
        <button className={tab === "learn" ? "tab active" : "tab"} onClick={() => setTab("learn")}><Brain size={17} /> Learn</button>
        <button className={tab === "parent" ? "tab active" : "tab"} onClick={() => setTab("parent")}><ChartNoAxesColumnIncreasing size={17} /> Parent view</button>
        <button className={tab === "curriculum" ? "tab active" : "tab"} onClick={() => setTab("curriculum")}><BookOpen size={17} /> Curriculum</button>
      </nav>

      <main>
        {tab === "learn" && (
          <div className="content-grid">
            <section className="panel learning-panel">
              <div className="section-heading">
                <div><p className="eyebrow">PICK A PATH</p><h2>Choose your adventure</h2></div>
                <div className="mini-badge"><Target size={15} /> Adaptive practice</div>
              </div>
              <div className="subject-grid">
                <button className={`subject-card math-card ${subject === "Math" ? "selected" : ""}`} onClick={() => startSubject("Math")}>
                  <div className="subject-emoji">🔢</div><strong>Math Mountain</strong><span>Numbers, puzzles & problem solving</span>
                </button>
                <button className={`subject-card spelling-card ${subject === "Spelling" ? "selected" : ""}`} onClick={() => startSubject("Spelling")}>
                  <div className="subject-emoji">🔤</div><strong>Word Wizard</strong><span>Word patterns & spelling skills</span>
                </button>
              </div>
              <div className="level-row"><label htmlFor="level">Practice level</label><select id="level" value={level} onChange={e => changeLevel(e.target.value as Level)}><option value="Foundation">Grade 3 foundations</option><option value="Challenge">Stretch challenge</option></select></div>
             
{!question && (
  <div className="question-card">
    <div className="empty-state">
      <CheckCircle2 size={26} />
      <strong>You've completed this set!</strong>
      <p>
        You've answered every available question at this level.
        Choose another subject or practice level to keep learning.
      </p>
    </div>
  </div>
)}
 {question && (
            <div className="question-card">
                <div className="question-meta"><span className={`tag ${subject === "Math" ? "blue" : "gold"}`}>{subject === "Math" ? "🔢 Math" : "🔤 Spelling"}</span><span>Target grade {question.grade}</span></div>
                <div className="skill-label">{question.skill}</div>
                <h3>{question.prompt}</h3>
                {question.options ? (
                  <div className="answer-list">
                    {question.options.map((option, i) => {
                      const isAnswer = option.toLowerCase() === question.answer.toLowerCase();
                      const isChosen = choice === option;
                      const cls = feedback && isAnswer ? "answer-option right" : feedback && isChosen ? "answer-option wrong" : isChosen ? "answer-option chosen" : "answer-option";
                      return <button key={`${question.id}-${i}`} className={cls} disabled={!!feedback} onClick={() => setChoice(option)}>
                        <span className="option-letter">{String.fromCharCode(65 + i)}</span><span>{option}</span>
                        {feedback && isAnswer && <CheckCircle2 size={18} />}
                      </button>;
                    })}
                  </div>
                ) : (
                  <input className="typed-answer" value={typed} onChange={e => setTyped(e.target.value)} placeholder="Type your answer…" disabled={!!feedback} onKeyDown={e => { if (e.key === "Enter") submitAnswer(); }} />
                )}
                {feedback ? (
                  <div className={`feedback ${feedback}`}>
                    <strong>{feedback === "correct" ? "Great job!" : "Good try — let's learn it."}</strong>
                    <p>{question.explanation}</p>
                    {feedback === "incorrect" && <p><b>Correct answer:</b> {question.answer}</p>}
                    <button className="primary-btn" onClick={nextQuestion}>Next question <ArrowRight size={17} /></button>
                  </div>
                ) : (
                  <div className="question-actions">
                    <button className="secondary-btn" onClick={() => setUsedHint(true)}><Lightbulb size={17} /> {usedHint ? "Hint used" : "Give me a hint"}</button>
                    <button className="primary-btn" disabled={question.options ? !choice : !typed.trim()} onClick={submitAnswer}>Check answer <ArrowRight size={17} /></button>
                  </div>
                )}
                {usedHint && !feedback && <div className="hint-box"><Lightbulb size={17} /><span>{question.hint}</span></div>}
              </div>
              <p className="fine-print">Practice is saved in this browser on this device. This starter version does not yet sync progress between devices or provide parent authentication.</p>
            </section>
)}
            <aside className="side-column">
              <section className="panel journey-panel">
                <div className="side-icon purple"><Trophy size={22} /></div><p className="eyebrow">YOUR JOURNEY</p><h3>Little steps, big growth.</h3>
                <p>Earn points for independent correct answers. Hints are part of learning, too.</p>
                <div className="progress-line"><span style={{width: `${Math.min(100, progress.points % 110)}%`}} /></div>
                <div className="between"><span>Next star milestone</span><strong>{Math.ceil((progress.points + 1) / 100) * 100} pts</strong></div>
              </section>
              <section className="panel session-panel">
                <div className="side-icon blue"><Calculator size={22} /></div><p className="eyebrow">THIS VISIT</p><h3>Practice snapshot</h3>
                <div className="snapshot"><span>Questions tried</span><strong>{sessionCount}</strong></div>
                <div className="snapshot"><span>Correct this visit</span><strong>{sessionCorrect}</strong></div>
                <div className="snapshot"><span>{subject} accuracy</span><strong>{subjectAccuracy}%</strong></div>
              </section>
            </aside>
          </div>
        )}

        {tab === "parent" && (
          <div className="panel parent-panel">
            <div className="section-heading"><div><p className="eyebrow">FAMILY DASHBOARD</p><h2>Learning progress</h2></div><div className="mini-badge"><UserRound size={15} /> Parent view</div></div>
            <label className="field-label" htmlFor="student-name">Student display name</label>
            <input id="student-name" className="name-input" value={progress.studentName} onChange={e => setProgress(p => ({...p, studentName:e.target.value}))} maxLength={40} />
            <div className="metric-grid">
              <div className="metric"><span>Questions answered</span><strong>{records.length}</strong></div>
              <div className="metric"><span>Overall accuracy</span><strong>{accuracy}%</strong></div>
              <div className="metric"><span>Points earned</span><strong>{progress.points}</strong></div>
              <div className="metric"><span>Skills sampled</span><strong>{new Set(records.map(r => r.skill)).size}</strong></div>
            </div>
            <h3 className="subhead">Skill evidence</h3>
            {skillSummary.length === 0 ? <div className="empty-state"><CircleHelp size={26} /><strong>No practice data yet</strong><p>Complete a few questions to see skill-by-skill evidence here.</p></div> :
              <div className="skill-table">
                {skillSummary.map(s => {
                  const pct = Math.round(s.correct / s.total * 100);
                  const status = s.total < 3 ? "Gathering evidence" : pct >= 80 ? "Promising" : pct >= 60 ? "Developing" : "Needs review";
                  return <div className="skill-row" key={s.key}>
                    <div className="skill-row-top"><div><strong>{s.key.split("::")[1]}</strong><span>{s.subject}</span></div><span className="status">{status}</span></div>
                    <div className="progress-line"><span style={{width:`${pct}%`}} /></div>
                    <div className="between"><span>{s.correct}/{s.total} correct</span><span>{pct}%</span></div>
                  </div>;
                })}
              </div>
            }
            <div className="parent-note"><Lightbulb size={18} /><p><b>How to read this:</b> A few questions are a signal, not proof of mastery. Look for consistent independent success across several days before moving a skill to “secure.”</p></div>
            <div className="danger-zone">
              <div><strong>Reset local progress</strong><p>Clears saved answers and points from this browser.</p></div>
              {showResetConfirm ? <div className="button-row"><button className="secondary-btn" onClick={() => setShowResetConfirm(false)}>Cancel</button><button className="danger-btn" onClick={resetProgress}>Confirm reset</button></div> : <button className="secondary-btn" onClick={() => setShowResetConfirm(true)}><RotateCcw size={16} /> Reset</button>}
            </div>
          </div>
        )}

        {tab === "curriculum" && (
          <div className="panel curriculum-panel">
            <div className="section-heading"><div><p className="eyebrow">LEARNING MAP</p><h2>Curriculum index</h2></div><div className="mini-badge"><LockKeyhole size={15} /> Grade 3 start</div></div>
            <p className="intro-copy">A skill-based path from third-grade foundations into fourth-grade challenges. The app should advance by evidence of learning, not calendar dates alone.</p>
            <div className="week-plan">
              <h3>Week 1 · Daily plan</h3>
              {weekOne.map(day => <div className="day-card" key={day.day}><div className="day-pill">{day.day.slice(0,3)}</div><div><strong>{day.math}</strong><p>Spelling: {day.spelling}</p><span>{day.game}</span></div></div>)}
            </div>
            <div className="curriculum-groups">
              {curriculum.map((unit, i) => <details className="unit" key={`${unit.subject}-${unit.grade}-${unit.unit}`} open={i === 0}>
                <summary><span className={`unit-dot ${unit.subject === "Math" ? "blue-dot" : "gold-dot"}`}></span><span className="unit-title"><strong>{unit.unit}</strong><small>{unit.subject} · Grade {unit.grade}</small></span><span className="unit-chevron">+</span></summary>
                <ul>{unit.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
                <p className="evidence"><b>Mastery evidence:</b> {unit.masteryEvidence}</p>
              </details>)}
            </div>
          </div>
        )}
      </main>
      <footer><span>BrightPath Learning · Prototype 0.1</span><span>Made for curious minds ✨</span></footer>
    </div>
  );
}

export default App;
