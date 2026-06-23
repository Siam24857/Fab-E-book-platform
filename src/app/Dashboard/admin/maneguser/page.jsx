import { allUSerget } from '@/app/lib/Action/Adminacitons';
import React from 'react';
import Maneger from './Allmageuse';
import { userseissondata } from '@/app/lib/Action/Userinfo';

const MAgeallsuer = async() => {
      const alluserdata = await allUSerget();
        const token = await userseissondata()
    return (
        <div>
            <Maneger token={token} alluserdata={alluserdata}></Maneger>
        </div>
    );
};

export default MAgeallsuer;