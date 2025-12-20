import React from 'react'
import FreeTrialHero from './FreeTrialHero/FreeTrialHero'
import FreeTrialSteps from './FreeTrialSteps/FreeTrialSteps'
import TrustRating from './FreeTrialSteps/TrustRating/TrustRating'

const page = () => {
  return (
    <>
        <FreeTrialHero />
        <FreeTrialSteps />
        <TrustRating />
    </>
  )
}

export default page
