import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, redirect } from 'react-router';
import { genericApiAction } from './core/hooks/ApiAction';
import {NavBar}  from './ui/header/Navbar'
import {Footer} from './ui/footer/Feeter'
import {Homepage} from './ui/homepage/Homepage'
import {AddEvent} from './ui/event/AddEvent'
import {AddFaction} from './ui/admin/Faction'
import { ModifyFaction, factionEditLoader } from './ui/admin/ModifyFactionAdmin';
import {AddDetachments,addDetachmentsLoader} from './ui/admin/Detachment'
import { AddUnitsAdmin, addUnitsAdminLoader } from './ui/admin/AddUnitsAdmin';
import { ModifyRangedAdmin, rangedAdminEditLoader } from './ui/admin/ModifyRangedAdmin';
import { ModifyMeleeAdmin, meleeAdminEditLoader } from './ui/admin/ModifyMeleeAdmin';
import { ModifyUnitAdmin, unitsAdminEditLoader } from './ui/admin/ModifyUnitAdmin';
import {AddRangedAdmin, addRangedAdminLoader} from './ui/admin/AddRangedAdmin'
import {AddWeaponStatAdmin} from './ui/admin/AddWeaponStatAdmin'
import {AddMeleeAdmin, addMeleeAdminLoader} from './ui/admin/AddMeleeAdmin'
import {ListBrowse, listBrowseLoader} from './ui/units/ListBrowse'
import {AddList, addListLoader} from './ui/units/AddList'
import {UnitBrowse} from './ui/units/UnitBrowse'
import {AddUnits,addUnitLoader} from './ui/units/AddUnit'
import {AddDetachment, addDetachmentLoader} from './ui/units/AddDetachment'
import {AddPhotos} from './ui/photos/AddPhotos'
import {Login} from './ui/auth/Login'
import {Register} from './ui/auth/Register'
import {AccountSettings} from './ui/auth/AccountSettings'
import {Rgpd} from './ui/seo/Rgpd'
import {Confidentiality} from './ui/seo/Confidentiality'
import './App.css'
import './normalise.css'

  const RootLayout = () => (
    <>
      <section><nav>
          <NavBar/>
      </nav></section>

      <section className="body">
        <Outlet/>
        
      </section>

      <section>
        <footer>
          <Footer/>
        </footer>
      </section>
    </>
  );

function App() {
  const handleButtonClick = (valeur) => {
    console.log("Ajout d'event.", valeur);
    alert ("Action déclenchée : " + valeur);
  };

    const router = createBrowserRouter([
    {
       path:'/', element: <RootLayout/>,
        children: [

          {index: true, element: <Homepage />},

          { path:'addDetachment', element:<AddDetachment/>, loader: addDetachmentLoader, action: genericApiAction},

{ path:'unitBrowse/:id', element:<UnitBrowse/>, action: genericApiAction},

          { path:'addUnits', element:<AddUnits/>, loader: addUnitLoader,action: genericApiAction},

          { path:'listBrowse', element:<ListBrowse/>,loader: listBrowseLoader, action: genericApiAction},

          { path:'addList', element:<AddList/>, loader: addListLoader, action: genericApiAction},

          {path: 'addFaction', element:<AddFaction/>, action: genericApiAction},

          {path: 'api/admin/faction/:id/modify',  element: <ModifyFaction />, 
          loader: factionEditLoader, action: genericApiAction},

          {path: 'addRangedAdmin', element: <AddRangedAdmin />, loader:addRangedAdminLoader ,
          action: genericApiAction},

          {path: 'addMeleeAdmin', element:<AddMeleeAdmin/>,loader: addMeleeAdminLoader, action: genericApiAction},

          {path: 'addWeaponStatAdmin', element:<AddWeaponStatAdmin/>, action: genericApiAction},

          {path: 'addDetachments', element:<AddDetachments/>,loader: addDetachmentsLoader, action: genericApiAction},

          { path:'addUnitsAdmin', element:<AddUnitsAdmin/>,loader: addUnitsAdminLoader,
          action:  genericApiAction},

          {path: 'api/admin/unite/:id/modify', element: <ModifyUnitAdmin />,loader: unitsAdminEditLoader, action: genericApiAction},

          {path: 'api/admin/ranged_weapons/:id/modify', element: <ModifyRangedAdmin />,loader: rangedAdminEditLoader, action: genericApiAction},

          {path: 'api/admin/melee_weapons/:id/modify', element: <ModifyMeleeAdmin />,loader: meleeAdminEditLoader, action: genericApiAction},

          { path:'addEvent', element:<AddEvent/>, action: genericApiAction},

          { path:'addPhotos', element:<AddPhotos/>, action: genericApiAction},

          { path:'login', element:<Login/>, action: genericApiAction},

          { path:'register', element:<Register/>, action: genericApiAction},

          { path:'rgpd',element:<Rgpd/>},

          { path:'confidentiality', element:<Confidentiality/>},

          { path:'accountSettings', element:<AccountSettings/>},

          ]
    }        
  ]);

  return <RouterProvider router={router} />;
}
export default App
