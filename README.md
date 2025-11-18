# 🌱 FarmConnect – Smart Agri Market Platform

### 📍 Sector: AgriTech

### 🎯 SDGs: **SDG 2 – Zero Hunger** & **SDG 12 – Responsible Consumption and Production**

---

## 🧭 Overview

**FarmConnect** is a MERN-stack web application that bridges the gap between **farmers and buyers** through a transparent, digital marketplace.
It enables local farmers to list produce, buyers to place orders directly, and both parties to communicate efficiently — promoting fair trade, reduced waste, and sustainable food systems.

---

## 🚨 Problem Statement

Small-scale farmers often face challenges such as:

- Unfair middlemen practices
- Lack of access to reliable buyers
- Poor logistics and post-harvest losses

Meanwhile, buyers and retailers struggle to find affordable, high-quality produce directly from the source.
**FarmConnect** solves this by building a digital bridge for transparent and efficient agri-commerce.

---

## 💡 Solution

FarmConnect provides:

- Direct farmer-to-buyer connections
- Fair, transparent pricing
- Real-time order tracking and communication
- Market analytics and insights for better decision-making

---

## ⚙️ Core Features

| Module                     | Description                                                           |
| -------------------------- | --------------------------------------------------------------------- | --- |
| 👨‍🌾 **Farmer Dashboard**    | Add, edit, and manage produce listings; track demand and sales.       |
| 🛒 **Buyer Dashboard**     | Browse available produce, place orders, and communicate with farmers. |
| 💬 **Chat System**         | Real-time messaging between farmers and buyers (Socket.io).           |
| 📊 **Analytics Dashboard** | Track orders, trends, and popular crops (Chart.js).                   |     |
| 🔔 **Notifications**       | Order status updates and price alerts.                                |
| 🧑‍💻 **Admin Panel**         | Manage users, listings, and system activity.                          |

---

## 🧩 System Architecture (MERN)

**Frontend:** React + Tailwind CSS
**Backend:** Node.js + Express.js
**Database:** MongoDB Atlas
**Authentication:** JWT + bcrypt
**Storage:** Cloudinary (images)
**Real-time:** Socket.io (chat, notifications)

---

## 🗂️ Database Schema Overview

### 🧑‍🌾 `User`

```js
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['farmer', 'buyer', 'admin'] },
  location: String,
  phone: String,
  verified: Boolean,
  createdAt: Date
}
```

### 🌾 `Product`

```js
{
  _id: ObjectId,
  farmerId: ObjectId,
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  unit: String,
  description: String,
  imageUrl: String,
  available: Boolean,
  createdAt: Date
}
```

### 📦 `Order`

```js
{
  _id: ObjectId,
  buyerId: ObjectId,
  farmerId: ObjectId,
  productId: ObjectId,
  quantity: Number,
  totalPrice: Number,
  status: { type: String, enum: ['pending', 'confirmed', 'delivered', 'cancelled'] },
  deliveryAddress: String,
  orderDate: Date
}
```

### 💬 `Message`

```js
{
  _id: ObjectId,
  senderId: ObjectId,
  receiverId: ObjectId,
  message: String,
  createdAt: Date
}
```

---

## 🧠 Authentication Flow

- Role-based access control (`farmer`, `buyer`, `admin`)
- JWT-based session management
- Password encryption using bcrypt
- Protected routes in Express middleware

---

## 💻 Tech Stack Summary

| Layer          | Technology                                   |
| -------------- | -------------------------------------------- |
| Frontend       | React, Tailwind CSS, Axios, Chart.js         |
| Backend        | Node.js, Express.js, Socket.io               |
| Database       | MongoDB Atlas                                |
| Authentication | JWT + bcrypt                                 |
| Deployment     | Netlify (Frontend), Render/Railway (Backend) |
| Storage        | Cloudinary (Images)                          |

---
