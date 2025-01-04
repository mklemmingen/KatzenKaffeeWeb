"use client";

import React from 'react';
import './_styles/Credits.css';

function Page() {
    const handleLinkClick = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="credits-container">
            <h1 className="playful-header">Wer hat die Kunst auf dieser Webseite gestaltet?</h1>
            <div className="credits-section">
                <p className="readable-text">Es waren Künstler, keine AI!</p>
                <ul>
                    <li>
                        <span className="playful-keyword">Kategorien SVGs <br/></span>
                        <span className="link-class" onClick={() => handleLinkClick('https://svgrepo.com')}>
                            Pabla Marmolejo von svgrepo.com
                        </span>
                    </li>
                    <li>
                        <span className="playful-keyword">Hintergrund Katzen Sprite-Sheets <br/></span>
                        <span className="link-class" onClick={() => handleLinkClick("https://pop-shop-packs.itch.io/")}>
                            Pop Shop von https://pop-shop-packs.itch.io/
                        </span>
                    </li>
                    <li>
                        <span className="playful-keyword">Katzenpfoten-Minigame <br/></span>
                        <span className="link-class" onClick={() => handleLinkClick("https://codepen.io/jonny")}>
                            Jonny McLaughlin
                        </span>
                    </li>
                </ul>
            </div>
            <h1 className="playful-header">Bildnachweise</h1>
            <div className="credits-section">
                <ul>
                    <li>
                        <span className="link-class"
                              onClick={() => handleLinkClick('https://www.flaticon.com/free-icon/fox_17593695')}>
                            Fuchs Icon <br/>
                            https://www.flaticon.com/free-icon/fox_17593695
                        </span>
                    </li>
                    <li>
                        <span className="link-class" onClick={() => handleLinkClick('https://www.flaticon.com/free-icon/bird_15622967')}>
                            Vogel Icon <br/>
                            https://www.flaticon.com/free-icon/bird_15622967
                        </span>
                    </li>
                    <li>
                        <span className="link-class" onClick={() => handleLinkClick('https://www.flaticon.com/free-icon/opossum_11880015')}>
                            Opossum Icon <br/>
                            https://www.flaticon.com/free-icon/opossum_11880015
                        </span>
                    </li>
                    <li>
                        <span className="link-class" onClick={() => handleLinkClick('https://www.flaticon.com/free-icon/cat_1864640')}>
                            Katze Icon <br/>
                            https://www.flaticon.com/free-icon/cat_1864640
                        </span>
                    </li>
                </ul>
            </div>
            <h1 className="playful-header">Woher kamen die Informationen?</h1>
            <div className="credits-section">
                <p className="readable-text">Wir haben uns auf die Forschung gestützt!</p>
                <ul>
                    <li>
                        <span className="link-class" onClick={() => handleLinkClick('https://www.nature.com/articles/ncomms2380?WT.mc_id=FBK_NCOMMS#abstract')}>
                            Nature Communications <br/>
                            https://www.nature.com/articles/ncomms2380?WT.mc_id=FBK_NCOMMS#abstract
                        </span>
                    </li>
                    <li>
                        <span className="link-class" onClick={() => handleLinkClick('https://directory.doabooks.org/handle/20.500.12854/113510')}>
                            Cats and Conservationists: Die Debatte darüber, wem die Natur gehört <br/>
                            https://directory.doabooks.org/handle/20.500.12854/113510
                        </span>
                    </li>
                </ul>
            </div>
            <h1 className="playful-header">Woher kamen die Tutorials?</h1>
            <div className="credits-section">
                <p className="readable-text">Privatpersonen, Firmen, Katzen-Enthusiasten</p>
                <ul>
                    <li>
                        <span className="link-class" onClick={() => handleLinkClick('https://rawznaturalpetfood.com/diy-cat-toys/')}>
                            DIY-Katzenspielzeug <br/>
                            https://rawznaturalpetfood.com/diy-cat-toys/
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Page;