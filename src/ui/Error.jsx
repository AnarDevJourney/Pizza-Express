const Error = ({ message, onRetry }) => {
  return (
    <div className="p-4">
      <p className="font-semibold">Error: {message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-2 link-button">
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
