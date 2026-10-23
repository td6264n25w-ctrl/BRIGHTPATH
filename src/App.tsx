
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { loadProgress, saveProgress } from "./storage";
import type { ProgressState } from "./storage";
import type { AnswerRecord, Subject } from "./types";

type Mode = "math" | "spelling" | "mixed";

type Challenge = {
  id: string;
  subject: Subject;
  skill: string;
  prompt: string;
  answer: string;
  choices?: string[];
  hint: string;
  explanation: string;
  kind: "choice" | "typed" | "letters";
};

const challenges: Challenge[] = [
  {
    id: "bot-math-01",
    subject: "Math",
    skill: "Addition",
    prompt: "Your robot needs 24 energy cells. You have 16. How many more do you need?",
    answer: "8",
    choices: ["6", "8", "10", "12"],
    hint: "Count up from 16 to 24.",
    explanation: "24 − 16 = 8 more energy cells.",
    kind: "choice",
  },
  {
    id: "bot-math-02",
    subject: "Math",
    skill: "Multiplication",
    prompt: "Three robot arms each have 4 fingers. How many fingers altogether?",
    answer: "12",
    hint: "Add 4 three times.",
    explanation: "4 + 4 + 4 = 12.",
    kind: "typed",
  },
  {
    id: "bot-spell-01",
    subject: "Spelling",
    skill: "Word spelling",
    prompt: "Build the word that means a bright flash in the sky during a storm.",
    answer: "lightning",
    choices: ["lightning", "lighting", "lightining"],
    hint: "It starts with LIGHT. Listen for the syllables.",
    explanation: "Lightning is the bright flash during a storm.",
    kind: "letters",
  },
  {
    id: "bot-math-03",
    subject: "Math",
    skill: "Subtraction",
    prompt: "The workshop has 42 bolts. The robot uses 17. How many are left?",
    answer: "25",
    choices: ["25", "27", "35", "29"],
    hint: "Subtract 10 first, then subtract 7.",
    explanation: "42 − 17 = 25 bolts.",
    kind: "choice",
  },
  {
    id: "bot-spell-02",
    subject: "Spelling",
    skill: "Word spelling",
    prompt: "Build the word for a machine that can do tasks automatically.",
    answer: "robot",
    hint: "The word has five letters and starts with R.",
    explanation: "R-O-B-O-T spells robot.",
    kind: "letters",
  },
  {
    id: "bot-math-04",
    subject: "Math",
    skill: "Number patterns",
    prompt: "The robot counts by 5: 15, 20, 25, ___. What comes next?",
    answer: "30",
    choices: ["28", "30", "35", "40"],
    hint: "Each number increases by the same amount.",
    explanation: "The pattern increases by 5, so the next number is 30.",
    kind: "choice",
  },
  {
    id: "bot-spell-03",
    subject: "Spelling",
    skill: "Word spelling",
    prompt: "Build the word for a person who invents or creates something new.",
    answer: "inventor",
    hint: "It begins with IN and ends with OR.",
    explanation: "I-N-V-E-N-T-O-R spells inventor.",
    kind: "letters",
  },
  {
    id: "bot-math-05",
    subject: "Math",
    skill: "Multiplication",
    prompt: "A robot packs 6 boxes with 3 gears in each box. How many gears?",
    answer: "18",
    hint: "Think of six groups of three.",
    explanation: "6 × 3 = 18 gears.",
    kind: "typed",
  },
  {
    id: "bot-spell-04",
    subject: "Spelling",
    skill: "Word spelling",
    prompt: "Build the word for a machine's moving parts that fit together.",
    answer: "gears",
    hint: "It starts with G and has five letters.",
    explanation: "G-E-A-R-S spells gears.",
    kind: "letters",
  },
  {
    id: "bot-math-06",
    subject: "Math",
    skill: "Division",
    prompt: "Share 20 screws equally between 4 robots. How many does each get?",
    answer: "5",
    choices: ["4", "5", "6", "8"],
    hint: "Find the number that makes 4 equal groups of the same size.",
    explanation: "20 ÷ 4 = 5 screws per robot.",
    kind: "choice",
  },
];

const initialProgress = (): ProgressState => loadProgress();

const palette = {
  ink: "#172033",
  muted: "#667085",
  purple: "#6546D7",
  blue: "#3478F6",
  mint: "#D9FBE9",
  background: "#F4F6FB",
  border: "#E4E8F0",
  white: "#FFFFFF",
};

const page: CSSProperties = {
  minHeight: "100vh",
  background: palette.background,
  color: palette.ink,
  fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
};

const buttonBase: CSSProperties = {
  border: 0,
  borderRadius: 14,
  padding: "13px 16px",
  fontSize: 15,
  fontWeight: 750,
  cursor: "pointer",
  minHeight: 46,
};

function Robot({ parts }: { parts: number }) {
  const colors = ["#A8B9FF", "#FFD36A", "#6DE1B5", "#FF9DCB", "#A78BFA"];
  const eyes = parts >= 2;
  const antenna = parts >= 1;
  const arms = parts >= 3;
  const badge = parts >= 4;

  return (
    <div
      aria-label={`Your robot has ${parts} unlocked parts`}
      style={{
        width: "100%",
        maxWidth: 260,
        margin: "0 auto",
        padding: 14,
        textAlign: "center",
      }}
    >
      <svg viewBox="0 0 240 250" role="img" style={{ width: "100%", maxHeight: 260 }}>
        <ellipse cx="120" cy="224" rx="68" ry="12" fill="#D8DEEB" />
        {antenna && (
          <>
            <path d="M120 42 L120 22" stroke="#6546D7" strokeWidth="7" strokeLinecap="round" />
            <circle cx="120" cy="16" r="10" fill={colors[1]} />
          </>
        )}
        {arms && (
          <>
            <path d="M67 135 L34 156 L29 181" stroke="#7B8DD9" strokeWidth="16" strokeLinecap="round" fill="none" />
            <circle cx="28" cy="187" r="12" fill={colors[2]} />
            <path d="M173 135 L206 156 L211 181" stroke="#7B8DD9" strokeWidth="16" strokeLinecap="round" fill="none" />
            <circle cx="212" cy="187" r="12" fill={colors[2]} />
          </>
        )}
        <rect x="76" y="166" width="24" height="42" rx="9" fill="#7B8DD9" />
        <rect x="140" y="166" width="24" height="42" rx="9" fill="#7B8DD9" />
        <rect x="60" y="75" width="120" height="100" rx="25" fill={colors[0]} stroke="#7184CE" strokeWidth="4" />
        <rect x="75" y="91" width="90" height="52" rx="17" fill="#F9FBFF" />
        {eyes ? (
          <>
            <circle cx="98" cy="115" r="9" fill="#253A72" />
            <circle cx="142" cy="115" r="9" fill="#253A72" />
            <circle cx="101" cy="112" r="3" fill="white" />
            <circle cx="145" cy="112" r="3" fill="white" />
          </>
        ) : (
          <>
            <circle cx="102" cy="116" r="6" fill="#253A72" />
            <circle cx="138" cy="116" r="6" fill="#253A72" />
          </>
        )}
        <path d="M101 130 Q120 144 139 130" stroke="#6546D7" strokeWidth="4" strokeLinecap="round" fill="none" />
        <rect x="88" y="151" width="64" height="13" rx="6" fill="#7B8DD9" />
        <circle cx="120" cy="157" r="5" fill={colors[1]} />
        {badge && (
          <>
            <path d="M178 76 L187 91 L204 95 L192 108 L194 125 L178 117 L163 125 L165 108 L153 95 L170 91 Z" fill={colors[1]} stroke="#E4A72B" strokeWidth="2" />
            <text x="178" y="105" textAnchor="middle" fontSize="15" fontWeight="900" fill="#674B00">★</text>
          </>
        )}
      </svg>
      <div style={{ color: palette.muted, fontSize: 13, fontWeight: 700 }}>
        {parts === 0 ? "Your new robot is waiting!" : `${parts} robot upgrades unlocked`}
      </div>
    </div>
  );
}

export default function App() {
  const [progress, setProgress] = useState<ProgressState>(initialProgress);
  const [tab, setTab] = useState<"build" | "parent" | "curriculum">("build");
  const [mode, setMode] = useState<Mode>("mixed");
  const [roundIds, setRoundIds] = useState<string[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [roundCorrect, setRoundCorrect] = useState(0);
  const [roundDone, setRoundDone] = useState(false);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const eligible = useMemo(
    () => challenges.filter((q) => mode === "mixed" || q.subject === (mode === "math" ? "Math" : "Spelling")),
    [mode],
  );

  const currentId = roundIds[roundIndex];
  const question = eligible.find((q) => q.id === currentId) ?? eligible[roundIndex % eligible.length];
  const unlockedParts = Math.min(5, Math.floor(progress.points / 30));
  const completedCount = progress.records.length;
  const correctCount = progress.records.filter((r) => r.correct).length;
  const accuracy = completedCount ? Math.round((correctCount / completedCount) * 100) : 0;
  const earnedBadges = [
    completedCount >= 1 ? "First Spark" : "",
    correctCount >= 5 ? "Brain Builder" : "",
    progress.points >= 100 ? "Workshop Star" : "",
    unlockedParts >= 5 ? "Robot Master" : "",
  ].filter(Boolean);

  function startRound(nextMode: Mode = mode) {
    const pool = challenges.filter((q) => nextMode === "mixed" || q.subject === (nextMode === "math" ? "Math" : "Spelling"));
    const previous = new Set(roundIds);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const fresh = shuffled.filter((q) => !previous.has(q.id));
    const chosen = [...fresh, ...shuffled.filter((q) => previous.has(q.id))].slice(0, Math.min(5, pool.length));
    setMode(nextMode);
    setRoundIds(chosen.map((q) => q.id));
    setRoundIndex(0);
    setAnswer("");
    setSelectedLetters([]);
    setFeedback(null);
    setShowHint(false);
    setRoundCorrect(0);
    setRoundDone(false);
    setTab("build");
  }

  function recordAnswer(correct: boolean) {
    if (!question || feedback !== null || roundDone) return;

    const record: AnswerRecord = {
      id: `${question.id}-${Date.now()}`,
      questionId: question.id,
      subject: question.subject,
      skill: question.skill,
      grade: 3,
      correct,
      usedHint: showHint,
      answeredAt: new Date().toISOString(),
    };

    setProgress((old) => ({
      ...old,
      points: old.points + (correct ? 10 : 0),
      streak: correct ? old.streak + 1 : 0,
      records: [...old.records, record],
    }));
    setFeedback(correct ? "correct" : "wrong");
    if (correct) setRoundCorrect((n) => n + 1);
  }

  function submitAnswer(value = answer) {
    if (!question) return;
    recordAnswer(value.trim().toLowerCase() === question.answer.toLowerCase());
  }

  function nextChallenge() {
    if (roundIndex + 1 >= roundIds.length) {
      setRoundDone(true);
      return;
    }
    setRoundIndex((n) => n + 1);
    setAnswer("");
    setSelectedLetters([]);
    setFeedback(null);
    setShowHint(false);
  }

  function chooseMode(next: Mode) {
    startRound(next);
  }

  const shuffledTiles = useMemo(() => {
    if (!question || question.kind !== "letters") return [];
    return question.answer.split("").sort(() => Math.random() - 0.5);
  }, [question?.id, question?.answer]);

  const displayedTiles = shuffledTiles.length
    ? shuffledTiles
    : question?.answer.split("") ?? [];

  function addTile(letter: string, index: number) {
    if (feedback !== null || roundDone) return;
    setSelectedLetters((old) => [...old, `${letter}:${index}`]);
  }

  function removeTile(token: string) {
    if (feedback !== null || roundDone) return;
    setSelectedLetters((old) => {
      const copy = [...old];
      const index = copy.indexOf(token);
      if (index >= 0) copy.splice(index, 1);
      return copy;
    });
  }

  function resetProgress() {
    const fresh = loadProgress();
    setProgress({
      ...fresh,
      points: 0,
      streak: 0,
      records: [],
    });
    setRoundIds([]);
    setRoundIndex(0);
    setRoundDone(false);
    setFeedback(null);
    setAnswer("");
    setSelectedLetters([]);
  }

  const shell: CSSProperties = { maxWidth: 760, margin: "0 auto", padding: "18px 16px 40px" };
  const card: CSSProperties = { background: palette.white, border: `1px solid ${palette.border}`, borderRadius: 22, padding: 18, boxShadow: "0 6px 24px rgba(32,45,80,.05)" };
  const muted: CSSProperties = { color: palette.muted, fontSize: 13 };
  const primary: CSSProperties = { ...buttonBase, background: palette.purple, color: "white" };
  const secondary: CSSProperties = { ...buttonBase, background: "#EEF0FF", color: "#4931B1" };

  return (
    <div style={page}>
      <main style={shell}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 900, color: palette.purple }}>BRIGHTPATH ARCADE</div>
            <h1 style={{ fontSize: 28, margin: "5px 0 0", letterSpacing: -1 }}>Bot Builder</h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 900 }}>⭐ {progress.points}</div>
            <div style={muted}>workshop points</div>
          </div>
        </header>

        <nav style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {([
            ["build", "🛠️ Build"],
            ["parent", "📊 Parent"],
            ["curriculum", "📚 Skills"],
          ] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ ...buttonBase, flex: 1, padding: "11px 6px", fontSize: 13, background: tab === key ? palette.ink : palette.white, color: tab === key ? "white" : palette.ink, border: `1px solid ${palette.border}` }}>
              {label}
            </button>
          ))}
        </nav>

        {tab === "build" && (
          <>
            <section style={{ ...card, overflow: "hidden", background: "linear-gradient(135deg,#FFFFFF 0%,#F0EDFF 100%)", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ background: "#DDF9E9", color: "#087548", padding: "6px 10px", borderRadius: 30, fontSize: 12, fontWeight: 800 }}>YOUR WORKSHOP</span>
                <span style={muted}>Solve challenges. Build your bot.</span>
              </div>
              <Robot parts={unlockedParts} />
              <div style={{ display: "flex", gap: 7, margin: "6px 0 0", justifyContent: "center" }}>
                {["Antenna", "Eyes", "Arms", "Star badge", "Power core"].map((part, index) => (
                  <div key={part} title={part} style={{ width: 28, height: 8, borderRadius: 8, background: unlockedParts > index ? "#27B77A" : "#D9DEEA" }} />
                ))}
              </div>
              <p style={{ textAlign: "center", ...muted, margin: "10px 0 0" }}>Earn 30 points to unlock each robot upgrade.</p>
            </section>

            <section style={card}>
              {!roundIds.length || !question ? (
                <>
                  <h2 style={{ margin: "0 0 8px", fontSize: 21 }}>Choose your mission</h2>
                  <p style={{ ...muted, marginTop: 0 }}>Pick a challenge type. Every correct answer earns 10 points.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 8 }}>
                    {([
                      ["mixed", "🎮", "Mixed"],
                      ["math", "🔢", "Math"],
                      ["spelling", "🔤", "Spelling"],
                    ] as const).map(([key, icon, label]) => (
                      <button key={key} onClick={() => chooseMode(key)} style={{ ...buttonBase, minHeight: 92, padding: 10, background: key === "mixed" ? "#F0EDFF" : "#F6F8FC", color: palette.ink, border: `1px solid ${palette.border}` }}>
                        <div style={{ fontSize: 25 }}>{icon}</div>
                        <div style={{ marginTop: 5 }}>{label}</div>
                      </button>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, padding: 14, borderRadius: 16, background: "#F6F8FC" }}>
                    <strong>🏅 Your badges</strong>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                      {earnedBadges.length ? earnedBadges.map((b) => <span key={b} style={{ background: "#FFF2C6", borderRadius: 30, padding: "7px 10px", fontSize: 12, fontWeight: 800 }}>🏅 {b}</span>) : <span style={muted}>Complete your first challenge to earn a badge.</span>}
                    </div>
                  </div>
                </>
              ) : roundDone ? (
                <div style={{ textAlign: "center", padding: "10px 0" }}>
                  <div style={{ fontSize: 52 }}>🎉</div>
                  <h2 style={{ fontSize: 26, margin: "8px 0" }}>Mission complete!</h2>
                  <p style={muted}>You solved {roundCorrect} of {roundIds.length} challenges in this round.</p>
                  <Robot parts={unlockedParts} />
                  <button style={{ ...primary, width: "100%" }} onClick={() => startRound(mode)}>Play another round</button>
                  <button style={{ ...secondary, width: "100%", marginTop: 9 }} onClick={() => { setRoundIds([]); setRoundDone(false); }}>Back to workshop</button>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <span style={{ background: question.subject === "Math" ? "#E3EEFF" : "#FCE7F3", color: question.subject === "Math" ? "#2459B8" : "#A52261", padding: "6px 10px", borderRadius: 30, fontSize: 12, fontWeight: 800 }}>{question.subject === "Math" ? "🔢 MATH MODULE" : "🔤 WORD MODULE"}</span>
                    <span style={muted}>Challenge {roundIndex + 1} of {roundIds.length}</span>
                  </div>
                  <div style={{ height: 6, background: "#E9ECF4", borderRadius: 10, margin: "15px 0 20px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${((roundIndex + 1) / roundIds.length) * 100}%`, background: palette.purple, transition: "width .2s" }} />
                  </div>
                  <h2 style={{ fontSize: 21, lineHeight: 1.35, margin: "0 0 18px" }}>{question.prompt}</h2>

                  {question.kind === "choice" && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 10 }}>
                      {question.choices?.map((choice) => (
                        <button key={choice} disabled={feedback !== null} onClick={() => { setAnswer(choice); submitAnswer(choice); }} style={{ ...buttonBase, background: feedback !== null && choice === question.answer ? "#DDF9E9" : "#F7F8FC", color: palette.ink, border: `1px solid ${palette.border}`, opacity: feedback !== null && choice !== question.answer ? 0.65 : 1 }}>
                          {choice}
                        </button>
                      ))}
                    </div>
                  )}

                  {question.kind === "typed" && (
                    <form onSubmit={(event) => { event.preventDefault(); submitAnswer(); }} style={{ display: "flex", gap: 8 }}>
                      <input value={answer} onChange={(event) => setAnswer(event.target.value)} disabled={feedback !== null} inputMode="numeric" aria-label="Your answer" placeholder="Type your answer" style={{ flex: 1, minWidth: 0, border: `2px solid ${palette.border}`, borderRadius: 14, padding: 13, fontSize: 18 }} />
                      <button type="submit" disabled={!answer.trim() || feedback !== null} style={primary}>Check</button>
                    </form>
                  )}

                  {question.kind === "letters" && (
                    <>
                      <div style={{ minHeight: 54, borderRadius: 14, border: `2px dashed ${palette.border}`, background: "#FAFBFF", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 8, flexWrap: "wrap", marginBottom: 12 }}>
                        {selectedLetters.length ? selectedLetters.map((token) => (
                          <button key={token} disabled={feedback !== null} onClick={() => removeTile(token)} style={{ ...buttonBase, minHeight: 40, padding: "8px 11px", background: "#E8E3FF", color: "#4931B1" }}>{token.split(":")[0]}</button>
                        )) : <span style={muted}>Tap letters to build the word</span>}
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
                        {displayedTiles.map((letter, index) => {
                          const token = `${letter}:${index}`;
                          const used = selectedLetters.includes(token);
                          return <button key={token} disabled={used || feedback !== null} onClick={() => addTile(letter, index)} style={{ ...buttonBase, width: 43, padding: 8, background: used ? "#E7EAF1" : "#FFFFFF", color: palette.ink, border: `1px solid ${palette.border}`, opacity: used ? 0.35 : 1 }}>{letter.toUpperCase()}</button>;
                        })}
                      </div>
                      <button disabled={!selectedLetters.length || feedback !== null} onClick={() => submitAnswer(selectedLetters.map((token) => token.split(":")[0]).join(""))} style={{ ...primary, width: "100%", marginTop: 14 }}>Check word</button>
                    </>
                  )}

                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    <button disabled={showHint || feedback !== null} onClick={() => setShowHint(true)} style={{ ...secondary, flex: 1, opacity: showHint || feedback !== null ? 0.55 : 1 }}>💡 Hint</button>
                    <button onClick={() => { setRoundIds([]); setFeedback(null); setRoundDone(false); }} style={{ ...buttonBase, background: "#F1F3F8", color: palette.ink }}>Exit</button>
                  </div>

                  {showHint && feedback === null && (
                    <div style={{ marginTop: 12, padding: 13, borderRadius: 14, background: "#FFF5D7", color: "#72500A" }}>💡 {question.hint}</div>
                  )}

                  {feedback && (
                    <div style={{ marginTop: 16, borderRadius: 16, padding: 15, background: feedback === "correct" ? "#DDF9E9" : "#FFF0E7", color: feedback === "correct" ? "#075B3B" : "#8B3A14" }}>
                      <div style={{ fontWeight: 900, fontSize: 18 }}>{feedback === "correct" ? "⚡ Great work! +10 points" : "🧰 Let's learn from that!"}</div>
                      <p style={{ margin: "7px 0", lineHeight: 1.5 }}>{question.explanation}</p>
                      {feedback === "wrong" && <p style={{ margin: "7px 0", fontWeight: 700 }}>The answer is: {question.answer}</p>}
                      <button onClick={nextChallenge} style={{ ...buttonBase, width: "100%", marginTop: 8, background: feedback === "correct" ? "#087548" : "#8B3A14", color: "white" }}>
                        {roundIndex + 1 >= roundIds.length ? "Finish mission →" : "Next challenge →"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}

        {tab === "parent" && (
          <section style={card}>
            <h2 style={{ marginTop: 0 }}>Parent progress</h2>
            <p style={muted}>Learning records saved on this device.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 10 }}>
              {[
                ["⭐ Points", progress.points],
                ["🧩 Attempts", completedCount],
                ["🎯 Accuracy", `${accuracy}%`],
                ["🔥 Current streak", progress.streak],
              ].map(([label, value]) => (
                <div key={label} style={{ background: "#F6F8FC", borderRadius: 16, padding: 15 }}>
                  <div style={muted}>{label}</div>
                  <div style={{ fontSize: 25, fontWeight: 900, marginTop: 5 }}>{value}</div>
                </div>
              ))}
            </div>
            <h3 style={{ marginTop: 22 }}>Recent activity</h3>
            {progress.records.length === 0 ? <p style={muted}>No challenges completed yet. Play a round to see progress here.</p> : (
              <div style={{ display: "grid", gap: 8 }}>
                {[...progress.records].reverse().slice(0, 8).map((record) => (
                  <div key={record.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, borderBottom: `1px solid ${palette.border}`, padding: "10px 0" }}>
                    <div>
                      <strong>{record.skill}</strong>
                      <div style={muted}>{record.subject} · Grade {record.grade}{record.usedHint ? " · Used hint" : ""}</div>
                    </div>
                    <div style={{ fontWeight: 900, color: record.correct ? "#087548" : "#B54708" }}>{record.correct ? "✓ Correct" : "Review"}</div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ background: "#F6F8FC", borderRadius: 14, padding: 13, marginTop: 18, ...muted }}>
              This version stores progress in this browser's local storage. It does not sync progress between different devices.
            </div>
          </section>
        )}

        {tab === "curriculum" && (
          <section style={card}>
            <h2 style={{ marginTop: 0 }}>Workshop skills</h2>
            <p style={muted}>A growing collection of Grade 3 practice challenges.</p>
            {[
              ["Addition and subtraction", "Use number facts and solve everyday problems.", "Math"],
              ["Multiplication and division", "Explore equal groups and sharing.", "Math"],
              ["Number patterns", "Spot rules and predict what comes next.", "Math"],
              ["Word spelling", "Build and check words one letter at a time.", "Spelling"],
            ].map(([title, description, subject]) => (
              <div key={title} style={{ display: "flex", alignItems: "start", gap: 12, padding: "14px 0", borderBottom: `1px solid ${palette.border}` }}>
                <div style={{ width: 42, height: 42, borderRadius: 13, display: "grid", placeItems: "center", background: subject === "Math" ? "#E3EEFF" : "#FCE7F3", fontSize: 20 }}>{subject === "Math" ? "🔢" : "🔤"}</div>
                <div style={{ flex: 1 }}>
                  <strong>{title}</strong>
                  <p style={{ ...muted, margin: "5px 0 0", lineHeight: 1.5 }}>{description}</p>
                </div>
              </div>
            ))}
            <button style={{ ...primary, width: "100%", marginTop: 18 }} onClick={() => startRound("mixed")}>Play a mixed mission</button>
          </section>
        )}

        <footer style={{ textAlign: "center", marginTop: 20, ...muted }}>
          Small steps. Big discoveries. ✨
        </footer>
      </main>
    </div>
  );
}
