# 📊 Rbahi – Local Business Analytics Dashboard

**Rbahi** (رباحي, meaning *"my profit"* in Moroccan Arabic) is a full-stack SaaS dashboard for Moroccan small businesses. It allows users to upload their sales data and receive automated insights, forecasts, and interactive visualizations to better understand and grow their business.

This version of Rbahi is a modern, scalable full-stack app built using **React + Node.js** with a separate **Python microservice** for analytics.

---

## project architecture.

### frontend (react + vite)
- Built with **react + vite** and **Tailwind css**.
- clean UI for :
    - CSV/excel file upload.
    - displaying **KPIs**, **charts**, and **filters**
    - **user authentication** (login/signup)
- communicates with the Node.js backend via rest api.

### Backend (node js + express)
- Restful api handling:
    - Authentification using JWT.
    - fiel uploads 
    - communicate with the python analytics microservices 
- stores user data securely (mongoDB)

### Analyticsd microservice (python + fastapi)
- receives sales data from backend
- performs :
    - KPI generation 
    - time-series forecasting 
    - business trend detection
- return **JSON responses** to node.js server

## 🚀 Features

✅ Upload CSV/Excel sales data  
✅ Generate business KPIs (e.g. total revenue, average order)  
✅ Visualize data with filters (by date, product, etc.)  
✅ Forecast future sales using machine learning  
✅ User login and signup  
✅ Download analytics and predictions  

## 🛠️ Tech Stack

| Layer       | Technology                            |
|-------------|----------------------------------------|
| Frontend    | React, Vite, Tailwind CSS              |
| Backend     | Node.js, Express, JWT, MongoDB/PostgreSQL |
| Microservice | Python, FastAPI, Pandas, Scikit-learn |
| Charts      | Chart.js / Recharts / Plotly.js        |
| Forecasting | Prophet / Statsmodels / Custom models  |

## what is a microservices:
Microservices means building an application as a set of small, loosely coupled, independently deployable services, where each service handles one specific task and can be developed, deployed, and scaled independently.