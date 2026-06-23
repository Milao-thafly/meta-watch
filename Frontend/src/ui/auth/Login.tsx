import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit, Form, useLoaderData} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import './Login.css';

export const Login = () => {

    const submit = useSubmit();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    submit(data, {
            method: "post",
            encType: "application/json",
        });
    
    };

    return(
        <>
        <section className='auth_section'>
        <div className='login_page'>
            <h1 className='title_log'>Login</h1>
            <Form className='login_form' method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="redirectTo" value="/" />
                <div className='div_label'>
                    <label htmlFor="Mail" className='form_label'>Mail</label>
                </div>

                    <input name="mail" type="email" className='form_input' required/>

                <div className='div_label'>
                    <label htmlFor="Password" className='form_label'>Password</label>
                </div>

                    <input name="password" type="password" className='form_input' required/>
                    
                <div className='div_link'>
                    <Link to='/resetPassword' className='auth_support'>Forget password ?</Link>
                </div>
                <div className='div_link'>
                    <Link to='/register' className='auth_support'>Don't have an account ? </Link>               
                </div>
                
                <button type="submit" className='submit_form'>Login</button>   
            </Form>
        </div>
        </section>
        </>
    )
}