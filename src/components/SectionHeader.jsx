const SectionHeader = ({ title, subtitle, align = 'center', color = 'text-slate-900' }) => (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
        <h2 className={`text-4xl font-extrabold mb-4 uppercase tracking-tight relative inline-block ${color}`}>
            {title}
            <span className="block h-1.5 w-24 bg-orange-500 mt-2 mx-auto"></span>
        </h2>
        {subtitle && <p className="text-slate-500 text-lg mt-2 max-w-3xl mx-auto font-medium">{subtitle}</p>}
    </div>
);

export default SectionHeader;
