# Library Management System (Full Stack)

A full-stack **Library Management System** built with **Spring Boot** and **React.js + Bootstrap**. This project has been restructured — the Spring Boot backend now lives in the `backend/` folder and the React frontend in the `frontend/` folder.

The project also includes an **AI Software Developer Agent workflow** using skills under `.opencode/skills/`.  
The goal is to allow an AI orchestrator to understand development requests, investigate bugs, plan changes, implement code, add tests, verify the build, review changes, and prepare a Draft Pull Request for human approval.

---

## Features

- Add a user and automatically issue a library card
- Fetch user details and issued library card by email
- Update user name using email
- Delete user and their associated library card
- Add an author with a list of books
- Add reviews for a specific book
- Fetch a book and its reviews
- Delete a book and all its associated reviews

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot 3.5.0 |
| Language | Java 21 |
| ORM | Spring Data JPA + Hibernate |
| Database | PostgreSQL |
| Validation | Jakarta Bean Validation |
| API Docs | Swagger / Springdoc OpenAPI 2.8.9 |
| Frontend | React.js 19.1.0 + Bootstrap 5.3.7 |
| Routing | React Router DOM 7.6.3 |
| UI Components | React-Bootstrap 2.10.10 |
| HTTP Client | Fetch API |
| Build Tool | Maven (backend) / NPM (frontend) |
| AI Skills | `.opencode/skills/` |

---

## Project Structure

```text
LibraryManagementSystem/
├── backend/                          # Spring Boot backend
│   ├── src/main/java/com/gl/lms/
│   │   ├── controller/              # REST endpoints
│   │   ├── service/                 # Business logic
│   │   ├── repository/              # Data access
│   │   ├── entity/                  # JPA entities
│   │   ├── dto/                     # Data transfer objects
│   │   ├── exception/               # Custom exceptions
│   │   ├── config/                  # Configuration
│   │   └── utility/                 # Exception handling / logging
│   ├── src/main/resources/
│   │   ├── application.properties   # DB config
│   │   └── log4j2.properties        # Logging config
│   ├── src/test/                    # Backend tests
│   ├── pom.xml
│   └── AGENTS.md                    # Backend-specific AI instructions
│
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── App.js                   # Router + Navbar
│   │   ├── index.js                 # Entry point
│   │   └── components/              # React components
│   │       ├── HomeScreen.jsx       # Landing page
│   │       ├── AddUser.jsx          # Create user form
│   │       ├── AllUsers.jsx         # View all users
│   │       ├── AddAuthor.jsx        # Add author + books
│   │       ├── AddBook.jsx          # Add a book
│   │       ├── AllBooks.jsx         # View all books
│   │       ├── AllReviews.jsx       # View all reviews
│   │       ├── AddReview.jsx        # Add book review
│   │       ├── BookDetails.jsx      # View book details + reviews
│   │       ├── Home.jsx             # Fetch user by email
│   │       ├── UpdateName.jsx       # Update user name
│   │       ├── DelUser.jsx          # Delete user
│   │       └── DelBook.jsx          # Delete book
│   ├── package.json
│   └── AGENTS.md                    # Frontend-specific AI instructions
│
├── .opencode/
│   └── skills/
│       ├── nexus/
│       ├── scout/
│       ├── lens/
│       ├── spark/
│       ├── sherpa/
│       ├── builder/
│       ├── radar/
│       ├── judge/
│       ├── guardian/
│       └── sigil/
│
└── README.md
```

---

# Database Configuration

## Prerequisites

1. Install PostgreSQL.
2. Create the database:

```sql
CREATE DATABASE "Library_Mgmt_System_DB";
```

## Configure Connection

Update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/Library_Mgmt_System_DB
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

> `ddl-auto=update` is convenient for local development. For production systems, database migrations should normally be managed explicitly.

---

# How to Run

## 1. Clone the Repository

```bash
git clone https://github.com/thimothybabu123/LibraryManagementSystem
cd LibraryManagementSystem
```

## 2. Run Backend

Navigate to the `backend/` folder:

```bash
cd backend
```

Build:

```bash
mvn clean install
```

Run:

```bash
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

## 3. Run Frontend

Navigate to the `frontend/` folder:

```bash
cd frontend
npm install
npm start
```

Frontend:

```text
http://localhost:3000
```

## 4. Swagger UI

When the backend is running:

```text
http://localhost:8080/swagger-ui/index.html
```

---

# Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/LMS/add-user-and-issue-library-card` | Create user and issue library card |
| GET | `/LMS/fetch-user-and-issued-library-card/{email}` | Fetch user and card by email |
| GET | `/LMS/fetch-all-users` | Fetch all users and their library cards |
| GET | `/LMS/fetch-all-books` | Fetch all books with author names |
| GET | `/LMS/fetch-all-reviews` | Fetch all reviews with book titles |
| PUT | `/LMS/update-name/{email}/{updatedName}` | Update user name |
| DELETE | `/LMS/delete-user/{email}` | Delete user and library card |
| POST | `/LMS/add-author-and-books` | Add author with multiple books |
| POST | `/LMS/add-reviews/{title}` | Add review to a book |
| GET | `/LMS/fetchBookDetailsAndReviews/{title}` | Get book details with reviews |
| DELETE | `/LMS/delete-book/{title}` | Delete book and its reviews |

---

# Entity Relationships

- **User ↔ LibraryCard** — One-to-One
- **Author → Books** — One-to-Many
- **Book → Reviews** — One-to-Many

---

# Sample JSON Requests

## Add User and Issue Library Card

```json
{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "libraryCardsDTO": {
    "issueDate": "2025-07-01",
    "expiryDate": "2026-07-01"
  }
}
```

## Add Author and Books

```json
{
  "name": "J.K. Rowling",
  "booksDTOS": [
    {
      "title": "Harry Potter and the Philosopher's Stone"
    },
    {
      "title": "Harry Potter and the Chamber of Secrets"
    }
  ]
}
```

## Add Book Review

```json
{
  "rating": 5,
  "comment": "Fantastic fantasy novel!"
}
```

---

# AI Software Developer Agent System

## Goal

The AI agent workflow is designed to support software-development tasks such as:

- Understand an existing project or file
- Analyze a bug
- Find a root cause
- Analyze a feature request
- Prepare an implementation plan
- Modify source code
- Add or improve tests
- Compile and verify the application
- Review code changes
- Prepare Git commits and Draft Pull Requests
- Later integrate with ticket systems such as Jira or ClickUp

The main entry point is **Nexus**.

A developer or ticket system gives Nexus a requirement in normal language.

Example:

```text
LIB-101

Bug:
Returning an overdue book causes HTTP 500.

Expected:
The book should be returned and the fine should be calculated.
```

Nexus decides which specialized agents are required.

---

# AI Skills

| Skill | Role | Main Use Case |
|---|---|---|
| **Nexus** | Orchestrator / AI Tech Lead | Understand the request and decide which agents should run |
| **Scout** | Bug Investigator | Find why something is broken and identify the root cause |
| **Lens** | Codebase Explorer | Understand existing files, modules, architecture, and data flow |
| **Spark** | Feature Analyst | Refine a new or unclear feature idea into a clearer requirement |
| **Sherpa** | Technical Planner | Break a complex change into small implementation steps |
| **Builder** | Software Developer | Create or modify production code |
| **Radar** | Test Engineer | Add tests, run tests, check edge cases, and improve coverage |
| **Judge** | Senior Code Reviewer | Review changes for correctness, quality, unnecessary code, and risk |
| **Guardian** | Git / PR Specialist | Prepare branch strategy, commits, and Draft Pull Request details |
| **Sigil** | Skill Generator | Generate or improve project-specific skills and agent instructions |

---

# Simple Meaning of Each Agent

```text
Nexus    → Decide who should work
Scout    → Find the bug
Lens     → Understand the code
Spark    → Understand/refine the feature
Sherpa   → Make the technical plan
Builder  → Write or fix the code
Radar    → Test the code
Judge    → Review the code
Guardian → Handle Git / PR preparation
Sigil    → Generate or improve project-specific AI instructions
```

---

# Important Design Principle

Nexus should **not always call every agent**.

It should select only the agents required for the request.

Examples:

## Explain a File

Request:

```text
Explain how BookService.java works.
```

Possible flow:

```text
Nexus
  ↓
Lens
  ↓
Done
```

## Investigate an Error

Request:

```text
Why am I getting this NullPointerException?
```

Possible flow:

```text
Nexus
  ↓
Scout
  ↓
Done
```

## Find and Fix a Bug

Request:

```text
Find why the return-book API fails and fix it.
```

Possible flow:

```text
Nexus
  ↓
Scout
  ↓
Builder
  ↓
Radar
  ↓
Judge
```

## Implement a Large Feature

Request:

```text
Implement book reservation functionality.
```

Possible flow:

```text
Nexus
  ↓
Lens
  ↓
Spark
  ↓
Sherpa
  ↓
Builder
  ↓
Radar
  ↓
Build Gate
  ↓
Judge
  ↓
Guardian
```

---

# Optimized End-to-End Workflow

```text
                 Jira / ClickUp / Developer
                           │
                           ▼
                     Ticket Connector
                           │
                           ▼
                        NEXUS
                   Understand Request
                           │
          ┌────────────────┼────────────────┐
          │                │                │
         Bug             Feature        Explanation
          │                │                │
        Scout          Lens / Spark         Lens
          │                │                │
          └─────────┬──────┘                └──► Done
                    │
              Sherpa if needed
                    │
                    ▼
                Guardian
              Create Branch
                    │
                    ▼
                 Builder
              Modify Code
                    │
                    ▼
                  Radar
             Add / Run Tests
                    │
                    ▼
               BUILD GATE
              mvn clean verify
                    │
             ┌──────┴──────┐
             │             │
            FAIL          PASS
             │             │
             ▼             ▼
          Builder         Judge
             ▲        Review Changes
             │             │
             │      ┌──────┴──────┐
             │      │             │
             └──── FAIL          PASS
                                  │
                                  ▼
                              Guardian
                                  │
                            Commit / Push
                                  │
                                  ▼
                              Draft PR
                                  │
                                  ▼
                           Human Review
                                  │
                                  ▼
                                Merge
```

---

# Bug Fix Workflow

Example ticket:

```text
LIB-101

Bug:
User cannot return an overdue book.

Actual:
API returns HTTP 500.

Expected:
Book should be returned and fine should be calculated.
```

Recommended flow:

```text
Nexus
  ↓
Classify as Bug
  ↓
Guardian
Create working branch
  ↓
Scout
Investigate and find root cause
  ↓
Sherpa
Create fix plan if the issue is complex
  ↓
Builder
Implement the fix
  ↓
Radar
Add regression tests and run tests
  ↓
Build Gate
mvn clean verify
  ↓
Judge
Review the change
  ↓
Guardian
Commit + Push + Draft PR
  ↓
Human Review
```

### Example Scout Result

```text
Root Cause:

FineCalculationService assumes FineConfiguration always exists.

For older borrowing records, the configuration can be missing.

The code calls a method on a null object and causes HTTP 500.
```

### Example Sherpa Plan

```text
1. Update FineCalculationService.
2. Handle missing fine configuration safely.
3. Preserve existing return behavior.
4. Add an overdue-book regression test.
5. Add a missing-configuration test.
6. Run the complete backend test suite.
```

---

# Feature Implementation Workflow

Example ticket:

```text
LIB-200

Feature:
Allow users to reserve books that are currently unavailable.
```

Recommended flow:

```text
Nexus
  ↓
Classify as Feature
  ↓
Guardian
Create working branch
  ↓
Lens
Understand the current borrowing flow
  ↓
Spark
Clarify the feature when requirement is incomplete
  ↓
Sherpa
Create implementation plan
  ↓
Builder
Implement feature
  ↓
Radar
Add and run tests
  ↓
Build Gate
mvn clean verify
  ↓
Judge
Review implementation
  ↓
Guardian
Commit + Push + Draft PR
  ↓
Human Review
```

For a very small and clear feature, Nexus may skip Spark or Sherpa.

---

# Build and Test Gate

The AI should never assume that code compiles.

It must execute the real project build.

Backend verification:

```bash
mvn clean verify
```

The workflow can continue only when:

```text
BUILD SUCCESS
Tests passed
```

If the build or tests fail:

```text
Radar / Build Gate
       ↓
      FAIL
       ↓
     Nexus
       ↓
    Builder
Fix the problem
       ↓
     Radar
       ↓
Build again
```

---

# Automatic Retry Policy

AI-generated code may not work correctly on the first attempt.

Recommended retry flow:

```text
Builder
  ↓
Radar
  ↓
FAIL
  ↓
Builder
  ↓
Radar
  ↓
Build
```

The same rule applies to code review:

```text
Judge
  ↓
REQUEST CHANGES
  ↓
Builder
  ↓
Radar
  ↓
Build
  ↓
Judge again
```

Recommended safety limit:

```text
Maximum automatic fix attempts: 3
```

After three unsuccessful attempts:

```text
Nexus
  ↓
STOP AUTOMATION
  ↓
Human Developer Required
```

This avoids endless AI modification loops.

---

# Code Review Workflow

```text
Nexus
  ↓
Judge
Review current changes
  ↓
┌────────────────────┐
│ APPROVE            │
│ REQUEST CHANGES    │
│ BLOCK              │
└────────────────────┘
```

If changes are requested:

```text
Judge
  ↓
Builder
Apply valid findings
  ↓
Radar
Run tests
  ↓
Build Gate
  ↓
Judge
Re-review
```

Only an approved change should continue to Git / PR preparation.

---

# Git Workflow

AI changes must never be made directly on `main`.

Recommended sequence:

```text
main
  ↓
Create working branch
  ↓
Analyze
  ↓
Implement
  ↓
Test
  ↓
Review
  ↓
Commit
  ↓
Push
  ↓
Draft PR
```

Example branches:

```text
bugfix/LIB-101-overdue-return
feature/LIB-200-book-reservation
```

Example commit:

```text
fix: handle overdue book return LIB-101
```

---

# Draft Pull Request

The initial AI workflow should create a **Draft PR**, not automatically merge code.

Example:

```text
Title:
LIB-101 Fix overdue book return failure
```

Recommended PR description:

```text
Ticket:
LIB-101

Problem:
Returning an overdue book caused HTTP 500.

Root Cause:
Fine configuration could be missing for older borrowing records.

Solution:
Added safe handling in fine calculation.

Files Changed:
- FineCalculationService.java
- BookReturnService.java
- BookReturnServiceTest.java

Tests:
Passed

Build:
mvn clean verify → SUCCESS

AI Review:
APPROVED

Status:
Ready for human review.
```

A human developer remains responsible for final approval and merge.

---

# External Ticket Integration

Nexus does not automatically read Jira or ClickUp just because the skills exist.

A connector layer is required.

```text
Jira / ClickUp
      ↓
Ticket API / Webhook
      ↓
Ticket Connector
      ↓
Normalized Ticket Context
      ↓
Nexus
```

Recommended ticket information:

```text
Ticket ID
Ticket Type
Title
Description
Acceptance Criteria
Priority
Comments
Attachments
Repository
Target Branch
```

Example normalized input:

```text
Ticket ID: LIB-101
Type: Bug
Title: Unable to return overdue book

Description:
The return API responds with HTTP 500 for overdue books.

Acceptance Criteria:
- User can return overdue books
- Fine is calculated correctly
- Existing normal-return behavior still works
```

---

# GitHub Integration

Guardian should decide and validate Git/PR strategy, while a real Git/GitHub execution layer performs the commands.

```text
Guardian
   ↓
Git / GitHub Connector
   ↓
Repository
```

Possible actions:

```text
Create branch
Commit changes
Push branch
Create Draft PR
Add PR description
Link ticket
```

This separates:

```text
AI Decision
```

from:

```text
Real External-System Execution
```

---

# Safety Rules

The AI workflow should follow these rules:

1. Never push directly to `main`.
2. Never automatically merge a PR in the first POC.
3. Always work on a ticket-specific branch.
4. Always run tests after code changes.
5. Always run the real build before creating a PR.
6. Always review AI-generated changes.
7. Limit automatic correction attempts.
8. Stop and request human help when requirements are unclear or repeated attempts fail.
9. Do not expose API keys, tokens, database passwords, or other secrets to generated code or logs.
10. Keep Git, Jira, ClickUp, and other external credentials outside the repository.

---

# AGENTS.md Files

The project contains project-specific agent instructions:

```text
backend/AGENTS.md
frontend/AGENTS.md
```

These files provide information such as:

- Project architecture
- Coding conventions
- Build commands
- Test commands
- Backend patterns
- Frontend patterns
- Important project restrictions
- Existing reusable components

These instructions help the AI agents work consistently with the existing codebase instead of inventing new patterns unnecessarily.

---

# Sigil Workflow

Sigil is used to create or improve project-specific agent instructions.

```text
Nexus
  ↓
Lens
Understand project conventions
  ↓
Sigil
Generate / update project-specific skills
  ↓
Review generated instructions
  ↓
Update AGENTS.md / local skills
```

Sigil should not normally be part of every bug or feature workflow.

It is mainly useful when:

- Starting AI support for a new repository
- Project conventions change
- New architecture is introduced
- Existing agent instructions become outdated

---

# Optional Future Security Review

A dedicated security-review agent can be added later for security-sensitive changes.

Example use cases:

- Authentication
- Authorization
- JWT
- Password handling
- Secrets
- PII
- File upload
- SQL changes
- External API credentials

Possible future flow:

```text
Builder
  ↓
Radar
  ↓
Build Gate
  ↓
Judge
  ↓
Security Review
  ↓
Guardian
```

This does not need to be mandatory for the first POC.

---

# Recommended POC Roadmap

## Phase 1 — Local AI Developer

Goal:

```text
Manual Requirement
      ↓
Nexus
      ↓
Agents
      ↓
Local Code Changes
      ↓
Tests
      ↓
Build
      ↓
Review
```

No Jira/ClickUp integration yet.

Success criteria:

- Nexus understands a task
- Correct agents are selected
- Builder can modify the project
- Radar can create/run tests
- Maven build passes
- Judge reviews changes

---

## Phase 2 — Git Automation

Add:

```text
Branch creation
Commit
Push
Draft PR
```

Success criteria:

- AI never modifies `main`
- Draft PR contains useful change summary
- Human can easily review the result

---

# Example End-to-End POC

Ticket:

```text
LIB-101

Bug:
Returning an overdue book causes HTTP 500.
```

Execution:

```text
Ticket
  ↓
Nexus
  ↓
Classify: BUG
  ↓
Guardian
Create bugfix/LIB-101-overdue-return
  ↓
Scout
Find root cause
  ↓
Sherpa
Prepare fix plan
  ↓
Builder
Modify code
  ↓
Radar
Add regression test
  ↓
mvn clean verify
  ↓
Judge
Review changes
  ↓
Guardian
Commit + Push + Draft PR
  ↓
Human Review
```

Result:

```text
Ticket analyzed
Root cause documented
Code fixed
Regression test added
Build passed
Code reviewed
Draft PR created
Human approves final merge
```

---

# Validation and Exception Handling

Current project features include:

- Jakarta Bean Validation on DTOs
- Custom `LibraryManagementSystemException`
- Global exception handling with `@RestControllerAdvice`
- AOP logging for service-layer exceptions

---

# Final AI Architecture

```text
                ┌──────────────────────┐
                │ Jira / ClickUp / Dev │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   Ticket Connector   │
                └──────────┬───────────┘
                           │
                           ▼
                     ┌───────────┐
                     │   NEXUS   │
                     │ AI Lead   │
                     └─────┬─────┘
                           │
          ┌────────────────┼─────────────────┐
          │                │                 │
        Scout             Lens             Spark
       Bug RCA        Understand Code    Feature Spec
          │                │                 │
          └────────────────┼─────────────────┘
                           │
                        Sherpa
                     Plan if needed
                           │
                           ▼
                        Builder
                       Write Code
                           │
                           ▼
                         Radar
                         Tests
                           │
                           ▼
                       Build Gate
                    mvn clean verify
                           │
                           ▼
                         Judge
                      Code Review
                           │
                     ┌─────┴─────┐
                     │           │
                    FAIL        PASS
                     │           │
                     ▼           ▼
                  Builder     Guardian
                     ▲       Git / PR Prep
                     │           │
                     └───────────┤
                                 ▼
                         GitHub Connector
                                 │
                                 ▼
                             Draft PR
                                 │
                                 ▼
                          Human Developer
                                 │
                                 ▼
                               Merge
```
