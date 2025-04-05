

# 🌐 Roomloo Web App

Roomloo is a modern platform that helps users find PG accommodations, roommates, and post housing-related updates. This is the **web version** of Roomloo, designed with a **fresh 3D UI**, built using **React.js**, **Firebase**, and **React Three Fiber**.

---

## 🚀 Features

- 🔐 **Firebase Authentication** (Login, Signup, and Session management)
- 🎨 **Wix Studio AI**-based modern UI design
- 🌐 **Routing** with separate pages for PGs, Roommates, and Updates
- 🎮 **3D Visual Effects** using React Three Fiber
- 💬 **Dynamic Components**: Sticky transparent navbar, chat interface, theme toggle
- 📱 Responsive and mobile-friendly design

---

## 🧱 Tech Stack

| Technology         | Purpose                              |
|--------------------|---------------------------------------|
| React.js           | Frontend Framework                   |
| Firebase Auth      | User Authentication                  |
| React Router DOM   | Routing for multiple pages           |
| React Three Fiber  | 3D Effects & Animations              |
| Wix Studio AI      | UI Design and Layout Planning        |
| CSS                | Custom Styling                       |

---

## 📁 Folder Structure

roomloo-web/ ├── public/ ├── src/ │ ├── assets/ │ ├── components/ │ │ ├── Navbar.jsx │ │ ├── Footer.jsx │ ├── pages/ │ │ ├── Home.jsx │ │ ├── PGs.jsx │ │ ├── Roommate.jsx │ │ ├── Update.jsx │ ├── App.jsx │ ├── main.jsx ├── .env ├── package.json


---

## ⚙️ Setup & Installation

### 1. Clone the Repository

bash
git clone https://github.com/your-username/roomloo-web.git
cd roomloo-web

2. Install Dependencies

npm install

3. Setup Firebase

    Go to Firebase Console

    Create a new project

    Enable Email/Password authentication

    Add a new Web App and copy the Firebase config

4. Add Environment Variables

Create a .env file in the root directory and add:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id

5. Run the Development Server

npm run dev

    Your app should be live on http://localhost:5173

🧪 Optional: Build for Production

npm run build

🖼️ Preview
![image](https://github.com/user-attachments/assets/09b4c3a6-e445-4ebc-8f66-a84b9ab73a61)



📌 TODOs

Integrate full chat system

Add 3D roommate profiles

Enhance PG listing filters

    Implement notifications

📄 License

This project is licensed under the MIT License.
💬 Connect

Have any suggestions or want to contribute? Feel free to open an issue or pull request!


---

Let me know if you'd like me to include deployment instructions (like for Firebase Hosting or Ver
