import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Function for updating username in Redux store
import { updateName } from "./userSlice";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-sm md:text-base text-stone-600 mb-4">
        👋 Welcome! Please start by telling us your name:
      </p>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Your full name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input mb-8"
        />
        {username && (
          <button type="submit" className="btn primary">
            Start Ordering
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateUser;
