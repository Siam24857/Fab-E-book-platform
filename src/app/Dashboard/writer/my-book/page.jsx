import { userdata, userseissondata } from '@/app/lib/Action/Userinfo';
import { Writerbooks } from '@/app/lib/Action/Writerebook';
import React from 'react';
import Mybooks from './Allmybooks';

const MAinpagebooks = async() => {
      const user = await userdata();
  const writerbook = await Writerbooks(user?.id);
  const token = await userseissondata()
    return (
        <div>
            <Mybooks token={token} writerbook={writerbook}></Mybooks>
        </div>
    );
};

export default MAinpagebooks;