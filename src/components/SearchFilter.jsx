import { GENRES } from '../utils/constants';

function SearchFilter({ searchTerm, onSearchChange, selectedGenre, onGenreChange, totalCount, filteredCount }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar-row">
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search books"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <select
          className="genre-select"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          aria-label="Filter by genre"
        >
          <option value="">All Genres</option>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <p className="filter-result-count">
        Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> books
      </p>
    </div>
  );
}

export default SearchFilter;
