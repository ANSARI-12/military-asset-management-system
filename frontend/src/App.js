import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Purchase from "./components/Purchase";
import Transfer from "./components/Transfer";
import Assignment from "./components/Assignment";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Military Asset Management System</h1>

      <Login onLogin={setUser} user={user} />

      {user && (
        <>
          <hr />
          <Dashboard />
          <hr />
          <Purchase />
          <hr />
          <Transfer />
          <hr />
          <Assignment />
        </>
      )}
    </div>
  );
}

export default App;
