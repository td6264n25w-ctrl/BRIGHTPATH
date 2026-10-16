# BrightPath — Master Project Index

**Project status:** Prototype 0.1  
**Audience:** Child around age 8; Grade 3 starting point, Grade 4 stretch  
**Subjects:** Math and spelling  
**Routine target:** 30 minutes/day  
**Architecture:** React + TypeScript + Vite; local browser storage only  
**Last planned scope:** Interactive student experience, parent dashboard, curriculum map, first-week lesson plan

This is the canonical navigation index for the generated starter project. Update it whenever files, screens, curriculum units, or adaptive behavior change.

## 1. Repository map

```text
brightpath-learning/
├── index.html                 # Browser entry document and metadata
├── package.json               # Dependencies and npm commands
├── tsconfig.json              # TypeScript project references
├── tsconfig.app.json          # Strict TypeScript settings for app source
├── tsconfig.node.json         # TypeScript settings for Vite config
├── vite.config.ts             # Vite build configuration; GitHub Pages base path
├── README.md                  # Setup, local run, GitHub upload and deployment guide
├── PROJECT_INDEX.md           # This master index
├── public/                    # Static assets (add icons and offline assets here)
└── src/
    ├── main.tsx               # React bootstrap and stylesheet import
    ├── App.tsx                # Main UI, tabs, practice flow, parent dashboard
    ├── styles.css             # Responsive visual system and component styling
    ├── types.ts               # Shared TypeScript types
    ├── questions.ts           # Starter tagged question bank and answer explanations
    ├── curriculum.ts          # Grade 3–4 curriculum map and Week 1 plan
    └── storage.ts             # Versioned localStorage persistence
```

Deployment workflow to add manually:
```text
.github/
└── workflows/
    └── deploy.yml             # GitHub Actions build and GitHub Pages deployment
```

## 2. Screen and component index

### Student learning screen — `src/App.tsx`
- Header: name, points, correct count, streak, total answers.
- Subject selector: Math Mountain / Word Wizard.
- Difficulty selector: Grade 3 foundations / stretch challenge.
- Question panel: skill tag, target grade, prompt, answer options or typed input.
- Hint action: shows a learning hint and reduces independent-answer point credit.
- Feedback: correct/incorrect message and explanation.
- Next question: chooses a question using the selected subject, level, skill evidence, and questions seen in the current app session.
- Session snapshot: questions attempted and correct this visit.

### Parent dashboard — `src/App.tsx`
- Student display name (nickname recommended for the local prototype).
- Overall answers, accuracy, points, and sampled skills.
- Skill evidence table: correct count, total attempts, percentage, and provisional status.
- Reset control for locally stored progress.
- Notes explaining that small samples do not establish mastery.

### Curriculum view — `src/App.tsx`
- Week 1 schedule.
- Expandable curriculum units with grade, subject, skill list, and mastery evidence.

## 3. Data contracts

### `Question` — `src/types.ts`
- `id`: stable unique question identifier.
- `subject`: Math or Spelling.
- `skill`: target skill label.
- `grade`: intended grade target (3 or 4).
- `level`: Foundation or Challenge.
- `prompt`: student-facing question.
- `options`: optional multiple-choice answers.
- `answer`: canonical answer.
- `hint`: support before submission.
- `explanation`: feedback after submission.
- `mode`: optional choice/typed input mode.

### `AnswerRecord` — `src/types.ts`
- `id`: unique answer event.
- `subject`, `skill`, `grade`: question metadata at time of answer.
- `correct`: whether the first response matched the answer key.
- `usedHint`: whether a hint was used before answering.
- `answeredAt`: ISO timestamp.

### `ProgressState` — `src/storage.ts`
- `studentName`: local display name.
- `points`: accumulated prototype points.
- `streak`: current correct-answer streak.
- `records`: answer history.
- `preferredLevel`: selected/adapted level for each subject.

## 4. Adaptive behavior — current prototype

1. Filter questions to the chosen subject and current difficulty.
2. Prefer unseen questions within the current app session.
3. Use answer records to estimate independent accuracy by skill.
4. Prefer skills with little evidence or lower independent accuracy.
5. After enough recent records, use a simple heuristic to nudge the next level:
   - Strong recent performance can suggest Challenge.
   - Low recent performance returns to Foundation.
6. Save answer records to localStorage.

### Limitations and required improvements
- This is a simple heuristic, not a validated adaptive assessment.
- Small samples can mislead; don't equate percentage alone with mastery.
- Improve selection by using a reviewed skill graph, difficulty metadata, spaced retrieval, and repeated independent evidence across different sessions.
- Avoid treating a wrong answer as a permanent ability label.
- Separate accuracy with hints from independent accuracy in the parent report.
- Add confidence/guessing checks and alternative explanations for persistent errors.

## 5. Curriculum master index

### Grade 3 math
1. Place value and rounding.
2. Addition and subtraction.
3. Multiplication and division.
4. Fractions.
5. Measurement and geometry.
6. Word problems and data reasoning.

### Grade 4 math
1. Multi-digit operations.
2. Factors, multiples, and number patterns.
3. Fractions and decimals.
4. Multi-step problem solving.
5. Geometry, angles, and measurement.

### Grade 3 spelling
1. Phonics, vowels, vowel teams, blends, and digraphs.
2. Syllable patterns and multisyllabic words.
3. Prefixes, suffixes, inflections, and plural spelling changes.
4. High-frequency irregular words.
5. Homophones and vocabulary in context.
6. Dictation and transfer into sentences.

### Grade 4 spelling
1. Advanced vowel patterns and syllable types.
2. Morphology: common Greek/Latin roots and affixes.
3. Suffix spelling changes.
4. Possessives, contractions, and commonly confused words.
5. Editing, dictation, and independent writing transfer.

Detailed units and mastery evidence live in `src/curriculum.ts`.

## 6. Daily lesson template (30 minutes)

- 3 min: retrieval warm-up from previously practiced skills.
- 12 min: focused math lesson (worked example, guided practice, independent problem, word problem).
- 10 min: spelling instruction (hear/say, pattern, model, practice, dictation).
- 5 min: mixed challenge, confidence check, and short review.

Balance can change based on actual skill needs. Both subjects should appear in the daily routine unless a parent deliberately changes it.

## 7. Week 1 plan

| Day | Math | Spelling | Game / application |
|---|---|---|---|
| Monday | Place value, rounding, multi-digit addition | Long vowels and vowel teams | Number trail and word sorting |
| Tuesday | Multiplication facts; division inverse | un-, re-, dis- | Equal-groups puzzle and word builder |
| Wednesday | Fraction number lines and equivalents | Homophones | Fraction pizza and sentence choice |
| Thursday | Two-step word problems | Plurals and suffix changes | Mini mystery |
| Friday | Evidence-led mixed review | Dictation, editing, retrieval | Mixed-skill boss battle |

## 8. Assessment design

Recommended first placement check:
- About 10 math and 10 spelling items, 15–20 minutes.
- Include Grade 3 anchor skills and a few Grade 4 stretch probes.
- Keep first responses as the primary evidence; record hints separately.
- Add typed spelling/dictation; multiple-choice alone cannot measure independent spelling.
- Report skill-level evidence and next steps, not a single global grade or high-stakes label.
- Recheck uncertain skills with more than one item and across more than one session.

## 9. Privacy and security requirements before real use

- This prototype stores progress in the browser only; it does not sync between devices.
- Do not use a child's full name in a public repository or URL.
- localStorage is not authentication or strong privacy protection.
- A real parent dashboard must require parent authentication before displaying personal learning records.
- Before cloud persistence, choose a backend, set access rules, provide data deletion/export, and minimize collected child data.
- Never commit API keys or credentials to GitHub.
- Review applicable child privacy obligations before collecting identifiable child data.

## 10. GitHub deployment checklist

- [ ] Create an empty GitHub repository.
- [ ] Upload project files using Git.
- [ ] Set `base` in `vite.config.ts` to `/<repo-name>/` for a GitHub Pages project site.
- [ ] Add `.github/workflows/deploy.yml` from README.
- [ ] Set GitHub Pages source to GitHub Actions.
- [ ] Push the workflow and confirm the Actions run succeeds.
- [ ] Test on desktop and mobile viewport sizes.
- [ ] Verify links, browser storage, refresh behavior, and console output.

## 11. Definition of done for the next iteration

- [ ] Full placement assessment with skill tags and scoring rules.
- [ ] Typed spelling and audio/dictation mode.
- [ ] Enough reviewed questions per target skill to reduce repetition.
- [ ] Review queue based on mistakes and spaced retrieval.
- [ ] Parent report separates hints, independent accuracy, and retention.
- [ ] Unit tests for scoring, question selection, and storage migration.
- [ ] Keyboard navigation, screen-reader labels, readable contrast, and touch targets.
- [ ] Cross-device persistence architecture chosen and security-reviewed.
