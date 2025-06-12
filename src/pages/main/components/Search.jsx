import React, { useState } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const teamId = '16기-조우원'; 

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://linkshop-api.vercel.app/shops/search?team=${teamId}&query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('검색에 실패했습니다.');

      const data = await res.json();
      setResults(data.list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="가게 이름을 검색하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: '10px 16px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 16px',
            fontSize: '16px',
            backgroundColor: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          검색
        </button>
      </div>

      {loading && <p>검색 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results.length === 0 && !loading && <p>검색 결과가 없습니다.</p>}

      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {results.map((shop) => (
          <div
            key={shop.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              backgroundColor: '#fff',
            }}
          >
            <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>{shop.name}</h2>
            <p style={{ margin: '0', color: '#666' }}>{shop.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
