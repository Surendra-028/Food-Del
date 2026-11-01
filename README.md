# 🍔 Food-Del Application

A comprehensive, full-stack online food ordering and delivery web application built to connect customers seamlessly with local restaurants. The platform provides a smooth experience for users to explore menus, customize items, manage their cart, place orders, and track order status in real time.

---

## 📖 Table of Contents

- [Features](#-features)
  - [Customer-Facing Web App](#customer-facing-web-app)
  - [Admin & Restaurant Portal](#admin--restaurant-portal)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Environment Configuration](#environment-configuration)
- [API Endpoints](#-api-endpoints)
- [Database Models](#-database-models)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

### Customer-Facing Web App
* **User Authentication & Authorization**: Secure user registration and login using JWT (JSON Web Tokens) with hashed password storage using bcrypt.
* **Interactive Restaurant & Menu Catalog**: Dynamic filtering by food categories, tags (vegetarian, non-vegetarian, chef specials), and price range.
* **Shopping Cart & Checkout**: Real-time cart state management with quantity adjustments, item removal, price summary, and delivery fee calculation.
* **Order History & Tracking**: View previous orders, check current order status (Pending, Out for Delivery, Delivered), and view receipt details.
* **Responsive User Interface**: Fully optimized for mobile devices, tablets, and desktop displays.

### Admin & Restaurant Portal
* **Menu Management**: Full CRUD functionality to add, edit, toggle availability, or delete menu items and categories.
* **Order Fulfillment Dashboard**: Live view of incoming customer orders to update fulfillment status.
* **User & Inventory Management**: Overview of active registered users and stock status for menu items.

---

## 🛠️ Tech Stack & Architecture

### Frontend
* **HTML5 / CSS3 / JavaScript (ES6+)**: Core markup, responsive layout styling, and client-side logic.
* **React**: Component-based UI rendering and client-side state management.

### Backend
* **Node.js**: Server-side JavaScript runtime environment.
* **Express.js**: Fast, unopinionated Web Framework for building RESTful APIs.
* **JSON Web Token (JWT)**: Stateless user authentication.
* **Bcrypt.js**: Secure password hashing algorithms.

### Database & Cloud Storage
* **MongoDB Atlas**: NoSQL database for document-based storage of users, products, and orders.
* **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.

### Hosting & Deployment
* **Backend**: Render / Vercel
* **Frontend**: Vercel / Netlify

---

## 📁 Project Structure

Food-Del/
├── backend/
│   ├── config/          # Database connection setup
│   ├── controllers/     # Route handlers for auth, food items, cart, orders
│   ├── middleware/      # Authentication & file upload middleware
│   ├── models/          # Mongoose schemas (User, Food, Order)
│   ├── routes/          # Express route definitions
│   ├── uploads/         # Uploaded product image files
│   ├── server.js        # Server entry point
│   └── package.json
│
├── frontend/
│   ├── public/          # Static assets and index.html
│   ├── src/
│   │   ├── assets/      # Images, icons, and static data
│   │   ├── components/  # Reusable UI components (Navbar, Footer, ItemCard)
│   │   ├── context/     # Global state management (StoreContext)
│   │   ├── pages/       # Page components (Home, Cart, PlaceOrder, MyOrders)
│   │   ├── App.jsx      # Main application routing & setup
│   │   └── main.jsx     # Application DOM mounting
│   └── package.json
│
└── README.md
---

## ⚙️ Getting Started

Follow these instructions to set up a local copy of the application for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your development machine:
* **Node.js** (v16.0.0 or higher)
* **npm** or **yarn**
* **Git**
* **MongoDB Atlas Account** (or a local MongoDB instance running on port 27017)

### Installation & Setup

1. Clone the Repository:
   git clone https://github.com/Surendra-028/Food-Del.git
   cd Food-Del

2. Backend Setup:
   cd backend
   npm install

3. Frontend Setup:
   cd ../frontend
   npm install

### Environment Configuration

In the backend directory, create a .env file and configure your environment variables:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Food-Del?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here

### Running the Application

1. Start the Backend Server (inside backend/):
   npm run server

2. Start the Frontend Development Server (inside frontend/):
   npm run dev

3. Access the App:
   Open your browser and navigate to http://localhost:5173

---

## 📡 API Endpoints

### Authentication
* POST /api/user/register - Create a new user account
* POST /api/user/login - Authenticate user and return JWT

### Food Items
* GET /api/food/list - Fetch all available menu items
* POST /api/food/add - Add a new menu item (Admin)
* POST /api/food/remove - Delete a menu item (Admin)

### Cart Operations
* POST /api/cart/get - Fetch cart items for logged-in user
* POST /api/cart/add - Add item to cart
* POST /api/cart/remove - Remove item from cart

### Orders
* POST /api/order/place - Place a new order
* POST /api/order/userorders - Retrieve user order history
* GET /api/order/list - Fetch all customer orders (Admin)

---

## 🗄️ Database Models

### User Schema
* name (String, Required)
* email (String, Required, Unique)
* password (String, Required)
* cartData (Object, Default: {})

### Food Schema
* name (String, Required)
* description (String, Required)
* price (Number, Required)
* image (String, Required)
* category (String, Required)

### Order Schema
* userId (String, Required)
* items (Array of objects, Required)
* amount (Number, Required)
* address (Object, Required)
* status (String, Default: "Food Processing")
* date (Date, Default: Date.now)
* payment (Boolean, Default: false)

---

## 🔮 Future Enhancements

- **Payment Gateway Integration**: Add Stripe and Razorpay checkout support for instant digital payments.
- **Real-Time Delivery Tracking**: Integrate Google Maps API to track live driver delivery routes.
- **Search & Filter Extensions**: Advanced full-text search across items and restaurant locations.
- **Rating & Review System**: Allow users to leave ratings and text feedback on ordered menu items.

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See LICENSE for more information.
