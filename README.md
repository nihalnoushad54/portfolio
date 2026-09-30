# nihal-ai-portfolio

Portfolio site for Muhammed Nihal KP, AI/ML Engineer, focused on RAG, LLM applications and computer vision.

## Stack
Next.js 14 (App Router), React 18, Tailwind CSS 3. No API keys or environment variables.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000. For a production build: `npm run build && npm start`.

## Customize
- All text, projects, skills and links live in `data/content.js`.
- Project GitHub links currently point to the GitHub profile; replace each `github` value with the exact repository URL.
- Colors are defined in `tailwind.config.js`; fonts use the system stack (no downloads).
- Sections are components in `components/`; reorder them in `app/page.js`.

## Structure
```
app/         layout, page, global styles
components/  Nav, Hero, Projects, Experience, Skills, About, Contact, ThemeToggle, Section
data/        content.js
```
