import {clsx} from 'clsx';
import React,{ useState} from 'react';
import {Form, useSubmit} from 'react-router';
import './addFaction.css';

export const AddWeaponStatAdmin = () => {
    const submit = useSubmit();
    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget)
          
            const payload = {
            redirectTo: "/listBrowse",
            name: formData.get('name')?.toString() || "",
            description: formData.get('description')?.toString() || "",
            
        };
        submit(payload, {
            method: "post",
            encType: "application/json"
        });
    
        };

    return(
        <>
        <section className='reg_auth_section'>
        <div className='register_page'>
            <h1 className='title_reg'>Add Stat to a Weapon </h1>
            <Form className='register_form' method='post'>
                {/* <input type="hidden" name="redirectTo" value="/addWeaponStat" />           */}
                <div className='div_label'>
                    <label htmlFor="Name">Name</label>
                </div>               
                <input type="text" className='form_input' name='name'/>
                <div className='div_label'>
                    <label htmlFor="Description">Description</label>
                </div>
                <input type="text" className='form_input'name='description'/>
                <button type="submit"
                className='submit_form'>Add</button>   
            </Form>
        </div>
        </section>
        </>
    )
}