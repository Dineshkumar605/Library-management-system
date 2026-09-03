# Frontend AGENTS.md

## Build & Run

`ash
cd frontend
npm install
npm start      # Runs on http://localhost:3000
npm test       # Run tests
npm run build  # Production build
`

## Project Structure

`
frontend/src/
- App.js              # Router + Navbar
- components/
  - HomeScreen.jsx  # Landing page
  - AddUser.jsx     # Create user form
  - AllUsers.jsx    # View all users
  - AllBooks.jsx    # View all books
  - AllReviews.jsx  # View all reviews
  - Home.jsx        # Fetch user by email
  - UpdateName.jsx  # Update user name
  - DelUser.jsx     # Delete user
  - AddAuthor.jsx   # Add author + books
  - AddReview.jsx   # Add book review
  - BookDetails.jsx # View book reviews
  - DelBook.jsx     # Delete book
- index.js            # Entry point
- App.css             # Styles
`

## Tech Stack

- **React**: 19.1.0
- **React Router**: 7.6.3 (BrowserRouter)
- **UI**: Bootstrap 5.3.7 + React-Bootstrap 2.10.10
- **HTTP**: Fetch API (no axios)

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| / | HomeScreen | Landing page |
| /adduser | AddUser | Create user form |
| /allusers | AllUsers | View all users |
| /allbooks | AllBooks | View all books |
| /allreviews | AllReviews | View all reviews |
| /fetchusers | Home | Fetch user by email |
| /updateName | UpdateName | Update user name |
| /deleteUser | DelUser | Delete user |
| /addauthor | AddAuthor | Add author + books |
| /addreview | AddReview | Add book review |
| /bookDetails | BookDetails | View book reviews |
| /deleteBook | DelBook | Delete book |

## API Communication

Backend runs at http://localhost:8080. All API calls use fetch:

`javascript
const response = await fetch("http://localhost:8080/LMS/endpoint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});
`

## Conventions

- Functional components with hooks
- Bootstrap classes for styling (no CSS modules)
- Components in components/ directory
- No state management library (local state only)
- Form validation handled by backend

## Dependencies

- eact, eact-dom: 19.1.0
- eact-router-dom: 7.6.3
- ootstrap: 5.3.7
- eact-bootstrap: 2.10.10

## Git Workflow

- Every change set -> create a new branch from main
- Branch naming: feature/<short-description> or fix/<short-description>
- Always ask user before committing -- never auto-commit
- Push branch to origin
- Create a PR targeting main branch
- PR title: concise summary of the change
- PR body MUST be clean and readable -- no escaped/backslash sequences (e.g. `\`a``pi.js` or `\u0041`)
- Write the PR body to a temporary file and use `gh pr create --body-file <file>` (or `gh pr edit --body-file`) to avoid shell escaping corrupting the text
- Use plain backticks for code identifiers (e.g. `api.js`, `apiGet`, `apiPut`) and verify the rendered body with `gh pr view <n> --json body -q '.body'` before finishing