# ✈️ Airforce Assignment Monitor

A full-stack web application that allows users to input and visualize flight data (altitude, HSI, ADI). Built with **React, TypeScript** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## 🛠 Features

- Enter altitude, HSI (compass), and ADI (attitude indicator) values
- Visual and text-based tabs to display data
- Server-side validation to ensure safe and accurate inputs
- Real-time styled visual indicators
- Responsive UI with popovers for data input
  
---

## ⚙️ Tech Stack

**Frontend:**
- React
- TypeScript
- CSS Modules

**Backend:**
- Node.js
- Express
- MongoDB (via Mongoose)
- CORS

---

## 🚀 Getting Started

### 1. Clone or manually download the repo
```
git clone https://github.com/YardenDrori/Airforce-Assignment.git
cd Airforce-Assignment
```
### 2. Set up the backend
```
cd monitor-backend
node server.js
```
The backend runs on ```http://localhost:8080```
Make sure MongoDB is running locally at ```mongodb://localhost:27017/FlightData``` (default for mongodb local)
If error message is shown in the server terminal then it is very likely that mongodb is either not installed or not running so double check!!!
### 3. Set up the frontend
```
cd monitor-frontend
npm start
```
The frontend runs on ```http://localhost:3000```

---
## ⚠️Requirements / Dependencies 
1) node.js is required for the **npm** and **node** commands to work.
2) mongodb should be installed and running **locally** at ```mongodb://localhost:27017/FlightData``` which is the default local host adress for mongodb.

note: intended to run in chrome or chromium based web browsers

---
## 📸 Screenshots

<img width="1920" alt="Screenshot 2025-03-29 at 6 36 00 PM" src="https://github.com/user-attachments/assets/6265bcb5-64b1-4d58-956a-f31c076468ac" />
<img width="1920" alt="Screenshot 2025-03-29 at 6 35 54 PM" src="https://github.com/user-attachments/assets/2fd6a337-e4c2-464d-ba6f-a0f660f1295f" />
<img width="1920" alt="Screenshot 2025-03-29 at 6 35 47 PM" src="https://github.com/user-attachments/assets/cd76d42d-1726-4afe-bec9-0b86c45f9653" />
