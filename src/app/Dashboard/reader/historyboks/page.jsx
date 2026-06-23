import { userdata, userhistory, userseissondata } from '@/app/lib/Action/Userinfo';
import React from 'react';
import PurchaseHistoryPage from './Allhistorybooks';

const ALlhistory = async() => {
     const userData = await userdata();
      const tokenData = await userseissondata();
      const historyData = await userhistory(tokenData, userData.id);
  return (
    <div>
      <PurchaseHistoryPage historyData={historyData} tokenData={tokenData} userData={userData} ></PurchaseHistoryPage>
    </div>
  );
};

export default ALlhistory;