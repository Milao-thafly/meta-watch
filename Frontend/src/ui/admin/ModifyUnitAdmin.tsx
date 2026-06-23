import { useLoaderData, Form, useActionData, useNavigate, useSubmit } from 'react-router';
import type { Params } from 'react-router';
import { useEffect, useState } from 'react';
import './addUnitsAdmin.css';

interface Faction {
    id: number;
    name: string;
    description?: string;
}

interface Section {
    id: number;
    name: string;
}

interface Weapon {
    id: number;
    name: string;
    weaponStat?: Weapon[];
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
    aptitudes?: string;
    factions?: Faction[];
    ranged_weapons?: Weapon[];
    melee_weapons?: Weapon[];
}

interface LoaderData {
    unite: Unite;
    factions: Faction[];
    rangedWeapons: Weapon[];
    meleeWeapons: Weapon[];
    sections: Section[];
}

interface ActionData {
    error?: string;
    message?: string;
}

export async function unitsAdminEditLoader({ params }: { params: Params }) {
    const id = params.id;
    const [uniteRes, factionsRes, rangedRes, meleeRes, sectionRes] = await Promise.all([
        fetch(`http://localhost:8000/api/admin/unite/${id}`, { credentials: "include" }),
        fetch("http://localhost:8000/api/faction"),
        fetch("http://localhost:8000/api/ranged_weapons"),
        fetch("http://localhost:8000/api/melee_weapons"),
        fetch("http://localhost:8000/api/sections")
    ]);

    if (!uniteRes.ok) {
        throw new Response("Unit not found", { status: 404 });
    }

    const unite = await uniteRes.json();
    const factions = factionsRes.ok ? await factionsRes.json() : [];
    const rangedWeapons = rangedRes.ok ? await rangedRes.json() : [];
    const meleeWeapons = meleeRes.ok ? await meleeRes.json() : [];
    const sections = sectionRes.ok ? await sectionRes.json() : [];
    

    return { unite, factions, rangedWeapons, meleeWeapons, sections };
}

export function ModifyUnitAdmin() {
    const [aptitudesList, setAptitudesList] = useState<string[]>([]);
    const [currentAptitude, setCurrentAptitude] = useState<string>("");
    const { unite, factions, rangedWeapons, meleeWeapons, sections } = useLoaderData() as LoaderData;
    const actionData = useActionData() as ActionData | undefined;
    const navigate = useNavigate();
    const submit = useSubmit();

    const [selectedFaction, setSelectedFaction] = useState<string | number>('');
    const [rangedCount, setRangedCount] = useState(1);
    const [meleeCount, setMeleeCount] = useState(1);

    useEffect(() => {
        if (unite) {
            setSelectedFaction(unite.factions?.[0]?.id ?? '');
            
            if (unite.ranged_weapons && unite.ranged_weapons.length > 0) {
                setRangedCount(unite.ranged_weapons.length);
            }
            if (unite.melee_weapons && unite.melee_weapons.length > 0) {
                setMeleeCount(unite.melee_weapons.length);
            }
        }
    }, [unite]);

    useEffect(() => {
        if (actionData && actionData.message === "Unit updated successfully") {
            navigate('/unitBrowse');
        }
    }, [actionData, navigate]);

       const handleAddAptitude = () => {
    if (!currentAptitude.trim()) return;
    if (!aptitudesList.includes(currentAptitude.trim())) {
        setAptitudesList([...aptitudesList, currentAptitude.trim()]);
        setCurrentAptitude(""); 
    }
};
const handleRemoveAptitude = (indexToRemove: number) => {
    setAptitudesList(aptitudesList.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const ranged_weapons = Array.from({ length: rangedCount })
        .map((_, i) => Number(formData.get(`ranged_weapon_${i}`)))
        .filter(id => id > 0);

    const melee_weapons = Array.from({ length: meleeCount })
        .map((_, i) => Number(formData.get(`melee_weapon_${i}`)))
        .filter(id => id > 0);

    const factionId = formData.get('faction') ? Number(formData.get('faction')) : null;

    

    const payload = {
        name: formData.get('name')?.toString() || "",
        number: formData.get('number')?.toString() || "",
        mouvement: formData.get('mouvement')?.toString() || "",
        stamina: formData.get('stamina')?.toString() || "",
        save: formData.get('save')?.toString() || "",
        pv: formData.get('pv')?.toString() || "",
        commandement: formData.get('commandement')?.toString() || "",
        co: formData.get('co')?.toString() || "",
        section: formData.get('section')?.toString() || "",
        aptitude: formData.get('aptitude')?.toString() || null,
        faction_id: factionId,
        ranged_weapons,
        melee_weapons
    };

    submit(JSON.stringify(payload), {
    method: "put",
    encType: "application/json",
});
    
};
const handleDelete = async () => {
    if (!window.confirm("Delete ?")) return;

    const tokenResponse = await fetch('http://localhost:8000/api/csrf-token');
    const { token } = await tokenResponse.json();

    const response = await fetch(`http://localhost:8000/api/admin/unite/${unite.id}`, {
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
        <section className="reg_auth_section">
            <div className='register_page'>
            <h1 className='title_reg'>Modify Unite {unite.name}</h1>
            
            {actionData?.error && <p className="error-message">{actionData.error}</p>}
            {actionData?.message && <p className="success-message">{actionData.message}</p>}

            <Form  className='register_form' onSubmit={handleSubmit}>
                <div className='div_label'>
                    <label htmlFor="Name">Name</label>
                </div>  
                <input type="text" className='form_input' name="name" defaultValue={unite.name} required />

                <div className='div_label'>
                    <label htmlFor="Number">Number</label>
                </div>
                <input type="text" className='form_input' name="number" defaultValue={unite.number} />

                <div className='div_label'>
                    <label htmlFor="Mouvement">Mouvement</label>
                </div>
                <input type="text" className='form_input' name="mouvement" defaultValue={unite.mouvement} />

                <div className='div_label'>
                    <label htmlFor="Stamina">Stamina</label>
                </div>
                <input type="text" className='form_input' name="stamina" defaultValue={unite.stamina} />

                <div className='div_label'>
                    <label htmlFor="Save">Save</label>
                </div>
                <input type="text" className='form_input' name="save" defaultValue={unite.save} />

                <div className='div_label'>
                    <label htmlFor="Pv">Pv</label>
                </div>
                <input type="text" className='form_input' name="pv" defaultValue={unite.pv} />

                <div className='div_label'>
                    <label htmlFor="Commandement">Commandement</label>
                </div>
                <input type="text" className='form_input' name="commandement" defaultValue={unite.commandement} />

                <div className='div_label'>
                    <label htmlFor="CO">CO</label>
                </div>
                <input type="text" className='form_input' name="co" defaultValue={unite.co} />

                <div className='div_label'>
                    <label htmlFor="Aptitude">Aptitude</label>
                </div>
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
                    <label htmlFor="Faction">Faction</label>
                </div>
                <select 
                    name="faction" className='form_input'
                    value={selectedFaction} 
                    onChange={(e) => setSelectedFaction(e.target.value)}
                >
                    <option value="">-- Choisir une faction --</option>
                    {factions.map((faction: Faction) => (
                        <option key={faction.id} value={faction.id}>
                            {faction.name}
                        </option>
                    ))}
                </select>

                <div className="weapons-selection">
    <div className='div_label'>
        <label htmlFor="Ranged">Ranged Weapons</label>
    </div>
    {Array.from({ length: rangedCount }).map((_, i) => (
        <div key={i} style={{ display: 'block', width: '100%', marginBottom: '15px' }}>
            <select 
                className='form_input' 
                name={`ranged_weapon_${i}`}
                defaultValue={unite.ranged_weapons?.[i]?.id || ""}
            >
                <option value="">-- Select a Ranged Weapon --</option>
                {rangedWeapons.map((weapon: Weapon) => (
                    <option key={weapon.id} value={weapon.id}>
                        {weapon.name}
                    </option>
                ))}
            </select>
        </div>
    ))}
    <button type="button" className='add_stratagems_btn' onClick={() => setRangedCount(rangedCount + 1)}>
        + Add Ranged Weapon
    </button>
</div>

<div className="weapons-selection">
    <div className='div_label'>
        <label htmlFor="Melee">Melee Weapons</label>
    </div>
    {Array.from({ length: meleeCount }).map((_, i) => (
        <div key={i} style={{ display: 'block', width: '100%', marginBottom: '15px' }}>
            <select 
                className='form_input' 
                name={`melee_weapon_${i}`}
                defaultValue={unite.melee_weapons?.[i]?.id || ""}
            >
                <option value="">-- Select a Melee Weapon --</option>
                {meleeWeapons.map((weapon: Weapon) => (
                    <option key={weapon.id} value={weapon.id}>
                        {weapon.name}
                    </option>
                ))}
            </select>
        </div>
    ))}
    <button type="button" className='add_enhancement_btn' onClick={() => setMeleeCount(meleeCount + 1)}>
        + Add Melee Weapon
    </button>
</div>
                <div className='div_label'>
    <label htmlFor="section">Section</label>
</div>
            <select className='form_input' name="section" defaultValue={unite?.section?.[0]?.id || ""}>
                <option value="">-- Select a Section --</option>
                {sections.map((sec: any) => (
                    <option key={sec.id} value={sec.id}>
                        {sec.name}
                    </option>
                ))}
            </select>

                <button type="submit" className='submit_form'>save</button>

                <button type="button" className="delete_btn" onClick={handleDelete}>
                        Delete Unite
                </button>
            </Form>
            </div>
        </section>
    );
}