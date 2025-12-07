# E-Commerce Web Application

A production-ready full-stack E-Commerce Web Application built with the generic MVC pattern, demonstrating secure authentication, product management, cart functionality, and reports.

## Key Features
- **User Roles:** Admin and Customer roles with secure JWT authentication.
- **Product Management:** Admin can create products. Users can browse with search, filtering, and sorting (Server-side).
- **Cart & Checkout:** Persistent cart management and secure checkout process.
- **Orders:** Users can view their order history.
- **Reports:** Admin dashboard showing daily revenue (SQL Aggregation) and inventory stats (MongoDB Aggregation).
- **Hybrid Database:** Uses MySQL for transactional data (Users, Orders) and MongoDB for product catalog.

## Tech Stack
- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS.
- **Backend:** Node.js, Express.js.
- **Database:** MySQL (Users, Orders), MongoDB (Products).
- **ORM:** Mongoose (MongoDB), MySQL2/Sequelize (MySQL).

## Setup & Configuration

### Prerequisites
- Node.js (v18+)
- MySQL Server
- MongoDB Server

### Environment Variables
Create a `.env` file in the `/backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce_db
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce_db
JWT_SECRET=your_jwt_super_secret_key
```

### Installation
1.  **Clone the repository:**
    ```bash
    git clone <repo-url>
    cd <repo-name>
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### Database Seeding
To initialize the database with users and sample products:
```bash
cd backend
npm run seed
```
This script will:
- Clear existing data.
- Create MySQL tables (users, orders, order_items).
- Insert sample products into MongoDB.
- Create default Admin and Customer users.

## Running the Application
1.  **Start Backend:**
    ```bash
    cd backend
    npm start
    ```
    Server runs on `http://localhost:5000`.

2.  **Start Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    App runs on `http://localhost:3000`.

## Testing
To run the backend automated tests (Jest):
```bash
cd backend
npm test
```
**Test Coverage:**
- `product.test.js`: Verifies the product sorting function returns items in descending order by default and handles `X-Sort-Order` header for ascending sort.

## API Routes
- `POST /api/auth/register` - New user registration.
- `POST /api/auth/login` - User login.
- `GET /api/products` - Fetch products (supports `search`, `category`, `page`, `limit`).
- `POST /api/products` - Create product (Admin only).
- `GET /api/orders` - Fetch user orders.
- `POST /api/orders` - Create a new order.
- `GET /api/reports` - Fetch analytics (Admin only).

## Deployment
- **Frontend URL:** [Insert Vercel/Netlify URL]
- **Backend URL:** [Insert Render/Railway URL]

## Admin Credentials (For Evaluation)
- **Email:** `admin@test.com`
- **Password:** `admin123`

---
**Note / Disclaimer:** The name "Kaushalam" typically does not appear in this codebase.
