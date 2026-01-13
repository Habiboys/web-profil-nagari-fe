const SectionHeader = ({ title, subtitle, align = 'center', color = 'text-slate-900' }) => (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
        <p className="text-blue-600 font-medium uppercase tracking-widest text-sm mb-2">{subtitle}</p>
        <h2 className={`text-3xl md:text-4xl font-bold ${color}`}>
            {title}
        </h2>
    </div>
);

export default SectionHeader;
