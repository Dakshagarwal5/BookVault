# 📚 BookVault — Book Management System

A clean, responsive **Book Management System** built with **React + Vite** that allows users to view, add, update, delete, search, and filter books. It integrates with a REST API (JSON Server for local dev, MockAPI for production) for full CRUD operations.

> Built as part of a React evaluation assignment.

---

## ✨ Features

- 📖 **View** all books in a beautiful, responsive grid
- ➕ **Add** new books with form validation
- ✏️ **Edit** existing book entries
- 🗑️ **Delete** books with a confirmation prompt
- 🔍 **Search** books by title or author (live filter)
- 🎯 **Filter** books by genre
- ⏳ Proper **loading states** and 🚨 **error handling**
- ✅ **Toast notifications** for user feedback
- 📱 Fully **responsive** design (mobile-first)
- 🎨 Refined, editorial-style UI with custom typography

---

## 🛠️ Tech Stack

| Layer        | Tech                                   |
|--------------|----------------------------------------|
| Framework    | React 18 + Vite                        |
| Routing      | React Router v6                        |
| HTTP Client  | Axios                                  |
| Notifications| react-toastify                         |
| Mock API     | JSON Server (local) / MockAPI (prod)   |
| Styling      | Plain CSS (custom design system)       |

---

## 📁 Project Structure

```
book-management-system/
├── public/
│   ├── book.svg              # Favicon
│   └── _redirects            # Netlify SPA routing
├── src/
│   ├── components/
│   │   ├── BookCard.jsx
│   │   ├── BookForm.jsx
│   │   ├── BookList.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   └── SearchFilter.jsx
│   ├── pages/
│   │   ├── AddBookPage.jsx
│   │   ├── BookListPage.jsx
│   │   ├── EditBookPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/
│   │   └── bookService.js    # Axios-based API layer
│   ├── hooks/
│   │   └── useBooks.js       # Custom fetch hook
│   ├── utils/
│   │   ├── constants.js      # Genre options, etc.
│   │   └── validation.js     # Form validation
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── db.json                   # JSON Server seed data
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vercel.json               # Vercel SPA routing
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** (comes with Node) or **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/book-management-system.git
cd book-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and edit if needed:

```bash
cp .env.example .env
```

Default contents (`.env`):
```
VITE_API_URL=http://localhost:5000
```

### 4. Start the mock API server (in one terminal)

```bash
npm run server
```

This starts **JSON Server** on `http://localhost:5000` using `db.json` as the data source. Endpoints available:

| Method | Endpoint        | Purpose         |
|--------|-----------------|-----------------|
| GET    | `/books`        | List all books  |
| GET    | `/books/:id`    | Get single book |
| POST   | `/books`        | Create a book   |
| PUT    | `/books/:id`    | Update a book   |
| DELETE | `/books/:id`    | Delete a book   |

### 5. Start the React app (in another terminal)

```bash
npm run dev
```

The app will open at **http://localhost:3000**.

---

## 🏗️ Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder. Preview it locally with:

```bash
npm run preview
```

---

## 🌐 Deployment

> ⚠️ **Important:** `json-server` doesn't run on Vercel/Netlify static hosting. For production, use a hosted REST mock API such as **[MockAPI.io](https://mockapi.io)**, **[Mocki](https://mocki.io)**, or deploy your own JSON Server to a service like **Render** or **Railway**.

### Step 1 — Set up a hosted mock API

The simplest option is **MockAPI.io**:

1. Sign up at [https://mockapi.io](https://mockapi.io)
2. Create a new project
3. Add a resource named **`books`** with these fields:
   - `title` (string)
   - `author` (string)
   - `genre` (string)
   - `year` (number)
4. Copy your endpoint URL (e.g. `https://abc123.mockapi.io/api/v1`)
5. (Optional) Seed it with the books from `db.json`

### Step 2 — Deploy to Vercel

1. Push the project to GitHub.
2. Go to [https://vercel.com/new](https://vercel.com/new) and import your repository.
3. Vercel auto-detects Vite — keep the defaults.
4. Under **Environment Variables**, add:
   ```
   VITE_API_URL = https://your-mockapi-id.mockapi.io/api/v1
   ```
5. Click **Deploy**. Done! 🎉

### Step 2b — Deploy to Netlify (alternative)

1. Push to GitHub.
2. Go to [https://app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**.
3. Build command: `npm run build` &nbsp;|&nbsp; Publish directory: `dist`
4. Add the environment variable `VITE_API_URL` with your MockAPI URL.
5. Deploy.

> The included `vercel.json` and `public/_redirects` handle client-side routing for React Router.

---

## 📜 Available Scripts

| Script           | Purpose                                  |
|------------------|------------------------------------------|
| `npm run dev`    | Start Vite dev server on port 3000       |
| `npm run server` | Start JSON Server mock API on port 5000  |
| `npm run build`  | Build the app for production             |
| `npm run preview`| Preview the production build locally     |

---

## 🧠 Design Decisions

- **Component structure** — each piece of UI is its own small, focused component (single responsibility).
- **Custom hook (`useBooks`)** — encapsulates fetching, loading & error state cleanly.
- **Service layer** — all API calls live in `bookService.js`, so components stay UI-focused. Axios interceptors normalize errors.
- **Validation** — separated into a pure function (`utils/validation.js`) for testability.
- **Env-driven API URL** — `VITE_API_URL` lets the same codebase work for local dev and production without changes.

---

## 🐛 Troubleshooting

**Books don't load and I see an error.**
Make sure JSON Server is running on port 5000 (`npm run server`) or that your `VITE_API_URL` env variable points to a reachable API.

**Port 3000 or 5000 already in use.**
Change the port in `vite.config.js` (for the app) or pass `--port` to the `server` script in `package.json`.

**Routing breaks on refresh in deployed site.**
This is handled by `vercel.json` (for Vercel) and `public/_redirects` (for Netlify). If you deploy elsewhere, configure SPA fallback to `index.html`.

---

## 📄 License

MIT — feel free to use this as a learning resource.

---

## 🙋 Submission Checklist

- ✅ GitHub repository link
- ✅ Live deployed URL
- ✅ This README with setup instructions

Built with care 💛
