import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import ScrollProgress from '@/app/_components/ScrollProgress';

import '@/app/_styles/generalOrder.css';
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

function Layout({ children }) {
    return (
        <html lang="en">
        <body>
        <div className="website">
            <ScrollProgress />
            <Header className="header" />
            <div className="spacer header-spacer" />
            <div className="pages">
                {children}
            </div>
            <div className="spacer footer-spacer" />
            <Footer className="footer" />
        </div>
        </body>
        </html>
    );
}

export default Layout;