# Waste Skip Finder

A modern web application for finding and booking waste skips, built with React, Vite, Tailwind CSS, and shadcn/ui.

## Features
- Dynamic skip data from a live API
- Modern, responsive UI with Tailwind CSS
- Accessible and mobile-friendly design

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/) (optional, if you prefer bun)

## Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/EjazQasim/waste-skip-finder.git
cd waste-skip-finder
```

### 2. Install dependencies
Using npm:
```sh
npm install
```
Or using bun:
```sh
bun install
```

### 3. Start the development server
```sh
npm run dev
```
Or with bun:
```sh
bun run dev
```

- The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 4. Build for production
```sh
npm run build
```
- The production-ready files will be in the `dist` folder.

### 5. Preview the production build
```sh
npm run preview
```

## Deployment
- Deploy the `dist` folder to your preferred static hosting (e.g., Netlify, Vercel).
- For Netlify, set the **publish directory** to `dist` and the **build command** to `npm run build`.

## Project Structure
```
├── public/           # Static assets (images, favicon, etc.)
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components (main app screens)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── ...
├── package.json      # Project metadata and scripts
├── tailwind.config.ts
├── vite.config.ts
└── ...
```

## Customization
- Update API endpoints in `src/pages/SkipSelectPage.jsx` if needed.

## Troubleshooting
- If you encounter issues, ensure your Node.js version is up to date.
- Delete `node_modules` and `package-lock.json` (or `bun.lockb`) and reinstall dependencies if needed.

## License
MIT
