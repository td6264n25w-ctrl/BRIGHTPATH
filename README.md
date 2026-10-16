# BrightPath Learning

A touch-friendly, cross-device web app prototype for personalized Grade 3–4 math and spelling practice.

## What's included

- Student learning screen with Math Mountain and Word Wizard
- Multiple-choice practice with feedback and hints
- Starter adaptive question selection by subject, skill evidence, and difficulty
- Local progress persistence in the current browser
- Parent dashboard with accuracy and skill-level evidence
- Curriculum index for Grade 3 foundations and Grade 4 stretch skills
- First-week lesson plan
- Responsive layout for phones, tablets, and desktop browsers

## Important prototype boundaries

- This is a starter app, not a complete curriculum or validated assessment.
- The question bank is deliberately small. Review all questions and add a larger bank before relying on it for placement decisions.
- Progress is stored in the browser's `localStorage`. It does not synchronize between devices, provide accounts, or protect a parent dashboard behind authentication.
- The adaptive logic is a simple heuristic, not a validated learning-science model.
- Spelling currently mostly uses multiple-choice recognition. Add typed spelling and optional audio dictation for better evidence of independent spelling.
- The app uses a Google Fonts import; remove it from `src/styles.css` if you prefer no external font request.

## Requirements

Install Node.js LTS from https://nodejs.org/ and Git from https://git-scm.com/.

Check installation:

```bash
node --version
npm --version
git --version
```

## Run locally

1. Unzip this project.
2. Open a terminal in the `brightpath-learning` folder.
3. Install packages:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL Vite prints (usually `http://localhost:5173`).

To check a production build:

```bash
npm run build
npm run preview
```

## Upload to GitHub

1. Sign in to GitHub and create a **new repository** named `brightpath-learning`.
2. For a first upload, create it empty (skip auto-creating a README/license because this project already includes a README).
3. In the terminal, from this project folder, run:

   ```bash
   git init
   git add .
   git commit -m "Initial BrightPath learning app"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/brightpath-learning.git
   git push -u origin main
   ```

4. Replace `YOUR-USERNAME` with your GitHub username.
5. Refresh the repository page. The project files should be visible.

Never commit passwords, API keys, student full names, or private records.

## Publish with GitHub Pages

GitHub Pages can host the static frontend. It cannot provide a secure database or private authentication by itself.

1. Open `vite.config.ts`.
2. Change `base: "/"` to `base: "/brightpath-learning/"` if your repository is named `brightpath-learning`.
3. Add this file as `.github/workflows/deploy.yml` (create the `.github/workflows` folders):

   ```yaml
   name: Deploy BrightPath to GitHub Pages
   on:
     push:
       branches: [main]
     workflow_dispatch:
   permissions:
     contents: read
     pages: write
     id-token: write
   concurrency:
     group: pages
     cancel-in-progress: true
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with:
             path: dist
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```

4. In GitHub, open **Settings → Pages** and set the source to **GitHub Actions**.
5. Commit and push the workflow. After the Actions workflow succeeds, GitHub will show the published URL in the deployment/environment details.

If you use a different repository name, update Vite's `base` to `/<repository-name>/`. For a custom domain or Vercel, deployment settings differ.

## Suggested next step: add the workflow file

After creating `.github/workflows/deploy.yml`, run:

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push
```

## Full project index

See [`PROJECT_INDEX.md`](PROJECT_INDEX.md) for the canonical file map, screen inventory, curriculum index, adaptive rules, data model, and roadmap.

## Roadmap

### Phase 1 — Prototype (included)
- [x] Responsive student learning interface
- [x] Starter math and spelling question bank
- [x] Hint and explanation flow
- [x] Basic adaptive question selection
- [x] Parent dashboard
- [x] Curriculum and Week 1 index
- [x] Local browser storage

### Phase 2 — Learning quality
- [ ] Larger reviewed question bank per skill and grade
- [ ] Real placement assessment with skill-level confidence
- [ ] Typed spelling and audio dictation
- [ ] Spaced retrieval and retention checks
- [ ] Accessibility review and usability testing with parent supervision
- [ ] Curriculum alignment review against the child's school standards

### Phase 3 — Persistence and privacy
- [ ] Parent authentication
- [ ] Secure database and cross-device progress sync
- [ ] Data export and delete controls
- [ ] Privacy review suitable for a child-facing product
- [ ] Parent-only settings behind authentication

### Phase 4 — Product polish
- [ ] Weekly plans generated from evidence
- [ ] Rewards and unlockable learning maps
- [ ] Offline-friendly behavior
- [ ] Automated tests and continuous deployment
