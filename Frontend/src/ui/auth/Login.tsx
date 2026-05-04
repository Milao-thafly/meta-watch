import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import './Login.css';

export const Login = () => {
    const handleSubmit = (formData) => {
        const email = formData.get("email");
    }

    return(
        <>
        <section className='auth_section'>
        <div className='login_page'>
            <form className='login_form' action={handleSubmit}>
                <h1 className='title_log'>Login</h1>
                <label htmlFor="Mail">Mail</label>
                <input type="text" />
                <label htmlFor="Password">Password</label>
                <input type="text" />
                <Link to='/resetPassword'>Forget password ?</Link>
                <Link to='/register'>Don't have an account ? 
                </Link>               
                <button type="submit">Login</button>   
            </form>
        </div>
        </section>
        </>
    )
}