import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import './AddPhotos.css';

export const AddPhotos = () => {
    const handleSubmit = (formData) => {
    const email = formData.get("email");
    }
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragover" || e.type === "dragenter"){
            setDragging(true);
        } else if (e.type === "dragleave" || e.type === "drop"){
            setDragging(false);

        }
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

            if (e.dataTransfer && e.dataTransfer.files) {
            const uploadedFiles= [...e.dataTransfer.files];
            setFiles(uploadedFiles);
            console.log("Fichier récupérés", uploadedFiles)
            }        
    }
    return(
        <>
        <section className='photos_section'>
        <div className='login_page'>
            <form className='login_form' action={handleSubmit}>
                <h1 className='title_log'>Add Photos</h1>
                <label htmlFor="Name">Name</label>
                <input type="text" />
                <label htmlFor="Description">Description</label>
                <input type="text" className='descri_photos' />

                <div className={clsx('drop_zone', dragging && 'dragging')}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                >
                <p>Glissez vos photos ici ou cliquez pour choisir</p>
                <input type="file" multiple className="file_input"
                onChange={(e) => {if (e.target.files) {
                    setFiles(Array.from(e.target.files));
                }
                }}/>
                </div>   
                <button type="submit">Add</button>   
            </form>
        </div>
        </section>
        </>
    )
}