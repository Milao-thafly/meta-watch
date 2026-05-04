import {clsx} from 'clsx';
import React from 'react';
import {useState} from 'react';
import {useNavigate, Link} from 'react-router';
import {useAuthContext} from '../../core/auth/useAuthContext';
import { LinkButton } from '../link_btn/Link_btn';
import { HomeButton } from '../button/HomeButton';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import './Homepage.css';


const link_test = [
    {id: 1, path: "/links/image_8.png"},
    {id: 2, path: "/links/image_9.png"},
    {id: 3, path: "/links/image_10.png"},
    {id: 4, path: "/links/image_11.png"}
];
const get_link = (id: number) => link_test.find(l => l.id === id);
const tournament_test = [
    {id: 1, name: "MANGEUR PRO", date: "14/02/2026", place: "Grenoble 38160 France. 2000pt. Mc do", description: `
Prenez vos meilleurs listes pour venir jouer comme vous êtes.
        
Unité legend interdite.  aucune entrée ne peut être prise plus de 1 fois sauf les Battleline, qui peuvent être pris 3 fois maximum.Les fortifications ne sont pas autorisées.

Les unités Legends sont autorisées dans la limite de 1 unité par équipe et 200 pts max.Les unités issues du Imperial Armour Compendium (aka   Forge World) sont autorisées.

Les unités Titanesques sont autorisées dans la limite de 1 unité par équipe et 400 pts max.
        `},
    {id: 2, name: "MANGEUR PRO", date: "14/02/2026", place: "Grenoble 38160 France. 2000pt. Mc do", description: `
Prenez vos meilleurs listes pour venir jouer comme vous êtes.
        
Unité legend interdite.  aucune entrée ne peut être prise plus de 1 fois sauf les Battleline, qui peuvent être pris 3 fois maximum.Les fortifications ne sont pas autorisées.

Les unités Legends sont autorisées dans la limite de 1 unité par équipe et 200 pts max.Les unités issues du Imperial Armour Compendium (aka   Forge World) sont autorisées.

Les unités Titanesques sont autorisées dans la limite de 1 unité par équipe et 400 pts max.
        `}
];
const photo_test = [
    {id: 1, path: "/photos/Legionaires_1.png", title: "10 legionnaries", author: "Milao"},
    {id: 2, path: "/photos/Legionaires_1.png", title: "10 legionnaries", author: "Milao"},
    {id: 3, path: "/photos/Legionaires_1.png", title: "10 legionnaries", author: "Milao"},
    {id: 4, path: "/photos/Legionaires_1.png", title: "10 legionnaries", author: "Milao"},
    {id: 5, path: "/photos/Legionaires_1.png", title: "10 legionnaries", author: "Milao"},
    {id: 6, path: "/photos/Legionaires_1.png", title: "10 legionnaries", author: "Milao"}
];
const get_photos = (id: number) => photo_test.find(p => p.id === id);

export const Homepage = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const total_slide = 4;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === total_slide -1 ? 0: prev +1))
    }
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? total_slide -1 : prev -1))
        
    }
    const handleNavigationLinks = (valeur: string) => {
        if (valeur === 'Meta') {
            navigate('/meta')
        }
        if (valeur === 'List') {
            navigate('/list')
        }
        if (valeur === 'Contact') {
            navigate('/contact')
        }
        if (valeur === 'Photos') {
            navigate('/photos')
        }
    }
        const handleNavigation = (valeur: string) => {
        if (valeur === 'Events') {
            navigate('/events')
        }
        if (valeur === 'Photos') {
            navigate('/photos')
        }
        
    }

    return (
        <>

        <div className='carousel_section'>
            <div className='arrow_slide'>
                    <div className='right_arr' onClick={prevSlide} ><ArrowLeft color="white" size={24} /></div>
                    <div className='left_arr'onClick={nextSlide}><ArrowRight color="white" size={24} /></div>
                </div>
            <div className='carousel_action' style={{'--index': currentIndex} as React.CSSProperties}>
                
            <section className='carousel_meta'>
                <div className='activ_brain'>
                    <div className='textual_area'>
                        <div className='div_btn'>
                            <Link to='/meta' >                                  <button className='button'>Meta</button>
                            </Link>  
                        </div>
                        
                        <h2 className='carousel_title_mobile'>New 
                            detach
                            ment:</h2>
                            
                        <div className='carousel_textuals'>
                            <h2 className='carousel_title'>New detatchment:</h2>
                            <p className='textual'>
                            Creation of bile : One of your creation can be really strong. But if you combine two of them ? 
                            The art of genetic have to be revealed
                            </p>
                        </div>
                    </div>  
                    
                </div>
                
                <div className='visual'>
                    <div className='div_img'>
                        <div className='img_'>
                            <img src="/public/background/Transparant_fabius.png" alt="" />
                        </div>
                        <div className='img_mobile'>
                            <img src="/public/background/Transparant_fabius_mob.png" alt="" />
                        </div>
                    </div>
                    <div className='geometry_content'>
                        <div className='rectangle_two'></div>
                        <div className='rectangle_one'></div>
                    </div>
                </div>
                
                
                
            </section>

            <section className='carousel_meta'>
                <div className='activ_brain'>
                    <div className='textual_area'>
                        <div className='div_btn'>
                            <Link to='/meta' >                                  <button className='button'>Meta</button>
                            </Link>
                        </div>
                        
                        <div className='carousel_textuals'>
                            <h2 className='carousel_title'>New detatchment:</h2>
                            <p className='textual'>
                            Creation of bile : One of your creation can be really strong. But if you combine two of them ? 
                            The art of genetic have to be revealed
                            </p>
                        </div>
                    </div>  
                    
                </div>
                
                <div className='visual'>
                    <div className='div_img'>
                        <div className='img_'>
                            <img src="/public/background/Transparant_guilliman.png" alt="" />
                        </div>
                    </div>
                    <div className='geometry_content'>
                        <div className='rectangle_two_two'></div>
                        <div className='rectangle_one_two'></div>
                    </div>
                </div>
                

                
            </section>

            <section className='carousel_meta'>
                <div className='activ_brain'>
                    <div className='textual_area'>
                        <div className='div_btn'>
                            <Link to='/meta' >                                  <button className='button'>Meta</button>
                            </Link>
                            
                        </div>
                        <div className='carousel_textuals'>
                            <h2 className='carousel_title'>New detatchment:</h2>
                            <p className='textual'>
                            Creation of bile : One of your creation can be really strong. But if you combine two of them ? 
                            The art of genetic have to be revealed
                            </p>
                        </div>
                    </div>  
                    
                </div>
                
                <div className='visual'>
                    <div className='div_img'>
                        <div className='img_'>
                            <img src="/public/background/Imperial_knight.png" alt="" />
                        </div>
                    </div>
                    <div className='geometry_content'>
                        <div className='rectangle_two_tree'></div>
                        <div className='rectangle_one_tree'></div>
                        <div className='rectangle_tree_tree'></div>
                        
                    </div>
                </div>
                
    
                
            </section>

            <section className='carousel_meta'>
                <div className='activ_brain'>
                    <div className='textual_area'>
                        <div className='div_btn'>
                            <Link to='/meta' >                                  <button className='button'>Meta</button>
                            </Link>

                        </div>
                        <div className='carousel_textuals'>
                            <h2 className='carousel_title'>New detatchment:</h2>
                            <p className='textual'>
                            Creation of bile : One of your creation can be really strong. But if you combine two of them ? 
                            The art of genetic have to be revealed
                            </p>
                        </div>
                    </div>  
                    
                </div>
                
                <div className='visual'>
                    <div className='div_img'>
                        <div className='img_'>
                            <img src="/public/background/Transparant_amentar.png" alt="" />
                        </div>
                    </div>
                    <div className='geometry_content'>
                        <div className='rectangle_two_four'></div>
                        <div className='rectangle_one_four'></div>
                        <div className='rectangle_tree_four'></div>
                        
                    </div>
                </div>
         
            </section>
            </div>
            
        </div>

            <section className='list_scroll'>
                <div className='activ_brain_scroll'>
                    <div className='textual_area_scroll'>
                        <div className='div_btn_list'>
                            {/* <button className='button_list'>List</button> */}
                            <Link className='button_list' to='/listBrowse'>List</Link>
                        </div>
                        <div className='carousel_textuals_list'>
                            <p className='textual_list'>
                            Create lists for playing at Warhammer 40k.

                            Choose a faction and create how many list you want with it.
                            </p>
                        </div>
                    </div>  
                    
                </div>
                <div className='visual'>
                    <div className='div_img_list'>
                        <div className='img_'>
                            <img src="/public/background/Silence_king.png" alt="" />
                        </div>
                        <div className='img_mobile'>
                            <img src="/public/background/Silenced_mob.png" alt="" />
                        </div>
                    </div>
                    <div className='geometry_content_scroll'>
                        <div className='rectangle_two_List'></div>
                        <div className='rectangle_one_List'></div>
                    </div>
                    <div className='div_btn_list_mob'>
                            <button className='button_list'>List</button>
                    </div>
                </div>
            </section>

            <section className='tournament_scroll'>
                <div className='activ_brain'>
                    <div className='textual_area_tournament'>
                        
                        <div className='tournament_textuals'>
<p className='textual_tournament'>
{`MANGEUR PRO: Samedi 14/02/2026. Grenoble 38160 France. 2000pt. 
Mc do Prenez vos meilleurs listes pour venir jouer comme vous êtes.

Unité legend interdite. aucune entrée ne peut être prise plus de 1 fois sauf les Battleline, qui peuvent être pris 3 fois maximum.`}
</p>
                        <div className='div_btn_tournament_'>
                            <button className='button_tournament_mobile'>Tournament</button>
                        </div>
                        </div>

                        <div className='div_btn_tournament'>
                            <button className='button_tournament'>Tournament</button>
                        </div>
                    </div>  
                    
                </div>
                <div className='visual_tournament'>
                    <div className='tournament_textuals_pres'>
                        <p className='textual'>
                        Join tournament set up by your locals. 
                        You can found the rules the place people came for playing to warhammer.
                        </p>
                    </div>
                    <div className='div_img_tournament'>
                        <div className='img_tournament'>
                            <img src="/public/background/Imperial_agent.png" alt="" />
                        </div>
                        <div className='img_tournament_mobile'>
                            <img src="/public/background/Imperial_agent_mob.png" alt="" />
                        </div>
                    </div>
                    <div className='geometry_content_tournament'>
                        <div className='rectangle_one_tournament'></div>
                        <div className='rectangle_two_tournament'></div>
                    </div>
                </div>
            </section>

            <section className='photos_scroll'>
                <div className='activ_brain_photos'>
                    <div className='textual_area_photos'>
                        <div className='div_btn_photos'>
                            {/* <button className='button_photos'>Photos</button> */}
                            <Link className='button_photos' to='/addPhotos'>Photos</Link>
                        </div>
                        <div className='photos_textuals'>
                            
                            <p className='textual_photos'>
                                Take pics of your armies and painting skills
                            </p>
                        </div>
                        
                    </div>  
                    
                </div>
                <div className='visual'>
                    <div className='div_img_photos'>
                        <div className='img_photos'>
                            <img src="/public/background/Iron_warrior.png" alt="" />
                        </div>
                        <div className='img_mobile_photos'>
                            <img src="/public/background/Iron_warrior_mob.png" alt="" />
                        </div>
                    </div>
                    <div className='geometry_content_scroll_photos'>
                        <div className='rectangle_one_photos'></div>
                    </div>
                </div>
            </section>
        </>
        
    )

}