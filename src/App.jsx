import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import Idm from './pages/Idm';
import Infographics from './pages/Infographics';
import Listing from './pages/Listing';
import Marketplace from './pages/Marketplace';
import News from './pages/News';
import Ppid from './pages/Ppid';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="infographics" element={<Infographics />} />
          <Route path="idm" element={<Idm />} />
          <Route path="listing" element={<Listing />} />
          <Route path="ppid" element={<Ppid />} />
          <Route path="news" element={<News />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="marketplace/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
