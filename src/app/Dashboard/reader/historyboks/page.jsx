// ./src/app/Dashboard/reader/historyboks/page.jsx
// গুরুত্বপূর্ণ: এই ফাইলের শুরুতে "use client" থাকলে সেটি সরিয়ে ফেলুন

import { userdata, userhistory, userseissondata } from "@/app/lib/Action/Userinfo";
import PurchaseHistoryPage from "./PurchaseHistoryPage";
 

export default async function HistoryBooksPage() {
  // সার্ভার সাইডে ডেটা ফেচ করুন
  const userData = await userdata();
  const tokenData = await userseissondata();
  const historyData = await userhistory(tokenData, userData.id);

  // ডেটা ক্লায়েন্ট কম্পোনেন্টে পাঠান
  return (
    <PurchaseHistoryPage
      historyData={historyData} 
      tokenData={tokenData} 
      userData={userData} 
    />
  );
}