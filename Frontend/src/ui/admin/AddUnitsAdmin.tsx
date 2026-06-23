import {clsx} from 'clsx';
import React, {useState} from 'react';
import {Form,useLoaderData, useSubmit} from 'react-router';
import './addUnitsAdmin.css';

interface RangedWeapon {
    id: number;
    name: string;
    description?: string; 
}

interface MeleeWeapon {
    id: number;
    name: string;
    description?: string; 
}
    export const addUnitsAdminLoader = async () => {
    const [factionsRes, rangedRes, meleeRes, sectionsRes] = await Promise.all([
        fetch('http://localhost:8000/api/faction'),
        fetch('http://localhost:8000/api/ranged_weapons'),
        fetch('http://localhost:8000/api/melee_weapons'),
        fetch('http://localhost:8000/api/sections'),
    ]);

    return {
        factions: await factionsRes.json(),
        rangedWeapons: await rangedRes.json(),
        meleeWeapons: await meleeRes.json(),
        sections: await sectionsRes.json()
    }
}
    
export const AddUnitsAdmin = () => {
    const submit = useSubmit();
    const { factions = [], rangedWeapons = [], meleeWeapons = [], sections = []} = useLoaderData() as {factions: any[], rangedWeapons: RangedWeapon[], meleeWeapons: MeleeWeapon[], sections: any[]}
    const [aptitudesList, setAptitudesList] = useState<string[]>([]);
    const [currentAptitude, setCurrentAptitude] = useState<string>("");
    const [selectedRanged, setSelectedRanged] = useState<RangedWeapon[]>([]);
    const [currentRangedId, setCurrentRangedId] = useState<string>("");
    const [selectedMelee, setSelectedMelee] = useState<MeleeWeapon[]>([]);
    const [currentMeleeId, setCurrentMeleeId] = useState<string>("");
   

    const handleAddAptitude = () => {
    if (!currentAptitude.trim()) return;
    if (!aptitudesList.includes(currentAptitude.trim())) {
        setAptitudesList([...aptitudesList, currentAptitude.trim()]);
        setCurrentAptitude(""); 
    }
};

    const handleAddRanged = () => {
        if (!currentRangedId) return;
        const ranged = rangedWeapons.find(s => s.id === parseInt(currentRangedId)); 
        if (ranged && !selectedRanged.some(s => s.id === ranged.id)) {
            setSelectedRanged([...selectedRanged, ranged]);
            setCurrentRangedId(""); 
        }
    };

    const handleAddMelee = () => {
        if (!currentMeleeId) return;
        const melee = meleeWeapons.find(s => s.id === parseInt(currentMeleeId)); 
        if (melee && !selectedMelee.some(s => s.id === melee.id)) {
            setSelectedMelee([...selectedMelee, melee]);
            setCurrentMeleeId(""); 
        }
    };

    const handleRemoveRanged = (id: number) => {
        setSelectedRanged(selectedRanged.filter(s => s.id !== id));
    };
    const handleRemoveMelee = (id: number) => {
        setSelectedMelee(selectedMelee.filter(s => s.id !== id));
    };
    const handleRemoveAptitude = (indexToRemove: number) => {
    setAptitudesList(aptitudesList.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
    
            const payload = {
                redirectTo: "/listBrowse",
                name: formData.get('name')?.toString() || "",
                faction_id: formData.get('faction')?.toString() || "",
                number: formData.get('number')?.toString() || "",
                mouvement: formData.get('mouvement')?.toString() || "",
                stamina: formData.get('stamina')?.toString() || "",
                save: formData.get('save')?.toString() || "",
                pv: formData.get('pv')?.toString() || "",
                commandement: formData.get('commandement')?.toString() || "",
                co: formData.get('co')?.toString() || "",
                section: formData.get('section')?.toString() || "",
                ranged_weapons: selectedRanged.map(s => s.id), 
                melee_weapons: selectedMelee.map(s => s.id),
                aptitude: aptitudesList.length > 0 ? aptitudesList.join("\n") : null   
            };
            
            
    
            submit(payload , {
                method: "post",
                encType: "application/json",
            });
        };
    return(
        <>
        <section className='reg_auth_section'>
        <div className='register_page'>
            <h1 className='title_reg'>Add unite</h1>
            <Form className='register_form' onSubmit={handleSubmit}>
                <input type="hidden" name="redirectTo" value="/listBrowse" />          
                <div className='div_label'>
                    <label htmlFor="Name">Name</label>
                </div>               
                <input type="text" className='form_input' name='name'/>
                <select className='form_input' name="faction" required>
                    <option value="">-- Select a Faction --</option>
                    {factions.map((faction: any) => (
                        <option key={faction.id} value={faction.id}>
                            {faction.name}
                        </option>
                    ))}
                </select>   

                <div className='div_label'>
                    <label htmlFor="Number">Number</label>
                </div>
                <input type="text" className='form_input' name='number'/>

                <div className='div_label'>
                    <label htmlFor="Mouvement">Mouvement</label>
                </div>
                <input type="text" className='form_input' name='mouvement'/>

                <div className='div_label'>
                    <label htmlFor="Stamina">Stamina</label>
                </div>
                <input type="text" className='form_input' name='stamina'/>

                <div className='div_label'>
                    <label htmlFor="Save">Save</label>
                </div>
                <input type="text" className='form_input' name='save'/>

                <div className='div_label'>
                    <label htmlFor="Pv">Pv</label>
                </div>
                <input type="text" className='form_input' name='pv'/>

                <div className='div_label'>
                    <label htmlFor="Commandement">Commandement</label>
                </div>
                <input type="text" className='form_input' name='commandement'/>

                <div className='div_label'>
                    <label htmlFor="CO">CO</label>
                </div>
                <input type="text" className='form_input'name='co'/>

                <div className="selected_items_list" >
                        {selectedRanged.map((ranged) => (
                            <div key={ranged.id} className="item_badge" style={{ display: 'flex', gap: '10px', marginBottom: '5px', alignItems: 'center' }}>
                                <span>• <strong>{ranged.name}</strong></span>
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveRanged(ranged.id)} 
                                    style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>

                    <select 
                            className='form_input' 
                            value={currentRangedId} 
                            onChange={(e) => setCurrentRangedId(e.target.value)}
                        >
                            <option value="">-- Choose Ranged --</option>
                            {rangedWeapons.map((ranged: RangedWeapon) => (
                                <option key={ranged.id} value={ranged.id}>
                                    {ranged.name}
                                </option>
                            ))}
                        </select>
                        <button 
                            type="button" 
                            className='add_stratagems_btn' 
                            onClick={handleAddRanged}
                            
                        >
                            Add Rule
                        </button>

                        <div className="selected_items_list" >
                        {selectedMelee.map((melee) => (
                            <div key={melee.id} className="item_badge" style={{ display: 'flex', gap: '10px', marginBottom: '5px', alignItems: 'center' }}>
                                <span>• <strong>{melee.name}</strong></span>
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveMelee(melee.id)} 
                                    style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>

                    <select 
                            className='form_input' 
                            value={currentMeleeId} 
                            onChange={(e) => setCurrentMeleeId(e.target.value)}
                        >
                            <option value="">-- Choose Melee --</option>
                            {meleeWeapons.map((melee: MeleeWeapon) => (
                                <option key={melee.id} value={melee.id}>
                                    {melee.name}
                                </option>
                            ))}
                    </select>

                    <button 
                        type="button" 
                        className='add_stratagems_btn' 
                        onClick={handleAddMelee}
                            
                    >
                        Add Melee
                    </button>

                    <div className="selected_items_list">
                        {aptitudesList.map((aptitude, index) => (
                        <div key={index} className="item_badge">
                            <span>• <strong>{aptitude}</strong></span>
                            <button 
                                type="button" 
                                onClick={() => handleRemoveAptitude(index)}>
                                X
                            </button>
                        </div>
                        ))}
                    </div>

                    <textarea 
                    className='form_input' 
                    placeholder="Select aptitude..."
                    value={currentAptitude}
                    onChange={(e) => setCurrentAptitude(e.target.value)}
                    />
                    <button 
                        type="button" 
                        className='add_stratagems_btn' 
                        onClick={handleAddAptitude}
                    >
                        Add Aptitude
                    </button>


                    <div className='div_label'>
    <label htmlFor="section">Section</label>
</div>
                    <div className='div_label'>
                        <label htmlFor="section">Section</label>
                    </div>
                    <select className='form_input' name="section">
                        <option value="">-- Select a Section --</option>
                        {sections.map((sec: any) => (
                            <option key={sec.id} value={sec.id}>
                                {sec.name}
                            </option>
                        ))}
                    </select>

                <button type="submit"
                className='submit_form'>Add</button>   
            </Form>
        </div>
        </section>
        </>
    )
}