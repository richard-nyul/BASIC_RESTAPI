import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Checking if the user is currently logged in when the component is mounting

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message);
    } else if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
  };
  return (
    <div>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="username">
          Username
          <input
            name="username"
            id="username"
            type="text"
            placeholder="user1"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            name="password"
            id="password"
            type="password"
            placeholder="password123"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
