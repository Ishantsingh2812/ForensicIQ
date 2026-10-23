# ForensicAI: AI-Powered Crime Analysis & Forensic Education Platform
### Tailored for Indian Criminal Jurisprudence (IPC ↔ BNS / BNSS / BSA 2023)

ForensicAI is a production-grade, accessible, and high-converting educational prototype designed for law students, forensic trainees, and police-academy learners. It allows learners to paste unstructured criminal incident narratives and receive structured statutory penal mapping, bailable/cognizable status, prosecution ingredient checklists, prioritized forensic collection protocols, and adversarial defense lawyer critiques.

> **EDUCATIONAL USE ONLY:** ForensicAI does NOT provide legal advice, representation, or formal court rulings. Consult a licensed advocate of the Bar Council of India for legal counsel.

---

## 1. System Architecture

```
                 ┌───────────────────────────────────────────┐
                 │            CLIENT / USER LAYER            │
                 │  React 19 + Vite + Tailwind (Port 5173)   │
                 └─────────────────────┬─────────────────────┘
                                       │ HTTPS / REST (JSON)
                                       │ JWT Authentication
                                       ▼
                 ┌───────────────────────────────────────────┐
                 │           SPRING BOOT CORE BACKEND        │
                 │            (Java 21 / Port 8080)          │
                 ├───────────────────────────────────────────┤
                 │ • Spring Security (JWT Auth & RBAC)       │
                 │ • RestController & Request Validation     │
                 │ • Spring Data JPA / Hibernate             │
                 │ • Audit Logging & PDF Report Exporter     │
                 └──────────────┬────────────────────┬───────┘
                                │                    │
          Internal REST Call    │                    │ JPA / JDBC
        (Spring RestClient/JSON)│                    ▼
                                │        ┌───────────────────────┐
                                │        │  PostgreSQL / MySQL   │
                                │        │ (Users, Cases, Audit) │
                                │        └───────────────────────┘
                                ▼
                 ┌───────────────────────────────────────────┐
                 │       PYTHON FASTAPI AI MICROSERVICE      │
                 │            (Python 3.11 / Port 8000)      │
                 ├───────────────────────────────────────────┤
                 │ • LangGraph Multi-Agent Orchestrator      │
                 │ • Fact Extractor Agent                    │
                 │ • Adversarial Defense Lawyer Agent        │
                 │ • Cohere / BGE Re-Ranker Engine           │
                 └──────────────┬────────────────────┬───────┘
                                │                    │
      Vector Similarity /       │                    │ API Calls (HTTPS)
      Hybrid Search (gRPC)      ▼                    ▼
                 ┌───────────────────────┐  ┌────────────────┐
                 │   Qdrant Vector DB    │  │ LLM Providers  │
                 │ (Legal & Case Embeds) │  │ (OpenAI/Claude)│
                 └───────────────────────┘  └────────────────┘
```

### 8-Step Request Flow
1. **React Client** submits scenario via `POST /api/cases/analyze` with JWT token.
2. **Spring Boot Core** verifies RBAC, checks Bucket4j rate limits, and dispatches internal REST call to FastAPI with `X-Internal-Token` and `X-Request-ID`.
3. **FastAPI (LangGraph)** extracts 5W1H facts and performs dense + sparse hybrid vector search against **Qdrant**.
4. **Qdrant** returns candidate statutory sections from IPC, BNS, BNSS, and BSA.
5. **Re-Ranker Engine** calculates cross-encoder scores and passes context to Legal Synthesizer & Adversarial Defense Lawyer Agent.
6. **LLM / Legal Heuristic Pipeline** synthesizes statutory charges, bailable/cognizable classifications, prosecution ingredients, and defense critiques.
7. **FastAPI** returns structured schema-validated JSON to **Spring Boot**.
8. **Spring Boot** persists case records, creates audit log entries (**strictly omitting raw scenario text** per DPDP Act 2023), and returns `AnalysisResult` to **React** for rendering.

---

## 2. Tech Stack

- **Frontend (`/frontend`):** React 19, Vite, TypeScript (strict), React Router v6.4, Tailwind CSS (custom forensic dark palette + light toggle), Lucide React, Framer Motion, `react-helmet-async`, Vitest, axe-core.
- **Backend (`/backend`):** Java 21, Spring Boot 3.3.4, Spring Security (stateless JWT + RBAC: `STUDENT`, `INSTRUCTOR`, `ADMIN`), Spring Data JPA, Flyway, Bucket4j rate limiting, OpenPDF report generation, springdoc-openapi (Swagger UI).
- **AI Microservice (`/ai-service`):** Python 3.11, FastAPI, Pydantic v2, LangGraph multi-agent pipeline, Qdrant client, hybrid dense+sparse retrieval.
- **Datastores:** PostgreSQL 16 & Qdrant vector database.

---

## 3. Quick Start Guide

### Option A: Run Everything with Docker Compose
```bash
# 1. Clone & copy environment settings
cp .env.example .env

# 2. Launch all 5 containers (Postgres, Qdrant, AI-Service, Backend, Frontend)
docker compose up --build
```
Access the application:
- **Frontend:** http://localhost:5173
- **Spring Boot Backend:** http://localhost:8080
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **FastAPI AI Service:** http://localhost:8000/docs
- **Qdrant Dashboard:** http://localhost:6333/dashboard

---

### Option B: Run Standalone Frontend in Mock Mode (Zero Docker Needed)
The frontend is built so `npm run dev` with mock mode runs 100% standalone out of the box:
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173`. You can immediately:
- Test the **Crime Analyzer** with sample scenarios ("Hit & Run", "NDPS Interception", "Corporate Extortion").
- Test real-time **PII Detection** (Aadhaar, PAN, phone, email) with one-click redaction.
- Inspect the **5 structured analysis cards** and open the **Sources / Citations Drawer**.
- Test the **Interactive Crime Scene Simulator** with interactive SVG hotspots and dynamic Chain-of-Custody integrity grading.
- Explore the **10+ Precedent Case Studies** across 5 categories.

---

### Option C: Run Local Spring Boot Backend & AI Service
```bash
# Backend (Java 21)
cd backend
mvn clean spring-boot:run

# AI Service (Python 3.11)
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --port 8000 --reload
```

---

## 4. Default Demo Personas

| Role | Email | Password | Clearance |
|---|---|---|---|
| **Student** | `student@policeacademy.gov.in` | `Password123!` | Scenario Analyzer, Simulator, Personal History |
| **Instructor** | `instructor@nludelhi.ac.in` | `Password123!` | All Student features + Case Study authoring |
| **Admin** | `admin@forensicai.in` | `Password123!` | Full system access + Security Audit Log viewer |

---

## 5. Security & DPDP Act 2023 Compliance

1. **Client-Side PII Redaction:** Regex patterns identify Indian Aadhaar (12 digits), PAN cards, phone numbers (+91 / 10-digit), and email addresses, offering immediate one-click anonymization.
2. **Zero Raw Text in Audit Logs:** Audit logs record user ID, email, action, case ID, IP address, and timestamps. **Raw scenario narratives are NEVER persisted in audit tables**.
3. **In-Memory JWT Tokens:** Access tokens live strictly in memory; refresh tokens are stored in `httpOnly`, `Secure`, `SameSite=Lax` cookies.
4. **Rate Limiting:** Bucket4j limits `/api/cases/analyze` submissions per IP to prevent service abuse.
5. **Prompt Injection Hardening:** Scenarios are strictly treated as data payloads inside the LangGraph pipeline and cannot override system instructions.

---

## 6. Running Frontend Tests
```bash
cd frontend
npm run test
```
Runs Vitest unit tests, PII detection verification, form validation, and `axe-core` accessibility checks.
