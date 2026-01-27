import PropTypes from 'prop-types';
import usePageHero from '../hooks/usePageHero';

const PageHero = ({ pageName, fallbackImage, title, subtitle, children }) => {
    const { hero } = usePageHero(pageName);
    
    // Use hero image from server if available, otherwise fallback
    const backgroundImage = hero?.image || fallbackImage;
    const displayTitle = hero?.title || title;
    const displaySubtitle = hero?.subtitle || subtitle;

    return (
        <div className="relative py-24">
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-slate-900/75"></div>
            </div>
            <div className="container mx-auto px-4 text-center relative z-10 text-white">
                {children ? children : (
                    <>
                        <h1 className="text-3xl md:text-5xl font-bold mb-3">{displayTitle}</h1>
                        {displaySubtitle && <p className="text-slate-300">{displaySubtitle}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

PageHero.propTypes = {
    pageName: PropTypes.string.isRequired,
    fallbackImage: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.node
};

PageHero.defaultProps = {
    fallbackImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80'
};

export default PageHero;
