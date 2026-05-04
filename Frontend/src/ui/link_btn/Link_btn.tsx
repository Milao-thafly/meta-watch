import { useState } from "react";
import { clsx } from "clsx";

interface LinkButtonProps {
    type : 'Meta' | 'List' | 'Contact' |'Photos';
    onClick: (valeur: string) => void;
}

export const LinkButton = ({type, onClick}: LinkButtonProps) => {
    const differentLinkLabel = () => {
        switch (type) {
            case 'Meta':
                return 'Meta';
            case 'List':
                return 'List';
            case 'Contact':
                return 'Contact';
            case 'Photos':
                return 'Photos';
        }
    }
    return (
        <button
        onClick={() => onClick(type)}
            className={clsx(
                'Meta',
                type === 'Meta' && 'link_btn',
                'List',
                type === 'List' && 'link_btn',
                'Contact',
                type === 'Contact' && 'link_btn',
                'Photos', 
                type === 'Photos' && 'link_btn'
            )}>
            {differentLinkLabel()}
        </button>
    )
}