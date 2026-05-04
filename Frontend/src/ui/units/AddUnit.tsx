import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import {Dropdown} from '../dropdown/Dropdown'

import './AddUnit.css';

export const AddUnits = () => {
    const handleSubmit = (formData) => {
        const email = formData.get("email");
    }

    return(
        <>
        <div className='UnitBrowse'>
            <form className='register_form' action={handleSubmit}>
                <h1 className='title_reg'>Add Units</h1>
                <label htmlFor="Mail">Faction</label>
                <input type="text" />
                <label htmlFor="Password">Detachment</label>
                <input type="text" />
                <label htmlFor="Username">Section</label>
                <input type="text" />
                <label htmlFor="First_name">Unit</label>
                <input type="text" />
                <label htmlFor="Last_name">Model</label>
                <input type="text" />
                <label htmlFor="Age">Other</label>
                <input type="text" />           
                <button type="submit">Validate</button>   
            </form>

        </div>
        
        </>
    )
}