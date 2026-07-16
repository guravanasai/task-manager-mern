import { useState } from "react";
import axios from "axios";

function Signup({ setToken, setIsLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!name || !email || !password) return "All fields are required";
    if (name.length < 3) return "Name must be at least 3 characters";
    if (!email.includes("@")) return "Invalid email";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const registerUser = async () => {
  const validationError = validate();
  if (validationError) {
    setError(validationError);
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password,
    });

    setError("");
    alert("Signup successful 🎉");

    // ✅ ADD THIS LINE
    localStorage.setItem("user", JSON.stringify(res.data.user));

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);

  } catch (err) {
    setError(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={registerUser}>Signup</button>

      <p>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setIsLogin(true)}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;