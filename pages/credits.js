import React from 'react';
import '../src/app/styles/Credits.css';

function Credits() {
    const handleLinkClick = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div>
            <h1>Wer hat die Kunst auf dieser Webseite gestaltet?</h1>
            <div className="credits">
                <p>Es waren Künstler, keine AI!</p>
                <ul>
                    <li>
                        <titel-class>
                            Kategorien SVGs <br/>
                        </titel-class>
                        <link-class onClick={() => handleLinkClick('https://svgrepo.com')}>
                            Pabla Marmolejo von svgrepo.com
                        </link-class>
                    </li>
                    <li>
                        <titel-class>
                            Hintergrund Katzen Sprite-Sheets <br/>
                        </titel-class>
                        <link-class onClick={() => handleLinkClick("https://pop-shop-packs.itch.io/")}>
                            Pop Shop von https://pop-shop-packs.itch.io/
                        </link-class>
                    </li>
                </ul>
            </div>
            <h1>Woher kamen die Informationen?</h1>
            <div className="credits">
                <p>Wir haben uns auf die Forschung gestützt!</p>
                <ul>
                    <li>
                        <link-class
                            onClick={() => handleLinkClick('https://www.nature.com/articles/ncomms2380?WT.mc_id=FBK_NCOMMS#abstract')}>
                            Nature Communications <br/>
                            https://www.nature.com/articles/ncomms2380?WT.mc_id=FBK_NCOMMS#abstract
                        </link-class>
                    </li>
                    <li>
                        <link-class
                            onClick={() => handleLinkClick('https://directory.doabooks.org/handle/20.500.12854/113510')}>
                            Cats and Conservationists: Die Debatte darüber, wem die Natur gehört <br/>
                            https://directory.doabooks.org/handle/20.500.12854/113510
                        </link-class>
                    </li>
                </ul>
            </div>
            <h1>Woher kamen die Tutorials?</h1>
            <div className="credits">
                <p>Privatpersonen, Firmen, Katzen-Enthusiasten</p>
                <ul>
                    <li>
                        <link-class onClick={() => handleLinkClick('https://rawznaturalpetfood.com/diy-cat-toys/')}>
                            DIY-Katzenspielzeug <br/>
                            https://rawznaturalpetfood.com/diy-cat-toys/
                        </link-class>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Credits