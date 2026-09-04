# Library Management System & AI Developer Workflow

A full-stack **Library Management System** built with **Spring Boot** and **React**, featuring an autonomous **AI Software Developer Agent Workflow** powered by **OpenCode** (`.opencode/`) and specialized skills under `.opencode/skills/`.

The AI system functions as a modular engineering team: running natively on **OpenCode CLI**, an AI Tech Lead (**Nexus**) coordinates specialized agents to investigate bugs, plan features, write production code, run test gates, review diffs, and prepare Draft Pull Requests—all driven directly from the terminal.

---

## Table of Contents

- [Part 1: The Application](#part-1-the-application)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Quick Start](#quick-start)
  - [REST API Endpoints](#rest-api-endpoints)
- [Part 2: AI Developer Automated Workflow](#part-2-ai-developer-automated-workflow)
  - [Powered by OpenCode](#powered-by-opencode)
  - [Core Architecture & Philosophy](#core-architecture--philosophy)
  - [Why This AI Workflow is Better](#why-this-ai-workflow-is-better-in-simple-terms)
  - [Specialist Agent Team](#specialist-agent-team)
  - [End-to-End Automated Pipeline](#end-to-end-automated-pipeline)
  - [How to Run via CLI](#how-to-run-via-cli)
  - [Direct-Route to a Single Specialist](#direct-route-to-a-single-specialist)
  - [Quality & Safety Gates](#quality--safety-gates)
  - [Project-Specific Instructions (AGENTS.md)](#project-specific-instructions-agentsmd)

---

# Part 1: The Application

### Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Spring Boot 3.5.0, Java 21, Spring Data JPA, Hibernate, Jakarta Bean Validation |
| **Database** | PostgreSQL |
| **API Documentation** | Swagger / Springdoc OpenAPI 2.8.9 (`/swagger-ui/index.html`) |
| **Frontend** | React 19.1.0, React Router DOM 7.6.3, Bootstrap 5.3.8, React-Bootstrap, React Icons |
| **Build Tools** | Maven (backend) / NPM (frontend) |
| **AI Runtime** | **OpenCode CLI** (`@opencode-ai/plugin` v1.18.25) |
| **AI Orchestration** | **OpenCode Skills** (`.opencode/skills/`) |

### Project Structure

```text
Library-management-system/
├── backend/                       # Spring Boot REST API
│   ├── src/main/java/com/gl/lms/  # Controller, Service, Repository, Entity, DTO
│   ├── src/main/resources/        # application.properties, log4j2.properties
│   ├── pom.xml
│   └── AGENTS.md                  # Backend AI guidelines & conventions
│
├── frontend/                      # React SPA
│   ├── src/
│   │   ├── components/            # Sidebar, Form cards, and View tables
│   │   ├── App.js                 # Router configuration
│   │   └── api.js                 # Centralized fetch client
│   ├── package.json
│   └── AGENTS.md                  # Frontend AI guidelines & conventions
│
└── .opencode/                     # OpenCode CLI configuration & skills
    ├── package.json               # OpenCode plugin dependencies (@opencode-ai/plugin)
    └── skills/                    # Multi-agent skills and shared contracts
        ├── _common/               # Spine contracts (gates, handoffs, git guidelines)
        └── [nexus, scout, lens, spark, sherpa, builder, radar, judge, guardian, sigil]
```

### Quick Start

#### 1. Database Setup
Ensure PostgreSQL is running and create the database:
```sql
CREATE DATABASE "Library_Mgmt_System_DB";
```
Configure credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/Library_Mgmt_System_DB
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

#### 2. Run Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
# Server runs on http://localhost:8080 | Swagger UI: http://localhost:8080/swagger-ui/index.html
```

#### 3. Run Frontend
```bash
cd frontend
npm install
npm start
# Client runs on http://localhost:3000
```

### REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/LMS/add-user-and-issue-library-card` | Create user and issue library card |
| `GET` | `/LMS/fetch-user-and-issued-library-card/{email}` | Fetch user and card by email |
| `GET` | `/LMS/fetch-all-users` | Fetch all users with their library cards |
| `PUT` | `/LMS/update-name/{email}/{updatedName}` | Update user name |
| `DELETE` | `/LMS/delete-user/{email}` | Delete user and associated card |
| `POST` | `/LMS/add-author-and-books` | Add author with a list of books |
| `POST` | `/LMS/add-book/{authorName}` | Add a single book to an existing author |
| `GET` | `/LMS/fetch-all-books` | Fetch all books with author names |
| `POST` | `/LMS/add-reviews/{title}` | Add review to a book |
| `GET` | `/LMS/fetchBookDetailsAndReviews/{title}` | Get book details along with reviews |
| `GET` | `/LMS/fetch-all-reviews` | Fetch all reviews across books |
| `DELETE` | `/LMS/delete-book/{title}` | Delete a book and its reviews |
| `POST` | `/LMS/demo/add` | Seed sample library demo data |
| `DELETE` | `/LMS/demo/clear` | Clear all seeded demo data |

---

# Part 2: AI Developer Automated Workflow

## Powered by OpenCode

This entire multi-agent workflow is built natively on **OpenCode**.

Configured under the `.opencode/` directory using `@opencode-ai/plugin`, OpenCode serves as the core CLI execution runtime. It supplies the workspace tools (file reading/editing, terminal command execution, test running) and subagent management that enable our AI Tech Lead (**Nexus**) to run and coordinate the specialist team.

## Core Architecture & Philosophy

Standard AI assistants operate as monolithic single agents: one agent reads files, modifies code, tests its own changes, and commits—often suffering from **context pollution**, **hallucinations**, and **self-confirmation bias**.

This repository implements a **multi-specialist autonomous team**:

1. **Hub-and-Spoke Orchestration:** **Nexus** acts as the AI Tech Lead. It analyzes your natural-language CLI prompt, selects the **minimum viable chain** of specialists, and coordinates execution.
2. **Context Isolation:** Each specialist runs in its own session with dedicated instructions (`SKILL.md`), passing only clean state summaries (`NEXUS_HANDOFF`) back to Nexus.
3. **Producer $\neq$ Verifier:** The agent that writes the code (`Builder`) is never allowed to approve it. Testing is owned by `Radar`, and review is owned by `Judge`.
4. **Enforced Safety Gates:** No code reaches `main` or gets committed without passing real build verification and explicit human sign-off.

### Why This AI Workflow is Better (In Simple Terms)

If you have used tools like ChatGPT or Copilot, you know a single AI can make mistakes, guess blindly, or claim code works when it doesn't. Instead of one AI doing everything alone, this system works like a **real software team**:

1. **The Writer Never Approves Their Own Work:**  
   Just like a chef shouldn't inspect their own food hygiene, the AI that writes code (`Builder`) cannot approve it. A separate AI (`Radar`) tests it, and an AI reviewer (`Judge`) checks it for bugs.

2. **Diagnose Before Operating (No Blind Guessing):**  
   When something breaks, standard AI starts changing code randomly hoping it works. Here, the investigator AI (`Scout`) is not allowed to touch code—it must find the exact root cause first, like a doctor doing an X-ray before surgery.

3. **Automatic Safety Stop (No Endless Loops):**  
   If the AI cannot fix a problem after 3 attempts, it stops, raises its hand, and asks a human for help. It never gets stuck in endless loops that waste time.

4. **Human Always Has the Final Say:**  
   The AI is strictly forbidden from saving or pushing changes to the project without your approval. It always stops, shows you what it did, and waits for your "Yes".

---

## Specialist Agent Team

Located in `.opencode/skills/`, each skill owns a single phase of the development lifecycle:

| Skill | Role | Focus | Direct CLI Trigger |
|---|---|---|---|
| **Nexus** | Orchestrator & AI Lead | Intent classification, chain selection, handoff validation, and delivery. | `/nexus "<task>"` |
| **Lens** | Codebase Explorer | Architecture mapping, dependency tracing, data flow discovery *(read-only)*. | `/lens "<question>"` |
| **Scout** | Bug Investigator | Root Cause Analysis (RCA) and reproduction steps without editing code *(read-only)*. | `/scout "<error>"` |
| **Spark** | Feature Analyst | Requirements refinement, acceptance criteria, and feature specs *(read-only)*. | `/spark "<idea>"` |
| **Sherpa** | Technical Planner | Decomposes complex tasks into $\le$15-minute atomic steps and prevents scope drift. | `/sherpa "<task>"` |
| **Builder** | Software Developer | Implements production code, business logic, entities, DTOs, and bug fixes. | `/builder "<action>"` |
| **Radar** | Test Engineer | Writes unit/integration tests, regression tests, edge cases, and verifies coverage. | `/radar "<test-goal>"` |
| **Judge** | Senior Code Reviewer | Multi-axis review: correctness, security, clean code, and zero dead code. | `/judge` |
| **Guardian** | Git & PR Gatekeeper | Branch strategy, Conventional Commits, and Draft PR generation with clean bodies. | `/guardian "<action>"` |
| **Sigil** | Meta-Skill Generator | Generates or updates project-specific agent instructions and `AGENTS.md` files. | `/sigil` |

---

## End-to-End Automated Pipeline

```text
                  Developer Prompt (Direct CLI Command)
                                    │
                                    ▼
                              ┌───────────┐
                              │   NEXUS   │ (AI Tech Lead)
                              └─────┬─────┘
           ┌────────────────────────┼────────────────────────┐
           │                        │                        │
         [BUG]                  [FEATURE]              [EXPLANATION]
           ▼                        ▼                        ▼
      ┌─────────┐              ┌─────────┐              ┌─────────┐
      │  Scout  │ (RCA)        │Lens /   │              │  Lens   │ ──► Done
      └────┬────┘              │Spark    │              └─────────┘
           │                   └────┬────┘
           │                        ▼
           │                   ┌─────────┐
           │                   │ Sherpa  │ (Atomic Steps)
           │                   └────┬────┘
           └───────────┬────────────┘
                       ▼
                 ┌───────────┐
                 │ Guardian  │ (Creates task branch: fix/* or feature/*)
                 └─────┬─────┘
                       ▼
                 ┌───────────┐
                 │  Builder  │ (Implements code changes)
                 └─────┬─────┘
                       ▼
                 ┌───────────┐
                 │   Radar   │ (Adds unit / regression tests)
                 └─────┬─────┘
                       ▼
             [    BUILD GATE    ] ── FAIL ──► (Back to Builder; max 3 retries)
             (mvn clean verify)
                       │ PASS
                       ▼
                 ┌───────────┐
                 │   Judge   │ (Reviews diff: correct, secure, clean)
                 └─────┬─────┘
                       │ PASS (Changes Requested ──► Back to Builder)
                       ▼
                 ┌───────────┐
                 │ Guardian  │ (Formats Conventional Commit & Draft PR)
                 └─────┬─────┘
                       ▼
         [ MANDATORY COMMIT GATE ] (Halts & requires human [Yes/No] approval)
                       │ APPROVED
                       ▼
                 ┌───────────┐
                 │ Draft PR  │ ──► Human Review & Merge
                 └───────────┘
```

---

## How to Run via CLI

You trigger the workflow directly in your terminal using **OpenCode CLI**:

```bash
# 1. Open your terminal in the repository root and start OpenCode:
opencode
```

### 1. Bug Fix
```bash
/nexus "Bug: Returning an overdue book causes HTTP 500. Find root cause, fix it, add tests, and prepare PR."
```
* **Execution:** `Guardian` (creates branch) $\rightarrow$ `Scout` (RCA) $\rightarrow$ `Builder` (fix) $\rightarrow$ `Radar` (regression test) $\rightarrow$ `Build Gate` $\rightarrow$ `Judge` (review) $\rightarrow$ `Guardian` (PR).

### 2. Feature Implementation
```bash
/nexus "Feature: Implement book reservation functionality for users when all copies are checked out."
```
* **Execution:** `Guardian` (creates branch) $\rightarrow$ `Lens` (explore) $\rightarrow$ `Spark` (spec) $\rightarrow$ `Sherpa` (atomic plan) $\rightarrow$ `Builder` (code) $\rightarrow$ `Radar` (tests) $\rightarrow$ `Build Gate` $\rightarrow$ `Judge` $\rightarrow$ `Guardian` (PR).

### 3. Refactoring
```bash
/nexus "Refactor: Extract exception response mapping in ControllerException into modular handler methods."
```
* **Execution:** `Lens` (baseline check) $\rightarrow$ `Builder` (refactor) $\rightarrow$ `Radar` (parity test) $\rightarrow$ `Build Gate` $\rightarrow$ `Judge` $\rightarrow$ `Guardian` (PR).  
*(Note: Scout and Spark are skipped—Nexus automatically selects only what is necessary).*

### 4. Autonomy Execution Modes

Prefix your command to adjust the level of human interaction:

| Mode | Command Syntax | Behavior |
|---|---|---|
| **AUTORUN_FULL** *(Default)* | `/nexus <task>` | Fully autonomous pipeline; pauses only at the final Commit Verification Gate. |
| **AUTORUN** | `## NEXUS_AUTORUN /nexus <task>` | Autonomous for straightforward tasks; auto-switches to Guided if complexity is high. |
| **Guided** | `## NEXUS_GUIDED /nexus <task>` | Pauses for confirmation at major milestones (e.g. before modifying code). |
| **Interactive** | `## NEXUS_INTERACTIVE /nexus <task>` | Step-by-step pair-programming mode; confirms each individual tool call. |

---

## Direct-Route to a Single Specialist

When you have a quick or narrowly focused task, **bypass Nexus** to eliminate coordination overhead and save tokens:

```bash
# Codebase exploration (Lens)
/lens "Explain how WebConfig and CORS are configured between frontend and backend"

# Root cause diagnosis (Scout)
/scout "Why does deleting a user fail when the user has an active library card?"

# Direct code edit (Builder)
/builder "Add @Pattern validation to authorName in BooksDTO to disallow special characters"

# Test coverage (Radar)
/radar "Write unit tests for LibraryManagementSystemServiceImpl.updateName using Mockito"

# Code review (Judge)
/judge "Review my current git diff against main before I commit"

# Commit & PR packaging (Guardian)
/guardian "Prepare Conventional Commit and Draft PR summary for the active branch"
```

---

## Quality & Safety Gates

To ensure code safety, the system enforces non-negotiable governance gates:

### 1. Mandatory Commit Verification Gate
Even in `AUTORUN_FULL`, **the AI cannot commit, push, or open a PR without human consent**:
1. It runs `git status` and presents the exact files to be staged.
2. It displays the proposed Conventional Commit message and Draft PR body.
3. It **stops and waits** for explicit user confirmation (`[Yes / No]`).

### 2. Real Build Gate
Code is never assumed to work. Before code review or PR preparation, the pipeline executes:
```bash
mvn clean verify    # Backend validation
npm test            # Frontend validation
```

### 3. Circuit Breaker & Retry Policy
If the build fails or `Judge` requests changes:
* The error is automatically routed back to `Builder` to fix.
* **Safety limit:** Maximum of **3 automatic retry attempts**. If still failing after 3 attempts, automation stops and escalates to a human engineer, preventing infinite token loops.

### 4. Branch & PR Hygiene
* Commits directly to `main` are strictly prohibited.
* Work is always isolated to `feature/*` or `fix/*` branches.
* All work concludes in a **Draft Pull Request** for human review and final merge.
* PR bodies are written using temporary body files (`gh pr create --body-file`) to prevent shell-escaping corruption.

---

## Project-Specific Instructions (AGENTS.md)

Project conventions and rules are recorded in:
* [`backend/AGENTS.md`](backend/AGENTS.md) — Spring Boot conventions, Lombok rules, exception handling, and Maven commands.
* [`frontend/AGENTS.md`](frontend/AGENTS.md) — React patterns, Bootstrap styling rules, and fetch API usage.

When repository architecture or conventions evolve, the **Sigil** agent (`/sigil`) can be run to automatically update these instruction files so the entire agent team stays aligned with the codebase.