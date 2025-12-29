'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider, useDispatch, useSelector } from 'react-redux';
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
import { fetchGeo } from '@/redux/features/geoSlice';

// --------------------------------------------------------
// WRAPPER SO REDUX PROVIDER WORKS
// --------------------------------------------------------
export default function ClientLayout({ children }) {
  return (
    <GoogleOAuthProvider clientId="180462491645-kpi3hqneq6bonva2s61cq8hnj7sn6b49.apps.googleusercontent.com">
      <Provider store={store}>
        <ClientLayoutInner>{children}</ClientLayoutInner>
      </Provider>
    </GoogleOAuthProvider>
  );
}

// --------------------------------------------------------
// REAL LAYOUT LOGIC (useSelector allowed here)
// --------------------------------------------------------
function ClientLayoutInner({ children }) {
  const pathname = usePathname();
  const router = useRouter();
 const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [liveVisitors, setLiveVisitors] = useState(0);
const [isStickyNav, setIsStickyNav] = useState(false);

  const [isComingSoon, setIsComingSoon] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const user = useSelector((state) => state.user); // NOW VALID

  const isAdminLogin = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin') && !isAdminLogin;
  const isAdminRoot = pathname === '/admin';
  const isCart = pathname === '/cart';

  // Hide navbar/footer when Coming Soon OR admin pages
  const hideClientUI = isComingSoon || isAdminRoute || isAdminLogin;
useEffect(() => {
  if (pathname?.startsWith("/blogs")) {
    setIsComingSoon(false);
  }
}, [pathname, isReady]);
// ✅ UPDATED PART ONLY (clear checkout-related localStorage on app load)

useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.removeItem('billingData');
    localStorage.removeItem('selectedLocalPaymentMethod');
    localStorage.removeItem('priceBeforeDiscount');
    localStorage.removeItem('couponData');
    localStorage.removeItem('discountAmount');
    localStorage.removeItem('paymentIntentId');
  }
}, []);

// --------------------------------------------------------
  // 🔥 ADMIN OVERRIDE — ALWAYS DISABLE COMING SOON
  // --------------------------------------------------------
  useEffect(() => {
    if (user?.role?.includes('admin')) {
      setIsComingSoon(false);
    }
  }, [user]);

  // Admin background
  useEffect(() => {
    document.body.style.background = isAdminRoute ? '#fff' : '';
  }, [isAdminRoute]);
 
  useEffect(() => {
    dispatch(fetchGeo()); // fetch once on app load
  }, [dispatch]);

  // --------------------------------------------------------
  // LIVE VISITORS + COMING SOON CHECK
  // --------------------------------------------------------
  useEffect(() => {
    const connectUser = async () => {
      try {
        const res = await fetch(`${baseUrl}/live-visitors/connect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

       if (data.success) {
  if (typeof data.isComingSoon === "boolean") {
    setIsComingSoon(data.isComingSoon);
  }

  if (typeof data.isStickyNav === "boolean") {
    setIsStickyNav(data.isStickyNav);
  }

  setIsReady(true);

  if (
    data.isComingSoon === true &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/blogs")
  ) {
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

  // --------------------------------------------------------
  // LOADING STATE
  // --------------------------------------------------------
  if (!isReady) {
    return (
      <div className="coming-soon-wrap loaderContainer">
        <div className="coming-soon-section loading-text">Loading...</div>
      </div>
    );
  }

  // --------------------------------------------------------
  // MAIN RETURN
  // --------------------------------------------------------
  return (
    <>
      <UserInitializer />

      {/* Coupon Banner */}
      {!hideClientUI && !isCart && <CouponBanner enableSticky={isStickyNav} onClose={() => setIsStickyNav(false)} />}

      {/* Admin layout */}
      {isAdminRoute && (
        <>
          <AdminSideNav
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
          {isAdminRoot && <TopNav isSidebarOpen={isSidebarOpen} />}
        </>
      )}

      {/* Public Navbar */}
    {!hideClientUI && (
  <Navbar enableSticky={isCart ? false : isStickyNav} />
)}

      {/* Main Content */}
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

      {/* Footer */}
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
    </>
  );
}
