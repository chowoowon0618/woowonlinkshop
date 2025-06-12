// src/pages/create/Create.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const navigate = useNavigate();

  // 샵 기본 정보 상태
  const [form, setForm] = useState({
    name: '', // 가게 이름
    userId: '', // 유저 ID (urlName)
    password: '', // 비밀번호 (예시)
    description: '', // 설명
    imageUrl: '', // 샵 대표 이미지
    link: '', // 샵 링크 URL
  });

 // 상품 리스트 상태 (초기 빈 배열)
  const [products, setProducts] = useState([
    {
      name: 'shoes',
      price: 5000,
      imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749457397451/%C3%AC%C2%8B%C2%A0%C3%AB%C2%B0%C2%9C.jpg',
    },
    {
      name: 'watch',
      price: 15000,
      imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/LinkShop/products/1749457397451/watch.jpg', // 예시 URL, 실제 URL로 교체 필요
    }
  ]);
  // 현재 입력 중인 상품 정보 상태 (비워두고 필요시 폼 추가 가능)
  const [productInput, setProductInput] = useState({
    name: '',
    price: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 샵 기본 정보 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 상품 입력 필드 핸들러
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductInput(prev => ({ ...prev, [name]: value }));
  };

  // 상품 추가 버튼 클릭 시 실행 (필요하면 사용)
  const addProduct = () => {
    if (!productInput.name || !productInput.price || !productInput.imageUrl) {
      alert('상품 이름, 가격, 이미지 URL을 모두 입력해주세요.');
      return;
    }
    if (isNaN(productInput.price)) {
      alert('가격은 숫자만 입력 가능합니다.');
      return;
    }

    setProducts(prev => [...prev, {
      name: productInput.name,
      price: Number(productInput.price),
      imageUrl: productInput.imageUrl,
    }]);

    setProductInput({ name: '', price: '', imageUrl: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    const userIdRegex = /^[a-zA-Z0-9]{1,20}$/;
    const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!userIdRegex.test(form.userId)) {
      setError('유저 ID는 영문과 숫자만 가능하며 최대 20자입니다.');
      return;
    }
    if (!passwordRegex.test(form.password)) {
      setError('비밀번호는 영문+숫자 조합으로 6자 이상이어야 합니다.');
      return;
    }
    if (products.length === 0) {
      setError('최소 한 개 이상의 상품을 등록해야 합니다.');
      return;
    }

    setLoading(true);
    setError('');

    const teamId = '16-조우원';
    const apiUrl = `https://linkshop-api.vercel.app/${teamId}/linkshops`;

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shop: {
            name: form.name,
            description: form.description,
            imageUrl: form.imageUrl,
            urlName: form.userId,
            shopUrl: form.link,
          },
          products: products,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '등록 실패');
      }

      const data = await res.json();
      alert('등록 완료!');
      setForm({
        name: '',
        userId: '',
        password: '',
        description: '',
        imageUrl: '',
        link: '',
      });
      setProducts([]);
      navigate(`/post/${data.id}`);
    } catch (err) {
      console.error('샵 등록 중 에러 발생:', err); // 개발자 콘솔에 자세한 에러 출력
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>샵 및 상품 등록하기</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* 샵 기본 정보 입력 */}
        {['userId', 'password', 'name', 'description', 'imageUrl', 'link'].map(field => (
          <input
            key={field}
            type={field === 'password' ? 'password' : field === 'imageUrl' || field === 'link' ? 'url' : 'text'}
            name={field}
            placeholder={
              field === 'userId' ? '유저 ID (영문+숫자, 20자 이내)' :
              field === 'password' ? '비밀번호 (영문+숫자, 6자 이상)' :
              field === 'name' ? '가게 이름' :
              field === 'description' ? '설명' :
              field === 'imageUrl' ? '이미지 URL' :
              '링크 URL'
            }
            value={form[field]}
            onChange={handleChange}
            required
          />
        ))}

        {/* 상품 리스트 미리보기 */}
        {products.length > 0 && (
          <div>
            <h3>등록할 상품 목록</h3>
            <ul>
              {products.map((p, i) => (
                <li key={i} style={{ marginBottom: '12px' }}>
                  <strong>{p.name}</strong> - {p.price.toLocaleString()}원
                  <br />
                  <img src={p.imageUrl} alt={p.name} style={{ width: '120px', marginTop: '4px', borderRadius: '8px' }} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 필요하면 상품 추가 폼 및 버튼도 추가 가능 */}
        {/* <button type="button" onClick={addProduct}>상품 추가</button> */}

        <button type="submit" disabled={loading}>
          {loading ? '등록 중...' : '등록하기'}
        </button>

        {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Create;