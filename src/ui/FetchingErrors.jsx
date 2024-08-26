const FetchingErrors = ({ message, retry }) => {
  return (
    <div className="flex flex-col items-start p-4 gap-3">
      <h1>Something went wrong 🥲</h1>
      <p className="font-medium tracking-wider">{message}</p>
      <button onClick={retry} className="linkButton">
        Retry
      </button>
    </div>
  );
};

export default FetchingErrors;
