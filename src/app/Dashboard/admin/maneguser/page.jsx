import { allUSerget } from '@/app/Action/Adminacitons';
import React from 'react';
import Maneger from './Allmageuse';
import { userseissondata } from '@/app/Action/Userinfo';

export const dynamic = 'force-dynamic';

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