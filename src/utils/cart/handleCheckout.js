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

  const localPaymentMethod = localStorage.getItem('selectedLocalPaymentMethod') || null;
  const paymentIntentId = localStorage.getItem('paymentIntentId');
  setCheckoutLoading(true);

  try {
    // ✅ Push GTM event: checkout started
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'begin_checkout',
      user_id: user?._id || null,
      payment_method: selectedPaymentMethod || 'unknown',
      local_payment_method: localPaymentMethod,
      currency: currencySymbol,
      total_value: total,
      coupon_code: couponData?.code || null,
      discount_amount: discountAmount,
      credits: credits.map(c => ({
        package_name: c.name || 'Credit Package',
        quantity: c.quantity || 1,
        value: c.amount,
      })),
      billing_country: billingData.country,
    });

    // ✅ Proceed with checkout request
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
        localPaymentMethod,
        coupon: couponData || null,
        priceBeforeDiscount,
        discountAmount,
        paymentIntentId,
      }),
    });

    const data = await res.json();

    if (data.success) {
      // ✅ Push GTM event: purchase success
      window.dataLayer.push({
        event: 'purchase',
        transaction_id: data.transactionId || `txn_${Date.now()}`,
        user_id: user?._id || null,
        currency: currencySymbol,
        value: total,
        discount: discountAmount,
        coupon: couponData?.code || null,
        payment_method: selectedPaymentMethod,
        items: credits.map(c => ({
          item_name: c.name || 'Credit Package',
          quantity: c.quantity || 1,
          price: c.amount,
        })),
        billing_country: billingData.country,
      });

      // ✅ Clear localStorage + user refresh
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

      // ✅ Push GTM event: payment failed
      window.dataLayer.push({
        event: 'purchase_failed',
        user_id: user?._id || null,
        error_message: data.message || 'Unknown error',
        currency: currencySymbol,
        value: total,
      });
    }
  } catch (err) {
    console.error(err);
    toast.error('Top-up failed');

    // ✅ Push GTM event: checkout error
    window.dataLayer.push({
      event: 'checkout_error',
      user_id: user?._id || null,
      error_message: err.message,
      value: total,
      currency: currencySymbol,
    });
  } finally {
    setCheckoutLoading(false);
  }
};
