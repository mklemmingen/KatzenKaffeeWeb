import React from 'react';
import '../pagestyles/Credits.css';

function Credits() {
    return (
        <div>
            <h1>Wer hat die Kunst auf dieser Webseite gestaltet?</h1>
            <div className="credits">
                <p>Es waren Künstler, keine AI!</p>
                <h3>Künstler</h3>
                <ul>
                    <li>Kategorien SVGs <br/> Pabla Marmolejo von svgrepo.com</li>
                    <li>Hintergrund Katzen Sprite-Sheets <br/> Pop Shop von https://pop-shop-packs.itch.io/</li>
                </ul>
            </div>
            <h1> Woher kamen die Informationen? </h1>
            <div className="credits">
                <p>Wir haben uns auf die Forschung gestützt!</p>
                <h3>Quellen</h3>
                <ul>
                    <li> Nature
                        Communications <br/> https://www.nature.com/articles/ncomms2380?WT.mc_id=FBK_NCOMMS#abstract
                    </li>
                    <li> Cats and Conservationists: Die Debatte darüber, wem die Natur
                        gehört <br/> https://directory.doabooks.org/handle/20.500.12854/113510
                    </li>
                </ul>
            </div>
            <h1> Quelle der Tutorials? </h1>
            <div className="credits">
                <p>Privatpersonen, Firmen, Katzen-Enthusiasten</p>
                <h3>Quellen</h3>
                <ul>
                    <li> DIY-Katzenspielzeug <br/> 'https://rawznaturalpetfood.com/diy-cat-toys/'
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Credits