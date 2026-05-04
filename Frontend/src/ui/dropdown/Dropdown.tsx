import React, {useState, useRef, useEffect, type ReactNode} from 'react';
import './dropdown.css';
interface DropdownProps {
    trigger: ReactNode;
    children: ReactNode;
    className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({trigger, children, className}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        const handleClickOutsider = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutsider);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsider)
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div className={`dropdown-container ${className || ''}`} ref={dropdownRef}>

            <button type='button' className='dropdown-trigger' onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isOpen}> {trigger}</button>

            {isOpen && (
                <div className='dropdown-menu'>
                    {children}
                </div>
            )} 
        </div>
    );
};

