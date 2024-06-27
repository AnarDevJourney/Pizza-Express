import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUsername } from "./userSlice";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  // State to hold the username input value
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Handler function to update the username state as the input value changes
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  // Handler function to submit the form
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return; // If username is empty, do nothing
    dispatch(updateUsername(username)); // Dispatch action to update username in Redux store
    navigate("/menu"); // Navigate to the menu page after updating username
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {/* Welcome message */}
      <p className="text-stone-500 md:text-xl">
        👋 Welcome! Please start by telling us your name:
      </p>
      {/* Input field for entering username */}
      <input
        type="text"
        placeholder="Your full name"
        onChange={handleUsernameChange}
        value={username}
        className="input mt-3 w-64"
      />
      {/* Submit button, only enabled if username is not empty */}
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
