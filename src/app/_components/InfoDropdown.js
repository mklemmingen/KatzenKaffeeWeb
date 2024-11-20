import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import catAndNature from '@/app/_data/catAndNature.json';
import catOwning from '@/app/_data/catOwning.json';
import statisticSections from '@/app/_data/statisticSections.json';
import Image from 'next/image';
import '../_styles/InfoDropdown.css';

const InfoDropdown = () => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (itemRefs.current.length > 0) {
            const widths = itemRefs.current.map(ref => ref.offsetWidth);
            const maxWidth = Math.max(...widths);
            if (dropdownRef.current) {
                dropdownRef.current.style.width = `${maxWidth}px`;
            }
        }
    }, [isClient]);


    const handleItemClick = (targetId) => {
        if (isClient) {
            if (router.pathname !== '/') {
                router.push(`/?targetId=${targetId}`);
            } else {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    targetElement.focus();
                } else {
                    console.error(`Element with ID ${targetId} not found`);
                }
            }
        }
    };

    const renderCategory = (category, title) => (
        <div key={title}>
            <h3 className="categoryName">{title}</h3>
            {category.map((item, index) => (
                <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleItemClick(item.targetId)}
                    ref={el => itemRefs.current[index] = el}
                >
                    <Image src={item.iconSrc || '/path/to/dummy-image.png'} alt="Icon" width={20} height={20} />
                    <span>{item.headerText}</span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="info-dropdown">
            {renderCategory(statisticSections.categories, 'Statistiken für den Einstieg')}
            {renderCategory(catAndNature.categories, 'Katzen und die Natur')}
            {renderCategory(catOwning.categories, 'Katzenhaltung leicht gemacht')}
        </div>
    );
};

export default InfoDropdown;