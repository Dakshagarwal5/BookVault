import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar.jsx';
import BookListPage from './pages/BookListPage.jsx';
import AddBookPage from './pages/AddBookPage.jsx';
import EditBookPage from './pages/EditBookPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<BookListPage />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/edit/:id" element={<EditBookPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>BookVault &copy; {new Date().getFullYear()} &middot; Crafted with React + Vite</p>
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        theme="light"
      />
    </div>
  );
}

export default App;
