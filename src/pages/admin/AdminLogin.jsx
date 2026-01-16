import { useState } from 'react';
import { MdLock, MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';
import useAuth from '../../hooks/useAuth';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password });
            const { token, user } = response.data;
            login(user, token);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal. Periksa email dan password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
                    <p className="text-slate-500 mt-1">Nagari Talang Anau</p>
                </div>

                {/* Login Card */}
                <div className="bg-white border border-slate-200 p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Masuk</h2>
                    
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                            <div className="relative">
                                <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="admin@nagari.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-3 font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-slate-500 mt-6">
                    &copy; 2025 Nagari Talang Anau
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
