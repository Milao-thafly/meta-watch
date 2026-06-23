import React from 'react';
import {useState} from 'react';
import { Form,useSubmit,useLoaderData} from 'react-router';
import './Register.css';

export const Register = () => {
    const submit = useSubmit();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
        <section className='reg_auth_section'>
        <div className='register_page'>
            <h1 className='title_reg'>Register</h1>
            <Form className='register_form' onSubmit={handleSubmit}>
                <input type="hidden" name="redirectTo" value="/login" />          

                <div className='div_label'>
                    <label htmlFor="Mail">Mail</label>
                </div>
                <input type="text" className='form_input' name='mail'/>
                <div className='div_label'>
                    <label htmlFor="Password">Password</label>
                </div>              
                <input type="password" className='form_input' name='password'/>
                <div className='div_label'>
                    <label htmlFor="Username">Username</label>
                </div>               
                <input type="text" className='form_input' name='username'/>
                <div className='div_label'>
                    <label htmlFor="First_name">First Name</label>
                </div>
                <input type="text" className='form_input' name='first_name'/>
                <div className='div_label'>
                    <label htmlFor="Last_name">Last Name</label>
                </div>
                <input type="text" className='form_input'name='last_name'/>
                <div className='div_label'>
                    <label htmlFor="Age">Age</label>
                </div>
                <input type="date" className='form_input' name='birth_date'/>
                <div className='div_label'>
                    <label htmlFor="Postal">Postal</label>
                </div>
                <input type="text" className='form_input' name='postal'/>             
                <button type="submit"
                className='submit_form'>Register</button>   
            </Form>
        </div>
        </section>
        </>
    )
}