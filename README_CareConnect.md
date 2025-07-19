
# 💙 CareConnect

**CareConnect** is a full-stack healthcare web application designed to connect **Users**, **Caretakers**, and **Doctors** in a seamless, voice-assisted platform with real-time chat, emergency response features, and multilingual support.

## 🚀 Features

### 🔐 Authentication & Registration
- Role-based registration for **Users**, **Doctors**, and **Caretakers**
- Secure JWT-based authentication
- Dynamic registration steps per role
- PDF upload for Doctors & Caretakers

### 🧑‍⚕️ Role Dashboards
- **User Dashboard**: Emergency button, Happy Time, Memory Box, Caretaker pairing, chat
- **Caretaker Dashboard**: Assigned users, chat, profile
- **Doctor Dashboard**: Patient list, care plan, real-time chat, vitals upload

### 🎙️ Voice Command System
- Integrated using **Web Speech API**
- Voice-activated navigation: "open caretaker", "play bhajans", etc.
- DND (Do Not Disturb) toggle to disable voice UI

### 💬 Real-Time Chat
- Socket.io-powered chat between:
  - User ↔ Doctor
  - User ↔ Caretaker
- Sender/receiver logic with IDs

### 🧠 AI Suggestion Engine
- Generates health tips/suggestions based on user's current mood or vitals (dummy logic or AI-ready)

### 📁 Memory Box
- Users can upload audio memories
- Audio saved to Cloudinary with title, date
- Shareable link generation

### 🧘‍♀️ Happy Time
- Embedded bhajans/videos to uplift user mood
- Triggered by button or voice

### 📊 Vitals Alert Logic
- Alerts user/doctor if any vital sign is abnormal (mock logic setup)
- Doctor uploads vitals via form

### 🌐 Internationalization (i18n)
- Full support for **English** and **Telugu**
- Dynamic translations for forms, labels, buttons, steps

---

## 🧱 Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| Frontend     | React, TailwindCSS, React Router, i18next, Axios, Framer Motion |
| Backend      | Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Socket.io |
| File Storage | Cloudinary |
| Chat         | Socket.io |
| Voice        | Web Speech API |
| Translations | i18next |

---

## 📦 Project Structure

```
careconnect/
│
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── i18n/        # i18next config
│   │   └── App.jsx
│
├── server/              # Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/careconnect.git
cd careconnect
```

### 2. Setup Backend

```bash
cd server
npm install
# Create `.env` file with:
# MONGO_URI=
# JWT_SECRET=
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=
node server.js
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🧪 Test Accounts

| Role      | Email                  | Password |
|-----------|------------------------|----------|
| User      | user@example.com       | 123456   |
| Doctor    | doctor@example.com     | 123456   |
| Caretaker | caretaker@example.com  | 123456   |

---

## 📌 Notes

- Cloudinary is used for all file uploads (audio, PDF).
- i18n is fully dynamic and switchable.
- All dashboards are protected routes.
- Voice commands work best on Chrome.

---

## 🤝 Author

**Roop Teja**  
[LinkedIn](https://www.linkedin.com/in/roop-teja-g-796013299/)  
Email: roopteja112@gmail.com

---

## 📄 License