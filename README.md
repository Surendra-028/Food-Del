🍲 Food-Del — Full-Stack Food Delivery Web Application

A feature-rich, full-stack food delivery application built to streamline online food ordering. The system provides an end-to-end workflow—from user registration, interactive menu browsing, real-time cart calculations, to secure checkout and order state management. Designed with a mobile-first strategy to guarantee responsiveness across devices.

📋 Table of Contents

Overview

System Architecture

Key Features

Tech Stack

Repository Structure

Getting Started

Prerequisites

Cloning & Installation

Environment Variables

Running the Application

API Endpoints

Mobile-Friendly CSS Architecture

Deployment

Contributing

License

📌 Overview

Food-Del solves the core challenges of single-restaurant or multi-vendor online food distribution:

Speed & Accessibility: Light frontend bundle designed with React for high performance.

Dynamic State Management: Context API / Redux pattern to handle real-time item updates in the user's cart.

Database Scalability: Managed via MongoDB Atlas cloud clusters for resilient item and order schemas.

📐 System Architecture

  ┌────────────────────────────────────────────────────────┐
  │                    React Frontend                      │
  │     (Mobile, Tablet & Desktop Responsive Views)       │
  └───────────────────────────┬────────────────────────────┘
                              │
                        HTTP / REST API
                              │
  ┌───────────────────────────▼────────────────────────────┐
  │                 Express / Node.js Backend              │
  │      - Authentication (JWT)   - Cart Controller        │
  │      - Food Controller        - Order Controller       │
  └───────────────────────────┬────────────────────────────┘
                              │
                        Mongoose ODM
                              │
  ┌───────────────────────────▼────────────────────────────┐
  │                    MongoDB Atlas                       │
  │      (Users, Food Items, Orders, Admin Schemas)        │
  └────────────────────────────────────────────────────────┘


✨ Key Features

👤 User Capabilities

Authentication: JWT-based sign-up, sign-in, and persistent login sessions.

Interactive Menu: Category-driven food menu filtering (Appetizers, Main Course, Desserts, Beverages).

Cart Operations: Increment/decrement item counts on the fly with dynamic total adjustments.

Checkout & Address Handling: Order summary generation with delivery details input.

Order Tracking: Historic order logs displaying item details and status progression.

🛠️ Admin / Backend Capabilities

Menu Management: API routes to upload, update, and remove food entries.

Order Handling: Admin privilege to view incoming orders and update delivery status.

Image Storage: Cloud or static server asset hosting for item thumbnails.

🛠️ Tech Stack

Frontend

Framework: React.js

Styling: Vanilla CSS3 (CSS Variables, Flexbox, CSS Grid, Media Queries)

Icons: FontAwesome / Lucide React

Backend

Runtime: Node.js

Framework: Express.js

Authentication: JSON Web Tokens (jsonwebtoken), bcryptjs

File Uploads: multer

Database & Hosting

Database: MongoDB Atlas (M0 Cluster)

Deployment: Vercel (Frontend), Render (Backend)

📁 Repository Structure

Food-Del/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── cartController.js
│   │   ├── foodController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── foodModel.js
│   │   ├── orderModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── cartRoute.js
│   │   ├── foodRoute.js
│   │   ├── orderRoute.js
│   │   └── userRoute.js
│   ├── uploads/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AppDownload/
│   │   │   ├── ExploreMenu/
│   │   │   ├── FoodDisplay/
│   │   │   ├── FoodItem/
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── LoginPopup/
│   │   │   └── Navbar/
│   │   ├── context/
│   │   │   └── StoreContext.jsx
│   │   ├── pages/
│   │   │   ├── Cart/
│   │   │   ├── Home/
│   │   │   ├── MyOrders/
│   │   │   └── PlaceOrder/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── .gitignore
├── LICENSE
└── README.md


🚀 Getting Started

Prerequisites

Make sure you have installed:

Node.js (v16.x or higher)

npm or yarn

GitHub CLI (gh) (Optional, for cloning via standard commands)

Cloning & Installation

# Clone using GitHub CLI
gh repo clone Surendra-028/Food-Del

# Navigate to root directory
cd Food-Del

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install


Environment Variables

Create .env files in both backend and frontend root folders.

Backend .env

PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Food_Del
JWT_SECRET=your_super_secret_jwt_key


Frontend .env

VITE_BACKEND_URL=http://localhost:4000


💻 Running the Application

1. Start the Backend Server

cd backend
npm run server
# Server running on http://localhost:4000


2. Start the Frontend Client

cd frontend
npm run dev
# Application available at http://localhost:5173


🔌 API Endpoints

User Routes (/api/user)

POST /api/user/register — Create a new user account

POST /api/user/login — Authenticate user and receive JWT

Food Routes (/api/food)

GET /api/food/list — Fetch all food items

POST /api/food/add — Add a new food item (Admin)

POST /api/food/remove — Delete a food item (Admin)

Cart Routes (/api/cart)

POST /api/cart/add — Add item to cart

POST /api/cart/remove — Remove item from cart

POST /api/cart/get — Retrieve cart items for logged-in user

Order Routes (/api/order)

POST /api/order/place — Submit a new order

POST /api/order/userorders — Retrieve orders placed by user

📱 Mobile-Friendly CSS Architecture

The user interface follows mobile-first design principles using modern CSS:

:root {
  --primary-color: #tomatored;
  --bg-color: #ffffff;
  --text-dark: #262626;
  --text-light: #676767;
}

body {
  font-family: 'Outfit', sans-serif;
  -webkit-tap-highlight-color: transparent;
}

.food-display-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

@media screen and (max-width: 1050px) {
  .navbar {
    padding: 20px 0px;
  }
}

@media screen and (max-width: 750px) {
  .navbar .navbar-right {
    gap: 20px;
  }
  .food-display-list {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
  .cart-bottom {
    flex-direction: column-reverse;
  }
}

@media screen and (max-width: 480px) {
  .header-contents {
    align-items: start;
  }
  .header-contents button {
    padding: 2vw 4vw;
    font-size: 12px;
  }
}


🌐 Deployment

Frontend (Vercel)

Push your code to GitHub.

Import repository on Vercel.

Set Build Command to npm run build and Output Directory to dist.

Add VITE_BACKEND_URL in environment configuration.

Backend (Render)

Create a Web Service on Render.

Connect your GitHub repository.

Set Root Directory to backend.

Set Build Command to npm install and Start Command to node server.js.

Add MONGO_URI and JWT_SECRET variables under Environment Settings.

🤝 Contributing

Fork the Repository

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License

Distributed under the MIT License. See LICENSE for more information.
