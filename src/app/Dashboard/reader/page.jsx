import { userdata, userhistory, userseissondata } from '@/app/Action/Userinfo';
import React from 'react';
import Readerpage from './Allreader';

const Redasrpage = async () => {
  const currentUser = await userdata();
  const token = await userseissondata();
  const historyData = await userhistory(token, currentUser.id);

  return (
    <div>
      <Readerpage historyData={historyData}></Readerpage>
    </div>
  );
};

export default Redasrpage;