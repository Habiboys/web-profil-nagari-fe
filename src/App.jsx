import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';

// Public Pages
import Home from './pages/Home';
import Idm from './pages/Idm';
import Infographics from './pages/Infographics';
import Listing from './pages/Listing';
import Marketplace from './pages/Marketplace';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Ppid from './pages/Ppid';
import ProductDetail from './pages/ProductDetail';
import StrukturNagari from './pages/StrukturNagari';
import TentangNagari from './pages/TentangNagari';
import VisiMisi from './pages/VisiMisi';

// Admin Pages
import AdminAssets from './pages/admin/AdminAssets';
import AdminCommodities from './pages/admin/AdminCommodities';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFacilities from './pages/admin/AdminFacilities';
import AdminGallery from './pages/admin/AdminGallery';
import AdminJorongs from './pages/admin/AdminJorongs';
import AdminLogin from './pages/admin/AdminLogin';
import AdminMissions from './pages/admin/AdminMissions';
import AdminNews from './pages/admin/AdminNews';
import AdminOfficials from './pages/admin/AdminOfficials';
import AdminProducts from './pages/admin/AdminProducts';
import AdminSettings from './pages/admin/AdminSettings';
import AdminTourism from './pages/admin/AdminTourism';

import './app.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="tentang" element={<TentangNagari />} />
          <Route path="visi-misi" element={<VisiMisi />} />
          <Route path="struktur" element={<StrukturNagari />} />
          <Route path="infographics" element={<Infographics />} />
          <Route path="idm" element={<Idm />} />
          <Route path="listing" element={<Listing />} />
          <Route path="ppid" element={<Ppid />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="marketplace/:id" element={<ProductDetail />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="officials" element={<AdminOfficials />} />
          <Route path="tourism" element={<AdminTourism />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="facilities" element={<AdminFacilities />} />
          <Route path="commodities" element={<AdminCommodities />} />
          <Route path="missions" element={<AdminMissions />} />
          <Route path="jorongs" element={<AdminJorongs />} />
          <Route path="assets" element={<AdminAssets />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
