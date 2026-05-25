function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-icon">⚠️</div>
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
