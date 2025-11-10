'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Pusher from 'pusher-js';
import { baseUrl } from '@/const';

import Footer from './footer/Footer';
import UserInitializer from './UserInitializer';
import { Toaster } from 'react-hot-toast';
import AdminSideNav from './admin/AdminNav/page';
import TopNav from './admin/AdminNav/TopNav/TopNav';
import Navbar from './navbar/Navbar';
import CouponBanner from '../../components/Coupons/CouponBanner';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [liveVisitors, setLiveVisitors] = useState(0);

  const isAdminLogin = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin') && !isAdminLogin;
  const isAdminRoot = pathname === '/admin';

  // ✅ Change background for admin pages
  useEffect(() => {
    document.body.style.background = isAdminRoute ? '#fff' : '';
  }, [isAdminRoute]);

  // ✅ Setup Live Visitors system (using Pusher + fetch)
  useEffect(() => {
    
    const connectUser = async () => {
      try {
        await fetch(`${baseUrl}/live-visitors/connect`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        console.error('Live visitors connect error:', err);
      }
    };

    const disconnectUser = async () => {
      try {
        await fetch(`${baseUrl}/live-visitors/disconnect`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        console.error('Live visitors disconnect error:', err);
      }
    };

    // 🔌 Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe('exclusive');
    channel.bind('live-visitors-update', (data) => {
      setLiveVisitors(data.count);
    });

    // Connect user when component mounts
    connectUser();

    // Disconnect user when closing or navigating away
    window.addEventListener('beforeunload', disconnectUser);

    // Cleanup on unmount
    return () => {
      disconnectUser();
      channel.unbind_all();
      channel.unsubscribe();
      window.removeEventListener('beforeunload', disconnectUser);
      pusher.disconnect();
    };
  }, [isAdminRoute, isAdminLogin]);

  return (
    <GoogleOAuthProvider clientId="852917251115-oi5pepl5cf67u06d0f9gvpomce2hjbl5.apps.googleusercontent.com">
      <Provider store={store}>
        <UserInitializer />
        {!isAdminRoute && !isAdminLogin && <CouponBanner />}

        {/* Admin vs Client layout switching */}
        {isAdminRoute && (
          <>
            <AdminSideNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            {isAdminRoot && <TopNav isSidebarOpen={isSidebarOpen} />}
          </>
        )}

        {!isAdminRoute && !isAdminLogin && <Navbar />}

        <main
          className={
            isAdminRoute
              ? isSidebarOpen
                ? 'admin-main shifted'
                : 'admin-main full'
              : ''
          }
        >
          {children}
        </main>

        {!isAdminRoute && !isAdminLogin && <Footer />}

        {/* ✅ Floating Live Visitors Badge
        {!isAdminRoute && !isAdminLogin && (
          <div
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              background: '#1f2a60',
              color: '#fff',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 9999,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            }}
          >
            <span style={{ fontSize: '20px', color: '#22c55e' }}>●</span>
            Live Visitors: <strong>{liveVisitors}</strong>
          </div>
        )} */}

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
