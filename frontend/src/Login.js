import { useState } from "react";
import axios from "axios";

function Login({ setToken, setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email || !password) return "All fields are required";
    if (!email.includes("@")) return "Invalid email";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const loginUser = async () => {
  const validationError = validate();
  if (validationError) {
    setError(validationError);
    return;
  }

  try {
    const res = await axios.post("https://task-manager-mern-sf59.onrender.com/api/auth/login", {
      email,
      password,
    });

    // ✅ ADD THIS LINE
    localStorage.setItem("user", JSON.stringify(res.data.user));

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);

  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginUser}>Login</button>

      <p>
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </span>
      </p>
    </div>
  );
}

export default Login;