# 🧠 Smart Notes Summarizer & Study Assistant

An AI-powered study tool that transforms your notes or PDFs into summaries,
key points, keywords, and flashcards — powered by Google Gemini.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18 + Vite + Tailwind CSS    |
| Backend    | FastAPI (Python 3.11+)            |
| AI         | Google Gemini API                 |
| PDF Input  | PyMuPDF (text extraction)         |
| PDF Output | fpdf2 (summary PDF generation)    |

---

## Features

- ✅ Paste notes or upload a PDF
- ✅ Short / Medium / Detailed AI summaries
- ✅ Key Points extraction
- ✅ Keyword identification
- ✅ Interactive Flashcards (click to flip)
- ✅ Copy summary to clipboard
- ✅ Download results as a styled PDF
- ✅ Dark / Light mode toggle
- ✅ Fully responsive UI

---

## Quick Start

### Step 1 — Get a FREE Gemini API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the key — you'll need it in Step 3

---

### Step 2 — Start the Backend

```bash
cd backend
```
> Navigate into the backend folder.

```bash
pip install -r requirements.txt
```
> Installs all Python packages (FastAPI, Gemini SDK, PyMuPDF, fpdf2, etc.).

```bash
python run.py
```
> Starts the API server at **http://localhost:8000**
>
> - Interactive API docs: **http://localhost:8000/docs**
> - The server auto-reloads when you edit any `.py` file

---

### Step 3 — Add Your Gemini API Key

Create a new file at `backend/.env` (copy from the example):

```
GEMINI_API_KEY=paste-your-api-key-here
GEMINI_MODEL=gemini-1.5-flash
MAX_PDF_SIZE_MB=10
```

> ⚠️ Never commit your `.env` file — it's already in `.gitignore`

---

### Step 4 — Start the Frontend

Open a **new terminal window** (keep the backend running):

```bash
cd frontend
```
> Navigate into the frontend folder.

```bash
npm install
```
> Installs all JavaScript/React dependencies.

```bash
npm run dev
```
> Opens the app at **http://localhost:5173**

---

## Project Structure

```
ai-study-assistant/
├── frontend/           # React + Vite + Tailwind CSS app
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route-level pages
│   │   ├── services/   # API call functions
│   │   ├── hooks/      # Custom React hooks
│   │   └── utils/      # Helper functions
│   └── ...
├── backend/            # FastAPI Python server
│   ├── app/
│   │   ├── routes/     # API endpoints
│   │   ├── services/   # Business logic + AI calls
│   │   ├── models/     # Data models
│   │   └── utils/      # Config, prompts, exceptions
│   ├── run.py          # ← Start server with: python run.py
│   └── requirements.txt
└── README.md
```

---

## Both Servers Running?

| Server   | URL                          |
|----------|------------------------------|
| Backend  | http://localhost:8000        |
| API Docs | http://localhost:8000/docs   |
| Frontend | http://localhost:5173        |

---

*College Portfolio Project · Built with React & FastAPI*
