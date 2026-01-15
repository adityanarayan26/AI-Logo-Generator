# AI Logo Generator 🎨

A professional-grade, AI-powered logo generation application built with **Next.js 16**, **Firebase**, and **Gemini 2.0 Flash**. Create stunning, unique logos for your brand in seconds with a guided wizard and premium UI experience.

![AI Logo Generator Banner](/public/logo.svg)

## 🤖 AI Models Used

- **Idea & Prompt Engineering**: **Google Gemini 2.0 Flash** (`gemini-2.0-flash`)
  - Used to brainstorm logo ideas, refine user descriptions, and generate high-quality text prompts for the image generator.
- **Image Generation**: **Pollinations.ai**
  - Utilizes advanced diffusion models (like Flux/SDXL) to convert the text prompts into high-resolution logo images.

## 🔄 Application Workflow

The application follows a streamlined, user-centric workflow to take you from a vague idea to a polished logo:

1.  **Authentication**:
    - Users sign in securely using their Google account (powered by Firebase Authentication).

2.  **Dashboard**:
    - Upon login, users are greeted by a personalized dashboard.
    - This serves as the central hub to view previously created logos (fetched from Firestore) or start a new creation process.

3.  **Creation Wizard (5 Steps)**:
    - **Step 1: Identity**: User enters the Brand/Logo Name and a tagline.
    - **Step 2: Description**: User provides a brief description of their brand or vision.
    - **Step 3: Color Palette**: User selects a color palette (e.g., "Sunset Warmth", "Cool Blues") which sets the mood.
    - **Step 4: Design Style**: User chooses a style (e.g., Modern, Vintage, Minimalist).
    - **Step 5: AI Brainstorming**:
        - The app sends the collected inputs to **Gemini 2.0 Flash**.
        - Gemini generates unique, creative logo concepts and design prompts based on the inputs.
        - The user selects their favorite concept.

4.  **Generation Phase**:
    - The selected concept is converted into a highly detailed image generation prompt.
    - This prompt is sent to **Pollinations.ai**.
    - The AI generates the logo image in real-time.

5.  **Finalization & Storage**:
    - **Display**: The generated logo is displayed to the user.
    - **Cloud Storage**: The image is automatically uploaded to **Cloudinary** for permanent hosting.
    - **Database Entry**: Metadata (image URL, prompt, timestamp) is saved to **Firebase Firestore**.
    - **Download**: Users can download the final logo in PNG format.

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16** (App Router)
- **React 19**
- **JavaScript**

### Styling & UI
- **Tailwind CSS**
- **Lucide React** (Icons)
- **Shadcn UI** (Components)
- **Framer Motion** (Animations)

### Backend & Services
- **Firebase Auth** (Google Sign-In)
- **Firebase Firestore** (Database)
- **Cloudinary** (Image Storage)
- **Axios** (API Requests)

### AI Integration
- **Google Generative AI SDK** (Gemini)
- **Pollinations.ai** (Image Gen)

### State Management
- **Redux Toolkit**
- **Redux Persist**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed.
- A Firebase project.
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

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**:
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
