import React from 'react';
import EbookCreateForm from './Allcreatrfomr';
import { userseissondata } from '@/app/Action/Userinfo';
// import { userdata } from '@/app/lib/Action/Userinfo';

const Createdpage = async() => {
    // const userdat = await userdata()
    const userseiassondata = await userseissondata()
   
    return (
        <div>
            <EbookCreateForm token={userseiassondata} ></EbookCreateForm>
        </div>
    );
};

export default Createdpage;