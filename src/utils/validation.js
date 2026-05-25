import { CURRENT_YEAR } from './constants';

export function validateBook(book) {
  const errors = {};

  if (!book.title || !book.title.trim()) {
    errors.title = 'Title is required';
  } else if (book.title.trim().length < 2) {
    errors.title = 'Title must be at least 2 characters';
  }

  if (!book.author || !book.author.trim()) {
    errors.author = 'Author is required';
  }

  if (!book.genre || !book.genre.trim()) {
    errors.genre = 'Please select a genre';
  }

  const year = Number(book.year);
  if (!book.year) {
    errors.year = 'Publication year is required';
  } else if (isNaN(year) || year < 1000 || year > CURRENT_YEAR) {
    errors.year = `Year must be between 1000 and ${CURRENT_YEAR}`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
