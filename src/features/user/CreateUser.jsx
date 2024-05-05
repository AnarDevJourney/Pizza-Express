import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUsername } from "./userSlice";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateUsername(username));
    navigate("/menu");
  }
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <p className="text-stone-500 md:text-xl">
        👋 Welcome! Please start by telling us your name:
      </p>
      <input
        type="text"
        placeholder="Your full name"
        onChange={handleUsernameChange}
        value={username}
        className="input mt-3 w-64"
      />
      {username !== "" && (
        <div className="mt-5">
          <button type="submit" className="button">
            Start Ordering
          </button>
        </div>
      )}
    </form>
  );
};

export default CreateUser;
