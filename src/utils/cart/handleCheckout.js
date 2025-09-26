import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { clearCart } from './clearCart';

export const handleCheckout = async ({
  user,
  credits,
  currencySymbol,
  selectedPaymentMethod,
  router,
  dispatch,
  setCheckoutLoading
}) => {
  // ✅ Get billingData from localStorage
  const storedBillingData = localStorage.getItem('billingData');
  const billingData = storedBillingData ? JSON.parse(storedBillingData) : {};
const storedCouponData = localStorage.getItem('couponData');
const couponData = storedCouponData ? JSON.parse(storedCouponData) : null;

const storedPriceBeforeDiscount = localStorage.getItem('priceBeforeDiscount');

const storedDiscountAmount = localStorage.getItem('discountAmount');
const discountAmount = storedDiscountAmount ? Number(storedDiscountAmount) : 0;

  
const total = credits.reduce((sum, credit) => sum + credit.amount, 0);
  
const priceBeforeDiscount = storedPriceBeforeDiscount ? Number(storedPriceBeforeDiscount) : total;

  const primaryCard = user?.wallet?.cards?.find(card => card.isPrimary);

  if (!billingData.street || !billingData.postalCode || !billingData.country) {
    return toast.error('Please fill in the required billing fields.');
  }

  if (selectedPaymentMethod === "card" && !primaryCard) {
    toast.error('Please add billing first');
    return router.push('/add-billing');
  }

  if (total <= 0) {
    return toast.error('Your cart is empty.');
  }

  // ✅ Get the selected local payment method from localStorage
  const localPaymentMethod = localStorage.getItem('selectedLocalPaymentMethod') || null;
  console.log('💳 Local Payment Method from localStorage:', localPaymentMethod);
  const paymentIntentId = localStorage.getItem('paymentIntentId');
  setCheckoutLoading(true);
  try {
    const res = await fetch(`${baseUrl}/wallet/add-funds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        userId: user._id,
        amount: Number(total),
        credits,
        currencySymbol,
        billingInfo: billingData,
        usePrimaryCard: selectedPaymentMethod === 'card',
        stripeCard: false,
        localPaymentMethod, // ✅ send to backend
        coupon: couponData || null,
        priceBeforeDiscount:priceBeforeDiscount,
        discountAmount:discountAmount,
        paymentIntentId,
      }),
    });

    const data = await res.json();
    if (data.success) {
  localStorage.removeItem('billingData');
  localStorage.removeItem('selectedLocalPaymentMethod');
  localStorage.removeItem('priceBeforeDiscount');
  localStorage.removeItem('couponData');
  localStorage.removeItem('discountAmount');
 localStorage.removeItem('paymentIntentId'); 
      toast.success('Top-up successful!');
      await clearCart();
      await refreshAndDispatchUser(dispatch);
      
      router.push('/thankyou-for-purchase');
    } else {
      toast.error(data.message || 'Top-up failed');
    }
  } catch (err) {
    console.error(err);
    toast.error('Top-up failed');
  } finally {
    setCheckoutLoading(false);
  }
};
