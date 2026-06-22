import { userdata } from '@/app/lib/Action/Userinfo';
import React from 'react';
import Editepaghe from './Alldata';

const Edite = async({params}) => {
    const { id } = await params
    const userdat = await userdata()
    return (
        <div>
            <Editepaghe id={userdat.id} bookid={id} />
        </div>
    );
};

export default Edite;