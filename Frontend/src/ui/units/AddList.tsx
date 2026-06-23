import React from 'react';
import { useLoaderData, Form, useNavigate } from 'react-router';
import {useState} from 'react';
import {Dropdown} from '../dropdown/Dropdown'
import './AddList.css';
export async function addListLoader() {
    const response = await fetch("http://localhost:8000/api/faction");
    if (!response.ok) return [];
    return response.json();


}


export const AddList = () => {
    const factions = useLoaderData() as any[];
    
    return(
        <div className='UnitBrowse'>
            <Form className='register_form' method="post">
                <h1 className='title_reg'>Add Units</h1>
                
                <div className='div_label'>
                    <select className='form_input' name="faction_id" required>
                        <option value="">Select a Faction</option>
                        {factions.map((faction: any) => (
                            <option key={faction.id} value={faction.id}>
                                {faction.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <input type="text" name="title" placeholder="Title" className='form_input'/>
                <input type="text" name="format" placeholder="Format" className='form_input'/>
                <input type="text" name="description" placeholder="Description" className='form_input'/>
                
                <select name="is_public" className='form_input'>
                    <option value="0">Private</option>
                    <option value="1">Public</option>
                </select>
                    
                <button type="submit" className='submit_form'>Validate</button>
            </Form>
        </div>
    )
}