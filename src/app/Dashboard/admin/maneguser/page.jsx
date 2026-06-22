import { allUSerget } from '@/app/lib/Action/Adminacitons';
import React from 'react';
import Maneger from './Allmageuse';

const MAgeallsuer = async() => {
      const alluserdata = await allUSerget();
    return (
        <div>
            <Maneger alluserdata={alluserdata}></Maneger>
        </div>
    );
};

export default MAgeallsuer;