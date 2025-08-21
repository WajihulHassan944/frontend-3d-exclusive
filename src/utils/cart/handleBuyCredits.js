import { baseUrl } from '@/const';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import toast from 'react-hot-toast';
import { getLocalizedAmount } from '@/utils/getLocalizedAmount';

export const handleBuyCredits = async (credits, dispatch, fetchCart, setLoading ,setCredits, currency ) => {
  setLoading(true);
  const amount = await getLocalizedAmount(credits);

  try {
    const res = await fetch(`${baseUrl}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ credits, amount }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      await refreshAndDispatchUser(dispatch);
      localStorage.removeItem('pendingCredits');
      fetchCart(setCredits, setLoading, currency );
    } else {
      toast.error(data.error || 'Failed to add credits');
    }
  } catch (err) {
    console.error('❌ Error adding credits:', err);
    toast.error('Something went wrong');
  }
};
