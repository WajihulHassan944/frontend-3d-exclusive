const FinalPriceBox = ({
  credits = [],
  currencySymbol,
  priceBeforeDiscount,
  discountAmount = 0,
  vatPercent = null,
  finalPrice,
  vatNote,
}) => {
  if (!credits.length) return null;

  const hasDiscount = Number(discountAmount) > 0;
  const discountedSubtotal = priceBeforeDiscount - Number(discountAmount);

  return (
    <>
      <div className="final-price-box">
        {/* Subtotal */}
        <p className="subtotal-line">
          <span className="colored">Subtotal:</span>

          {hasDiscount ? (
            <>
              <span className="old-price">
                {currencySymbol} {priceBeforeDiscount.toFixed(2)}
              </span>
              <span className="discounted-price">
                {currencySymbol} {discountedSubtotal.toFixed(2)}
              </span>
            </>
          ) : (
            <span>
              {currencySymbol} {priceBeforeDiscount.toFixed(2)}
            </span>
          )}
        </p>

        {/* Total incl. VAT */}
        {vatPercent !== null && (
          <p className="vat-total-line">
            Total incl. <span>VAT ({vatPercent}%):</span>

            {hasDiscount ? (
              <>
                <span className="old-price">
                  {currencySymbol} {discountedSubtotal.toFixed(2)}
                </span>
                <span className="discounted-price">
                  {currencySymbol} {finalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span>
                {currencySymbol} {finalPrice.toFixed(2)}
              </span>
            )}
          </p>
        )}
      </div>

      {vatNote && <p className="vat-note">{vatNote}</p>}
    </>
  );
};

export default FinalPriceBox;
