import React from "react";
import '../_styles/suppShelter.css';
import CatAnimation from "@/app/_components/CatAnimation";
import BirdAnimation from "@/app/_components/BirdAnimation";
import Image from 'next/image';
function SuppShelter() {

    return (
                <div className="outer-container">
                <div className="full-container-headline">
                    <Image src='assets/svg/cat-litter-sand-svgrepo-com.svg' alt="Icon" width={50} height={50} />
                    <h1 className="header">Tierheime unterstützen</h1>
                </div>
                    <div className="full-container">
                    <div className="left-container">
                        <p>Tierheime tragen maßgeblich zum Tierschutz bei, indem sie herrenlose Katzen aufnehmen, versorgen und an neue Besitzer vermitteln. Der Deutsche Tierschutzbund empfiehl Geldspenden, da viele Tierheime vorrangig finanzielle Mittel benötigen, um steigende Kosten für Tierpflege und medizinische Versorgung zu decken. Über Online-Plattformen wie betterplace.org kannst du gezielt lokale Tierheime unterstützen und so einen wertvollen Beitrag leisten auch, wenn du gerade nicht in der Lage bist eine Katze zu adoptieren.</p>
            <h2 className="sub-header" >Adoptionsprozess</h2>
            <ul>
                <li><strong>Vorbereitung:</strong> Interessierte sollten sich gut vorbereiten, bevor sie eine Katze adoptieren. Dazu gehört, sich über die Bedürfnisse und Pflege einer Katze zu informieren.</li>
                <li><strong>Besuch im Tierheim:</strong> Es ist wichtig, die Katze vor der Adoption mehrmals zu besuchen, um eine Bindung aufzubauen und sicherzustellen, dass sie gut zur Familie passt.</li>
                <li><strong>Vertrag und Kosten:</strong> Bei der Adoption wird in der Regel ein Vertrag abgeschlossen, und es fallen oft Gebühren an, die die Kosten für Impfungen, Kastration und medizinische Versorgung decken.</li>
                <li><strong>Unterstützung des Tierschutzes:</strong> Durch die Adoption einer Katze aus dem Tierheim unterstützt man die wichtige Arbeit der Tierschutzvereine und gibt einer Katze eine zweite Chance auf ein liebevolles Zuhause.</li>
                </ul>
            <h3 className="sub-header" >Herausforderungen und Tipps</h3>
            <ul>
                <li><strong>Geduld und Verständnis:</strong> Katzen aus dem Tierheim benötigen oft Zeit, um sich an ihr neues Zuhause zu gewöhnen, besonders wenn sie schlechte Erfahrungen gemacht haben.</li>
                <li><strong>Eingewöhnung:</strong> Tipps zur Eingewöhnung der Katze in ihr neues Zuhause, wie z.B. die Schaffung eines sicheren Rückzugsortes und die langsame Einführung in die neue Umgebung.</li>
            </ul>
        </div>
                    <div className="right-container">
                        <Image src="/assets/img/cat_tierheim.jpg" alt="cat" width={200} height={200} />
                        <Image src="/assets/img/vertical-shot-cute-fluffy-cat-staring-with-its-green-eyes.jpg" alt="Cute fluffy cat" width={200} height={200} />
                    </div>
                </div>
            </div>
    );
}

export default SuppShelter;