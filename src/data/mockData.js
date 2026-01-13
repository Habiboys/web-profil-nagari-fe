export const profileData = {
    name: "Desa Tamang",
    kabupaten: "Kabupaten Sekadau",
    address: "Jl. Lintas Koman No.01 Dusun Tamang, Desa Tamang, Kecamatan Nanga Mahap",
    email: "desathamang@mail.com",
    phone: "082250345977",
    logo: "https://placehold.co/150",
    vision: "Terwujudnya Desa Tamang yang Mandiri, Sejahtera dan Religius",
    mission: [
        "Meningkatkan kualitas sumber daya manusia",
        "Meningkatkan tata kelola pemerintahan desa",
        "Meningkatkan pembangunan infrastruktur dasar",
        "Mengembangkan ekonomi kerakyatan"
    ],
    headOfVillage: {
        name: "Hendrikus Amin",
        photo: "https://placehold.co/300x400",
        message: "Selamat datang di website resmi Desa Tamang. Website ini merupakan wujud transparansi dan upaya peningkatan pelayanan kepada masyarakat."
    }
};

export const villageStructure = [
    { name: "Hendrikus Amin", position: "Kepala Desa", image: "https://placehold.co/150", parent: null },
    { name: "Budi Santoso", position: "Sekretaris Desa", image: "https://placehold.co/150", parent: "Hendrikus Amin" },
    { name: "Siti Aminah", position: "Kaur Keuangan", image: "https://placehold.co/150", parent: "Budi Santoso" },
    { name: "Rahmat Hidayat", position: "Kaur Umum", image: "https://placehold.co/150", parent: "Budi Santoso" },
    { name: "Joko Susilo", position: "Kasi Pemerintahan", image: "https://placehold.co/150", parent: "Hendrikus Amin" },
    { name: "Dewi Sartika", position: "Kasi Kesejahteraan", image: "https://placehold.co/150", parent: "Hendrikus Amin" }
];

export const heroShortcuts = [
    { label: "Layanan", icon: "MdSupportAgent", path: "/services" },
    { label: "Wisata", icon: "MdLandscape", path: "/infographics" },
    { label: "Produk", icon: "MdStore", path: "/marketplace" },
    { label: "Transparansi", icon: "MdAnalytics", path: "/infographics" }
];

export const apbdesData = {
    income: 1633576496,
    expense: 1633717570,
    year: 2026
};

export const demographicsData = {
    totalPopulation: 1890,
    totalFamilies: 436,
    gender: { male: 930, female: 960 },
    ageGroups: [
        { label: "0-4", male: 50, female: 45 },
        { label: "5-9", male: 60, female: 55 },
        { label: "10-14", male: 70, female: 65 },
        { label: "15-19", male: 80, female: 75 },
        { label: "20-24", male: 90, female: 85 },
        { label: "25-29", male: 85, female: 80 },
        { label: "30-34", male: 75, female: 70 },
        { label: "35-39", male: 65, female: 60 }
    ],
    education: [
        { label: "Tidak/Belum Sekolah", value: 150 },
        { label: "Tamatan SD", value: 450 },
        { label: "Tamatan SMP", value: 350 },
        { label: "Tamatan SMA", value: 250 },
        { label: "Diploma/Sarjana", value: 100 }
    ],
    jobs: [
        { label: "Petani/Pekebun", value: 950 },
        { label: "Wiraswasta", value: 154 },
        { label: "Tidak/Belum Bekerja", value: 404 },
        { label: "PNS/TNI/Polri", value: 12 },
        { label: "Pelajar/Mahasiswa", value: 350 },
        { label: "Karyawan Swasta", value: 5 }
    ],
    religion: [
        { label: "Islam", value: 985, icon: "MdMosque" },
        { label: "Katolik", value: 890, icon: "MdChurch" },
        { label: "Kristen", value: 7, icon: "MdChurch" },
        { label: "Hindu", value: 0, icon: "MdSelfImprovement" }
    ],
    maritalStatus: [
        { label: "Belum Kawin", value: 976 },
        { label: "Kawin", value: 876 },
        { label: "Cerai Hidup", value: 38 },
        { label: "Cerai Mati", value: 0 }
    ]
};

export const potensiData = [
    { id: 1, title: "Wisata Alam Siling Kanu", image: "https://placehold.co/300" },
    { id: 2, title: "Perkebunan Sawit", image: "https://placehold.co/300" },
    { id: 3, title: "Kerajinan Tangan", image: "https://placehold.co/300" }
];

export const galleryData = [
    "https://placehold.co/300x200?text=Kegiatan+1",
    "https://placehold.co/300x200?text=Kegiatan+2",
    "https://placehold.co/300x200?text=Kegiatan+3",
    "https://placehold.co/300x200?text=Kegiatan+4",
    "https://placehold.co/300x200?text=Kegiatan+5",
    "https://placehold.co/300x200?text=Kegiatan+6"
];

export const statsData = [
    { label: "Penduduk", value: "1,250", icon: "MdPeople" },
    { label: "Kepala Keluarga", value: "340", icon: "MdFamilyRestroom" },
    { label: "Luas Wilayah", value: "15.4 km²", icon: "MdMap" },
    { label: "Dusun", value: "4", icon: "MdHomeWork" }
];

export const newsData = [
    {
        id: 1,
        title: "Penyaluran Bantuan Pangan Non Tunai",
        date: "12 Jan 2026",
        category: "Berita Desa",
        image: "https://placehold.co/400x250",
        summary: "Desa Tamang melaksanakan penyaluran bantuan pangan non tunai kepada 150 KPM."
    },
    {
        id: 2,
        title: "Musyawarah Perencanaan Pembangunan Desa",
        date: "10 Jan 2026",
        category: "Pemerintahan",
        image: "https://placehold.co/400x250",
        summary: "Musrenbangdes tahun anggaran 2026 telah dilaksanakan dengan lancar."
    },
    {
        id: 3,
        title: "Kerja Bakti Membersihkan Lingkungan",
        date: "05 Jan 2026",
        category: "Kegiatan",
        image: "https://placehold.co/400x250",
        summary: "Warga Dusun Tamang antusias mengikuti kerja bakti Jumat Bersih."
    }
];

export const publicServices = [
    { title: "Permohonan Surat Keterangan", icon: "MdDescription" },
    { title: "Pembuatan KTP/KK", icon: "MdBadge" },
    { title: "Pengaduan Masyarakat", icon: "MdReport" },
    { title: "Informasi APBDes", icon: "MdMonetizationOn" }
];

export const marketplaceData = [
    {
        id: 1,
        name: "Kopi Robusta Tamang",
        price: 35000,
        image: "https://placehold.co/200",
        seller: "KTH Maju Bersama"
    },
    {
        id: 2,
        name: "Kerajinan Anyaman Bambu",
        price: 75000,
        image: "https://placehold.co/200",
        seller: "Ibu Siti Salma"
    },
    {
        id: 3,
        name: "Madu Hutan Asli",
        price: 120000,
        image: "https://placehold.co/200",
        seller: "Pak Budi"
    }
];
