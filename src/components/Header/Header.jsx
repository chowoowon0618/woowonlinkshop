import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#222',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
      >
        LINK SHOP
      </h1>

      <button
        onClick={() => navigate('/create')}
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
          backgroundColor: '#222',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        생성하기
      </button>
    </header>
  );
}

export default Header; 