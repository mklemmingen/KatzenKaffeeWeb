import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ScrollProgress from '@/app/components/ScrollProgress';

import '@/app/styles/generalOrder.css';
import '@/app/globals.css';

function toggleTheme(isHighContrast) {
    const htmlElement = document.documentElement;
    if (isHighContrast) {
        htmlElement.setAttribute('data-theme', 'high-contrast');
    } else {
        htmlElement.removeAttribute('data-theme');
    }
    console.log(`Theme toggled to ${isHighContrast ? 'high contrast' : 'normal'}`);
}

function MyApp({ Component, pageProps }) {

    return (
        <div className="website">
            <Header className="header" onToggleTheme={toggleTheme}/>
            <div className="spacer header-spacer"/>
            <ScrollProgress/>
            <div className="pages">
                <Component {...pageProps}/>
            </div>
            <div className="spacer footer-spacer"/>
            <Footer className="footer"/>
        </div>
    );
}

export default MyApp;