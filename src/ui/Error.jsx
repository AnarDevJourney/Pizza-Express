import { useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  function handleGoBack() {
    navigate(-1);
  }
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={handleGoBack} className="text-blue-700 hover:underline">
        &larr; Go back
      </button>
    </div>
  );
};

export default Error;
