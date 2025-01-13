import React from "react";
import '../_styles/suppShelter.css';
import CatAnimation from "@/app/_components/CatAnimation";
import BirdAnimation from "@/app/_components/BirdAnimation";
import Image from 'next/image';
function SuppShelter() {

    return (
                <div className="outer-suppShelt">
                <div className="full-cont">
                    <Image src='assets/svg/cat-litter-sand-svgrepo-com.svg' alt="Icon" width={50} height={50} />
                    <h2 className="head">Tierheime unterstützen</h2>
                </div>
                    <div className="full-contr">
                    <div className="left-cont">
                        <p>Tierheime tragen maßgeblich zum Tierschutz bei, indem sie herrenlose Katzen aufnehmen, versorgen und an neue Besitzer vermitteln. Es gibt verschiedene Möglichkeiten, Tierheime zu unterstützen, etwa durch Geldspenden, Sachspenden wie Futter oder Spielzeug sowie ehrenamtliches Engagement. Der Deutsche Tierschutzbund hebt hervor, dass Geldspenden besonders wichtig sind, da viele Tierheime vorrangig finanzielle Mittel benötigen, um steigende Kosten für Tierpflege und medizinische Versorgung zu decken. Über Online-Plattformen wie betterplace.org kannst du gezielt lokale Tierheime unterstützen und so einen wertvollen Beitrag leisten.</p>
                    </div>
                    <div className="right-cont">
                        <Image src="/assets/img/cat_tierheim.jpg" alt="cat" width={200} height={200} />
                    </div>
                </div>
            </div>
    );
}

export default SuppShelter;