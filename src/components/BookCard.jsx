import { Link } from 'react-router-dom';

function BookCard({ book, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Delete "${book.title}"? This cannot be undone.`)) {
      onDelete(book.id);
    }
  };

  return (
    <article className="book-card">
      <div className="book-card-header">
        <span className="book-genre-tag">{book.genre}</span>
        <span className="book-year">{book.year}</span>
      </div>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>
      <div className="book-card-actions">
        <Link to={`/edit/${book.id}`} className="btn btn-secondary btn-sm">
          Edit
        </Link>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default BookCard;
