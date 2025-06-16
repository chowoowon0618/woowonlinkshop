import React, { useState } from 'react';

const MOCK_SHOPS = [
  {
    id: 1,
    name: 'ADIDAS 공식 샵',
    description: '스포츠 브랜드 ADIDAS 공식 샵입니다.',
    shop: {
      imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749474192958/1-1.jpg',
      urlName: 'ADIDAS',
      shopUrl: 'https://linkshop-api.vercel.app/16-조우원/linkshops',
    },
    likeCount: 120,
    products: [
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749642893149/images.jpg' },
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749642964305/42a013548f536001633fa9b875d248da.jpg' },
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749643007566/optimize.jpg' },
    ],
  },
  {
    id: 2,
    name: 'NIKE 공식 샵',
    description: '스포츠 브랜드 NIKE 공식 샵입니다.',
    shop: {
      imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749643301678/img.jpg',
      urlName: 'NIKE',
      shopUrl: 'https://linkshop-api.vercel.app/16-조우원/linkshops',
    },
    likeCount: 38,
    products: [
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749643456997/3c3626cf-789d-47a9-abae-e5cca622bfe1.jpg' },
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749643393095/detail_77947_0_be29af2b-ad3e-408e-a527-126447e0a378.jpg' },
    ],
  },
  {
    id: 3,
    name: 'PUMA 공식 샵',
    description: '스포츠 브랜드 PUMA 공식 샵입니다.',
    shop: {
      imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749698911622/img.jpg',
      urlName: 'PUMA',
      shopUrl: 'https://linkshop-api.vercel.app/16-조우원/linkshops',
    },
    likeCount: 24,
    products: [
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749699032591/2111874842_0000008.jpg' },
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749699063240/images.jpg' },
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749699165158/207c2dd2cf96dc14fe4d1fd8d8285957.jpg' },
    ],
  },
  {
    id: 4,
    name: 'DYNAFIT 공식 샵',
    description: '스포츠 브랜드 DYNAFIT 공식 샵입니다.',
    shop: {
      imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749699432823/Dynafit-logo.png',
      urlName: 'DYNAFIT',
      shopUrl: 'https://linkshop-api.vercel.app/16-조우원/linkshops',
    },
    likeCount: 65,
    products: [
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749699554029/optimize.jpg' },
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749699587479/7955003a70a0451502fce81ab0889275e6cc189d1ffda64e92e85777e240.jpg' },
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749699629651/59b2672d4b2f6a02582e6a2b2233aac3.jpg' },
    ],
  },
  {
    id: 5,
    name: 'SPYDER 공식 샵',
    description: '스포츠 브랜드 SPYDER 공식 샵입니다.',
    shop: {
      imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749700038186/2023080717165270103_1.jpg',
      urlName: 'SPYDER',
      shopUrl: 'https://linkshop-api.vercel.app/16-조우원/linkshops',
    },
    likeCount: 38,
    products: [
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749700090707/de28d20492b59bf8a860738c33d6203b.jpg' },
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749700137044/0337ddd2080eb8453ccc9d2cf8c67725.jpg' },
    ],
  },
  {
    id: 6,
    name: 'NEW BALANCE 공식 샵',
    description: '스포츠 브랜드 NEW BALANCE 공식 샵입니다.',
    shop: {
      imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749700230406/e4fb7dfe92b9ba526985344aba8c2fbe.jpg',
      urlName: 'NEW BALANCE',
      shopUrl: 'https://linkshop-api.vercel.app/16-조우원/linkshops',
    },
    likeCount: 24,
    products: [
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749700296948/NB20241028103123312001.jpg' },
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749700316668/optimize.jpg' },
      { imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749700357308/94851_1746149050633.jpg' },
    ],
  },
] ;

function Content() {
  const [shops, setShops] = useState(MOCK_SHOPS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShops = shops.filter((shop) => {
    const keyword = searchTerm.toLowerCase();
    return (
      shop.name.toLowerCase().includes(keyword) ||
      shop.description.toLowerCase().includes(keyword) ||
      shop.shop?.urlName.toLowerCase().includes(keyword)
    );
  });

  return (
 <div style={{ padding: '40px 360px' }}>
  {/* 검색창 */}
<div style={{ 
  width: 1199,                // 너비 1199px
  height: 55,                 // 높이 55px
  margin: '0 auto 24px',      // 중앙 정렬 및 아래쪽 여백
  position: 'relative',       // 내부 요소 위치 기준
}}>
  <div style={{ 
    position: 'relative', 
    borderRadius: 49,         // 반경 49px
    border: '1px solid #DDDCDF', // 테두리 1px solid #DDDCDF
    height: '100%',           // 부모 높이 상속
    width: '100%',            // 부모 너비 상속
  }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        left: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
        fill: '#999',
        pointerEvents: 'none',
      }}
      viewBox="0 0 24 24"
    >
      <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
    </svg>
      <input
        type="search"
        placeholder="샵 이름으로 검색해 보세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          height: '100%',
          padding: '10px 16px 10px 48px',
          fontSize: 16,
          border: 'none',
          borderRadius: 49,
          outline: 'none',
          backgroundColor: 'transparent',
          boxSizing: 'border-box',
        }}
      />
    </div>
  </div>

<div style={{ marginBottom: 32 }}>
  <button
    onClick={() => alert('상세필터 클릭!')}
    style={{
      background: 'none',
      border: 'none',
      color: '#14151A',
      cursor: 'pointer',
      fontSize: '18px',
      padding: 0,
      lineHeight: '100%',
      letterSpacing: '0%',
      fontWeight: 500,
      fontFamily: 'Pretendard, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',        // 줄바꿈 방지
      gap: '4px',                  // 아이콘과 글자 사이 간격
      width: 'auto',               // 고정 너비 제거 (원하면 최소 너비로 바꿔도 돼)
      height: '21px',
    }}
  >
    상세필터
    <span
      style={{
        fontSize: '12px',
        width: '12px',
        height: '12px',
        display: 'inline-block',
        lineHeight: '12px',
      }}
    >
      ▼
    </span>
  </button>
</div>


      {/* 카드 그리드 */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 587px)',
            gap: 24,
            justifyContent: 'center',
          }}
        >
          {filteredShops.length > 0 ? (
            filteredShops.map((shop) => (
              <div
                key={shop.id}
                style={{
                  width: 587,
                  height: 237,
                  backgroundColor: '#f9f9f9',
                  borderRadius: 24,
                  padding: 16,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  boxSizing: 'border-box',
                }}
              >
                {/* 샵 프로필 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img
                    src={shop.shop?.imageUrl || 'https://via.placeholder.com/95'}
                    alt={shop.name}
                    style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <strong>{shop.name}</strong>
                    <div style={{ fontSize: 12, color: '#666' }}>@{shop.shop?.urlName || 'unknown'}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: '#e0245e', fontWeight: 'bold' }}>
                    ❤️ {shop.likeCount || 0}
                  </div>
                </div>

                {/* 상품 이미지 */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {(shop.products || []).slice(0, 3).map((product, idx) => (
                    <img
                      key={idx}
                      src={product.imageUrl}
                      alt={`product-${idx}`}
                      style={{ width: 95, height: 95, borderRadius: 15, objectFit: 'cover' }}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%' }}>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Content;


