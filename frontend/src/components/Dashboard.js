import React, { useEffect, useState } from "react";
import { getDashboard } from "../api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const dashboardData = await getDashboard();
        console.log("Dashboard Data:", dashboardData);
        setData(dashboardData);
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Opening: {data.opening ?? 0}</p>
      <p>Closing: {data.closing ?? 0}</p>
      <p>Net Movement: {data.net ?? 0}</p>
    </div>
  );
}

export default Dashboard;
