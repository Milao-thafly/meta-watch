import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import {Dropdown} from '../dropdown/Dropdown'
import { ListButton } from './ListButton';

import './ListBrowse.css';

export const ListBrowse = () => {
    const handleSubmit = (formData) => {
        const email = formData.get("email");
    }

    return(
        <>
        <section className='list_section'>
            <div className='list_area'>
                <ListButton/>
            </div>
        </section>
        
        
        </>
    )
}