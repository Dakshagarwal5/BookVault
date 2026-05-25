import BookCard from './BookCard';

function BookList({ books, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>No books found</h3>
        <p>Try adjusting your search or filters, or add a new book to the library.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default BookList;
