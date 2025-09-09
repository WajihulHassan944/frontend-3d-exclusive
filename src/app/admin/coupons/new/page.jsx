import React, { Suspense } from "react";
import NewCoupon from "./NewCoupon";

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewCoupon />
      </Suspense>
    </div>
  );
};

export default Page;
