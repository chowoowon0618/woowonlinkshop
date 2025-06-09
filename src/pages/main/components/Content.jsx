import React, { useEffect, useState } from 'react';

function Content() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch('https://linkshop-api.vercel.app/api/shops')
      .then((res) => res.json())
      .then((data) => setShops(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {shops.map(shop => (
        <div key={shop.id} style={{ border: '1px solid #eee', marginBottom: '20px', padding: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>{shop.name}</div>
          <div>@{shop.userId}</div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {shop.products.slice(0, 3).map(product => (
              <img
                key={product.id}
                src={product.imageUrl}
                alt={product.name}
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Content;