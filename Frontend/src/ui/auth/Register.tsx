import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import './Register.css';

export const Register = () => {
    const handleSubmit = (formData) => {
        const email = formData.get("email");
    }

    return(
        <>
        <section className='auth_section'>
        <div className='register_page'>
            <form className='register_form' action={handleSubmit}>
                <h1 className='title_reg'>Register</h1>
                <label htmlFor="Mail">Mail</label>
                <input type="text" />
                <label htmlFor="Password">Password</label>
                <input type="text" />
                <label htmlFor="Username">Username</label>
                <input type="text" />
                <label htmlFor="First_name">First Name</label>
                <input type="text" />
                <label htmlFor="Last_name">Last Name</label>
                <input type="text" />
                <label htmlFor="Age">Age</label>
                <input type="text" />
                <label htmlFor="Postal">Postal</label>
                <input type="text" />             
                <button type="submit">Register</button>   
            </form>
        </div>
        </section>
        </>
    )
}