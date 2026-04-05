# 🏡 Real Estate Project

![Node.js](https://img.shields.io/badge/Node.js-v25.3.0-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v18.1-blue)
![npm](https://img.shields.io/badge/npm-v11.7.0-red)
![npx](https://img.shields.io/badge/npx-v11.7.0-orange)

---

## 📖 Overview

A full-stack real estate application built using **React**, **Node.js**, **Express**, and **PostgreSQL**.

---

## 💻 Tech Stack

* **Frontend:** React.js, Bootstrap, Bootstrap Icons
* **Backend:** Node.js, Express
* **Database:** PostgreSQL

---

## ⚙️ System Requirements

* Node.js v25.3.0
* PostgreSQL v18.1
* npm v11.7.0
* npx v11.7.0

---

## 🚀 Setup & Installation

Setup database:
```
CREATE DATABASE realestate;
```

Run the following commands from the project root:
```
node initdb.cjs
npm install
```

This will:

* Create the required database
* Initialize tables and seed data
* Install all dependencies

---

## 🏗 Running the Application

Start both frontend and backend:

```
npm run dev
nodemon server.cjs
```

Or without nodemon:

```
npm run dev
node server.cjs
```

---

## 🌐 Application URLs

* Frontend → http://localhost:5173
* Backend → http://localhost:3000

---

## ⚠️ Configuration Notes

* If you wish to change the backend port, also update the proxy settings in `vite.config.js`.
* Ensure PostgreSQL is running before executing initialization scripts.

---

## 📂 Project Structure

```
root/
├── server.cjs
├── db
    ├── initdb.cjs
    ├── db.cjs
├── src                   # React frontend
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## ✅ Developer Tips

* Use `nodemon` for automatic backend reloads during development
* Keep environment variables (if added later) in a `.env` file
* Ensure database credentials match your PostgreSQL setup in /db/db.cjs
