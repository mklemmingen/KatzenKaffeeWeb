import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CatAnimation from '@/app/components/CatAnimation';
import ScrollProgress from '@/app/components/ScrollProgress';

function MyApp({ Component, pageProps }) {

    return (
        <div>
            <div>
                <Header />
            </div>
            <ScrollProgress />
            <CatAnimation />
            <div className="page-content">
                <Component {...pageProps}/>
            </div>
            <div className="page-content"></div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default MyApp;