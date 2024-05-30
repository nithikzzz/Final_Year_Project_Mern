import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [loggedInEmail, setLoggedInEmail] = useState(""); // State to store logged-in user's email

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    setLoggedInEmail(email);
    console.log("Logged In Email:", loggedInEmail); // Store the logged-in user's email
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="loginform">
          <p>Log In</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="input"
          />
          <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="input"
          />
          <br />
          <button type="submit" className="login" disabled={isLoading}>
            Log In
          </button>

          {error && <div className="error">{error}</div>}
          <br />
        </form>
      </div>
    </>
  );
};

export default Login;
