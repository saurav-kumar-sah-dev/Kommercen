<div align="center">

  <h1>Kommercen — Your Marketplace, Simplified</h1>

  <p>Modern MERN e‑commerce with auth, catalog, cart, checkout, payments, uploads, and an admin panel.</p>

  <p>
    <a href="https://kommercen.vercel.app">Live App</a>
    ·
    <a href="https://kommercen-backend.onrender.com/api/health">API Health</a>
  </p>

  <p>
    <img alt="License" src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
    <img alt="Stack" src="https://img.shields.io/badge/Stack-MERN-4caf50?style=flat-square" />
    <img alt="Build" src="https://img.shields.io/badge/Build-Vite-646cff?style=flat-square" />
  </p>

</div>

---

### ✨ Features

- **Authentication & Profiles**: JWT auth, profile updates, password change
- **Products & Catalog**: CRUD, categories, reviews, searchable listings
- **Cart & Wishlist**: Persisted per user, easy adjustments
- **Checkout & Payments**: Razorpay integration with verification and refunds
- **Media Uploads**: Cloudinary single/multi image uploads with limits
- **Contact & Email**: Validated form, admin inbox, optional SendGrid mails
- **Admin Panel**: Users, products, orders, contacts, stats

---

### 🚀 Live

- Frontend (demo): [kommercen.vercel.app](https://kommercen.vercel.app/)
- Backend health: [kommercen-backend.onrender.com/api/health](https://kommercen-backend.onrender.com/api/health)

Demo pages:
- Home: `https://kommercen.vercel.app/`
- Products: `https://kommercen.vercel.app/products`
- Cart: `https://kommercen.vercel.app/cart`
- Checkout: `https://kommercen.vercel.app/checkout`
- Contact: `https://kommercen.vercel.app/contact`
- Login: `https://kommercen.vercel.app/login`
- Register: `https://kommercen.vercel.app/register`
- Admin Dashboard: `https://kommercen.vercel.app/admin`

---

### 🗂️ Project Structure

```
.
├── backend/              # Express API + MongoDB models
│   ├── middleware/       # auth, validation
│   ├── models/           # Mongoose schemas (User, Product, Order, Contact)
│   ├── routes/           # REST endpoints
│   │   ├── auth.js       # auth/login/register/profile
│   │   ├── products.js   # product CRUD, categories, reviews
│   │   ├── users.js      # user admin management, cart, wishlist
│   │   ├── orders.js     # orders create/list/update
│   │   ├── upload.js     # Cloudinary single/multiple uploads
│   │   ├── razorpay.js   # payments: create, verify, refund, config
│   │   └── contact.js    # contact form, admin inbox, stats
│   ├── utils/            # Cloudinary integration
│   └── server.js         # App entrypoint
├── frontend/             # React + Vite + Tailwind UI
│   └── src/
│       ├── components/
│       │   ├── auth/         # protected/admin routes
│       │   ├── layout/       # Navbar, Footer
│       │   ├── payments/     # Razorpay Checkout
│       │   ├── products/     # ProductCard, etc.
│       │   └── ui/           # LoadingSpinner, shared UI
│       ├── context/          # AuthContext, CartContext
│       ├── pages/            # All pages (home, products, admin/*)
│       ├── utils/            # api.js (axios instance + API wrappers)
│       ├── App.jsx           # routes
│       └── main.jsx          # app bootstrap
└── package.json          # Monorepo scripts (dev/build helpers)
```

---

### 🧰 Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, SendGrid, Razorpay, Cloudinary
- **Frontend**: React 18, Vite, React Router, React Query, Tailwind CSS
- **Tooling**: Nodemon, Concurrently, ESLint

---

### ⚡ Quick Start

1) Clone and install dependencies

```bash
git clone <your-repo-url> kommercen
cd kommercen
npm run install-all
```

2) Configure environment variables (create `backend/.env`)

```bash
# Core
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kommercen
JWT_SECRET=replace-with-a-strong-secret

# Cloudinary (images)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payments (Razorpay)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
ADMIN_EMAIL=admin@example.com
EMAIL_USER=noreply@example.com
```

Notes:
- Razorpay and SendGrid are optional at runtime; routes degrade gracefully if keys are missing.
- Update CORS allowlist in `backend/server.js` if your frontend origin differs.

3) Run in development

```bash
npm run dev
# Backend (nodemon) + Frontend (vite) concurrently
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

### 📜 Scripts

Top-level (monorepo):

- `npm run dev` – start backend and frontend together
- `npm run server` – backend only (nodemon)
- `npm run client` – frontend only (vite dev)
- `npm run build` – build frontend bundle
- `npm run install-all` – install root, backend, and frontend deps

Backend (`backend/package.json`):

- `npm run start` – start Express in production
- `npm run dev` – start Express in watch mode

Frontend (`frontend/package.json`):

- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview built app
- `npm run lint` – run ESLint

---

### 🔐 Environment Variables (Backend)

- `PORT` – API port (default 5000)
- `NODE_ENV` – environment name
- `MONGODB_URI` – MongoDB connection string
- `JWT_SECRET` – JWT signing secret (required for auth)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` – image uploads
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` – payments (optional but required to enable checkout)
- `SENDGRID_API_KEY` – transactional emails (optional)
- `ADMIN_EMAIL` – destination for contact form alerts (optional)
- `EMAIL_USER` – from/sender email (optional)

---

### 📡 Key API Endpoints

Base URL: `http://localhost:5000/api`

- Auth (`/auth`):
  - `POST /register` – create account
  - `POST /login` – authenticate user
  - `GET /me` – current user profile (JWT)
  - `PUT /profile` – update profile (JWT)
  - `PUT /change-password` – update password (JWT)
- Products (`/products`) – CRUD and listing
- Users (`/users`) – admin management
- Orders (`/orders`) – create/list orders
- Uploads (`/upload`):
  - `POST /single` – upload one image (JWT)
  - `POST /multiple` – upload multiple images (JWT)
  - `DELETE /:publicId` – delete image (JWT)
- Payments (`/razorpay`):
  - `POST /create-order` – create payment order (JWT)
  - `POST /verify-payment` – verify signature + persist order (JWT)
  - `GET /config` – public config (keyId/currency)
  - `POST /refund` – process refund (admin JWT)
- Contact (`/contact`):
  - `POST /` – submit contact message (validated, saved; emails if configured)
  - `GET /admin` – list messages (admin JWT)
  - `GET /admin/stats` – stats (admin JWT)
  - `GET /admin/:id` – single message (admin JWT)
  - `PUT /admin/:id/status` – update status (admin JWT)
  - `DELETE /admin/:id` – delete (admin JWT)
  - `GET /test` – send a test email if SendGrid is configured (public)

Utility:
- `GET /health` – health/status
- `GET /test` – basic connectivity check

---

### 🖥️ Frontend

- Vite + React at `frontend/`
- Contexts for auth/cart, Razorpay checkout, admin pages under `/admin/*`

Development defaults:
- App: `http://localhost:5173`
- API: `http://localhost:5000/api`

If hosting frontend separately (e.g., Vercel), allow the deployed origin via CORS in `backend/server.js` and set the API base URL (see `frontend/src/utils/api.js`).

---

### ☁️ Deployment

Backend (Render/Railway/EC2, etc.):
- Set all backend environment variables
- Run `npm ci && npm run start` inside `backend/`
- Ensure MongoDB connectivity and correct CORS origins

Frontend (Vercel/Netlify):
- Build with `npm run build` inside `frontend/`
- Serve the `frontend/dist` output
- Configure the API base URL via env or `api.js`
- Vercel example: `VITE_API_URL=https://kommercen-backend.onrender.com/api`

---

### 🔒 Security & Hardening

- Use a long, random `JWT_SECRET` in production
- Restrict CORS to trusted origins only
- Never commit `.env` files or secrets
- Validate/sanitize inputs (`express-validator` used on sensitive routes)
- Enforce HTTPS in production; use secure cookies if you add sessions

---

### 📄 License

[MIT](./LICENSE) © Kommercen Team


