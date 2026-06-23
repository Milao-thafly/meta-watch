import { clsx } from 'clsx';
import React, { useState } from 'react';
import type { Params } from 'react-router';
import { Form, useLoaderData, useSubmit } from 'react-router';
import './addUnitsAdmin.css';

interface WeaponStat {
    id: number;
    name: string;
    description?: string; 
}

export async function rangedAdminEditLoader({ params }: { params: Params }) {
    const id = params.id;
    
    
    const [RangedRes, weaponsStat] = await Promise.all([
        fetch(`http://localhost:8000/api/admin/ranged_weapons/${id}`, { credentials: "include" }),
        fetch("http://localhost:8000/api/weapon-stats", { credentials: "include" }),
        
    ]);

    if (!RangedRes.ok) {
        throw new Response("Unit not found", { status: 404 });
    }

    const ranged = await RangedRes.json();
    const weapon_stats = weaponsStat.ok ? await weaponsStat.json() : [];


    return { ranged, weapon_stats};
}

export const ModifyRangedAdmin = () => {
    const { ranged, weapon_stats } = useLoaderData() as { ranged: any; weapon_stats: WeaponStat[] };
    
    const submit = useSubmit();
    const [currentStatId, setCurrentStatId] = useState<string>("");

    const [selectedStats, setSelectedStats] = useState<WeaponStat[]>(ranged.weapon_stats || []);

    const handleAddStat = () => {
        if (!currentStatId) return;
        const stat = weapon_stats.find(s => s.id === parseInt(currentStatId)); 
        if (stat && !selectedStats.some(s => s.id === stat.id)) {
            setSelectedStats([...selectedStats, stat]);
            setCurrentStatId(""); 
        }
    };

    const handleRemoveStat = (id: number) => {
        setSelectedStats(selectedStats.filter(s => s.id !== id));
    };

    const handleDelete = async () => {
    if (!window.confirm("Delete ?")) return;
    const tokenResponse = await fetch('http://localhost:8000/api/csrf-token');
    const { token } = await tokenResponse.json();

    const response = await fetch(`http://localhost:8000/api/admin/ranged_weapons/${ranged.id}`, {
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
        alert("Erreur lors de la suppression");
    }
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
            damage: formData.get('damage')?.toString() || "",
            weapon_stats: selectedStats.map(s => s.id)  
        };

        submit(payload, {
            method: "put",
            encType: "application/json"
        });
    };

    return (
        <section className='reg_auth_section'>
            <div className='register_page'>
                <h1 className='title_reg'>Modify Ranged Weapon</h1>
                <Form className='register_form' onSubmit={handleSubmit}>
                    <input type="hidden" name="redirectTo" value="/listBrowse" />          
                    
                    <div className='div_label'>
                        <label htmlFor="name">Name</label>
                    </div>               
                    <input type="text" className='form_input' name='name' defaultValue={ranged.name}/>

                    <div className='div_label'>
                        <label htmlFor="length">Length</label>
                    </div>
                    <input type="text" className='form_input' name='length' defaultValue={ranged.length}/>

                    <div className='div_label'>
                        <label htmlFor="Attack">Attack</label>
                    </div>
                    <input type="text" className='form_input' name='Attack' defaultValue={ranged.Attack}/>

                    <div className='div_label'>
                        <label htmlFor="precision">Precision</label>
                    </div>
                    <input type="text" className='form_input' name='precision' defaultValue={ranged.precision}/>

                    <div className='div_label'>
                        <label htmlFor="strength">Strength</label>
                    </div>
                    <input type="text" className='form_input' name='strength' defaultValue={ranged.strength}/>

                    <div className='div_label'>
                        <label htmlFor="damage">Damage</label>
                    </div>
                    <input type="text" className='form_input' name='damage' defaultValue={ranged.damage}/>

                    <div className='div_label'>
                        <label>Weapon Rules</label>
                    </div>

                    <div className="selected_items_list">
                        {selectedStats.map((stat) => (
                            <div key={stat.id} className="item_badge" >
                                <span>• <strong>{stat.name}</strong></span>
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveStat(stat.id)} 
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
                        {weapon_stats.map((stat: WeaponStat) => (
                            <option key={stat.id} value={stat.id}>
                                {stat.name}
                            </option>
                        ))}
                    </select>
                    
                    <button type="button" className='add_stratagems_btn' onClick={handleAddStat}>
                        Add Rule
                    </button>

                    <button type="submit" className='submit_form'>
                        Save Changes
                    </button>   

                    <button type="button" className="delete_btn" onClick={handleDelete}>
                        Supprimer l'arme
                    </button>
                </Form>
            </div>
        </section>
    );
};