import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {Link, useSubmit, Form, useLoaderData} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import './AddEvent.css';

export const AddEvent = () => {
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
        <section className='tournament_section'>
        <div className='login_page'>
            <h1 className='title_log'>Add Event</h1>
            <Form className='event_form' onSubmit={handleSubmit}>
                
                <div className='div_label'>
                    <label htmlFor="Name">Name</label>
                </div>               
                <input type="text" className='form_input'/>
                <div className='div_label'>
                    <label htmlFor="Format">Format</label>
                </div>               
                <input type="text" className='form_input'/>
                <div className='div_label'>
                    <label htmlFor="Date">Date</label>
                </div>              
                <input type="date" className='form_input'/>
                <div className='div_label'>
                    <label htmlFor="Place">Place</label>
                </div>
                <input type="text" className='form_input'/>
                <div className='div_label'>
                    <label htmlFor="Description">Description</label>
                </div>               
                <input type="text" className='form_input'/>   
                <button type="submit" className='submit_form'>Validate</button>   
            </Form>
        </div>

        
        </section>
        </>
    )
}