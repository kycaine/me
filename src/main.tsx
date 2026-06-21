import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ubah menjadi '/' agar di mode production (saat live) tidak lagi mencari folder /me
const basename = '/';

createRoot(document.getElementById("root")!).render(<App basename={basename} />);