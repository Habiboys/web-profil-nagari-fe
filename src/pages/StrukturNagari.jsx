import { useEffect, useState } from 'react';
import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { getImageUrl } from '../utils/imageUrl';

const StrukturNagari = () => {
    const [officials, setOfficials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(ENDPOINTS.OFFICIALS.GET_ALL);
                const data = res.data?.data || res.data || [];
                setOfficials(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch officials:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Build tree structure
    const buildTree = (items) => {
        const map = {};
        const roots = [];
        
        // Initialize map
        items.forEach(item => {
            map[item.id] = { ...item, children: [] };
        });

        // Connect nodes
        items.forEach(item => {
            if (item.parentId && map[item.parentId]) {
                map[item.parentId].children.push(map[item.id]);
            } else {
                roots.push(map[item.id]);
            }
        });

        // Sort by order
        const sortNodes = (nodes) => {
            nodes.sort((a, b) => (a.order || 0) - (b.order || 0));
            nodes.forEach(node => {
                if (node.children.length > 0) sortNodes(node.children);
            });
        };

        sortNodes(roots);
        return roots;
    };

    const treeData = buildTree(officials);

    const TreeNode = ({ node }) => (
        <li className="relative p-4 pt-12 flex flex-col items-center">
            {/* Card */}
            <div className={`relative z-10 border-2 border-slate-800 bg-white w-48 transition-transform hover:scale-105 ${node.position?.toLowerCase().includes('wali') ? 'border-4 border-black' : ''}`}>
                <div className="aspect-[3/4] w-full bg-slate-200 overflow-hidden relative">
                    {node.image ? (
                        <img src={getImageUrl(node.image)} alt={node.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            No Photo
                        </div>
                    )}
                </div>
                <div className="p-2 text-center border-t-2 border-slate-800">
                    <div className="font-bold text-slate-900 uppercase text-xs leading-tight mb-1">{node.position}</div>
                    <div className="text-xs text-slate-600 font-medium uppercase">{node.name}</div>
                </div>
            </div>

            {/* Children */}
            {node.children && node.children.length > 0 && (
                <ul className="flex flex-row justify-center relative mt-0 pt-0">
                    {node.children.map(child => (
                        <TreeNode key={child.id} node={child} />
                    ))}
                </ul>
            )}
        </li>
    );

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50 overflow-x-auto">
            {/* CSS for Tree Lines */}
            <style>{`
                .tree ul {
                    display: flex;
                    justify-content: center;
                    position: relative;
                }
                .tree li {
                    position: relative;
                }
                /* Vertical line from parent to children container */
                .tree li::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 50%;
                    border-left: 2px solid #333;
                    width: 0;
                    height: 48px; /* Connects to top padding */
                    transform: translateX(-50%);
                }
                /* Remove connector for root */
                .tree > ul > li::before {
                    display: none;
                }
                /* Horizontal connector for children */
                .tree ul ul::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 50%;
                    border-left: 2px solid #333;
                    width: 0;
                    height: 20px;
                }
                /* Horizontal line connecting siblings */
                .tree li::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    border-top: 2px solid #333;
                }
                /* Hide line for first child left half */
                .tree li:first-child::after {
                    left: 50%;
                    width: 50%;
                }
                /* Hide line for last child right half */
                .tree li:last-child::after {
                    right: 50%;
                    width: 50%;
                }
                /* Single child doesn't need horizontal line */
                .tree li:only-child::after {
                    display: none;
                }
                /* Remove vertical line for leaf nodes */
                /* Actually we don't need to remove it, but if no children, no UL, so no issue */
            `}</style>

            {/* Hero */}
            <div className="relative py-16 bg-slate-900 text-white text-center mb-12">
                <h1 className="text-3xl font-bold uppercase mb-2">Struktur Organisasi</h1>
                <p className="text-slate-300">Pemerintahan Nagari Talang Anau</p>
            </div>

            <div className="p-8 min-w-[1000px] flex justify-center tree pb-24">
                <ul>
                    {treeData.map(node => (
                        <TreeNode key={node.id} node={node} />
                    ))}
                </ul>
            </div>
            
            {officials.length === 0 && (
                <div className="text-center pb-12 text-slate-500">
                    Belum ada data struktur organisasi
                </div>
            )}
        </div>
    );
};

export default StrukturNagari;
