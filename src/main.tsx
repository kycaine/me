import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const basename = import.meta.env.PROD ? '/me' : '/';

createRoot(document.getElementById("root")!).render(<App basename={basename} />);
