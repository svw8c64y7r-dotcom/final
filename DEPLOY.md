# Deployment Guide for EPOTECK

This guide will help you deploy your application for free using **Vercel** (Frontend) and **Render** (Backend).

## 1. Backend Deployment (Render)

1.  Push your code to a GitHub repository.
2.  Go to [Render Dashboard](https://dashboard.render.com/).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  Configure the service:
    -   **Name**: `epoteck-backend` (or similar)
    -   **Root Directory**: `backend` (Important!)
    -   **Runtime**: Python 3
    -   **Build Command**: `pip install -r requirements.txt`
    -   **Start Command**: `gunicorn scanner_api:app` (Render should auto-detect this from `Procfile`)
    -   **Plan**: Free
6.  Click **Create Web Service**.
7.  Wait for deployment. Once finished, copy the **Service URL** (e.g., `https://epoteck-backend.onrender.com`).

## 2. Frontend Deployment (Vercel)

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  Configure the project:
    -   **Framework Preset**: Vite (should be auto-detected).
    -   **Root Directory**: `EPOTECK` (or `./` if you pushed the root).
    -   **Environment Variables**:
        -   Key: `VITE_API_URL`
        -   Value: Your Render Backend URL (e.g., `https://epoteck-backend.onrender.com`)
5.  Click **Deploy**.

## 3. Final Verification

1.  Open your Vercel deployment URL.
2.  Try the "Network Scanner" feature.
3.  If it works, congratulations! Your app is live.

> [!NOTE]
> The first request to the Render backend might be slow (cold start) on the free tier.
