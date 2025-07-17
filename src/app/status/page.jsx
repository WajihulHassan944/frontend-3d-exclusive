import { Suspense } from 'react';
import Status from './Status';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Status />
    </Suspense>
  );
}
