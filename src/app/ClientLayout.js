'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import UserInitializer from './UserInitializer';
import { Toaster } from 'react-hot-toast';
export default function ClientLayout({ children }) {
  return (
    <GoogleOAuthProvider clientId="852917251115-oi5pepl5cf67u06d0f9gvpomce2hjbl5.apps.googleusercontent.com">
      <Provider store={store}>
        <UserInitializer />
        <Navbar />
        {children}
        <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1f2a60',
                  color: '#fff',
                },
              }}
            />
        <Footer />
      </Provider>
    </GoogleOAuthProvider>
  );
}
