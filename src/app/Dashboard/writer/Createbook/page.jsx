import React from 'react';
import EbookCreateForm from './Allcreatrfomr';
import { userdata } from '@/app/lib/Action/Userinfo';

const Createdpage = async() => {
    const userdat = await userdata()
   
    return (
        <div>
            <EbookCreateForm id={userdat.id}></EbookCreateForm>
        </div>
    );
};

export default Createdpage;