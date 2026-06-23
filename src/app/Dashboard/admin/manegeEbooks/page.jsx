import React from 'react';
import AllEbooks from './AllEbooks';
import { allbookdata } from '@/app/lib/Action/ALlbooks';
import { userseissondata } from '@/app/lib/Action/Userinfo';
 

const MAgeEbooks = async() => {
    const allbookdatas = await allbookdata()
      const token = await userseissondata()
    
    return (
        <div>
            <AllEbooks token={token} allbookdatas={allbookdatas}></AllEbooks>
        </div>
    );
};

export default MAgeEbooks;