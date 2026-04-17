# 🛍️ E-Commerce Full Stack Project

A modern full-stack e-commerce web application built with **React**, **Spring Boot**, and **MySQL**.

This project includes product management, authentication with JWT, shopping cart functionality, image upload, search, and responsive UI.

---

# 🚀 Tech Stack

## Frontend

* React.js
* React Router DOM
* Context API
* Axios
* Tailwind CSS

## Backend

* Spring Boot
* Spring Data JPA
* REST API
* JWT Authentication
* Multipart File Upload

## Database

* MySQL

---

# ✨ Features

## User Features

* User Signup
* User Login (JWT Authentication)
* Browse Products
* Search Products
* Filter by Category
* View Product Details
* Add to Cart
* Update Cart Quantity
* Checkout Flow

## Admin Features

* Add Product
* Update Product
* Delete Product
* Upload Product Image

---

# 📂 Project Structure

```bash
ecom-project/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── application.properties
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
```

---

# ⚙️ Backend Setup

## 1. Configure Database

Update `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecom_project
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## 2. Run Backend

Backend runs on:

```bash
http://localhost:8080
```

---

# 💻 Frontend Setup

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔐 Authentication

JWT Token based login system.

After login:

* Token stored in localStorage
* Used automatically in protected API requests

---

# 🖼️ Product Images

Product images are uploaded through multipart form data and stored in database.

---

# 🌍 API Endpoints

## Auth

```bash
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
```

## Products

```bash
GET    /api/products
GET    /api/product/{id}
POST   /api/product
PUT    /api/product/{id}
DELETE /api/product/{id}
GET    /api/product/{id}/image
GET    /api/products/search?keyword=
```

---

# 🚀 Deployment

## Frontend

* Vercel / Netlify

## Backend

* Render / Railway

## Database

* Railway MySQL / PlanetScale / MySQL Server

---

# 📌 Future Improvements

* Payment Gateway Integration
* Order History
* Wishlist
* Admin Dashboard
* Email Verification
* Role Based Access
* Better Security with Spring Security

---

# 👨‍💻 Author

Developed by **Joydeep Bhandari**

---

# ⭐ If you like this project

Give it a star on GitHub ⭐
