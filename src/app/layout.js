import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import ScrollProgress from '@/app/_components/ScrollProgress';

import '@/app/_styles/generalOrder.css';
import '@/app/globals.css';
import CatAnimation from "@/app/_components/CatAnimation";
import React from "react";

function Layout({ children }) {
    const childrenWithCatAnimation = React.Children.map(children, (child, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            {child}
            <CatAnimation numberOfCats={25} />
        </div>
    ));

    return (
        <html lang="en">
        <body>
        <ScrollProgress />
        <div className="website">
            <Header className="header" />
            <div className="spacer header-spacer" />
            <div className="pages">
                {childrenWithCatAnimation}
            </div>
            <div className="spacer footer-spacer" />
            <Footer className="footer" />
        </div>
        </body>
        </html>
    );
}

export default Layout;