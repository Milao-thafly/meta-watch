import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {Form, useSubmit, useLoaderData, redirect} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import './addDetachment.css';
import { AreaChart } from 'lucide-react';


export async function addDetachmentsLoader() {
            const response = await fetch("http://localhost:8000/api/faction"); if (!response.ok) return [];
            return response.json();
          }
        

export const AddDetachments = () => {
    const factions = (useLoaderData() as any[]) || [];
    const [stratCount, setStratCount] = React.useState(1);
    const [enhCount, setEnhCount] = React.useState(1);
    const submit = useSubmit();

    
    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const stratagems = Array.from({ length: stratCount }).map((_, i) => ({
            name: formData.get(`strat_name_${i}`)?.toString() || "",
            cost: formData.get(`strat_cost_${i}`)?.toString() || "",
            effet: formData.get(`strat_effect_${i}`)?.toString() || ""
        }));
        const enhancements = Array.from({ length: enhCount }).map((_, i) => ({
            name: formData.get(`enh_name_${i}`)?.toString() || "",
            cost: formData.get(`enh_cost_${i}`)?.toString() || "",
            effet: formData.get(`enh_effect_${i}`)?.toString() || ""
        }));
        const payload = {
        redirectTo: "/listBrowse",
        faction_id: formData.get('faction_id')?.toString() || "",
        name: formData.get('name')?.toString() || "",
        description: formData.get('description')?.toString() || "",
        stratagems,
        enhancements
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
            <h1 className='title_reg'>Add Detachment</h1>
            <Form className='register_form' onSubmit={handleSubmit}>
                <input type="hidden" name="redirectTo" value="/listBrowse" />          
                <div className='div_label'>
                    <label htmlFor="faction_id">Faction</label>
                </div> 
                <select className='form_input' name="faction_id" required>
                    <option value="">-- Select a Faction --</option>
                    {factions.map((faction: any) => (
                        <option key={faction.id} value={faction.id}>
                            {faction.name}
                        </option>
                    ))}
                </select>          
                <div className='div_label'>
                    <label htmlFor="name">Name</label>
                </div>               
                <input type="text" className='form_input' name='name'required/>
                <div className='div_label'>
                    <label htmlFor="description">Description</label>
                </div>
                <input type="text" className='form_input'name='description'required/>
                <div className='div_label'>
                    <label htmlFor="stratagems">Stratagems</label>
                </div>
                {Array.from({ length: stratCount }).map((_,i) => (
                    <div key={i} className='stratagems_row'>
                        <input type="text" className='form_input' name={`strat_name_${i}`} placeholder="Name" required/>
                        <input type="text" className='form_input' name={`strat_cost_${i}`} placeholder="Cost" required/>
                        <input type="text" className='form_input' name={`strat_effect_${i}`} placeholder="Effect" required/> 
                       
                    </div>
                ))}
                <button type="button" className='add_stratagems_btn' onClick={() => setStratCount(stratCount + 1)}>
                        + Add Stratagem
                </button>

                <div className='div_label'>
                    <label htmlFor="enhancements">Enhancements</label>
                </div>
                {Array.from({ length: enhCount }).map((_,i) => (
                    <div key={i} className='stratagems_row'>
                        <input type="text" className='form_input' name={`enh_name_${i}`} placeholder="Name" required/>
                        <input type="text" className='form_input' name={`enh_cost_${i}`} placeholder="Cost" required/>
                        <input type="text" className='form_input' name={`enh_effect_${i}`} placeholder="Effect" required/> 
                       
                    </div>
                ))}
                <button type="button" className='add_enhancement_btn' onClick={() => setEnhCount(enhCount + 1)}>
                        + Add Enhancement
                </button>
                
                <button type="submit"
                className='submit_form'>Add
                </button>   
            </Form>
        </div>
        </section>
        </>
    )
}