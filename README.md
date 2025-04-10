## 🎖️ TikTok Award - Fullstack Next.js 15 Project

### Project Description
TikTok Award is a modern fullstack web application built using the latest Next.js 15 App Router architecture. This platform allows users to vote for their favorite TikTok creators with Google Authentication. It also includes a dedicated admin dashboard to manage categories, creators, and view voting statistics.

This project is a great real-world example for beginner and intermediate Next.js developers to learn fullstack development using modern tools and best practices.

---

## 🚀 Tech Stack

| Technology        | Purpose                                  |
|------------------|-------------------------------------------|
| Next.js 15       | Fullstack Framework (App Router)         |
| React.js 19      | Frontend Library                          |
| TailwindCSS      | Styling Framework                        |
| Shadcn           | UI Component Library                     |
| PostgreSQL       | Database                                 |
| Prisma           | ORM for Database                         |
| Auth.js v5       | Google Authentication                   |
| Redux Toolkit    | Global State Management                  |
| Server Actions   | Secure backend logic handling            |
| Role Based Auth  | Admin & Client user roles                |

---

## 🔑 Features

- Google Authentication (Auth.js v5)
- Role-Based Access Control (Admin / Client)
- Server Actions for secure backend operations
- Admin Dashboard (Manage Categories & Creators)
- Client Pages (Vote, Results, Categories)
- Real-time Voting Results Reveal
- Responsive & Clean UI Design
- PostgreSQL + Prisma Integration
- State Management with Redux Toolkit
- Fully Modular & Scalable Code Structure

---

## 🗂️ Project Folder Structure

```
src
│
├── animations          → Framer Motion Config
│
├── app                → App Router Folder
│   ├── (client)       → Client Routes (Frontend Pages)
│   │   ├── (home)     → Home Page Sections
│   │   ├── about      → About Page
│   │   ├── auth       → Login Pages (Google Auth)
│   │   ├── categories → Voting Pages (Dynamic Routes)
│   │   ├── maintenance→ Maintenance Page
│   │   ├── results    → Result Page with Countdown & Winners
│   │   └── test       → Testing Page
│   │
│   └── admin          → Admin Panel Routes (CRUD Operations)
│
└── layout.tsx         → App Layout
```

---

## ⚙️ Environment Variables (.env)

To run this project properly, create a `.env` file in the root folder and add the following variables:

```
DATABASE_URL=           # PostgreSQL or MySQL database URL

GOOGLE_CLIENT_ID=       # From Google Cloud Console
GOOGLE_CLIENT_SECRET=   # From Google Cloud Console

CLOUDINARY_CLOUD_NAME=  # From Cloudinary Dashboard
CLOUDINARY_API_KEY=     # From Cloudinary Dashboard
CLOUDINARY_API_SECRET=  # From Cloudinary Dashboard

AUTH_SECRET=            # Any strong random secret key
```

---

## 🎯 Who is This Project For?

- Beginner to Intermediate Next.js Developers  
- Anyone learning Fullstack Web Development  
- Developers curious about Next.js 15 new features like Server Actions  
- Those interested in Role-Based Systems  
- People who want to practice working with Prisma + PostgreSQL  
- Anyone building modern & responsive UI with Tailwind & Shadcn  

---

## 📸 UI Preview
*(Optional — Add screenshot or video preview here)*

---

## 🔗 Source Code
https://github.com/solomongetnet/Tiktok-Award-Voting-Web-App

---

## 🔗 Live Link
https://tiktokaward.vercel.app/

---
