import React, { useState, useEffect, useRef } from 'react';
import "../_styles/CatChatDropdown.css";
import ChatBot from "@/app/_components/ChatBot";
import { IoIosChatboxes } from "react-icons/io";

const CatChatDropdown = () => {
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
        <div className="catChat-dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown}>
                <IoIosChatboxes />
            </button>
            <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                <ChatBot />
            </div>
        </div>
    );
};

export default CatChatDropdown;