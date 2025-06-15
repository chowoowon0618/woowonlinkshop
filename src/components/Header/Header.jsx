import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCreatePage = location.pathname === '/create';

  const handleButtonClick = () => {
    if (isCreatePage) {
      navigate(-1); // 이전 페이지로 돌아가기
    } else {
      navigate('/create');
    }
  };

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
          margin: '21.41px',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#14151A',
          cursor: 'pointer',
          width: '152.4px',
          height: '22.41px',
          top: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => navigate('/')}
      >
        LINK SHOP
      </h1>

      <button
        onClick={handleButtonClick}
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
          backgroundColor: '#3E45EC',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {isCreatePage ? '돌아가기' : '생성하기'}
      </button>
    </header>
  );
}

export default Header;
