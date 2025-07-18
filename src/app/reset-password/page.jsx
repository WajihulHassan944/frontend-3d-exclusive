'use client'

import React, { Suspense } from 'react'
import ResetPassword from './ResetPassword'

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
    </div>
  )
}

export default Page
