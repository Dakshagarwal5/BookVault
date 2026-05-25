import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page not-found">
      <h1 className="page-title">404</h1>
      <p className="page-subtitle">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to Library
      </Link>
    </div>
  );
}

export default NotFoundPage;
