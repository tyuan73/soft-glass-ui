import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SoftToastProvider } from './components/soft-ui';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SoftToastProvider>
      <App />
    </SoftToastProvider>
  </StrictMode>
);
