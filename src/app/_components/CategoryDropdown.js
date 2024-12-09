import React, { useState, useEffect, useRef } from 'react';
import { VscTypeHierarchy } from "react-icons/vsc";
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
                <VscTypeHierarchy />
            </button>
            <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                <InfoDropdown />
            </div>
        </div>
    );
};

export default CategoryDropdown;