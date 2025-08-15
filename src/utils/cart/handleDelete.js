import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
import { refreshAndDispatchUser } from '@/utils/refreshUser';

export const handleDelete = async (index, dispatch, setCredits) => {
  try {
    const res = await fetch(`${baseUrl}/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ index }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      toast.success('Credit removed');
      await refreshAndDispatchUser(dispatch);
      setCredits((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.error(data.message || 'Failed to remove credit');
    }
  } catch (err) {
    console.error(err);
    toast.error('Error removing credit');
  }
};
