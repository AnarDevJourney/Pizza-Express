import { useNavigate } from "react-router-dom";
import { useRouteError } from "react-router-dom";

const RoutingError = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  function handleGoBack() {
    navigate(-1);
  }
  return (
    <div className="flex flex-col items-start p-4 gap-3">
      <h1>Something went wrong 🥲</h1>
      <p className="font-medium tracking-wider">
        {error.message || error.data}
      </p>
      <button onClick={handleGoBack} className="linkButton">
        &larr; Go back
      </button>
    </div>
  );
};

export default RoutingError;
