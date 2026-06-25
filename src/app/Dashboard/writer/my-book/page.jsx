import { userdata, userseissondata } from '@/app/Action/Userinfo';
import { Writerbooks } from '@/app/Action/Writerebook';
import React from 'react';
import Mybooks from './Allmybooks';

const MAinpagebooks = async() => {
      const user = await userdata();
        const token = await userseissondata()
  const writerbook = await Writerbooks(token, user?.id);
  console.log(writerbook)

    return (
        <div>
            <Mybooks token={token} writerbook={writerbook.data}></Mybooks>
        </div>
    );
};

export default MAinpagebooks;