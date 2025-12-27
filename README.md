# AI Logo Generator 🎨

A professional-grade, AI-powered logo generation application built with **Next.js 15**, **Firebase**, and **Pollinations AI**. Create stunning, unique logos for your brand in seconds with a guided wizard and premium UI experience.

![AI Logo Generator Banner](/public/logo.svg)

## ✨ Unique Selling Points (USP)

- **Professional & Modern UI**: A "best-in-class" dark theme design using deep zinc/slate tones, glassmorphism, and smooth animations (no generic "bootstrap" look).
- **Free Unlimited Generation**: Utilizes **Pollinations.ai** for high-quality, free image generation without API cost barriers.
- **Secure Cloud Storage**: Seamless integration with **Cloudinary** for storing generated logos and **Firestore** for managing user galleries.
- **Robust Authentication**: Secure Google Sign-In powered by **Firebase Auth**.
- **User-Centric Workflow**: A guided 5-step wizard to craft the perfect prompt for your logo (Name, Description, Palette, Style, Idea).

## 🚀 Features

- **Authentication**: Secure login/signup with Google (Firebase Auth).
- **Logo Creation Wizard**:
    - Step-by-step guidance.
    - Curated color palettes and styles.
    - AI-generated design ideas (Gemini integration).
- **Instant Generation**: Fast logo generation using Pollinations AI.
- **Dashboard**:
    - View your history of generated logos.
    - Filter and search functionality.
    - Download logos in PNG format.
- **Cloud Persistence**: All logos are securely uploaded to Cloudinary on generation.
- **Responsive Design**: Fully responsive UI working on mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: JavaScript / React
- **Styling**: Tailwind CSS + Custom "Zinc" Dark Theme
- **Authentication**: Firebase Auth (Google Provider)
- **Database**: Firebase Firestore
- **Storage**: Cloudinary
- **AI Models**:
    - **Image Generation**: Pollinations.ai (Flux/SDXL models)
    - **Prompt Enhancement**: Google Gemini API
- **State Management**: Redux Toolkit (with persistence)
- **Icons**: Lucide React

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+ installed.
- A Firebase project (with Auth and Firestore enabled).
- A Cloudinary account.
- A Google Gemini API Key.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/ai-logo-generator.git
    cd ai-logo-generator
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory and add:

    ```env
    # Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

    # Firebase Admin (Service Account)
    FIREBASE_PROJECT_ID=your_project_id
    FIREBASE_CLIENT_EMAIL=your_client_email
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

    # Cloudinary
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

    # AI Services
    NEXT_GEMINI_API=your_gemini_api_key
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open the app**:
    Navigate to [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
    - `create/`: The multi-step logo creation wizard.
    - `dashboard/`: User dashboard and gallery.
    - `generate-logo/`: The result page for generation.
    - `_components/`: Shared UI components (Header, Hero, Loading, etc.).
- `configs/`: Configuration files (Firebase, Cloudinary, AI Models).
- `lib/`: Utility functions (Firestore, AuthContext).
- `public/`: Static assets.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
