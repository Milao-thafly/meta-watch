import { clsx } from 'clsx';
import React, { useState } from 'react';
import { Form, useLoaderData, useSubmit } from 'react-router';
import './addUnitsAdmin.css';

interface WeaponStat {
    id: number;
    name: string;
    description?: string; 
}

export async function addRangedAdminLoader() {
          const response = await fetch("http://localhost:8000/api/weapon-stats", {
            credentials: "include" 
          });
          if (!response.ok) return [];
          return response.json();
        }
        

export const AddRangedAdmin = () => {
    const weaponStats = (useLoaderData() as WeaponStat[]) || [];
    const submit = useSubmit();
    const [selectedStats, setSelectedStats] = useState<WeaponStat[]>([]);
    const [currentStatId, setCurrentStatId] = useState<string>("");

    const handleAddStat = () => {
        if (!currentStatId) return;
        const stat = weaponStats.find(s => s.id === parseInt(currentStatId)); 
        if (stat && !selectedStats.some(s => s.id === stat.id)) {
            setSelectedStats([...selectedStats, stat]);
            setCurrentStatId(""); 
        }
    };

    const handleRemoveStat = (id: number) => {
        setSelectedStats(selectedStats.filter(s => s.id !== id));
    };

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const payload = {
            redirectTo: "/listBrowse",
            name: formData.get('name')?.toString() || "",
            length: formData.get('length')?.toString() || "",
            Attack: formData.get('Attack')?.toString() || "",
            precision: formData.get('precision')?.toString() || "",
            strength: formData.get('strength')?.toString() || "",
            penetration: formData.get('penetration')?.toString() || "",
            damage: formData.get('damage')?.toString() || "",
            weapon_stats: selectedStats.map(s => s.id)  
        };
        

        submit(payload, {
            method: "post",
            encType: "application/json"
        });
    };
    return (
        <>
        <section className='reg_auth_section'>
            <div className='register_page'>
                <h1 className='title_reg'>Add Ranged</h1>
                <Form className='register_form' onSubmit={handleSubmit}>
                    <input type="hidden" name="redirectTo" value="/listBrowse" />          
                    
                    <div className='div_label'>
                        <label htmlFor="name">Name</label>
                    </div>               
                    <input type="text" className='form_input' name='name'/>

                    <div className='div_label'>
                        <label htmlFor="length">Length</label>
                    </div>
                    <input type="text" className='form_input' name='length'/>

                    <div className='div_label'>
                        <label htmlFor="Attack">Attack</label>
                    </div>
                    <input type="text" className='form_input' name='Attack'/>

                    <div className='div_label'>
                        <label htmlFor="precision">Precision</label>
                    </div>
                    <input type="text" className='form_input' name='precision'/>

                    <div className='div_label'>
                        <label htmlFor="strength">Strength</label>
                    </div>
                    <input type="text" className='form_input' name='strength'/>

                    <div className='div_label'>
                        <label htmlFor="penetration">PA</label>
                    </div>
                    <input type="text" className='form_input' name='penetration'/>

                    <div className='div_label'>
                        <label htmlFor="damage">Damage</label>
                    </div>
                    <input type="text" className='form_input' name='damage'/>

                    <div className='div_label'>
                        <label>Weapon Rules</label>
                    </div>

                   
                    <div className="selected_items_list" >
                        {selectedStats.map((stat) => (
                            <div key={stat.id} className="item_badge" style={{ display: 'flex', gap: '10px', marginBottom: '5px', alignItems: 'center' }}>
                                <span>• <strong>{stat.name}</strong></span>
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveStat(stat.id)} 
                                    style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>

                
                    
                        <select 
                            className='form_input' 
                            value={currentStatId} 
                            onChange={(e) => setCurrentStatId(e.target.value)}
                        >
                            <option value="">-- Choose a Rule --</option>
                            {weaponStats.map((stat: WeaponStat) => (
                                <option key={stat.id} value={stat.id}>
                                    {stat.name}
                                </option>
                            ))}
                        </select>
                        <button 
                            type="button" 
                            className='add_stratagems_btn' 
                            onClick={handleAddStat}
                            
                        >
                            Add Rule
                        </button>
                    

                    <button type="submit" className='submit_form'>
                        Add
                    </button>   
                </Form>
            </div>
        </section>
        </>
    );
};