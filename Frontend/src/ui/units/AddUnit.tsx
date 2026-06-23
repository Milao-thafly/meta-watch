import { useState } from 'react';
import { useLoaderData, Form, useActionData, useNavigate, useSubmit } from 'react-router';
import './AddUnit.css';

interface Section {
    id: number;
    name: string;
}

interface Faction {
    id: number;
    name: string;
}

interface Weapon {
    id: number;
    name: string;
    length?: string;
    attack?: number;
    precision?: string;
    strength?: string;
    damage?: string;
}

interface Unite {
    id: number;
    name: string;
    number?: string;
    mouvement?: string;
    stamina?: string;
    save?: string;
    pv?: string;
    commandement?: string;
    co?: string;
    section?: Section[];
    aptitude?: string;
    factions?: Faction[];
    ranged_weapons?: Weapon[];
    melee_weapons?: Weapon[];
}


export async function addUnitLoader() {
    const [factionsRes, detachmentsRes, unitsRes, sectionsRes] = await Promise.all([
        fetch("http://localhost:8000/api/faction"),
        fetch("http://localhost:8000/api/detachments"),
        fetch("http://localhost:8000/api/units"),
        fetch("http://localhost:8000/api/sections"),
        fetch("http://localhost:8000/api/ranged_weapons"),
        fetch("http://localhost:8000/api/melee_weapons"),



        
    ]);

    return {
        factions: factionsRes.ok ? await factionsRes.json() : [],
        detachments: detachmentsRes.ok ? await detachmentsRes.json() : [],
        allUnits: unitsRes.ok ? await unitsRes.json() : [],
        sections: sectionsRes.ok ? await sectionsRes.json() : []
    };
    
}

export const AddUnits = () => {
    const [selectedSection, setSelectedSection] = useState("");
    const [count, setCount] = useState(0);
    const [selectedUnit, setSelectedUnit] = useState<Unite | null>(null);
    const { factions = [], detachments = [], sections = [], allUnits = [] } = useLoaderData() as {
        factions: any[],
        detachments: any[],
        sections: any[],
        allUnits: Unite[]
    };
        console.log("Structure des unités:", allUnits);

    
    const submit = useSubmit();

    const filteredModels = selectedSection 
        ? allUnits.filter((unit: any) => String(unit.section_id) === String(selectedSection))
        : [];

    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const payload = {
            faction_id: formData.get('faction_id')?.toString() || "",
            detachment: formData.get('detachment_id')?.toString() || "",
            section: formData.get('section')?.toString() || "",
            unit: formData.get('unit')?.toString() || "",
            model: formData.get('model')?.toString() || "",
            other: formData.get('other')?.toString() || "",
        };

        submit(payload, {
            method: "post",
            encType: "application/json",
        });
        
        
    };
    
       

    return (
        <div className='UnitBrowse'>
            <Form className='data_form' onSubmit={handleSubmit}>
                <h1 className='title_reg'>Add Units</h1>
                <div className='div_label'><label htmlFor="Faction">Faction</label></div>
                <select className='form_input' name="faction_id" required>
                    <option value="">Select a Faction</option>
                    {factions?.map((faction: any) => (
                        <option key={faction.id} value={faction.id}>{faction.name}</option>
                    ))}
                </select>

                <div className='div_label'><label htmlFor="Detachment">Detachment</label></div>
                <select className='form_input' name="detachment_id" required>
                    <option value="">Select a Detachment</option>
                    {detachments?.map((detachment: any) => (
                        <option key={detachment.id} value={detachment.id}>{detachment.name}</option>
                    ))}
                </select>

                <div className='div_label'><label htmlFor="Section">Section</label></div>
                <select
                    className='form_input'
                    name="section"
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                >
                    <option value="">Select a Section</option>
                    {sections?.map((sec: any) => (
                        <option key={sec.id} value={sec.id}>{sec.name}</option>
                    ))}
                </select>

                <div className='div_label'><label htmlFor="Model">Model</label></div>
                <select 
                    className='form_input' 
                    name="model" 
                    disabled={!selectedSection}
                    onChange={(e) => {
                        const unitId = e.target.value;
                        const unit = allUnits.find(u => String(u.id) === unitId);
                        
                        console.log("Valeurs reçues pour cette unité :", unit);
                        
                        setSelectedUnit(unit || null);
                    }}
                >
                    <option value="">Select a Model</option>
                    {filteredModels.map((unit: Unite) => (
                        <option key={unit.id} value={unit.id}>{unit.name}</option>
                    ))}
                </select>

                <div className='div_label'><label htmlFor="Other">Other</label></div>
                <div className='counter_container'>
                    <button type="button" onClick={() => setCount(prev => Math.max(1, prev - 1))}>-</button>
                    <input 
                        name="other" 
                        type="number" 
                        className='form_input' 
                        value={count} 
                        onChange={(e) => setCount(Number(e.target.value))}
                    />
                    <button type="button" onClick={() => setCount(prev => prev + 1)}>+</button>
                </div>

                <button type="submit" className='submit_form'>Validate</button>
            </Form>
            {selectedUnit && (
    <div className='data_container'>
        

        <div className='stats_wrapper'>
            <p className='unit_name'>{selectedUnit.name}</p>
            <ul className='stat_container'>
                <li className='stat_item'><span className='stat_label'>M</span><div className='numbers_stat'>{selectedUnit.mouvement}</div></li>
                            <li className='stat_item'><span className='stat_label'>T</span><div className='numbers_stat'>{selectedUnit.stamina}</div></li>
                            <li className='stat_item'><span className='stat_label'>SV</span><div className='numbers_stat'>{selectedUnit.save}</div></li>
                            <li className='stat_item'><span className='stat_label'>W</span><div className='numbers_stat'>{selectedUnit.pv}</div></li>
                            <li className='stat_item'><span className='labestat_labell'>LD</span><div className='numbers_stat'>{selectedUnit.commandement}</div></li>
                            <li className='stat_item'><span className='stat_label'>OC</span><div className='numbers_stat'>{selectedUnit.co}</div></li>
            </ul>
        </div>

        <div className='weapons_wrapper'>
            <ul className='weapons_container'>
                {(selectedUnit.ranged_weapons || []).concat(selectedUnit.melee_weapons || []).map((weapon, index) => (
                                <li key={index} className='weapon_item'>
                                    
                                    <span className='weapon_name'>{weapon.name}</span>
                                    <div className='weapons_stats'><span>L</span><span className='the_stat'>{weapon.length}</span></div>
                                    <div className='weapons_stats'><span>A</span><span className='the_stat'>{weapon.attack}</span></div>
                                    <div className='weapons_stats'><span>C/T</span><span className='the_stat'>{weapon.precision}</span></div>
                                    <div className='weapons_stats'><span>S</span><span className='the_stat'>{weapon.strength}</span></div>
                                    <div className='weapons_stats'><span>D</span><span className='the_stat'>{weapon.damage}</span></div>
                                    
                                </li>
                ))}
            </ul>
        </div>

    </div>
)}

{selectedUnit && (
                <div className='unit_data'>
                    <div className='apt_list'>
                        <h3>Apitudes</h3>
                    <ul className='apt_container'>
                        {selectedUnit.aptitude ? (
                            selectedUnit.aptitude.split('\n').map((apt, index) => (
                                <li key={index} className='apt_item'>
                                    <p> {apt}</p>
                                </li>
                            ))
                        ) : (
                            <li className='apt_item'>Aucune aptitude</li>
                        )}
                    </ul>

                    </div>
                </div>

            
            )}

        </div>
    );
};