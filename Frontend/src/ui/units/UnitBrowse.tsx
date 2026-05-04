import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import {Dropdown} from '../dropdown/Dropdown'

import './UnitBrowse.css';

export const UnitBrowse = () => {
    const handleSubmit = (formData) => {
        const email = formData.get("email");
    }

    return(
        <>
        <div className='UnitBrowse'>
            <Link className='add_button' to='/addUnits'>Add</Link>
            <Dropdown trigger="Modelism" className='add_button'>
                                <button>1</button>
                                <button>2</button>
                                <button>3</button>           
            </Dropdown>

        </div>
        
        </>
    )
}