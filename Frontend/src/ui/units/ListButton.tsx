import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import {Dropdown} from '../dropdown/Dropdown'
import './ListButton.css'


export const ListButton = () => {
    return (
        <>
            <Link className='add_button_list' to='/unitBrowse'>
                    <div className='list_card'>
                        <img src="./public/lists/GenestealerTry.png" alt="A picture for the faction" className='list_visual'/>

                        <div className='list_info'>
                            <div className='id_list'>
                            <p className='list_name'>Last day 2000</p>
                            <p className='date_creation_list'>00/09/1973</p>
                            </div>
                            
                        
                        <div className='list_spec'>
                            <p className='detachment_name'>
                                Detachment: Last Day
                            </p>
                            <p className='detachment_name'>
                                98 pièces
                            </p>
                            <p className='number_units'>
                                98 pièces
                            </p>
                        </div>
                        </div>
                    </div>
            </Link>
        </>
    )
}
