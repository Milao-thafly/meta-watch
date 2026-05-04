import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext'
import {Dropdown} from '../dropdown/Dropdown'

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
                <Dropdown trigger="Gameplay">
                    <Link to="/Mylist">My list</Link>
                    <Link to="/NewList">New list</Link>
                    <Link to="OtherPlayList">Player's list</Link>
                    <Link to="MetaAnalysis">Meta analysis</Link>
                </Dropdown>

                <Dropdown trigger="Modelism">
                    <Link to="/modelsearch">Search a model</Link>
                    <Link to="/pictures">Pictures</Link>
                    
                </Dropdown>
                <Dropdown trigger="Tournaments">
                    <Link to="/settournament">Set a tournament</Link>
                    <Link to="/foundtournament">Found a tournament</Link>
                    
                </Dropdown>

            </div>
            <Link to="/login"><img src="/public/logo/login-user-name-1.png" className='login_icon' alt="Icon for login" /></Link>
            <Link to="/accountSettings">Account settings</Link>
            
            </div>
        </div>
    )
}