import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import './AddEvent.css';

export const AddEvent = () => {
    const handleSubmit = (formData) => {
        const email = formData.get("email");
    }

    return(
        <>
        <section className='tournament_section'>
        <div className='login_page'>
            <form className='login_form' action={handleSubmit}>
                <h1 className='title_log'>Add Event</h1>
                <label htmlFor="Name">Name</label>
                <input type="text" />
                <label htmlFor="Format">Format</label>
                <input type="text" />
                <label htmlFor="Date">Date</label>
                <input type="date"/>
                <label htmlFor="Place">Place</label>
                <input type="text" />
                <label htmlFor="Description">Description</label>
                <input type="text" />
                              
                <button type="submit">Validate</button>   
            </form>
        </div>

        <div className='unit_data'>
            <div className='unit_gene'>
                <p>Fabius Bile</p>
                    <ul className='stat_container'>
                        <li className='stat_item'>
                        <span className='label'>M</span>
                        <div className='numbers_stat'>6</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>T</span>
                        <div className='numbers_stat'>4</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>SV</span>
                        <div className='numbers_stat'>3+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>W</span>
                        <div className='numbers_stat'>5</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>LD</span>
                        <div className='numbers_stat'>6+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>OC</span>
                        <div className='numbers_stat'>1</div>
                        </li>
                    </ul>
            </div>

            <div className='unit_gene'>
                <p>Acolite Surgeon Bile</p>
                    <ul className='stat_container'>
                        <li className='stat_item'>
                        <span className='label'>M</span>
                        <div className='numbers_stat'>6</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>T</span>
                        <div className='numbers_stat'>4</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>SV</span>
                        <div className='numbers_stat'>3+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>W</span>
                        <div className='numbers_stat'>5</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>LD</span>
                        <div className='numbers_stat'>6+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>OC</span>
                        <div className='numbers_stat'>1</div>
                        </li>
                    </ul>
            </div>

            <div className='weapons'>
            <div className='unit_gene'>
                <p>Chirugeon</p>
                    <ul className='stat_container'>
                        <li className='stat_item'>
                        <span className='label'>M</span>
                        <div className='numbers_stat'>6</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>T</span>
                        <div className='numbers_stat'>4</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>SV</span>
                        <div className='numbers_stat'>3+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>W</span>
                        <div className='numbers_stat'>5</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>LD</span>
                        <div className='numbers_stat'>6+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>OC</span>
                        <div className='numbers_stat'>1</div>
                        </li>
                    </ul>
            </div>

            <div className='unit_gene'>
                <p>Baton du tourment</p>
                    <ul className='stat_container'>
                        <li className='stat_item'>
                        <span className='label'>M</span>
                        <div className='numbers_stat'>6</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>T</span>
                        <div className='numbers_stat'>4</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>SV</span>
                        <div className='numbers_stat'>3+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>W</span>
                        <div className='numbers_stat'>5</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>LD</span>
                        <div className='numbers_stat'>6+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>OC</span>
                        <div className='numbers_stat'>1</div>
                        </li>
                    </ul>
            </div>
            
            <div className='unit_gene'>
                <p>Pistolet xyclos</p>
                    <ul className='stat_container'>
                        <li className='stat_item'>
                        <span className='label'>M</span>
                        <div className='numbers_stat'>6</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>T</span>
                        <div className='numbers_stat'>4</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>SV</span>
                        <div className='numbers_stat'>3+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>W</span>
                        <div className='numbers_stat'>5</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>LD</span>
                        <div className='numbers_stat'>6+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>OC</span>
                        <div className='numbers_stat'>1</div>
                        </li>
                    </ul>
            </div>

            <div className='unit_gene'>
                <p>Outils de surgeon</p>
                    <ul className='stat_container'>
                        <li className='stat_item'>
                        <span className='label'>M</span>
                        <div className='numbers_stat'>6</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>T</span>
                        <div className='numbers_stat'>4</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>SV</span>
                        <div className='numbers_stat'>3+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>W</span>
                        <div className='numbers_stat'>5</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>LD</span>
                        <div className='numbers_stat'>6+</div>
                        </li>

                        <li className='stat_item'>
                        <span className='label'>OC</span>
                        <div className='numbers_stat'>1</div>
                        </li>
                    </ul>
            </div>
            
            </div>
        </div>
        </section>
        </>
    )
}