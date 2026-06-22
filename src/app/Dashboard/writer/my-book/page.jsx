import { userdata } from '@/app/lib/Action/Userinfo';
import { Writerbooks } from '@/app/lib/Action/Writerebook';
import React from 'react';
import Mybooks from './Allmybooks';

const MAinpagebooks = async() => {
      const user = await userdata();
  const writerbook = await Writerbooks(user?.id);
    return (
        <div>
            <Mybooks writerbook={writerbook}></Mybooks>
        </div>
    );
};

export default MAinpagebooks;