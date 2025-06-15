import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: 640,
    margin: '96px auto 0',
    padding: 20,
    fontFamily: 'Noto Sans KR, sans-serif',
    color: '#222',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: 18,
  },
  addButton: {
    fontSize: 16,
    color: '#3E45EC',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
  },
  box: {
    backgroundColor: '#f9faff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
    boxSizing: 'border-box',
    border: '#FAFAFB',
  },
  label: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 6,
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #ddd',
    backgroundColor: '#f0f4ff',
    fontSize: 14,
    boxSizing: 'border-box',
  },
  fileInputWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  fileInput: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #ddd',
    backgroundColor: '#f0f4ff',
    fontSize: 14,
    boxSizing: 'border-box',
  },
  fileButton: {
    position: 'absolute',
    top: 31,
    right: 12,
    backgroundColor: '#FAFAFB',
    color: '#3E45EC',
    border: '1px solid #3E45EC',
    borderRadius: 8,
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '100%',
    letterSpacing: '0',
    fontFamily: 'Pretendard, sans-serif',
    height: 31,
    whiteSpace: 'nowrap',
  },
  submitButton: {
    width: '100%',
    padding: 14,
    borderRadius: 20,
    backgroundColor: '#999',
    color: '#fff',
    fontWeight: 600,
    fontSize: 16,
    border: 'none',
    cursor: 'pointer',
    marginTop: 30,
  },
};

function Create() {
  const [mainProducts, setMainProducts] = useState([
    { image: null, name: '', price: '' },
    { image: null, name: '', price: '' },
  ]);
  const [shopInfo, setShopInfo] = useState({
    image: null,
    name: '',
    url: '',
    userId: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreated, setIsCreated] = useState(false); // 생성 완료 여부

  const addMainProduct = () => {
    setMainProducts([...mainProducts, { image: null, name: '', price: '' }]);
  };

  const handleMainProductChange = (index, field, value) => {
    const updated = [...mainProducts];
    updated[index][field] = value;
    setMainProducts(updated);
  };

  const handleShopInfoChange = (field, value) => {
    setShopInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 돌아가기 상태면 뒤로가기 실행
    if (isCreated) {
      window.history.back();
      return;
    }

    setLoading(true);
    setError(null);

    const submitData = {
      shop: {
        image: shopInfo.image,
        name: shopInfo.name,
        url: shopInfo.url,
        userId: shopInfo.userId,
        password: shopInfo.password,
      },
      products: mainProducts.map(p => ({
        image: p.image,
        name: p.name,
        price: p.price,
      })),
    };

    try {
      // 서버 전송 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('등록 완료!');

      // 완료 후 돌아가기 버튼으로 토글
      setIsCreated(true);

      // 상태 초기화는 원한다면 여기서 하거나 안 해도 됨
      // setMainProducts([{ image: null, name: '', price: '' }, { image: null, name: '', price: '' }]);
      // setShopInfo({ image: null, name: '', url: '', userId: '', password: '' });
    } catch {
      setError('등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <div style={styles.header}>
          <div style={styles.sectionTitle}>대표 상품</div>
          <button type="button" style={styles.addButton} onClick={addMainProduct} disabled={isCreated}>
            추가
          </button>
        </div>

        {mainProducts.map((product, idx) => (
          <div key={idx} style={styles.box}>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id={`main-product-file-${idx}`}
              disabled={isCreated}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleMainProductChange(idx, 'image', file);
              }}
            />

            <div style={styles.fileInputWrapper}>
              <label style={styles.label}>상품 대표 이미지</label>
              <input
                type="text"
                placeholder="상품 이미지를 첨부해주세요."
                style={styles.fileInput}
                readOnly
                value={product.image ? product.image.name : ''}
              />
              <button
                type="button"
                style={styles.fileButton}
                disabled={isCreated}
                onClick={() => document.getElementById(`main-product-file-${idx}`)?.click()}
              >
                파일 첨부
              </button>
            </div>

            <label style={styles.label}>상품 이름</label>
            <input
              type="text"
              placeholder="상품 이름을 입력해 주세요."
              style={styles.input}
              value={product.name}
              disabled={isCreated}
              onChange={e => handleMainProductChange(idx, 'name', e.target.value)}
            />

            <label style={styles.label}>상품 가격</label>
            <input
              type="text"
              placeholder="원화로 표기해 주세요."
              style={styles.input}
              value={product.price}
              disabled={isCreated}
              onChange={e => handleMainProductChange(idx, 'price', e.target.value)}
            />
          </div>
        ))}

        <div style={{ marginTop: 30 }}>
          <div style={styles.sectionTitle}>내 쇼핑몰</div>
          <div style={styles.box}>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="shop-image-file"
              disabled={isCreated}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleShopInfoChange('image', file);
              }}
            />

            <div style={styles.fileInputWrapper}>
              <label style={styles.label}>상품 대표 이미지</label>
              <input
                type="text"
                placeholder="상품 이미지를 첨부해주세요."
                style={styles.fileInput}
                readOnly
                value={shopInfo.image ? shopInfo.image.name : ''}
              />
              <button
                type="button"
                style={styles.fileButton}
                disabled={isCreated}
                onClick={() => document.getElementById('shop-image-file')?.click()}
              >
                파일 첨부
              </button>
            </div>

            <label style={styles.label}>이름</label>
            <input
              type="text"
              placeholder="표시하고 싶은 이름을 적어 주세요"
              style={styles.input}
              value={shopInfo.name}
              disabled={isCreated}
              onChange={e => handleShopInfoChange('name', e.target.value)}
            />

            <label style={styles.label}>Url</label>
            <input
              type="text"
              placeholder="Url을 입력해 주세요."
              style={styles.input}
              value={shopInfo.url}
              disabled={isCreated}
              onChange={e => handleShopInfoChange('url', e.target.value)}
            />

            <label style={styles.label}>유저 ID</label>
            <input
              type="text"
              placeholder="유저 ID를 입력해 주세요."
              style={styles.input}
              value={shopInfo.userId}
              disabled={isCreated}
              onChange={e => handleShopInfoChange('userId', e.target.value)}
            />

            <label style={styles.label}>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              style={styles.input}
              value={shopInfo.password}
              disabled={isCreated}
              onChange={e => handleShopInfoChange('password', e.target.value)}
            />
          </div>
        </div>

        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? '처리중...' : isCreated ? '돌아가기' : '생성하기'}
        </button>

        {error && <p style={{ color: 'red', marginTop: 12, textAlign: 'center' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Create;

