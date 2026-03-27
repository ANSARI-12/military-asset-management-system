const API = process.env.REACT_APP_API_URL || "http://localhost:3000";

const getToken = () => localStorage.getItem("token");

const withAuth = (input, init) => {
  const token = getToken();
  init = init || {};
  init.headers = {
    ...init.headers,
    "Content-Type": "application/json",
  };
  if (token) {
    init.headers.Authorization = `Bearer ${token}`;
  }
  return fetch(input, init);
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data = await res.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data = await res.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getPurchases = async () => {
  const res = await withAuth(`${API}/purchases`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const addPurchase = async (data) => {
  const res = await withAuth(`${API}/purchases`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
};

export const addTransfer = async (data) => {
  const res = await withAuth(`${API}/transfers`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
};

export const addAssignment = async (data) => {
  const res = await withAuth(`${API}/assignments`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
};

export const getDashboard = async () => {
  const res = await withAuth(`${API}/dashboard`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};
