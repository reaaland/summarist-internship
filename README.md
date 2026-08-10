# Summarist

Summarist is a multi-page book-summary application I built as a **Frontend Simplified Virtual Internship** project. The assignment was designed to bring several frontend skills together in one larger application rather than treating them as separate exercises.

## Project context

Frontend Simplified provided the internship requirements, API directions, app assets, and the starter design/HTML/CSS for the public home page. My work was implementing the application in Next.js and connecting the required interactions and user flows.

## What I implemented

- Email/password registration, login, logout, and guest access with Firebase Authentication
- Redux state for the shared authentication modal
- API-driven selected, recommended, and suggested book sections
- Debounced book search by title or author
- Dynamic book detail routes
- Read/listen access checks based on authentication and subscription state
- Audio player controls with progress, rewind, and forward behavior
- Firebase/Firestore persistence for saved and finished books
- Library and settings views tied to the signed-in user
- Responsive sidebar/navigation and mobile behavior
- Loading, error, empty, and logged-out states
- Monthly/annual plan-selection flow with a seven-day annual demo trial

## Portfolio demo note

The original internship brief includes payment/subscription implementation. For this public portfolio version, I kept the subscription logic and access-gating flow but use a **demo subscription state instead of collecting real payment information**. Visitors can explore the application without being charged.

## Tech stack

- Next.js
- React
- TypeScript
- Firebase Authentication
- Firestore
- Redux Toolkit / React Redux
- React Icons
- CSS
- Vercel

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project ownership

This is a Frontend Simplified virtual internship project, not an independently designed commercial product. The supplied project materials gave me the requirements and visual starting point; the implementation work in this repository shows how I translated those requirements into a working application.
