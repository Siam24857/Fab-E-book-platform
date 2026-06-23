import { userdata } from '@/app/lib/Action/Userinfo';
import { Writerbooks } from '@/app/lib/Action/Writerebook';
import { WriterHistorybook } from '@/app/lib/Action/Writerhistorysales';
import React from 'react';
import WriterClient from './Allwritedettails';

const Allwrites = async() => {
  const userdatas = await userdata()
  const Writerbook = await Writerbooks(userdatas.id)
 const WriterHistorybooks = await WriterHistorybook(userdatas.id)
  return (
    <div>
      <WriterClient user={userdatas} books={Writerbook} salesHistory={WriterHistorybooks} ></WriterClient>
    </div>
  );
};

export default Allwrites;