# Beat Store Frontend (Next.js 14 + Tailwind)

A clean storefront for selling beats with Stripe checkout and instant license delivery via your backend.

## Quick Start
1. `cp .env.local.example .env.local` and set `NEXT_PUBLIC_API_URL` to your deployed backend (e.g. `https://mr-beatz-backend.vercel.app`).
2. `npm install`
3. `npm run dev` → http://localhost:3000

## Pages
- `/` — Catalog with search
- `/beat/[id]` — Beat details + audio preview
- `/cart` — Cart + checkout (calls backend to create Stripe session)
- `/login`, `/register` — Auth (stores JWT in `localStorage`)
- `/account` — Orders & license PDF links
- `/checkout/success` and `/checkout/cancel` — Stripe redirects

## Notes
- Make sure your backend has CORS set to this frontend's origin.
- JWT is stored in `localStorage` for simplicity. For production, consider httpOnly cookies.
- Audio/player is a simple HTML5 player; swap in a waveform player later if you like.
