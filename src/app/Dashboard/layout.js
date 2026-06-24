import React from 'react';
import { Dashboradlayout } from '../components/Dashboardlayout';
 
 
 

const Dashbord = ({ children }) => {
    return (
        <div className='lg:flex lg:min-h-screen gap-4'>
              <Dashboradlayout></Dashboradlayout>
           <div className='flex-1'>{children}</div>
        </div>
    );
};

export default Dashbord;