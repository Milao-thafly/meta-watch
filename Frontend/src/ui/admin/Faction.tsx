import {clsx} from 'clsx';
import React,{ useState} from 'react';
import {Form} from 'react-router';
import './addFaction.css';

export const AddFaction = () => {

    return(
        <>
        <section className='reg_auth_section'>
        <div className='register_page'>
            <h1 className='title_reg'>Add faction</h1>
            <Form className='register_form' method='post'>
                <input type="hidden" name="redirectTo" value="/listBrowse" />          
                <div className='div_label'>
                    <label htmlFor="Name">Name</label>
                </div>               
                <input type="text" className='form_input' name='name'/>

                <div className='div_label'>
                    <label htmlFor="Description">Description</label>
                </div>
                 <textarea
                            id="description"
                            name="description"
                            className="form_input textarea_description"
                            required
                            placeholder="Put description of the army"
                        />
                <button type="submit"
                className='submit_form'>Add</button>   
            </Form>
        </div>
        </section>
        </>
    )
}