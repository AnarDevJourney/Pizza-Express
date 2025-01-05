import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="p-4">
      <Link to="/" className="link-button">
        &larr; Back to home page
      </Link>
      <p className="mt-7 font-semibold">Page Not Found</p>
    </div>
  );
};

export default PageNotFound;
