import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GENRES, CURRENT_YEAR } from '../utils/constants';
import { validateBook } from '../utils/validation';

const initialState = {
  title: '',
  author: '',
  genre: '',
  year: '',
};

function BookForm({ initialData = null, onSubmit, submitLabel = 'Save Book', isSubmitting = false }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        author: initialData.author || '',
        genre: initialData.genre || '',
        year: initialData.year || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateBook(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      ...formData,
      title: formData.title.trim(),
      author: formData.author.trim(),
      year: Number(formData.year),
    });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="title">Book Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. The Great Gatsby"
          className={errors.title ? 'has-error' : ''}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="e.g. F. Scott Fitzgerald"
          className={errors.author ? 'has-error' : ''}
        />
        {errors.author && <span className="error-text">{errors.author}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className={errors.genre ? 'has-error' : ''}
          >
            <option value="">Select a genre</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && <span className="error-text">{errors.genre}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="year">Publication Year</label>
          <input
            id="year"
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1000"
            max={CURRENT_YEAR}
            placeholder={`e.g. ${CURRENT_YEAR - 5}`}
            className={errors.year ? 'has-error' : ''}
          />
          {errors.year && <span className="error-text">{errors.year}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/')}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default BookForm;
