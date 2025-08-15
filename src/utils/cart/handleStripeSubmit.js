import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
import { refreshAndDispatchUser } from '@/utils/refreshUser';

export const handleStripeSubmit = async ({
  stripe,
  elements,
  user,
  dispatch,
  setStripeCard,
  setCardSubmitting,
  billingData,
  isCard, // pass true if card, false for local methods
}) => {
  if (!stripe || !elements) return;

  setCardSubmitting(true);

  try {
    // 🔹 Get country code from ipwho.is if needed
    let countryCode = 'US'; // fallback
    try {
      if (billingData?.country?.length === 2) {
        countryCode = billingData.country.toUpperCase();
      } else {
        const ipRes = await fetch('https://ipwho.is/');
        const ipData = await ipRes.json();
        if (ipData?.success && ipData?.country_code) {
          countryCode = ipData.country_code;
        }
      }
    } catch (err) {
      console.warn('IP lookup failed, using fallback country:', err);
    }

    if (isCard) {
      // ✅ Card flow (SetupIntent)
      const { setupIntent, error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/cart`,
        },
        redirect: 'if_required',
      });

      if (error) {
        toast.error(error.message);
      } else if (setupIntent?.status === 'succeeded') {
        const res = await fetch(`${baseUrl}/wallet/add-billing-method`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user._id,
            paymentMethodId: setupIntent.payment_method,
          }),
        });

        const data = await res.json();
        if (data.success) {
          toast.success('Card added!');
          await refreshAndDispatchUser(dispatch);
          setStripeCard(true);
        } else {
          toast.error(data.message || 'Failed to save billing method');
        }
      } else {
        toast.error('Payment method setup incomplete.');
      }
    } else {
      // ✅ Local methods flow (PaymentIntent)
      const mergedAddress = {
        line1: billingData?.street || 'N/A',
        postal_code: billingData?.postalCode || '00000',
        city: billingData?.city || 'N/A',
        state: billingData?.state || billingData?.city || 'N/A', // Stripe requires state
        country: countryCode,
      };

      const mergedBilling = {
        name: billingData?.name || `${user.firstName} ${user.lastName || ''}`.trim(),
        email: user.email || '',
        address: mergedAddress,
      };

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/cart?payment=success`,
          payment_method_data: {
            billing_details: mergedBilling,
          },
        },
      });

      if (error) {
        toast.error(error.message);
      }
    }
  } catch (err) {
    console.error(err);
    toast.error('Payment process failed.');
  }

  setCardSubmitting(false);
};
