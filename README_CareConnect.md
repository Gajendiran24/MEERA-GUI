
# 💙 CareConnect

CareConnect is a full-stack healthcare web application built with the MERN stack. It connects **Users (Patients)**, **Caretakers**, and **Doctors** in one unified platform, featuring dashboards per role, real-time chat, AI support, emergency features, and secure session handling.

---

## 🚀 Features

### 👤 User
- Multi-step registration with voice & emergency preferences
- User Dashboard with:
  - 🎉 Happy Time (Activities, Music, Books, etc.)
  - 🧠 Memory Box (Record audio memories & shareable links)
  - 👥 Caretaker Pairing Grid
  - 😓 Emergency & Feeling Unwell modals
  - 🔊 Voice Assistant using Web Speech API
  - 🔔 Alerts (based on vitals)
  - 💬 Real-time Chat with Doctor or Caretaker

### 👩‍⚕️ Doctor
- View Patient List
- Upload Vitals / Send Care Plans
- Real-time Chat with Users
- Chat UI per patient (select & message)

### 🧑‍🦽 Caretaker
- View & Accept Requests
- Daily Schedule
- Upload Reports
- Real-time Chat with Users

### 🧠 AI + Voice Features
- Voice Suggestions (e.g., “Take deep breaths.”)
- Voice Command Support (“Meera, play bhajans”)

### 🔐 Privacy & Security
- Trusted Device Checkbox (localStorage)
- Auto Logout after 5 minutes of idle
- DND toggle disables mic/camera
- Offline Mode with localStorage fallback

---

## 🛠️ Tech Stack

- **Frontend**: React.js + Tailwind CSS + Framer Motion + Socket.io-client + Web Speech API
- **Backend**: Node.js + Express.js + MongoDB + Socket.io + Cloudinary (for file uploads)
- **Database**: MongoDB Atlas
- **Auth**: JWT Token-based Auth with role-level permissions

---

## 📁 Project Structure

```
client/
  └── src/
      ├── components/
      ├── pages/
      ├── hooks/
      ├── Chat/ChatBox.jsx
      └── App.jsx

server/
  ├── routes/
  ├── controllers/
  ├── models/
  ├── socket/
  └── index.js
```

---

## 🧪 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/careconnect.git
cd careconnect
```

### 2. Start the Backend

```bash
cd server
npm install
npm run dev
```

Make sure to add your `.env` file with:

```env
PORT=5000
MONGO_URI=mongodb+srv://your-db
JWT_SECRET=yourSecret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

### 3. Start the Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔄 Socket.io Events Used

- `joinRoom`, `leaveRoom`
- `sendMessage`
- `receive-message`

---

## 📦 Deployment Instructions

You can deploy:
- Frontend → Vercel / Netlify
- Backend → Render / Railway / Cyclic / Fly.io

---