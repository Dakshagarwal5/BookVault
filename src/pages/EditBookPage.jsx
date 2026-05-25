import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import BookForm from '../components/BookForm';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { bookService } from '../services/bookService';

function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookService.getById(id);
        if (!cancelled) setBook(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load book');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchBook();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSubmit = async (updatedBook) => {
    try {
      setIsSubmitting(true);
      await bookService.update(id, { ...updatedBook, id });
      toast.success('Book updated successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Failed to update book');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader message="Loading book details..." />;
  if (error)
    return (
      <div className="page">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Edit Entry</p>
        <h1 className="page-title">Update book details</h1>
        <p className="page-subtitle">Make changes and save when you're ready.</p>
      </header>
      <div className="form-card">
        <BookForm
          initialData={book}
          onSubmit={handleSubmit}
          submitLabel="Update Book"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

export default EditBookPage;
