import { useState } from 'react';
import { MdAccountBalance, MdArticle, MdAutoAwesome, MdDashboard, MdFlag, MdGroup, MdImage, MdLandscape, MdLocationCity, MdLogout, MdMenu, MdPark, MdPerson, MdPhotoLibrary, MdSchool, MdSettings, MdStore } from 'react-icons/md';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: MdDashboard, end: true },
        { name: 'Berita', path: '/admin/news', icon: MdArticle },
        { name: 'Produk', path: '/admin/products', icon: MdStore },
        { name: 'Perangkat', path: '/admin/officials', icon: MdGroup },
        { name: 'Wisata', path: '/admin/tourism', icon: MdLandscape },
        { name: 'Potensi', path: '/admin/potensi', icon: MdAutoAwesome },
        { name: 'Galeri', path: '/admin/gallery', icon: MdImage },
        { name: 'Fasilitas', path: '/admin/facilities', icon: MdSchool },
        { name: 'Komoditi', path: '/admin/commodities', icon: MdPark },
        { name: 'Misi', path: '/admin/missions', icon: MdFlag },
        { name: 'Jorong', path: '/admin/jorongs', icon: MdLocationCity },
        { name: 'Aset', path: '/admin/assets', icon: MdAccountBalance },
        { name: 'Media', path: '/admin/media', icon: MdPhotoLibrary },
        { name: 'Pengaturan', path: '/admin/settings', icon: MdSettings },
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar Overlay (Mobile) */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 lg:hidden z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 text-white z-50 transform transition-transform lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <h1 className="font-bold text-lg">Admin Panel</h1>
                </div>
                
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                                    isActive 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white w-full transition-colors"
                    >
                        <MdLogout size={20} />
                        Keluar
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
                    <button 
                        className="lg:hidden text-slate-600"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <MdMenu size={24} />
                    </button>
                    
                    <div className="flex-1" />
                    
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-200 flex items-center justify-center">
                            <MdPerson size={20} className="text-slate-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                            {user?.name || 'Admin'}
                        </span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
