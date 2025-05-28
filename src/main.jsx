import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes.jsx';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from './Context/ThemeContext.jsx'
import AuthProvider from './Provider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
