# Summarist

A responsive book-summary application built as part of the Frontend Simplified internship curriculum.

Summarist allows users to discover books, search by title or author, manage a personal library, view detailed book information, and listen to audio summaries.

## Live Demo

https://summarist-internship-delta.vercel.app

## Features

- Responsive landing page and authenticated application experience
- Firebase email/password authentication
- Search by book title or author
- Recommended and suggested book sections
- Individual book detail pages
- Personal library
- Audio summary player
- Premium-content indicators
- User settings and logout
- Loading, empty, and error states

## Tech Stack

- Next.js
- React
- TypeScript
- Redux Toolkit
- React Redux
- Firebase Authentication
- CSS
- Vitest
- React Testing Library
- GitHub Actions
- Vercel

## Quality Engineering

The original Frontend Simplified assignment architecture was preserved while adding an additional quality-engineering pass.

### Automated Testing

The project uses Vitest and React Testing Library for component and interaction testing.

Current automated tests cover:

- Book information rendering
- Book detail navigation
- Premium book indicators
- Search input rendering
- User typing behavior

Run the test suite with:

```bash
npm test