import React from 'react'
const CreditUsagePerMinute = () => {
  return (
   <div className="priceBoxWrapper">
        <div className="price-box">
          <h3 className="price-box-heading">Credit Usage per minute</h3>
          <div className="price-table">
            <div className="price-row">
              <span>1080p</span>
              <span className="orangeColored">1 credit</span>
            </div>
            <div className="price-row">
              <span>2.7K</span>
              <span className="orangeColored">2 credits</span>
            </div>
            <div className="price-row">
              <span>4K</span>
              <span className="orangeColored">3 credits</span>
            </div>
            <div className="price-row">
              <span>8K</span>
              <span className="orangeColored">6 credits</span>
            </div>
          </div>
          <div className="price-note-div">
            ✓ Credits valid for 1 year from purchase date
          </div>
        </div>
      </div>
 
  )
}

export default CreditUsagePerMinute
