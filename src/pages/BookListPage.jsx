import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';

import useBooks from '../hooks/useBooks';
import { bookService } from '../services/bookService';
import BookList from '../components/BookList';
import SearchFilter from '../components/SearchFilter';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function BookListPage() {
  const { books, loading, error, refetch } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredBooks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return books.filter((book) => {
      const matchesSearch =
        !term ||
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term);
      const matchesGenre = !selectedGenre || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [books, searchTerm, selectedGenre]);

  const handleDelete = async (id) => {
    try {
      await bookService.remove(id);
      toast.success('Book deleted successfully');
      refetch();
    } catch (err) {
      toast.error(err.message || 'Failed to delete book');
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Your Library</p>
          <h1 className="page-title">Every story has a place here.</h1>
          <p className="page-subtitle">
            Browse, search and curate your personal collection of books.
          </p>
        </div>
      </header>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        totalCount={books.length}
        filteredCount={filteredBooks.length}
      />

      {loading && <Loader message="Loading your library..." />}
      {error && !loading && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && (
        <BookList books={filteredBooks} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default BookListPage;
