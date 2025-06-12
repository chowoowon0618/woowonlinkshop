import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';  
import Content from './components/Content';
import Search from './components/Search';
import Create from '../create/Create'; 

function Main() {
  return (
    <Router>
      <Header /> {/* 공용 컴포넌트 */}
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default Main;