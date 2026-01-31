import React, { useState, useMemo } from 'react';

function randomProducts(count) {
  const names = ["iPhone", "Samsung", "Oppo", "Xiaomi", "Nokia", "Sony", "Vivo", "Realme", "Asus", "LG"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[Math.floor(Math.random() * names.length)] + ' ' + (i + 1),
    price: Math.floor(Math.random() * 10000) + 1000,
  }));
}
const PRODUCTS = randomProducts(2000);

function Exercise3() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");


  // Đo thời gian render sau tối ưu (dùng useMemo)
//   const t0 = performance.now();
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchName = p.name.toLowerCase().includes(search.toLowerCase());
      const matchMin = minPrice === "" || p.price >= Number(minPrice);
      const matchMax = maxPrice === "" || p.price <= Number(maxPrice);
      return matchName && matchMin && matchMax;
    });
  }, [search, minPrice, maxPrice]);

  const total = useMemo(() => {
    return filteredProducts.reduce((sum, p) => sum + p.price, 0);
  }, [filteredProducts]);
//   const t1 = performance.now();
//   console.log('[useMemo] Render time:', (t1 - t0).toFixed(2), 'ms');

  // Nếu muốn so sánh với KHÔNG dùng useMemo, hãy comment toàn bộ khối trên và bỏ comment đoạn dưới:
  // const t0 = performance.now();
  // const filteredProducts = PRODUCTS.filter(p => {
  //   const matchName = p.name.toLowerCase().includes(search.toLowerCase());
  //   const matchMin = minPrice === "" || p.price >= Number(minPrice);
  //   const matchMax = maxPrice === "" || p.price <= Number(maxPrice);
  //   return matchName && matchMin && matchMax;
  // });
  // const total = filteredProducts.reduce((sum, p) => sum + p.price, 0);
  // const t1 = performance.now();
  // console.log('[NO useMemo] Render time:', (t1 - t0).toFixed(2), 'ms');

  return (
    <div>
      <h2>Product Filter + Tổng tiền</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Tìm theo tên..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="number"
          placeholder="Giá từ"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="number"
          placeholder="Đến"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <b>Tổng tiền:</b> {total.toLocaleString()} VND
      </div>
      <div style={{ maxHeight: 400, overflow: 'auto', marginTop: 16, borderRadius: 8, boxShadow: '0 2px 8px #0001', border: '1px solid #e0e0e0' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontFamily: 'inherit' }}>
          <thead>
            <tr style={{ background: '#1976d2' }}>
              <th style={{ color: '#fff', padding: '10px 8px', position: 'sticky', top: 0, zIndex: 1, textAlign: 'left', borderTopLeftRadius: 8 }}>ID</th>
              <th style={{ color: '#fff', padding: '10px 8px', position: 'sticky', top: 0, zIndex: 1, textAlign: 'left' }}>Tên</th>
              <th style={{ color: '#fff', padding: '10px 8px', position: 'sticky', top: 0, zIndex: 1, textAlign: 'left', borderTopRightRadius: 8 }}>Giá</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p, idx) => (
              <tr key={p.id}
                style={{
                  background: idx % 2 === 0 ? '#f7fafd' : '#fff',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#e3f2fd'}
                onMouseOut={e => e.currentTarget.style.background = idx % 2 === 0 ? '#f7fafd' : '#fff'}
              >
                <td style={{ padding: '8px 8px', borderBottom: '1px solid #e0e0e0' }}>{p.id}</td>
                <td style={{ padding: '8px 8px', borderBottom: '1px solid #e0e0e0' }}>{p.name}</td>
                <td style={{ padding: '8px 8px', borderBottom: '1px solid #e0e0e0', color: '#1976d2', fontWeight: 500 }}>{p.price.toLocaleString()} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        Số sản phẩm: {filteredProducts.length}
      </div>
    </div>
  );
}

export default Exercise3