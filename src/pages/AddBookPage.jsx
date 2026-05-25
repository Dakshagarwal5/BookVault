import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import BookForm from '../components/BookForm';
import { bookService } from '../services/bookService';

function AddBookPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (book) => {
    try {
      setIsSubmitting(true);
      await bookService.create(book);
      toast.success('Book added to your library!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to add book');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">New Entry</p>
        <h1 className="page-title">Add a book to your shelf</h1>
        <p className="page-subtitle">
          Fill in the details below. All fields are required.
        </p>
      </header>
      <div className="form-card">
        <BookForm
          onSubmit={handleSubmit}
          submitLabel="Add Book"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

export default AddBookPage;
