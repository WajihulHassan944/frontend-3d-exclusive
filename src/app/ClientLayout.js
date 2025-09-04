'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

import Footer from './footer/Footer';
import UserInitializer from './UserInitializer';
import { Toaster } from 'react-hot-toast';
import AdminSideNav from './admin/AdminNav/page';
import TopNav from './admin/AdminNav/TopNav/TopNav';
import Navbar from './navbar/Navbar';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isAdminLogin = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin') && !isAdminLogin;
const isAdminRoot = pathname === '/admin';
  // Set body background color dynamically
  useEffect(() => {
    if (isAdminRoute) {
      document.body.style.background = '#fff';
    } else {
      document.body.style.background = ''; // reset (use your default CSS)
    }
  }, [isAdminRoute]);

  return (
    <GoogleOAuthProvider clientId="852917251115-oi5pepl5cf67u06d0f9gvpomce2hjbl5.apps.googleusercontent.com">
      <Provider store={store}>
        <UserInitializer />

        {/* Admin vs Client layout switching */}
        {isAdminRoute && (
          <>
            <AdminSideNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            {isAdminRoot && <TopNav isSidebarOpen={isSidebarOpen} />}
          </>
        )}

        {!isAdminRoute && !isAdminLogin && <Navbar />}

        <main className={isAdminRoute ? (isSidebarOpen ? 'admin-main shifted' : 'admin-main full') : ''}>
          {children}
        </main>

        {!isAdminRoute && !isAdminLogin && <Footer />}

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
      </Provider>
    </GoogleOAuthProvider>
  );
}
