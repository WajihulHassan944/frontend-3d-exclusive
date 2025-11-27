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

  // 🔥 COMING SOON FLAG
  const [isComingSoon, setIsComingSoon] = useState(false);

  const isAdminLogin = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin') && !isAdminLogin;
  const isAdminRoot = pathname === '/admin';

  // ❗ If coming soon, hide UI (navbar + footer + coupon banner)
  const hideClientUI = isComingSoon || (isAdminRoute || isAdminLogin);

  // Admin background
  useEffect(() => {
    document.body.style.background = isAdminRoute ? '#fff' : '';
  }, [isAdminRoute]);

  // Live Visitors System
  useEffect(() => {
     const connectUser = async () => {
    try {
      const res = await fetch(`${baseUrl}/live-visitors/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      // ✅ Set Coming Soon on initial connect
      if (data.success && typeof data.isComingSoon === "boolean") {
        setIsComingSoon(data.isComingSoon);
               if (data.isComingSoon === true && !pathname.startsWith("/admin")) {
          router.push("/");
        }
   
      }
    } catch (err) {
      console.error("Live visitors connect error:", err);
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

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe('exclusive');
    channel.bind('live-visitors-update', (data) => {
      setLiveVisitors(data.count);
    });

    connectUser();
    window.addEventListener('beforeunload', disconnectUser);

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

        {/* 🎟️ Coupon Banner (hide if coming soon OR admin) */}
        {!hideClientUI && <CouponBanner />}

        {/* 🧱 ADMIN LAYOUT */}
        {isAdminRoute && (
          <>
            <AdminSideNav
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
            />
            {isAdminRoot && <TopNav isSidebarOpen={isSidebarOpen} />}
          </>
        )}

        {/* 🧭 NAVBAR (hide when isComingSoon = true) */}
        {!hideClientUI && <Navbar />}

        {/* MAIN CONTENT */}
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

        {/* FOOTER (hide when ComingSoon true) */}
        {!hideClientUI && <Footer />}

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
