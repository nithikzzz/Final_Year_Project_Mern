import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phno, setPhno] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [authority, setAuthority] = useState(""); // State for authority
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, authority, password, cpassword, phno);
    alert("User added!");
  };

  return (
    <>
      <div className="body">
        <div className="container">
          <form onSubmit={handleSubmit} className="addform">
            <h3 className="h3">Add Users</h3>

            {/* Dropdown for selecting authority */}
            <select
              value={authority}
              onChange={(e) => setAuthority(e.target.value)}
              className="addinput"
            >
              <option value="" className="addinput">
                Select Authority
              </option>
              <option value="authorised" className="addinput">
                Authorised
              </option>
              <option value="unauthorised" className="addinput">
                Unauthorised
              </option>
            </select>

            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              className="addinput"
            />
            <br />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="addinput"
            />
            <br />

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="addinput"
            />
            <br />
            <input
              type="password"
              onChange={(e) => setCpassword(e.target.value)}
              value={cpassword}
              placeholder="Confirm Password"
              className="addinput"
            />
            <br />
            <input
              type="number"
              onChange={(e) => setPhno(e.target.value)}
              value={phno}
              placeholder="Mobile Number"
              className="addinput"
            />
            <br />
            <button type="submit" className="adduser" disabled={isLoading}>
              Add Users
            </button>

            {error && <div className="error">{error}</div>}
            <br />
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
