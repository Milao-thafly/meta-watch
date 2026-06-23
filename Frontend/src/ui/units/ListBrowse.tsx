import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit,useLoaderData} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import {Dropdown} from '../dropdown/Dropdown'
import { ListButton } from './ListButton';
import './ListBrowse.css';

export async function listBrowseLoader() {
    const response = await fetch("http://localhost:8000/api/lists", {credentials: "include"});
    if (!response.ok) return [];
    return response.json();
}

export const ListBrowse = () => {
    const lists = (useLoaderData() as any[]) || [];
    console.log("Données reçues de Symfony :", lists);
    
    return(
        <>
        <section className='list_section'>
            <div className='UnitBrowse'>
                        <Link className='add_button' to='/addList'>Add</Link>
                        <Dropdown trigger="Modelism" className='add_button'>
                                            <button>1</button>
                                            <button>2</button>
                                            <button>3</button>           
                        </Dropdown>
            
                    </div>
            <div className='list_area'>
                {lists.map((item) => (
                    <ListButton key={item.id} list={item} />
                ))}
            </div>
        </section>
        
        
        </>
    )
}