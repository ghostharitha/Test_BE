# Test_BE

Node.js + Express + MongoDB backend for authentication.

## Environment

Copy `.env.example` to `.env` and set:

- `PORT` (example: `3000`)
- `FRONTEND_URL` (example: `https://testfe-sigma.vercel.app,http://localhost:5173`)
- `MONGODB_URI`
- `JWT_SECRET`

## Run

1. `npm install`
2. `npm run dev`

## API

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
