# Notekeeper

Notekeeper is a feature-rich, real-time Progressive Web Application (PWA) designed to store everything you have in your mind or your clipboard. Whether you are creating notes, tracking to-dos, or sketching on a canvas, Notekeeper provides a seamless, cross-device experience. 

## 🚀 Features

- **Rich Text Editing:** Create and format notes effortlessly using a powerful rich-text editor (`react-quill`).
- **Real-time Sync:** Powered by Firebase Firestore, your data is securely stored and synchronized across all your devices in real-time.
- **Secure Authentication:** User login and signup securely handled via Firebase Authentication.
- **Export Capabilities:** Easily download your notes and canvases as PDFs (`jspdf`) or Images (`dom-to-image`).
- **Progressive Web App (PWA):** Installable on both desktop and mobile devices for a native app-like experience (`vite-plugin-pwa`).
- **Dynamic Theming:** Automatic time-based dark and light mode switching for optimal viewing comfort.
- **Smooth Animations:** Fluid UI transitions and responsive design using `react-transition-group`.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Backend & Database:** Firebase (Authentication, Firestore)
- **Rich Text Editor:** React Quill
- **Exports:** jsPDF, dom-to-image
- **Styling:** Custom CSS with CSS Transitions

## ⚙️ Local Development Setup

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Notekeeper
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_APP_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   VITE_FIREBASE_MESSAGING_ID="your-messaging-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

## 🌐 Deployment

This application is built with Vite and can be easily deployed to platforms like Vercel, Netlify, or Firebase Hosting.

**Build for Production:**
```bash
npm run build
```
This will generate a `dist/` directory containing the production-ready build. 

**Deploying to Firebase Hosting:**
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize the project: `firebase init` (Select Hosting and point the public directory to `dist`)
4. Deploy: `firebase deploy`
