import { clsx } from 'clsx';
import React from 'react';
interface HomeButtonProps {
                type :'Events' | 'Photos';
                onClick: (valeur: string) => void;
            }

export const HomeButton=({ type, onClick }: HomeButtonProps) => {

            
            const differentLabel = () => {
            switch (type)  {
                case 'Events':
                        return 'Voir tous les évènements';
                case 'Photos':
                        return 'Voir toute les photos';

            }
        }
    
    return(
    
        <button
            onClick={() => onClick(type)}

            className={clsx (
                type === 'Events' && 'home_btn',
                type === 'Photos' && 'home_btn'
            )}
            >
            {differentLabel()}
        </button>
    
    );
}
