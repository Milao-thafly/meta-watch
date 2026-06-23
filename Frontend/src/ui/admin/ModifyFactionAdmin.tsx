import React from 'react';
import { Form, useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import './addFaction.css';

interface Faction {
    id: number;
    name: string;
    description?: string;
}

export const factionEditLoader = async ({ params }: LoaderFunctionArgs) => {
    const response = await fetch(`http://localhost:8000/api/admin/faction/${params.id}`, {
        credentials: "include" 
    });
    if (!response.ok) throw new Response("Faction introuvable", { status: 404 });
    return await response.json();
};



export const ModifyFaction = () => {

const faction = useLoaderData() as Faction;
const handleDelete = async () => {
    const tokenResponse = await fetch('http://localhost:8000/api/csrf-token');
    const { token } = await tokenResponse.json();
    if (!window.confirm("Delete ?")) return;

    const response = await fetch(`http://localhost:8000/api/admin/faction/${faction.id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
        }
    });

    if (response.ok) {
        window.location.href = "/listBrowse";
    } else {
        alert("Error");
    }
};

    return (
        <section className='reg_auth_section'>
            <div className='register_page'>
                <h1 className='title_reg'>Modify Faction : {faction.name}</h1>
                <Form className='register_form' method='post'>
                    <input type="hidden" name="redirectTo" value="/listBrowse" />          
                    
                    <div className='div_label'>
                        <label htmlFor="name">Name</label>
                    </div>               
                    <input 
                        type="text" 
                        className='form_input' 
                        name='name' 
                        defaultValue={faction.name} 
                        required
                    />

                    <div className='div_label'>
                        <label htmlFor="description">Description / Rules</label>
                    </div>
                    <textarea
                        id="description"
                        name="description"
                        className="form_input textarea_description"
                        defaultValue={faction.description || ''}
                        required
                        placeholder="Put description or rules of the army"
                    />

                    <button type="submit" className='submit_form'>Save changes</button>   

                    <button type="button" className="delete_btn" onClick={handleDelete}>
                        Delete Faction
                    </button>
                </Form>
            </div>
        </section>
    );
};