# Deployment Guide for Chakri Pao

This guide will help you deploy your full-stack MERN application for free using **MongoDB Atlas**, **Render** (Backend), and **Vercel** (Frontend).

## Prerequisites
- [GitHub Account](https://github.com)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas)
- [Render Account](https://render.com)
- [Vercel Account](https://vercel.com)

---

## Step 1: Push Code to GitHub
1. Create a **new repository** on GitHub.
2. Push your code to this repository (make sure `client` and `server` folders are in the root).

---

## Step 2: Set Up Database (MongoDB Atlas)
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a **New Cluster** (select the **Free M0** tier).
3. Go to **Database Access** -> Add New Database User (create a username/password, save these!).
4. Go to **Network Access** -> Add IP Address -> Select **Allow Access from Anywhere**.
5. Go to **Database** -> Click **Connect** -> **Drivers**.
6. Copy the connection string (it looks like `mongodb+srv://<username>:<password>@cluster0...`).
   - Replace `<password>` with the password you created in step 3.
   - **Keep this string safe**, you will need it for the Backend.

---

## Step 3: Deploy Backend (Render)
1. Log in to [Render](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Name**: `chakri-pao-backend` (or similar)
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**
5. **Environment Variables** (Click Advanced -> Add Environment Variable):
   - Key: `MONGO_URI`
   - Value: (Paste your MongoDB connection string from Step 2)
   - Key: `PORT`
   - Value: `3001` (or any port, Render overrides this but good to set)
6. Click **Create Web Service**.
7. Wait for the deployment to finish. Copy the **Service URL** (e.g., `https://chakri-pao-backend.onrender.com`).
   - **Note**: The free instance spins down after inactivity. The first request might take a minute to load.
   - **Important**: Files uploaded (resumes) will disappear when the server restarts (ephemeral storage). For a demo, this is fine. For production, you'd need Cloudinary or S3.

---

## Step 4: Deploy Frontend (Vercel)
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. **Framework Preset**: Vercel should auto-detect **Vite**.
5. **Root Directory**: Click Edit -> Select `client`.
6. **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: (Paste your Render Backend URL from Step 3, **without trailing slash**)
     - Example: `https://chakri-pao-backend.onrender.com`
7. Click **Deploy**.
8. Once deployed, your app is live!

---

## Troubleshooting
- **Frontend can't connect**: Check the `VITE_API_URL` in Vercel settings. It must match your Render backend URL exactly.
- **Database error**: Check `MONGO_URI` in Render. Ensure Network Access in MongoDB Atlas allows "Anywhere" (0.0.0.0/0).
- **Files disappear**: This is normal on Render's free tier. Uploads are temporary.

**Good Luck!**
