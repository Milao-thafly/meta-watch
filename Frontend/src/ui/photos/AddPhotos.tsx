import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link, useSubmit, Form} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import './AddPhotos.css';

export const AddPhotos = () => {
    
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

    const submit = useSubmit();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    submit(data, {
            method: "post",
            encType: "application/json",
        });
    
    };
    return(
        <>
        <section className='photos_section'>
        <div className='login_page'>
            <h1 className='title_tof'>Add Photos</h1>
            <Form className='photos_form' onSubmit={handleSubmit}>
                
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
                <div className='photos_description'>
                    
                    <input type="text" className='descri_photos' />
                    <button type="submit" className='photos_submit_form'>Add</button>  
                </div>
                 
            </Form>
        </div>
        </section>
        </>
    )
}