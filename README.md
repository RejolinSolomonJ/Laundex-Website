# Laundex - Smart Laundry Management Web App

Laundex is a modern, tech-driven laundry management platform that simplifies the entire laundry process through a seamless digital experience. The platform connects customers with professional laundry service providers while enabling efficient order management, workforce coordination, real-time tracking, secure payments, and automated scheduling.

The application provides dedicated dashboards for **Customers**, **Workers**, and **Administrators**, ensuring smooth workflow management from order placement to final delivery.

---

## Badges

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-success)

---

# Features

## Customer

- User Registration & Login
- JWT Authentication
- Book Laundry Orders
- Pickup & Delivery Scheduling
- Order Tracking
- Online Payment
- View Order History
- Profile Management

---

## Worker

- Worker Login
- View Assigned Orders
- Accept Orders
- Update Washing Status
- Update Drying Status
- Update Ironing Status
- Update Delivery Status
- View Completed Orders

---

## Admin

- Dashboard
- Manage Customers
- Manage Workers
- Manage Laundry Services
- Assign Orders
- Manage Pricing
- Monitor Payments
- View Reports
- Analytics Dashboard

---

# Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Router DOM
- Axios

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- Multer

## Database

- MongoDB Atlas
- Mongoose ODM

## Hosting

- Frontend : Vercel
- Backend : Render
- Database : MongoDB Atlas

---

# System Architecture

```
                          +--------------------------------+
                          |          Customers             |
                          |            Workers             |
                          |             Admin              |
                          +---------------+----------------+
                                          |
                                          |
                                   HTTPS Requests
                                          |
                                          ▼
+---------------------------------------------------------------+
|                    React.js Frontend                          |
|---------------------------------------------------------------|
| Customer Dashboard                                            |
| Worker Dashboard                                              |
| Admin Dashboard                                               |
| Authentication                                                |
| Order Management UI                                           |
| Payment Interface                                             |
+-----------------------------+---------------------------------+
                              |
                         REST API (Axios)
                              |
                              ▼
+---------------------------------------------------------------+
|                 Node.js + Express.js Backend                  |
|---------------------------------------------------------------|
| Authentication (JWT)                                          |
| User Management                                               |
| Worker Management                                             |
| Order Management                                              |
| Pickup Scheduling                                             |
| Delivery Scheduling                                           |
| Payment Processing                                            |
| Notifications                                                 |
| Admin Controller                                              |
+-----------------------------+---------------------------------+
                              |
                           Mongoose
                              |
                              ▼
+---------------------------------------------------------------+
|                    MongoDB Atlas Database                     |
|---------------------------------------------------------------|
| Users Collection                                              |
| Workers Collection                                            |
| Orders Collection                                             |
| Services Collection                                           |
| Payments Collection                                           |
| Notifications Collection                                      |
+-----------------------------+---------------------------------+
                              |
                              ▼
+---------------------------------------------------------------+
|                  Third Party Integrations                     |
|---------------------------------------------------------------|
| Razorpay / Easebuzz                                           |
| Email Service                                                 |
| SMS Service                                                   |
| Google Maps API                                               |
+---------------------------------------------------------------+
```

---

# Architecture Workflow

### Step 1

Customers access the Laundex web application through a browser.

### Step 2

Users authenticate using JWT-based login.

### Step 3

Customers create laundry orders by selecting services, pickup date, and delivery preferences.

### Step 4

The backend validates the request and stores the order in MongoDB Atlas.

### Step 5

The admin assigns the order to an available worker.

### Step 6

Workers update the order progress through different stages:

- Order Accepted
- Pickup Completed
- Washing
- Drying
- Ironing
- Ready for Delivery
- Delivered

### Step 7

Customers receive live order updates.

### Step 8

Payments are processed securely using an integrated payment gateway.

### Step 9

Administrators monitor analytics and generate reports.

---

# Project Structure

```
Laundex-Website/

│
├── frontend/
│   ├── public/
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   │      ├── Customer/
│   │      ├── Worker/
│   │      └── Admin/
│   │
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── backend/
│
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── README.md
└── package.json
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/RejolinSolomonJ/Laundex-Website.git
```

```
cd Laundex-Website
```

---

## Install Frontend

```
cd frontend
npm install
```

---

## Install Backend

```
cd backend
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

## Start Backend

```
npm run server
```

---

## Start Frontend

```
npm run dev
```

---

# Database Collections

### Users

- Name
- Email
- Password
- Phone
- Address

---

### Workers

- Name
- Email
- Phone
- Assigned Orders
- Status

---

### Orders

- Order ID
- Customer
- Services
- Pickup Date
- Delivery Date
- Status
- Total Amount

---

### Payments

- Payment ID
- Order ID
- Amount
- Method
- Payment Status

---

### Notifications

- Notification ID
- User ID
- Message
- Date

---

# API Modules

## Authentication

- Register
- Login
- Logout
- Forgot Password

---

## Customer

- Create Order
- Track Order
- Payment
- Order History

---

## Worker

- Accept Order
- Update Status
- Complete Delivery

---

## Admin

- Manage Users
- Manage Workers
- Manage Services
- Assign Orders
- Reports
- Analytics

---

# Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Input Validation
- MongoDB Injection Protection
- CORS Enabled

---

# Future Enhancements

- AI-based Pickup Route Optimization
- Laundry Subscription Plans
- Mobile Application
- QR Code Order Tracking
- WhatsApp Notifications
- Voice Assistant
- Customer Loyalty Program
- Machine Learning Demand Prediction

---

# Live Demo

https://www.laundex.in

---

# Contributing

Contributions are welcome.

1. Fork the repository.

2. Create a feature branch.

```
git checkout -b feature-name
```

3. Commit changes.

```
git commit -m "Added feature"
```

4. Push to GitHub.

```
git push origin feature-name
```

5. Create a Pull Request.

---

# License

This project is licensed under the MIT License.

---

# Developer

## Rejolin Solomon J

Founder & CEO — Lin's Infotechs

- Full Stack Developer
- AI Solutions Developer
- Google Developer Groups (GDG) Organizer
- Student Convenor — Institution's Innovation Council (IIC)

### GitHub

https://github.com/RejolinSolomonJ

### Website

https://www.laundex.in

### LinkedIn

https://www.linkedin.com/in/rejolinsolomonj

---

© 2026 Laundex. All Rights Reserved.
