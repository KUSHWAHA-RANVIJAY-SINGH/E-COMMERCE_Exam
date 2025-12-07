# 🚀 Deployment Guide: E-Commerce Application

This guide covers how to deploy the full stack E-Commerce application.
**Stack:**
- **Frontend:** Next.js (Deploy on Vercel)
- **Backend:** Node.js/Express (Deploy on Render)
- **Database 1:** MongoDB (MongoDB Atlas)
- **Database 2:** MySQL (Aiven or Railway)

---

## Part 1: Database Setup

### 1. MongoDB Setup (Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up/login.
2. Create a new **Cluster** (The free M0 tier is fine).
3. Whitelist your IP (or allow access from anywhere `0.0.0.0/0` for easiest deployment).
4. Create a **Database User** (username/password).
5. Click **Connect** -> **Drivers**.
6. **Copy the Connection String**. It looks like:
   `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
   *Save this for later.*

### 2. MySQL Setup (Aiven or Railway)
Since Render's free tier for Postgres doesn't include MySQL, we can use a free MySQL provider like **Aiven**.
1. Go to [Aiven console](https://console.aiven.io/).
2. Create a new service and select **MySQL**.
3. Choose the **Free Plan** if available.
4. Once created, find the **Service URI** or Connection details (Host, Port, User, Password, DB Name).
   *Save these for later.*

---

## Part 2: Backend Deployment (Render)

1. Push your code to a **GitHub Repository** (if not already done).
2. Go to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** and select **Web Service**.
4. Connect your GitHub repository.
5. **Configure the Service:**
   - **Name:** `ecommerce-backend` (or similar)
   - **Root Directory:** `backend` (Important! Your backend code is in the subfolder)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. **Environment Variables (Advanced):**
   Click on "Environment" and add the following keys:
   - `MONGO_URI`: (Paste your MongoDB connection string from Part 1)
   - `DB_HOST`: (MySQL Host)
   - `DB_USER`: (MySQL User)
   - `DB_PASSWORD`: (MySQL Password)
   - `DB_NAME`: (MySQL Database Name, e.g., defaultdb)
   - `JWT_SECRET`: (Create a strong random string)
   - `PORT`: `10000` (Render usually sets this automatically, but good to be safe)

7. Click **Create Web Service**.
8. Wait for the deployment to finish. Render will give you a URL like: `https://ecommerce-backend.onrender.com`.
   *Copy this URL.*

---

## Part 3: Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com/) and login.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. **Configure Project:**
   - **Framework Preset:** Next.js (Should auto-detect).
   - **Root Directory:** Edit this and select `frontend`.
5. **Environment Variables:**
   Expand the "Environment Variables" section and add:
   - `NEXT_PUBLIC_API_URL`: (Paste your Render Backend URL from Part 2 + `/api`)
     *Example:* `https://ecommerce-backend.onrender.com/api`
     **Note:** Make sure to include `/api` at the end if your routes are prefixed with it (which they are in `api.ts`).

6. Click **Deploy**.
7. Vercel will build your site. Once done, you will get a live URL!

---

## Part 4: Final Verification

1. Go to your new **Vercel URL**.
2. Open the **Console** (F12).
3. Try to **Register** a user or view **Products**.
4. If it works, you are live! 🎉

### Troubleshooting
- **CORS Error?** If you see CORS errors in the browser console, you might need to update the `cors` configuration in `backend/server.js` to explicitly allow your Vercel domain.
  ```javascript
  // In backend/server.js
  app.use(cors({
    origin: ['https://your-vercel-app.vercel.app', 'http://localhost:3000']
  }));
  ```
- **Database Connection Error?** Check your Render logs. Make sure IP whitelisting is configured correctly on MongoDB Atlas.
