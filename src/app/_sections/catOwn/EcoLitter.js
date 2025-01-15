import React from "react";
import Image from 'next/image';
import '../../_sections/_styles/ecoLitter.css';
import '../../globals.css';

function EcoLitter() {
    return (
        <div className="eco-litter-container">
            <div className="full-container-headline">
                <Image src='assets/svg/cat-litter-box-svgrepo-com.svg' alt="Icon" width={50} height={50}/>
                <h1>Katzenstreu</h1>
                <h2 className="author"> Marty </h2>
            </div>
            <p className="eco-litter-description">
                Die Wahl des richtigen Katzenstreus kann einen großen Unterschied machen.
                Leider gibt es viele Vor- und Nachteile zwischen den verschiedenen Arten von Katzenstreu.
                Diese sind für viele Katzen und Katzenbesitzer nicht immer offensichtlich.
                Um eine gute Entscheidung zu treffen, ist es wichtig, gut abwägen zu können,
                mit welchen Nachteilen man umgehen muss. Folgend angeführt sind mehrere Arten
                von Katzenstreu, gefunden auf der Webseite von Zooplus.uk am 25/12/2024.
            </p>
            <div className="eco-litter-types">
                <div className="eco-litter-type">
                    <h2 className="sub-header">Tonstreu</h2>
                    <div className="info-box">
                        <p><strong>Type:</strong> Clay Litter</p>
                        <p><strong>Made of:</strong> Bentonite clay</p>
                        <p><strong>Known for:</strong> Excellent clumping ability</p>
                        <p><strong>Disadvantages:</strong> Non-biodegradable, dusty</p>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/greenwoods_cat_litter_clay.jpg" alt="Clay Cat Litter" width={150} height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Gute Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">09/10/24</span>
                                <span className="review-name">Anonymous</span>
                                <span className="review-stars">★★★★☆</span>
                            </div>
                            <p>Works for my cats with different needs. Have not found anything to replace this yet. I
                                have a cat with kidney disease. So she pees a lot. And another cat that refused to use
                                corn litter because the litter pieces were too big. This works for both of them most of
                                the time. Clamps well, small pieces. It does track out of litter box though. Once in a
                                while it gets stuck to paws of the cat that pees a lot. But that can be cleaned up.</p>
                        </div>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/greenwoods_cat_litter_clay_LOOK.jpg" alt="Clay Cat Litter Look" width={150}
                               height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Schlechte Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">14/02/24</span>
                                <span className="review-name">Anete</span>
                                <span className="review-stars">★☆☆☆☆</span>
                            </div>
                            <p>And DEFINITELY NO FLUSHABLE. No flushable - be aware !!! If you mix it with water you can
                                potentially build a house from this! So don’t flush it!</p>
                        </div>
                    </div>
                </div>
                <div className="eco-litter-type">
                    <h2 className="sub-header">Maisstreu</h2>
                    <div className="info-box">
                        <p><strong>Type:</strong> Corn Litter</p>
                        <p><strong>Made of:</strong> Ground corn</p>
                        <p><strong>Known for:</strong> Biodegradable, flushable</p>
                        <p><strong>Disadvantages:</strong> Can attract pests, some cats may eat it</p>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/Super_Benek_Corn_Cat.jpg" alt="Corn Cat Litter" width={150} height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Gute Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">26/03/22</span>
                                <span className="review-name">Anonymous</span>
                                <span className="review-stars">★★★★★</span>
                            </div>
                            <p>Don’t flush cat poo. I&#39;m very concerned about the amount of people flushing cat poo.
                                Our treatment system in the UK cannot treat cat feces so the water that we drink also
                                has parasites etc from the number of people flushing their animal waste 😩</p>
                        </div>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/Super_Benek_Corn_Cat_NAME.jpg" alt="Corn Cat Litter Look" width={150}
                               height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Schlechte Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">09/09/20</span>
                                <span className="review-name">Harmony</span>
                                <span className="review-stars">★☆☆☆☆</span>
                            </div>
                            <p>Our cat ate it. Albus is a rescue cat from the RSPCA. He is obsessed with food because he
                                was starved by his previous owner. He will eat anything (including trying to eat my 70%
                                dark chocolate before I luckily caught him in time). If your cat is obsessed with food
                                due to trauma, this litter is made of corn, and our Albus started eating it as soon as
                                we put his tray down. This is probably a rare issue, but I just thought I should warn
                                others just in case x</p>
                        </div>
                    </div>
                </div>
                <div className="eco-litter-type">
                    <h2 className="sub-header">Holzstreu</h2>
                    <div className="info-box">
                        <p><strong>Type:</strong> Wood Litter</p>
                        <p><strong>Made of:</strong> Compressed sawdust or wood pellets</p>
                        <p><strong>Known for:</strong> Biodegradable, natural scent</p>
                        <p><strong>Disadvantages:</strong> Can be messy, may not clump well</p>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/greenwoods_cat_litter_NAME.jpg" alt="Wood Cat Litter" width={150} height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Gute Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">31/10/24</span>
                                <span className="review-name">Andy Hibberd</span>
                                <span className="review-stars">★★★★★</span>
                            </div>
                            <p>The best cat litter. I have used wood pellets, they turn to sawdust and do not clump so
                                you have to fully empty it. I have used corn, that clumps well but creates dust when
                                crushed, clothing and bedding was covered in dusty footprints. Now I have discovered
                                this product, at first I thought it was just broken up wood pellets but no, this product
                                clumps effectively around liquid so I only have to top it up when it runs low. I do get
                                some crumbs tracked but that&#39;s the best you can hope for with any litter.
                                Superb.</p>
                        </div>
                    </div>
                    <div className="eco-litter-review">
                        <Image src="/greenwoods_cat_litter_PICTURE.jpg" alt="Wood Cat Litter Look" width={150}
                               height={150}/>
                        <div className="eco-litter-review-details">
                            <h3>Schlechte Bewertung</h3>
                            <div className="review-meta">
                                <span className="review-date">12/10/20</span>
                                <span className="review-name">J Smith</span>
                                <span className="review-stars">★☆☆☆☆</span>
                            </div>
                            <p>Worst litter ever. I appreciate the idea of it being biodegradable, but my goodness what
                                a mess it makes, I have three cats and was continually having to sweep the floor after
                                they had used the litter trays, worse than that it was then trailed throughout the
                                house. My cats didn&#39;t like the way it clumped, it was almost jellylike. I won&#39;t
                                be buying it again.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EcoLitter;