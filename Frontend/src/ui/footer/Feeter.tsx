import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext'

type FooterLinkItem = {
    label: string
    url: string
}

export const Footer = () => {
    const publicFooterLink: FooterLinkItem[] = [
        {label : "Connexion", url: "/connexion"},
        {label : "Inscription", url: "/inscription"}
    
    ];

    return (
        <div className='footer'>
            <div className='footer_logo'>
                <Link to="/homepage"><img src="/public/logo/Metawatch_logo.png" className='metawatch_logo' alt="Icon for login" /></Link>
            </div>
            <div className='footer_link'>
                <Link to="/rgpd">Rgpd</Link>
                <Link to="/confidentiality">Confidentiality</Link>
                <Link to="contact">Contact</Link>
            </div>
        </div>
        
    )  
    
    }