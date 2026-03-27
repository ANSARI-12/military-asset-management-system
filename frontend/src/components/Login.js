import React, { useState } from "react";
import { loginUser, registerUser, logoutUser } from "../api";

const Login = ({ onLogin, user }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "officer",
    base: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let data;
      if (isLogin) {
        data = await loginUser({
          username: formData.username,
          password: formData.password,
        });
      } else {
        data = await registerUser(formData);
      }
      if (onLogin) onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h3>
          Welcome, {user.username} ({user.role})
        </h3>
        <button
          onClick={() => {
            logoutUser();
            if (onLogin) onLogin(null);
          }}
          style={{
            padding: "10px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setError("");
        }}
        style={{
          float: "right",
          background: "none",
          border: "none",
          fontSize: "18px",
        }}
      >
        {isLogin ? "Register" : "Login"}
      </button>
      <h3>{isLogin ? "Login" : "Register"}</h3>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
        {!isLogin && (
          <>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            >
              <option value="officer">Officer</option>
              <option value="commander">Commander</option>
              <option value="admin">Admin</option>
            </select>
            <input
              name="base"
              placeholder="Base (for commanders)"
              value={formData.base}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Login;
