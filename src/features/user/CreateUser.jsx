import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import routes from "../../Routes/routes";

// action for updating username in redux store
import { updateUsername } from "./userSlice";

const CreateUser = () => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleStartOrdering(e) {
    e.preventDefault();
    dispatch(updateUsername(username));
    navigate(routes.menu);
  }
  return (
    <form
      onSubmit={handleStartOrdering}
      className="flex flex-col gap-4 items-center"
    >
      <label htmlFor="username">
        👋 Welcome! Please start by telling us your name:
      </label>
      <input
        type="text"
        id="username"
        placeholder="Your full name"
        value={username}
        onChange={handleUsernameChange}
        className="input"
      />
      {username !== "" && (
        <button type="submit" className="btn-primary">
          Start ordering
        </button>
      )}
    </form>
  );
};

export default CreateUser;
