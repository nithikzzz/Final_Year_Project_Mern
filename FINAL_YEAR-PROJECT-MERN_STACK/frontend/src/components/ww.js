import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const WarrantyCheckButton = ({ warrantyDate, productName }) => {
  const [daysUntilExpiry, setDaysUntilExpiry] = useState(null);

  const checkWarranty = () => {
    const expiryDays = formatDistanceToNow(new Date(warrantyDate), { addSuffix: false, unit: 'day' });
    setDaysUntilExpiry(expiryDays);

    const numericExpiryDays = parseInt(expiryDays, 10);

    if (!isNaN(numericExpiryDays)) {
      if (numericExpiryDays <= 5) {
        alert(`Warranty for ${productName} will expire in ${expiryDays} days.`);
      } else {
        alert(`Warranty for ${productName} is still valid.`);
      }
    } else {
      alert(`Error calculating expiry days.`);
    }
  };

  return (
    <div>
      <button onClick={checkWarranty}>Warranty Check</button>
      {daysUntilExpiry !== null && (
        <p>Warranty will expire in {daysUntilExpiry} days.</p>
      )}
    </div>
  );
};

export default WarrantyCheckButton;
