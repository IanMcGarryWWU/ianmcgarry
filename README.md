# ianmcgarry.tech

Personal portfolio site for Ian McGarry — Senior Software Engineer, AI Researcher, and LLM Orchestration Architect.

**Live:** [ianmcgarry.tech](https://www.ianmcgarry.tech)

## Tech Stack

- **React 18** with Vite 6
- **D3 Sankey** for the interactive skills diagram
- **tsparticles** for the particle network effect
- All continuous animations (gradient, name intro, scroll arrow, section fades) run via `requestAnimationFrame` with direct DOM refs — zero React re-renders on the hot path

## Development

```bash
npm install
npm run dev       # localhost:3000
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds and deploys to GitHub Pages.
