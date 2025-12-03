# Stranger Things S5 Parallax Experience

A cinematic landing page built with React, Tailwind CSS, and GSAP.

## Project Setup

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run locally:
    ```bash
    npm run dev
    ```

## Firebase Hosting Deployment Instructions

1.  **Install Firebase Tools** (if not installed):
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase**:
    ```bash
    firebase login
    ```

3.  **Initialize Firebase**:
    ```bash
    firebase init hosting
    ```
    *   **Public directory:** `dist` (if using Vite) or `build` (CRA).
    *   **Configure as single-page app:** `Yes`
    *   **Automatic builds/deploys with GitHub:** (Optional)

4.  **Build the Project**:
    *   Ensure your build script generates the static files.
    ```bash
    npm run build
    ```

5.  **Deploy**:
    ```bash
    firebase deploy --only hosting
    ```

## Customization

*   **Video**: Update the video URL in `components/Hero.tsx`.
*   **Fonts**: Changed in `index.html`.
*   **Colors**: Configured in Tailwind setup within `index.html`.
