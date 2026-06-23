import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext'
import {Dropdown} from '../dropdown/Dropdown'
import "./Navbar.css";

type NavLinkItem = {
    label: string;
    url: string;
}

export const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const { user, handleLogOut } = useAuthContext();

    const publicNavLinks: NavLinkItem[] = [
        {label : "Connexion", url: "/connexion"},
        {label : "Inscription", url: "/inscription"}
    
    ];
    const privateNavLinks: NavLinkItem[] = [{ label: "Profile", url: "/profile"}];   

    const handleNavigation = (link: NavLinkItem) => {
        if(isMobileMenuOpen) setIsMobileMenuOpen(false);
        return navigate(link.url)
    };
    return (
        <div className='navdiv'>
            <div className='navbar'>
            <Link to="/"><img src="/public/logo/Metawatch_logo.png" className='metawatch_logo' alt="Icon for login" /></Link>
            <div className='starways'>
                <Link className='Nav_link' to="/Meta-watcher">Meta Watcher</Link>
                <Link className='Nav_link' to="/Tournament">Tournament</Link>
                <Link className='Nav_link' to="/Modelism">Modelism</Link>
                <Link className='Nav_link' to="/Contact">Contact</Link>
            </div>

            <Link to="/login"><img src="/public/logo/login-user-name-1.png" className='login_icon' alt="Icon for login" /></Link>
            {/* <Link to="/accountSettings">Account settings</Link> */}
            
            </div>
        </div>
    )
}