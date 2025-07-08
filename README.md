# Local Service Booking App

A web platform where users can:

✅ Find local service providers (e.g. plumbers, electricians, cleaners)  
✅ Book appointments based on availability  
✅ Leave ratings and reviews  
✅ Service providers can manage bookings from their own dashboard

This app was built by a team including backend developers, frontend (React) devs, UI/UX designers, HTML devs, and QA engineers.

---

## 🚀 Live API Docs

API documentation (Swagger) is available locally at:
[http://localhost:6900/api-docs](http://localhost:6900/api-docs)

---

## ⚙️ Tech Stack

| Area          | Technology                          |
| ------------- | ----------------------------------- |
| Frontend      | React 19, Vite, Tailwind CSS        |
| Backend       | Node.js, Express, MongoDB, Mongoose |
| Auth          | JWT, bcrypt                         |
| File Uploads  | Multer                              |
| API Docs      | Swagger (OpenAPI 3)                 |
| UI Animations | Framer Motion, AOS                  |
| Forms         | React Hook Form                     |
| Testing       | Postman, Manual Testing             |

---

## 📂 Folder Structure

- **client** → Vite + React frontend
- **server** → Express + MongoDB backend
- **docs** → Swagger YAML (OpenAPI) file

---

## 💻 Main Features

### For Customers

- Register and login
- Search service providers by category & location
- Filter providers by ratings
- View provider details
- Book an appointment
- View “My Bookings”
- Cancel a booking
- Leave ratings & reviews

### For Providers

- Login
- View dashboard:
  - Upcoming bookings
  - Customer reviews
  - Ratings
- Manage profile:
  - Services offered
  - Profile picture
  - Pricing
- Manage availability calendar

---

## 👥 Roles Table

| Role     | Abilities                                     |
| -------- | --------------------------------------------- |
| User     | Book services, write reviews, manage bookings |
| Provider | Manage services, bookings, reviews            |
| Admin    | Manage system data, view analytics            |

---

## 📊 Analytics APIs

Backend includes:

- Total bookings count
- Top providers by rating
- Data for dashboards

---

## 🔗 Swagger API Coverage

The following routes are documented in Swagger:

✅ Auth (register, login, logout, password reset)  
✅ Profile (view/edit)  
✅ Provider (CRUD, search)  
✅ Booking (create, update status, list)  
✅ Review (create, list)  
✅ Analytics

Swagger URL: [http://localhost:6900/api-docs](http://localhost:6900/api-docs)

---

## 🛠️ Installation & Setup

# Install and run the backend

cd server
npm install
npm run dev

# Server runs on: http://localhost:6900

# Install and run the frontend

cd client
npm install
npm run dev

# Frontend runs on: http://localhost:5173 (default Vite port)
