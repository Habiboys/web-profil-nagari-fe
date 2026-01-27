import { useEffect, useState } from 'react';
import { MdSave, MdUploadFile } from 'react-icons/md';
import { toast } from 'sonner';
import api from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';

const AdminIDM = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        year: new Date().getFullYear(),
        score: 0,
        status: 'Berkembang',
        scoreSocial: 0,
        scoreEconomy: 0,
        scoreEnv: 0,
        prevScore: 0,
        analysis: '',
        reportFile: ''
    });

    const statusOptions = ['Sangat Tertinggal', 'Tertinggal', 'Berkembang', 'Maju', 'Mandiri'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(ENDPOINTS.IDM.GET);
                if (res.data && res.data.id) {
                    setFormData({
                        year: res.data.year || new Date().getFullYear(),
                        score: parseFloat(res.data.score) || 0,
                        status: res.data.status || 'Berkembang',
                        scoreSocial: parseFloat(res.data.scoreSocial) || 0,
                        scoreEconomy: parseFloat(res.data.scoreEconomy) || 0,
                        scoreEnv: parseFloat(res.data.scoreEnv) || 0,
                        prevScore: parseFloat(res.data.prevScore) || 0,
                        analysis: res.data.analysis || '',
                        reportFile: res.data.reportFile || ''
                    });
                }
            } catch (error) {
                console.error('Failed to fetch IDM:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        try {
            const res = await api.post(ENDPOINTS.UPLOAD.SINGLE, uploadFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData({ ...formData, reportFile: res.data.url });
            toast.success('File berhasil diupload');
        } catch (error) {
            toast.error('Gagal mengupload file');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.post(ENDPOINTS.IDM.UPSERT, formData);
            toast.success('Data IDM berhasil disimpan');
        } catch (error) {
            toast.error('Gagal menyimpan data IDM');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-12 text-slate-500">Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Indeks Desa Membangun (IDM)</h1>

            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tahun</label>
                        <input
                            type="number"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Skor IDM</label>
                        <input
                            type="number"
                            step="0.0001"
                            value={formData.score}
                            onChange={(e) => setFormData({ ...formData, score: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                        >
                            {statusOptions.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <h3 className="font-semibold text-slate-900 mb-4">Komponen Indeks</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">IKS (Ketahanan Sosial)</label>
                        <input
                            type="number"
                            step="0.0001"
                            value={formData.scoreSocial}
                            onChange={(e) => setFormData({ ...formData, scoreSocial: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">IKE (Ketahanan Ekonomi)</label>
                        <input
                            type="number"
                            step="0.0001"
                            value={formData.scoreEconomy}
                            onChange={(e) => setFormData({ ...formData, scoreEconomy: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">IKL (Ketahanan Lingkungan)</label>
                        <input
                            type="number"
                            step="0.0001"
                            value={formData.scoreEnv}
                            onChange={(e) => setFormData({ ...formData, scoreEnv: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Skor Tahun Sebelumnya</label>
                        <input
                            type="number"
                            step="0.0001"
                            value={formData.prevScore}
                            onChange={(e) => setFormData({ ...formData, prevScore: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">File Laporan</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="reportUpload"
                                accept=".pdf,.doc,.docx"
                            />
                            <label htmlFor="reportUpload" className="bg-slate-100 border border-slate-300 text-slate-700 px-4 py-2 flex items-center gap-2 hover:bg-slate-200 cursor-pointer">
                                <MdUploadFile size={18} /> Upload
                            </label>
                            {formData.reportFile && (
                                <a href={formData.reportFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                                    Lihat File
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Analisis</label>
                    <textarea
                        value={formData.analysis}
                        onChange={(e) => setFormData({ ...formData, analysis: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 focus:border-blue-500 outline-none h-32 resize-none"
                        placeholder="Analisis pencapaian IDM..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
                >
                    <MdSave size={18} /> {saving ? 'Menyimpan...' : 'Simpan IDM'}
                </button>
            </form>
        </div>
    );
};

export default AdminIDM;
