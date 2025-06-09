import React, { useState } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ padding: '10px 20px' }}>
      <input
        type="text"
        placeholder="샵 이름으로 검색해 보세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      <button style={{ marginTop: '10px' }}>상세 필터</button>
    </div>
  );
}

export default Search;
