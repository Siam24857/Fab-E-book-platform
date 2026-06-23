 import { userdata, userhistory, userseissondata } from '@/app/Action/Userinfo';
import React from 'react';
import Readerpage from './allreader';
 
 const Redasrpage = async() => {
  const userdata = await userdata()
    const token = await userseissondata();
        const historyData = await userhistory(token, userdata.id);
  return (
    <div>
      <Readerpage historyData={historyData} ></Readerpage>
    </div>
  );
 };
 
 export default Redasrpage;