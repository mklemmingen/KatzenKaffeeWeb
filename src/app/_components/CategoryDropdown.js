import React, {useEffect, useRef, useState} from 'react';
import {FaMap} from "react-icons/fa";
import InfoDropdown from "@/app/_components/InfoDropdown";
import "../_styles/CategoryDropdown.css";

const CategoryDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="category-dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown}>
                <FaMap/>
            </button>
            <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                <InfoDropdown/>
            </div>
        </div>
    );
};

export default CategoryDropdown;