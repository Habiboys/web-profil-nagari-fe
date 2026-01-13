
const MapSection = ({ fullHeight = false }) => {
    return (
        <div className="card" style={{ 
            padding: 0, 
            height: fullHeight ? '100%' : '400px', 
            minHeight: '400px',
            overflow: 'hidden', 
            position: 'relative' 
        }}>
            <iframe 
            title="Map"
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{ border:0, minHeight: '100%' }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31911.666989476904!2d110.817!3d-0.616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzYnNTcuNiJTIDExMMKwNDknMDEuMiJF!5e0!3m2!1sen!2sid!4v1625641234567!5m2!1sen!2sid" 
            allowFullScreen
            ></iframe>
        </div>
    );
};

export default MapSection;
