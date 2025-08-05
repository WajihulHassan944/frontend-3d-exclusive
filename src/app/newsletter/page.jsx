import React, { Suspense } from 'react';
import NewsletterFeedback from './NewsletterFeedback';

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewsletterFeedback />
      </Suspense>
    </div>
  );
};

export default Page;
