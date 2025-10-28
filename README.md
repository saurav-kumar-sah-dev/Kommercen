Kommercen — Your Marketplace, Simplified

Modern, full‑stack e‑commerce application built with the MERN stack. This monorepo contains an Express/MongoDB backend and a Vite/React frontend with authentication, product/catalog, cart/checkout, Razorpay payments, image uploads to Cloudinary, and an admin panel for orders, users, products, and contact messages.

## Live

- Frontend: [kommercen.vercel.app](https://kommercen.vercel.app/)
- Backend API: [kommercen-backend.onrender.com](https://kommercen-backend.onrender.com)

## Project Structure

```
.
├── backend/              # Express API + MongoDB models
│   ├── middleware/       # auth, validation
│   ├── models/           # Mongoose schemas (User, Product, Order, Contact)
│   ├── routes/           # REST endpoints (auth, products, users, orders, contact, upload, razorpay)
│   ├── utils/            # Cloudinary integration
│   └── server.js         # App entrypoint
├── frontend/             # React + Vite + Tailwind UI
│   └── src/              # Pages, components, contexts
└── package.json          # Monorepo scripts (dev/build helpers)
```

## Tech Stack

- Backend: Node.js, Express, MongoDB (Mongoose), JWT, SendGrid, Razorpay, Cloudinary
- Frontend: React 18, Vite, React Router, React Query, Tailwind CSS
- Tooling: Nodemon, Concurrently, ESLint

## Quick Start

1) Clone and install dependencies

```bash
git clone <your-repo-url> kommercen
cd kommercen
npm run install-all
```

2) Configure environment variables

Create a `.env` file in `backend/` with the following keys:

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
- Update CORS allowlist in `backend/server.js` if your frontend origin differs in development/production.

3) Run in development

```bash
npm run dev
# Runs backend (nodemon) and frontend (vite) concurrently
```

Frontend dev server: `http://localhost:5173`

Backend API: `http://localhost:5000`

## Scripts

Top-level (monorepo):

- `npm run dev` – start backend and frontend together via Concurrently
- `npm run server` – backend only (nodemon)
- `npm run client` – frontend only (vite dev)
- `npm run build` – build frontend bundle
- `npm run install-all` – install root, backend, and frontend dependencies

Backend (`backend/package.json`):

- `npm run start` – start Express in production
- `npm run dev` – start Express in watch mode (nodemon)

Frontend (`frontend/package.json`):

- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview built app
- `npm run lint` – run ESLint

## Environment Variables (Backend)

- `PORT` – API port (default 5000)
- `NODE_ENV` – environment name
- `MONGODB_URI` – MongoDB connection string
- `JWT_SECRET` – JWT signing secret (required for auth)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` – image uploads
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` – payments (optional but required to enable checkout)
- `SENDGRID_API_KEY` – transactional emails (optional)
- `ADMIN_EMAIL` – destination for contact form alerts (optional)
- `EMAIL_USER` – from/sender email (optional)

## Key API Endpoints

Base URL: `http://localhost:5000/api`

- Auth (`/auth`):
  - `POST /register` – create account
  - `POST /login` – authenticate user
  - `GET /me` – current user profile (requires JWT)
  - `PUT /profile` – update profile (JWT)
  - `PUT /change-password` – update password (JWT)
- Products (`/products`) – CRUD and listing (see route for details)
- Users (`/users`) – admin management routes
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
  - `POST /` – submit contact message (validates and stores in DB; emails if configured)
  - `GET /admin` – list messages (admin JWT)
  - `GET /admin/stats` – stats (admin JWT)
  - `GET /admin/:id` – single message (admin JWT)
  - `PUT /admin/:id/status` – update status (admin JWT)
  - `DELETE /admin/:id` – delete (admin JWT)

Utility:
- `GET /health` – health/status
- `GET /test` – basic connectivity check

## Frontend

- Vite + React at `frontend/`
- Uses contexts for auth and cart, Razorpay checkout integration, and admin pages under `/admin/*`.

Development URLs (default):
- App: `http://localhost:5173`
- API: `http://localhost:5000/api`

If you host the frontend separately (e.g., Vercel), ensure the deployed origin is allowed by CORS in `backend/server.js` and the frontend points to the deployed API base URL (see `frontend/src/utils/api.js`).

## Deployment

Backend (Render/Railway/EC2, etc.):
- Set all backend environment variables in your host.
- Run `npm ci && npm run start` inside `backend/`.
- Ensure MongoDB connectivity and correct CORS origins.

Frontend (Vercel/Netlify):
- Build with `npm run build` inside `frontend/`.
- Serve the `frontend/dist` output.
- Configure the API base URL in the frontend environment or `api.js` if needed.
- Vercel environment variable:
  - `VITE_API_URL=https://kommercen-backend.onrender.com/api`

## Security & Hardening

- Use a long, random `JWT_SECRET` in production.
- Restrict CORS to trusted origins only.
- Do not commit `.env` files or secrets.
- Validate and sanitize inputs (server uses `express-validator` on sensitive routes like contact).
- Enforce HTTPS in production and secure cookies if you add sessions.

## License

MIT © Kommercen Team


