
# 🔐 Password Manager

A **full-stack Password Manager application** that allows users to securely store, view, copy, edit, and delete passwords.
The project is built using **React (Frontend)**, **Express.js (Backend)**, and **MongoDB** with a clean  API architecture.

---

## 🚀 Features

* ➕ Add new passwords (site, username, password)
* 👀 View all saved passwords
* ✏️ Edit existing passwords
* 🗑️ Delete passwords
* 📋 One-click copy (site / username / password)
* 🔐 Backend powered by MongoDB
* 🌐 API integration
* 🎨 Clean and responsive UI
* 🔔 Toast notifications for actions

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Tailwind CSS**
* **Font Awesome Icons**
* **Lord Icons**
* **React Toastify**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **CORS**
* **dotenv**

### Database

* **MongoDB**
* **MongoDB Compass**

---

## 📁 Project Structure

```
Password-Manager/
│
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Manager.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend API Endpoints

| Method | Endpoint | Description                      |
| ------ | -------- | -------------------------------- |
| GET    | `/`      | Get all passwords                |
| POST   | `/`      | Save a new password              |
| DELETE | `/:id`   | Delete password by MongoDB `_id` |

---

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Sourishharh/Password-Manager.git
cd Password-Manager
```

---

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:

```env
MONGO_URL=mongodb://MONGO_URL/password_manager
```

Run backend:

```bash
nodemon server.js
```

Backend runs on:

```
http://localhost:3000
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

---

## 📌 Learning Outcomes

* Full-stack CRUD application
* API design
* MongoDB native driver usage
* React–Backend integration
* Deployment architecture
* Debugging real-world issues

---

## 🙌 Author

**Sourish Harh**
GitHub: [@Sourishharh](https://github.com/Sourishharh)

---

