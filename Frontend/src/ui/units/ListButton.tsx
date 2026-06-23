import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import {Dropdown} from '../dropdown/Dropdown'
import './ListButton.css'

interface Detachment {
    name: string;
}

interface ListArmy {
    id: number;
    name: string;
    point: string;
    createdAt: string;
    detachment?: Detachment;
}

export const ListButton = ({ list }: { list: ListArmy }) => {
    return (
        <Link className='add_button_list' to={`/unitBrowse/${list.id}`}>
            <div className='list_card'>
                <img src="./public/lists/GenestealerTry.png" alt="A picture for the faction" className='list_visual'/>

                <div className='list_info'>
                    <div className='id_list'>
                        <p className='list_name'>{list.name} {list.point}</p>
                        <p className='date_creation_list'>{new Date(list.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div className='list_spec'>
                        <p className='detachment_name'>
                            Detachment: {list.detachment?.name || 'None'}
                        </p>
                        <p className='detachment_name'>
        
                            98 pièces 
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}