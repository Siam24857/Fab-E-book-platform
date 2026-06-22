import React from 'react';
import AllEbooks from './AllEbooks';
import { allbookdata } from '@/app/lib/Action/ALlbooks';
 

const MAgeEbooks = async() => {
    const allbookdatas = await allbookdata()
    
    return (
        <div>
            <AllEbooks allbookdatas={allbookdatas}></AllEbooks>
        </div>
    );
};

export default MAgeEbooks;