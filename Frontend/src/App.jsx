import { useState } from 'react'
import { Routes, Route } from 'react-router'
import  {NavBar}  from './ui/header/Navbar'
import {Footer} from './ui/footer/Feeter'
import {Homepage} from './ui/homepage/Homepage'
import {AddEvent} from './ui/event/AddEvent'
import {AddPhotos} from './ui/photos/AddPhotos'
import {ListBrowse} from './ui/units/ListBrowse'
import {UnitBrowse} from './ui/units/UnitBrowse'
import {AddUnits} from './ui/units/AddUnit'
import {Login} from './ui/auth/Login'
import {Register} from './ui/auth/Register'
import {AccountSettings} from './ui/auth/AccountSettings'
import {Rgpd} from './ui/seo/Rgpd'
import {Confidentiality} from './ui/seo/Confidentiality'
import './App.css'
import './normalise.css'

function App() {
  
  const [count, setCount] = useState(0)

  const handleButtonClick = (valeur) => {
    console.log("Ajout d'event.", valeur);
    alert ("Action déclenchée : " + valeur);
  }

  return (
    <>
    
      <section><nav>
          <NavBar/>
      </nav></section>

      <section className="body">
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/rgpd' element={<Rgpd/>}/>
          <Route path='/confidentiality' element={<Confidentiality/>}/>
          <Route path='/accountSettings' element={<AccountSettings/>}/>
          <Route path='/addEvent' element={<AddEvent/>}/>
          <Route path='/addPhotos' element={<AddPhotos/>}/>
          <Route path='/unitBrowse' element={<UnitBrowse/>}/>
          <Route path='/addUnits' element={<AddUnits/>}/>
          <Route path='/listBrowse' element={<ListBrowse/>}/>
          {/* <Route path='/meta' element={<Meta/>}/> */}
          {/* <Route path='/list' element={<List/>}/> */}
          {/* <Route path='/contact' element={<Contact/>}/> */}
          {/* <Route path='/photos' element={<Photos/>}/> */}

        </Routes>
        
      </section>

      <section>
        <footer>
          <Footer/>
        </footer>
      </section>
    </>
  )
}

export default App
