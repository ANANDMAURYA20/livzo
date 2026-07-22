# LIVZO - Premium PG Accommodation Platform

LIVZO is a modern, responsive web application designed for managing and booking premium Paying Guest (PG) accommodations. It provides a seamless experience for students and working professionals to explore properties, view detailed amenities, check room pricing, and connect with the administration. The platform also includes an admin dashboard for managing inquiries, analytics, and settings.

## 🚀 Features

### For Users
*   **Property Listings:** Explore different PG branches (e.g., Yellow House, Purple House, Pink House) with tailored details.
*   **Detailed Information:** View high-quality highlights, location data, amenities, and room pricing.
*   **Responsive Design:** A premium, beautifully animated interface that works flawlessly on desktop and mobile (powered by TailwindCSS and Framer Motion).
*   **Contact & Booking:** Easy access to WhatsApp, phone calls, and contact forms to schedule a visit.

### For Admins
*   **Dashboard:** Overview of platform analytics and statistics.
*   **Inquiry Management:** Track and manage incoming inquiries from interested users.
*   **Settings & Configuration:** Admin controls for managing PG operations.

## 🛠️ Tech Stack

**Frontend (`/client`)**
*   **React 19** with **Vite** for fast development and building.
*   **TailwindCSS** for rapid, utility-first styling.
*   **Framer Motion** for smooth, interactive animations.
*   **React Router** for declarative routing.
*   **Recharts** for data visualization on the dashboard.
*   **React Hook Form** for efficient form handling.

**Backend (`/server`)**
*   **Node.js & Express.js (v5)** for robust API endpoints.
*   **MongoDB & Mongoose** for database management.
*   **JWT & bcryptjs** for secure authentication and authorization.
*   **OpenAI API** integration (for smart features/automated responses).

## ⚙️ How to Setup and Run Locally

To get this project up and running on your local machine, follow these steps:

### 1. Prerequisites
Make sure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a MongoDB Atlas URI)
*   Git

### 2. Clone the Repository
```bash
git clone https://github.com/ANANDMAURYA20/livzo.git
cd livzo
```

### 3. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and configure the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key (if applicable)
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will typically start on `http://localhost:5000`.*

### 4. Frontend Setup
1. Open a new terminal window and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. (Optional) Create a `.env` file in the `client` directory if you need to configure the API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The client application will typically start on `http://localhost:5173`.*

## 📂 Project Structure

```
livzo/
│
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components (Layout, UI, Forms)
│   │   ├── pages/          # Page components (Landing, Login, Dashboard, etc.)
│   │   ├── routes/         # Application routing configuration
│   │   └── utils/          # Helper functions and constants
│   ├── index.html
│   └── package.json
│
├── server/                 # Node.js/Express Backend
│   ├── server.js           # Main application entry point
│   ├── utils/              # Helper functions and seeding scripts
│   └── package.json
│
└── README.md
```

## 📜 License
This project is proprietary and intended for Livzo operations.
