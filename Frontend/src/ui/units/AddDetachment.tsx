import React, { useState } from 'react';
import { useLoaderData, Form, redirect } from 'react-router';
import './AddDetachment.css';

// 1. Correction de l'interface pour correspondre à ton entité
interface Rule {
    name: string;
    cost: string;
    effet: string;
}

interface Detachment {
    id: number;
    name: string;
    description: string;
    stratagems: Rule[];
    optimisations: Rule[];
}

export async function addDetachmentLoader() {
    const checkList = await fetch("http://localhost:8000/api/my-active-list", { credentials: "include" });
    if (!checkList.ok) return redirect("/addList");
    
    const response = await fetch("http://localhost:8000/api/detachment");
    if (!response.ok) return [];
    return response.json();
}

export const AddDetachment = () => {
    const availableDetachments = useLoaderData() as Detachment[];
    const [selectedDetachment, setSelectedDetachment] = useState<Detachment | null>(null);
    const [activeTab, setActiveTab] = useState<'stratagems' | 'optimisations'>('stratagems');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value, 10);
        const detachment = availableDetachments.find(d => d.id === id) || null;
        setSelectedDetachment(detachment);
    };

    // Note : handleSubmit n'est plus nécessaire si tu utilises le Form de base
    // React Router s'occupe de l'envoi vers l'action définie dans App.jsx

    return (
        <section className="reg_auth_section">
            <div className="register_page">
                {/* On enlève onSubmit={handleSubmit} pour laisser React Router gérer */}
                <Form method="post" className="register_form">
                    <input type="hidden" name="redirectTo" value="/unitBrowse" />
                    <input type="hidden" name="detachment_id" value={selectedDetachment?.id || ''} />

                    <div className="div_label">
                        <label htmlFor="detachment-select" className="field-label">Detachment :</label>
                        <select onChange={handleSelectChange} name="detachment_id" className="form_input" required>
                            <option value="">Select a detachment</option>
                            {Array.isArray(availableDetachments) && availableDetachments.map((det) => (
                                <option key={det.id} value={det.id}>{det.name}</option>
                            ))}
                        </select>
                    </div>

                    {selectedDetachment && (
                        <div className="detachment-details-wrapper">
                            <div className="div_label">
                                <label className="field-label">Rules :</label>
                                <div className="scrollable-content">
                                    <p>{selectedDetachment.description}</p>
                                </div>
                            </div>

                            <div className="tabs-navigation">
                                <button type="button" className={`form_input tab-btn ${activeTab === 'stratagems' ? 'active' : ''}`} onClick={() => setActiveTab('stratagems')}>
                                    Stratagèmes
                                </button>
                                <button type="button" className={`form_input tab-btn ${activeTab === 'optimisations' ? 'active' : ''}`} onClick={() => setActiveTab('optimisations')}>
                                    Optimisations
                                </button>
                            </div>

                            <div className="tab-content-panel">
                                <ul className="rules-list">
                                    {(activeTab === 'stratagems' ? selectedDetachment.stratagems : selectedDetachment.optimisations).map((item, index) => (
                                        <li key={index} className="rule-item">
                                            <strong>{item.name}</strong> ({item.cost}) - {item.effet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="actions-panel">
                        <button type="submit" className="submit_form validate-detachment-btn" disabled={!selectedDetachment}>
                            Valider et continuer
                        </button>
                    </div>
                </Form>
            </div>
        </section>
    );
};