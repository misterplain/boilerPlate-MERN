# Contributing Guide

Thanks for your interest in contributing.

## Development Setup

1. Install dependencies:

```bash
cd client && npm install
cd ../server && npm install
```

2. Configure environment variables:

- Create `client/.env`
- Create `server/.env` from `server/.env.example`

3. Run locally:

```bash
cd server && npm run dev
cd client && npm start
```

## Branch and Commit Workflow

1. Create a feature branch from `main`.
2. Make focused changes (one concern per PR when possible).
3. Use clear commit messages.

Suggested commit style:

- `feat: add product filter sanitization`
- `fix: handle oauth callback failure`
- `docs: expand setup instructions`
- `refactor: remove dead auth action code`

## Code Standards

- Use camelCase for variables and functions.
- Use PascalCase for React components.
- Keep functions small and single-purpose.
- Prefer explicit errors over silent failures.
- Avoid debug logs in committed code (`console.log`).
- Reuse utilities before introducing new helpers.

## Frontend Guidelines

- Keep Redux actions/reducers predictable and side-effect boundaries clear.
- Reuse shared API client in `client/src/api/axios.js`.
- Prefer readable UI state transitions over inline complex conditionals.

## Backend Guidelines

- Validate request input as early as possible.
- Use custom errors and pass exceptions to centralized middleware.
- Add structured logs for key business operations.
- Keep route handlers thin where practical.

## Testing Expectations

Before opening a PR:

1. Verify app boots locally (frontend + backend).
2. Manually test changed API paths and related UI flows.
3. Check for lint/build issues in changed areas.

## Pull Request Checklist

- [ ] Change is scoped and documented
- [ ] No debug logs or commented-out dead code
- [ ] README/notes updated if behavior changed
- [ ] Manual verification performed

## Reporting Issues

When filing a bug, include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots or request/response snippets (if relevant)
- Environment details (browser, Node version, OS)
