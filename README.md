# 🪖 Military Asset Management System

## 📌 Overview

A full-stack system to manage military assets like vehicles, weapons, and ammunition across multiple bases with secure role-based access.

---

# 🚀 Full Example Workflow

## 🧪 Step 1: Add Purchase

### Request

POST `/purchases`

```json
{
  "assetName": "Tata Truck",
  "quantity": 100,
  "base": "Base Zebra"
}
```

### Result in Database

```json
{
  "assetName": "Tata Truck",
  "quantity": 100,
  "base": "Base Zebra"
}
```

---

## 🔁 Step 2: Transfer Assets

### Request

POST `/transfers`

```json
{
  "assetName": "Tata Truck",
  "quantity": 20,
  "fromBase": "Base Zebra",
  "toBase": "Base Alpha",
  "type": "OUT"
}
```

---

## 🎯 Step 3: Assign Asset

### Request

POST `/assignments`

```json
{
  "assetName": "Tata Truck",
  "personName": "Soldier A",
  "base": "Base Alpha",
  "status": "assigned"
}
```

---

## 💥 Step 4: Mark as Expended

```json
{
  "assetName": "Tata Truck",
  "personName": "Soldier A",
  "base": "Base Alpha",
  "status": "expended"
}
```

---

## 📊 Step 5: Dashboard Calculation

### Formula

```
Closing = Purchases + Transfers IN - Transfers OUT - Expended
Net Movement = Closing - Opening
```

---

### Example Calculation

| Type          | Value |
| ------------- | ----- |
| Purchases     | 100   |
| Transfers OUT | 20    |
| Expended      | 1     |

👉 Result:

```json
{
  "opening": 100,
  "closing": 79,
  "net": -21
}
```

---

# 🔐 Role-Based Access Control (RBAC)

| Role              | Access                     |
| ----------------- | -------------------------- |
| Admin             | Full system access         |
| Base Commander    | Only their base data       |
| Logistics Officer | Purchases & Transfers only |

---

## 🧪 Example Login

POST `/auth/login`

```json
{
  "username": "admin",
  "password": "adminpassword"
}
```

### Response

```json
{
  "token": "JWT_TOKEN_HERE"
}
```

---

## 🔑 Using Token

```http
Authorization: Bearer JWT_TOKEN_HERE
```

---

# 🛠️ Tech Stack

Frontend:

- React.js

Backend:

- Node.js + Express

Database:

- MongoDB

Security:

- JWT + bcryptjs

---

# ⚙️ Setup

## Backend

```bash
cd backend
npm install
```

`.env`

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=secret
```

Run:

```bash
npx nodemon server.js
```

---

## Frontend

```bash
cd frontend
npm install
npm start
```

`.env`

```
REACT_APP_API_URL=http://localhost:5000
```

---

# 📂 Project Structure

```
backend/
  models/
  routes/
  middleware/

frontend/
  src/
```

---

# 🎯 Key Highlights

✔ Real-world military logistics system
✔ Full CRUD operations
✔ JWT Authentication
✔ Role-Based Access Control
✔ MongoDB aggregation for dashboard

---

# 👨‍💻 Author

Sufiyan Ansari

---

# ⭐ Final Note

This project demonstrates backend architecture, security, and full-stack development skills suitable for real-world applications.
