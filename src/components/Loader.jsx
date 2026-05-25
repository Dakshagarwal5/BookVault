function Loader({ message = 'Loading...' }) {
  return (
    <div className="loader-wrapper">
      <div className="loader-spinner" aria-hidden="true"></div>
      <p>{message}</p>
    </div>
  );
}

export default Loader;
