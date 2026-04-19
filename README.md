# Algotrade X

Production-grade fintech frontend built with React, Vite, TypeScript, Tailwind, Framer Motion, Zustand, Recharts, and TradingView Lightweight Charts.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create your env file:

```bash
cp .env.example .env
```

3. Add your keys:

```bash
VITE_GROQ_API_KEY=your_api_key_here
VITE_STOCK_API_KEY=your_stock_api_key_here
```

4. Start the dev server:

```bash
npm run dev
```

## API placeholders

- `POST https://api.groq.com/openai/v1/chat/completions`
- `GET /api/market/ticker`
- `GET /api/ipos`
- `GET /api/buybacks`
- `GET /api/funds`
- `GET /api/stocks`
- `GET /api/stocks/:symbol/history`
- `GET /api/sectors`
- `GET /api/trades`

## GitHub setup

1. Initialize git:

```bash
git init
git add .
git commit -m "Initial Algotrade X frontend"
```

2. Create a GitHub repository, then connect it:

```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

`.env`, `node_modules`, and `dist` are already excluded in `.gitignore`.

## Vercel setup

1. Import the GitHub repository into Vercel.
2. Add `VITE_GROQ_API_KEY` and `VITE_STOCK_API_KEY` in Project Settings → Environment Variables.
3. Deploy the `main` branch.
4. Keep auto-deploys and preview deployments enabled for future pushes.

You can also deploy with the CLI:

```bash
npx vercel
npx vercel --prod
```

## Team images

Plug member images into the `image` field of each team member object in `src/data/mock.ts`.
